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





  //press arrow to slide
  $(document).keydown(function(e) {

    var currentScroll = $(document).scrollTop();
    var i = 0;
    var sectNumber = 0;
    $("section").each(function () {
      if (Math.floor($(this).offset().top) <= currentScroll) {
        i++;
      } else {
        if (i == 0) { i = 1; }
        sectNumber = i;
      }
    });

      if (e.which == 39 || e.which == 40) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $("section:nth-of-type("+ (sectNumber+1)+")").offset().top
        }, 500);
        $("side a").removeClass("selected");
        $("side li:nth-of-type("+(sectNumber+1)+") a").addClass("selected");
      } else if ((e.which == 37 || e.which == 38) && sectNumber != i) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $("section:nth-of-type("+ (i-1)+")").offset().top
        }, 500);
        $("side a").removeClass("selected");
        $("side li:nth-of-type("+(i-1)+") a").addClass("selected");
      } else if ((e.which == 37 || e.which == 38) && sectNumber != 1) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $("section:nth-of-type("+ (sectNumber-1)+")").offset().top
        }, 500);
        $("side a").removeClass("selected");
        $("side li:nth-of-type("+(sectNumber-1)+") a").addClass("selected");
      } else if ((e.which == 37 || e.which == 38) && sectNumber == 1) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 500);
        $("side a").removeClass("selected");
        $("side li:nth-of-type(1) a").addClass("selected");
      }

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
