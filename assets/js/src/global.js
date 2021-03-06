// START APP
var items = [],
    page = 0;

// Init
angular.module('admirePrint', []);

(function($){

    PinterestFeedObject = function(el, options) {
        this.create(el, options);
    };

    $.extend(PinterestFeedObject.prototype, {

        create: function(el, options) {

            var o = $.extend(true,this.defaults,options);

            // Set Pinterest RSS url using Google Feed API
            var cp = o.id.split('/'),
                ext = cp.length > 1 ? '/rss' : '/feed.rss',
                href = 'http://www.pinterest.com/'+o.id,
                url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+o.results+'&callback=?&q=' + encodeURIComponent(href+ext);

            // jQuery AJAX call
            jQuery.ajax({
                url: url,
                cache: true,
                dataType: 'jsonp',
                success: function(a){
                    a = a.responseData.feed.entries;

                    $.each(a, function(i,item){
                        if(i < o.results){
                            var d = item.publishedDate,
                                imgSrc = $('img',item.content).attr('src'),
                                imgSrc = imgSrc.replace('236x' ,'736x'),
                                img = '<img src="'+imgSrc+'" alt="" />',
                                html = '<article class="item">' + img + '<a href="' + item.link + '" class="item__link" target="_blank"></a><div class="item__content"><div class="item__text">' + item.contentSnippet + '</div>';

                            // Add share links
                            html += '<div class="item__share"> ' + shareLink(item.contentSnippet,item.link,o.tweetId) + '</div>';

                            // Get time since
                            d = d != '' ? html += '<div class="item__date">Added ' + nicetime(new Date(d).getTime()) + '</div></div></article>' : '' ;
                        }

                        items.push(html);

                    });

                    $('.app .preloader').fadeOut(function() {

                        var pinData = items.slice(0, 10);

                        $('.app').append(pinData).hide();
                        $('.app > *').hide();
                        $('.app').show();
                        $('.app .item').each(function(i) {
                            $(this).delay(i * 250).fadeIn('250');
                        });

                    });

                    page++;

                },
                complete: function(){

                    // Code to open new popup window for share links + open other links in new browser tab
                    $(el).click(function(e){
                        if($(this).parent().hasClass('section-share')){
                            var u = $(this).attr('href');
                            window.open(u,'sharer','toolbar=0,status=0,width=626,height=436');
                            return false;
                        } else {
                            if(external){this.target = '_blank';}
                        }
                    });

                }
            });
        }
    });

    $.fn.dcPinterestFeed = function(options, callback){
        var d = {};
        this.each(function(){
            var s = $(this);
            d = s.data("pinterestfeed");
            if (!d){
                d = new PinterestFeedObject(this, options, callback);
                s.data("pinterestfeed", d);
            }
        });
        return d;
    };

    // Creates facebook & twitter share links
    function shareLink(st,sq,tweetId){
        var sq = encodeURIComponent(sq), st = encodeURIComponent(st);
        var s = '<a href="http://www.facebook.com/sharer.php?u='+sq+'&t='+st+'" class="item__share--facebook fa icon-facebook" target="_blank"></a>';
        s += '<a href="https://twitter.com/share?url='+sq+'&text='+st+'&via='+tweetId+'" class="item__share--twitter fa icon-twitter" target="_blank"></a>';
        return s;
    }

    // Function to convert date to relative date
    function nicetime(a){
        var d = Math.round((+new Date - a) / 1000), fuzzy;
        var chunks = new Array();
            chunks[0] = [60 * 60 * 24 * 365 , 'year'];
            chunks[1] = [60 * 60 * 24 * 30 , 'month'];
            chunks[2] = [60 * 60 * 24 * 7, 'week'];
            chunks[3] = [60 * 60 * 24 , 'day'];
            chunks[4] = [60 * 60 , 'hr'];
            chunks[5] = [60 , 'min'];
        var i = 0, j = chunks.length;
        for (i = 0; i < j; i++) {
            s = chunks[i][0];
            n = chunks[i][1];
            if ((xj = Math.floor(d / s)) != 0)
                break;
        }
        fuzzy = xj == 1 ? '1 '+n : xj+' '+n+'s';
        if (i + 1 < j) {
            s2 = chunks[i + 1][0];
            n2 = chunks[i + 1][1];
            if ( ((xj2 = Math.floor((d - (s * xj)) / s2)) != 0) )
                fuzzy += (xj2 == 1) ? ' + 1 '+n2 : ' + '+xj2+' '+n2+'s';
        }
        fuzzy += ' ago';
        return fuzzy;
    }

})(jQuery);
