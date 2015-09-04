declare var jQuery;

var ALERT = (function ($: any, window: any): any {
    'use strict';

    var api: any = {};

    api.spawn = function (type: string, message: string): void {
        var alertDiv = $(
            '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '<span class="alert-text"></span>' +
            '</div>');

        alertDiv.find('.alert-text').text(message);
        $('#alerts').append(alertDiv);

        window.setTimeout(function (): void {
            var alert = $('#alerts').find('.alert:not(".fading")').first();
            alert.addClass('fading');
            alert.fadeTo(1500, 0);
            alert.slideUp(500, function (): void {
                $(this).remove();
            });
        }, 5000);
    };

    api.spawnError = function (error: any): void {
        api.spawn('danger', 'Error: ' + error.code + ' ' + error.message);
    };

    return api;
}(jQuery, window));
