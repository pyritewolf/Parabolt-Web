$(document).ready(function () {
  
  resizeSections();

  $("side").on('click', 'a', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);

  });


    // change side menu on scroll
    var currentSectionBottomLimit = $("section:nth-of-type(1)").outerHeight();
    var currentSectionTopLimit = 0;

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        var i = 0;

        if (scroll == 0) {
          i = 1;
          currentSectionTopLimit = 0;
          currentSectionBottomLimit = $("section:nth-of-type(1)").outerHeight()
        }else if (scroll > currentSectionBottomLimit) {
          $("section").each(function () {
            if (Math.floor($(this).offset().top) < scroll) {
              i++;
            } else {
              if (i == 0) { i = 1; }
              currentSectionTopLimit = $("section:nth-of-type("+ i +")").offset().top;
              currentSectionBottomLimit = $("section:nth-of-type("+ i +")").outerHeight() + currentSectionTopLimit;
              return false;
            }
          });

        } else if (scroll < currentSectionTopLimit){
          $("section").each(function () {
            if ((Math.floor($(this).offset().top) + $(this).outerHeight()) > scroll) {
              i++;
            } else {
              i++;
              currentSectionTopLimit = $("section:nth-of-type("+ i +")").offset().top;
              currentSectionBottomLimit = $("section:nth-of-type("+ i +")").outerHeight() + currentSectionTopLimit;
              return false;
            }
          });
        } else if (scroll == currentSectionBottomLimit) {
          currentSectionTopLimit = currentSectionBottomLimit;

          $("section").each(function () {
            if (Math.floor($(this).offset().top) != scroll) {
              i++;
            } else {
              i++;
              currentSectionBottomLimit = $("section:nth-of-type("+ i +")").outerHeight() + currentSectionTopLimit;
              return false;
            }
          });
        }



        if (i != 0) {
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
        //slide para abajo
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $("section:nth-of-type("+ (sectNumber+1)+")").offset().top
        }, 500);
      } else if ((e.which == 37 || e.which == 38) && sectNumber != i) {
        //slide para arriba
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $("section:nth-of-type("+ (i-1)+")").offset().top
        }, 500);
      } else if ((e.which == 37 || e.which == 38) && sectNumber != 1) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $("section:nth-of-type("+ (sectNumber-1)+")").offset().top
        }, 500);
      } else if ((e.which == 37 || e.which == 38) && sectNumber == 1) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 500);
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
