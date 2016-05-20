// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($) {

    // We're accessing this DOM element a lot, so put it in a variable.
    $message_trigger = $('.workbench-tabs__trigger');

    // Open/Close functionality for rail navigation.
    $message_trigger.click(function(e) {
        e.preventDefault();

        // Toggle class for the drawer and also add a helper class to the
        // children.
        $(this).toggleClass('is-closed');

        $('.workbench-tabs__message').slideToggle('slow', function() {
            $('.workbench-tabs__message').toggleClass('is-closed', $(this).is(':visible'));
        });
    });

    // Lose focus on the trigger when the mouse leaves.
    // We could use .blur() in the click handler above, but that breaks the
    // menu for users who are tabbing through.
    $message_trigger.mouseout(function() {
        $(this).blur();
    });

})(jQuery);
