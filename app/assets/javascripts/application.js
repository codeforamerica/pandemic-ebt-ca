// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require_tree .
//= require cfa_styleguide_main

var followUpQuestionClear = (function() {
    var fUQc = {
        init: function() {
            $('.question-with-follow-up').each(function(index, question) {
                var self = this;

                // add click listeners to initial question inputs
                $(self).find('.question-with-follow-up__question input').click(function(e) {
                    $(self).find('#email_address-follow-up').find(':input' ).val('');
                    $(self).find('#form_email_address__errors').remove();
                    $(self).find('#form_email_address').parent().parent().removeClass('form-group--error');

                    $(self).find('#phone_number-follow-up').find(':input' ).val('');
                    $(self).find('#form_phone_number__errors').remove();
                    $(self).find('#form_phone_number').parent().parent().removeClass('form-group--error');
                })
            });
        }
    }
    return {
        init: fUQc.init
    }
})();

$(document).ready(function() {
    followUpQuestionClear.init();
});
