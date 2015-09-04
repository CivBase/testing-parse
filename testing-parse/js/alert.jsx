let spawn = function(type, message) {
    let alertDiv = $(
        '<div class="alert alert-${type} alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" ' +
        'aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '<span class="alert-text"></span>' +
        '</div>');

    alertDiv.find('.alert-text').text(message);
    $('#alerts').append(alertDiv);

    window.setTimeout(() => {
        let alert = $('#alerts').find('.alert:not(".fading")').first();
        alert.addClass('fading');
        alert.fadeTo(1500, 0);
        alert.slideUp(500, () => {
            $(this).remove();
        });
    }, 5000);
};

let spawnError = function(error) {
    spawn('danger', 'Error: ${error.code} ${error.message}');
};

export {spawn, spawnError};
