$('#history-read-more').click(function() {
    console.log('read more clicked');
  $('#history-read-more').hide();
  $('#history-read-less').show();
  $('#long-content').show();
}
);

  $('#history-read-more').on('keydown', function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      $(this).click();
    }
  });



$('#history-read-less').click(function() {
    console.log('read less clicked');
  $('#history-read-less').hide();
  $('#history-read-more').show();
  $('#long-content').hide();
}
);

  $('#history-read-less').on('keydown', function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      $(this).click();
    }
  });

