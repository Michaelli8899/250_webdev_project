$('#visit-nav').hover(function() {
    $('#visit-hidden-nav').show();
    console.log('hover');
});

$('#visit-nav').mouseleave(function() {
    if (!$('#visit-hidden-nav').is(':hover')) {
        $('#visit-hidden-nav').hide();
    }
});

$('#visit-hidden-nav').mouseleave(function() {
    $('#visit-hidden-nav').hide();
});

const file = window.location.href.split('/').pop();
console.log(file);

const $navlinks = $('.all-nav-links a');
const $hiddenlinks = $('#visit-hidden-nav a');
console.log($navlinks);

$navlinks.each(function() {
    const href = $(this).attr('href').split('/').pop();
    console.log(href);

    if (href === file) {
        $(this).addClass('highlight');
    }
});

$hiddenlinks.each(function() {
    const href = $(this).attr('href').split('/').pop();
    console.log(href);

    if (href === file) {
        $(this).addClass('highlight');
    }
});

// Show dropdown when the trigger gets keyboard focus
$('#visit-nav').on('focus', function() {
    $('#visit-hidden-nav').show();
  });
  
  // Also keep dropdown open if any dropdown link gets focus
  $('#visit-hidden-nav a').on('focus', function() {
    $('#visit-hidden-nav').show();
  });
  
  // When focus leaves both the trigger and the dropdown, hide the dropdown
  $('#visit-nav, #visit-hidden-nav a').on('blur', function() {
    // Delay the check to allow focus to move between elements
    setTimeout(function(){
      if (!$('#visit-nav').is(':focus') && !$('#visit-hidden-nav a').is(':focus')) {
        $('#visit-hidden-nav').hide();
      }
    }, 100);
  });