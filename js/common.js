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


    // change side menu on scroll
    var currentSectionBottomLimit = $("section:nth-of-type(1)").outerHeight();
    var currentSectionTopLimit = 0;

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();

        if (scroll >= currentSectionBottomLimit) {
          var i = 0;
          $("section").each(function () {
            if (Math.floor($(this).offset().top) < scroll) {
              i++;
            } else {
              if (i == 0) { i = 1; }
              currentSectionTopLimit = $("section:nth-of-type("+ i +")").offset().top;
              currentSectionBottomLimit = $("section:nth-of-type("+ i +")").outerHeight() + currentSectionTopLimit;
            }
          });

          $("side a").removeClass("selected");
          $("side li:nth-of-type("+ i +") a").addClass("selected");
        } else if (scroll <= currentSectionTopLimit){
          var i = 0;
          $("section").each(function () {
            if (Math.floor($(this).offset().top) > scroll) {
              i++;
            } else {
              if (i == 0) { i = 1; }
              currentSectionTopLimit = $("section:nth-of-type("+ i +")").offset().top;
              currentSectionBottomLimit = $("section:nth-of-type("+ i +")").outerHeight() + currentSectionTopLimit;
            }
          });

          $("side a").removeClass("selected");
          $("side li:nth-of-type("+ i +") a").addClass("selected");
        }

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
