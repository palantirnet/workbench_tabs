// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($) {

  // We're accessing this DOM element a lot, so put it in a variable.
  var $messageTrigger = $('.workbench-tabs__trigger');
  var $messageContents = $('.workbench-tabs__message');

  // Open/Close functionality for rail navigation.
  $messageTrigger.click(function(e) {
    e.preventDefault();

    // Toggle class for the drawer and also add a helper class to the
    // children.
    $(this).toggleClass('is-closed');

    $messageContents.slideToggle('slow', function() {
      $messageContents.toggleClass('is-closed', $(this).is(':visible'));
    });
  });

  // Lose focus on the trigger when the mouse leaves.
  // We could use .blur() in the click handler above, but that breaks the
  // menu for users who are tabbing through.
  $messageTrigger.mouseout(function() {
    $(this).blur();
  });

  // Close the drawer when we scroll past it.
  $(window).on('scroll', function() {
    // Only close the messages drawer automatically if it exists.
    if ($messageContents.length) {
      // Get the height of the message contents.
      var messageHeight = $messageContents.outerHeight(true);

      // If we've scrolled past the messages and we are not closed, then close the drawer.
      if ($(window).scrollTop() > messageHeight && !$messageTrigger.hasClass('is-closed')) {
        // Reset the trigger and contents to closed.
        $messageTrigger.addClass('is-closed');
        $messageContents.addClass('is-closed').attr('style', '');

        // Scroll to the top of the page to prevent a jump.
        $(window).scrollTop(0);
      }
    }
  });

})(jQuery);
