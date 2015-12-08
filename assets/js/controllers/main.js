angular.module('admirePrint')
    .controller('headerCtrl', function( $scope ) {

        $scope.backToTop = function() {

            $('body').animate({
                scrollTop: 0
            }, 'slow');

        };

    })
    .controller('appCtrl', function( $scope ) {

        $('.app').dcPinterestFeed({
            id: 'admireprint',
            tweetId: 'admirespaces',
            results: 100
        });

    })
    .controller('footerCtrl', function( $scope ) {

        $scope.more = function() {

            //history.pushState({}, '', '/page/' + page);
            $('.app').append( items.slice(page + '1', page + 1 + '0') );
            page++;

        };

    });