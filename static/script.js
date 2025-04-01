///////////////// show navbar dropdown on hover /////////////////
$('#visit-nav').hover(function() {
    $('#visit-hidden-nav').show();
});

// hide if the mouse leaves and also didn't enter the dropdown menu
$('#visit-nav').mouseleave(function() {
    if (!$('#visit-hidden-nav').is(':hover')) {
        $('#visit-hidden-nav').hide();
    }
});

// hide if the mouse leaves the dropdown menu
$('#visit-hidden-nav').mouseleave(function() {
    $('#visit-hidden-nav').hide();
});

/////////////////// highlight the current page in the navbar /////////////////
const file = window.location.href.split('/').pop();

const $navlinks = $('.all-nav-links a');
const $hiddenlinks = $('#visit-hidden-nav a');

// loop through all the links in the navbar and the hidden dropdown menu
// in nav bar
$navlinks.each(function() {
    const href = $(this).attr('href').split('/').pop();
    console.log(href);

    if (href === file) {
        $(this).addClass('highlight');
    }
});

// in hidden dropdown menu
$hiddenlinks.each(function() {
    const href = $(this).attr('href').split('/').pop();
    console.log(href);

    if (href === file) {
        $(this).addClass('highlight');
    }
});

//////////////////// show navbar dropdown on keyboard focus /////////////////

// show dropdown when the trigger gets focus
$('#visit-nav').on('focus', function() {
    $('#visit-hidden-nav').show();
  });
  // show when focus on
  $('#visit-hidden-nav a').on('focus', function() {
    $('#visit-hidden-nav').show();
  });
  // hide when loses focus
  $('#visit-nav, #visit-hidden-nav a').on('blur', function() {
    setTimeout(function(){
      if (!$('#visit-nav').is(':focus') && !$('#visit-hidden-nav a').is(':focus')) {
        $('#visit-hidden-nav').hide();
      }
    }, 100);
  });