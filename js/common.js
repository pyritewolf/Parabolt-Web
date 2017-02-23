$(document).ready(function () {
  resizeSections();

  $("side").on('click', 'a', function(event){
    event.preventDefault();
    $("side a").removeClass("selected");
    $(this).addClass("selected");

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
  });
});

$(window).resize(function () {
  resizeSections();
});


function resizeSections() {
  var winHeight = $(window).height();

  $("section").each(function () {
    var sectionHeight = $(this).height();

    if (winHeight > sectionHeight) {
      var padding = (winHeight - sectionHeight) / 2;

      $(this).css("padding-top", padding +"px");
      $(this).css("padding-bottom", padding +"px");

    }
  });

}
