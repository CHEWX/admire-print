
/* Page Animations
*********************************************************************************************/

jQuery(document).ready(function($) {
	$(function() {
		$('#header').delay(100).fadeIn(1000);
		$('#intro').delay(300).fadeIn(500);
	});
});

/* Mailchimp Form Handler
*********************************************************************************************/

$(document).ready( function () {
    var $form = $('form');

    if ( $form.length > 0 ) {
        $('form button').bind('click', function ( event ) {
            if ( event ) event.preventDefault();
            register($form);
        });
    }
});

function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
        success     : function(data) {
            if (data.result != "success") {
                // Something went wrong, do something to notify the user. maybe alert(data.msg);
            } else {
                $('#pre-subscribe').fadeOut(500);
                $('#post-subscribe').delay(500).fadeIn(500);
            }
        }
    });
}