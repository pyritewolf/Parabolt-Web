$(document).ready(function () {

  resizeSections();
  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
    $("side a").removeClass("selected");
    $("section").removeClass("slide-effect");
  }

  // when clicking the menu, scroll to corresponding section
  $("side").on('click', 'a', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);

    $(".nav").toggleClass("visible");

  });

if(navigator.userAgent.toLowerCase().indexOf('firefox') == -1){
    // change side menu on scroll
    var currentSectionBottomLimit = $("section:nth-of-type(1)").outerHeight();
    var currentSectionTopLimit = 0;
    var currentSectionId = 1;
    var prevScroll = 0;

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();

        if (scroll > prevScroll && scroll >= currentSectionBottomLimit) {
          currentSectionId++;
        } else if (scroll < prevScroll && scroll < currentSectionTopLimit){
          currentSectionId--;
        }
        currentSectionTopLimit = $("section:nth-of-type("+ currentSectionId +")").offset().top;
        currentSectionBottomLimit = currentSectionTopLimit + $("section:nth-of-type("+ currentSectionId +")").outerHeight();

        $("side a").removeClass("selected");
        $("side li:nth-of-type("+ currentSectionId +") a").addClass("selected");
        validateEffects(currentSectionId, scroll, currentSectionTopLimit, currentSectionBottomLimit);

        prevScroll = scroll;
    });
}

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
        scrollNumber = sectNumber+1;
      } else if ((e.which == 37 || e.which == 38) && sectNumber != i) {
        //slide para arriba
        e.preventDefault();
        scrollNumber = i-1;
      } else if ((e.which == 37 || e.which == 38) && sectNumber != 1) {
        e.preventDefault();
        scrollNumber = sectNumber-1;
      } else if ((e.which == 37 || e.which == 38) && sectNumber == 1) {
        e.preventDefault();
        scrollNumber = 0;
      }
      $('html, body').animate({
        scrollTop: $("section:nth-of-type("+ scrollNumber+")").offset().top
      }, 750);

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


// EFFECTS! :)
function validateEffects(i, scroll, topLimit, bottomLimit) {
  var currentSection = $("section:nth-of-type("+i+")");
  var closeIn = bottomLimit - scroll;

  //slide effect: two invisible elements appear from the sides.
  //requires .slide-effect class on the parent section

  if (closeIn > 0 && closeIn <= 100 && $("section:nth-of-type("+(i+1)+")").hasClass("slide-effect")) {
    leftGrid = $("section:nth-of-type("+(i+1)+") .grid-2:nth-of-type(1)");
    rightGrid = $("section:nth-of-type("+(i+1)+") .grid-2:nth-of-type(2)");

    leftGrid.css("left", "-"+ closeIn + "px");
    leftGrid.css("opacity", "0." + (100-closeIn));

    rightGrid.css("right", "-"+ closeIn + "px");
    rightGrid.css("opacity", "0." + (100-closeIn));
  }

  //partial effect: a .grid's span children fade in with 0.5s delay
  //requires .partial-effect class on the parent element
  if (closeIn > 0 && closeIn <= 200 && $("section:nth-of-type("+(i+1)+") .grid").hasClass("partial-effect")) {
    var partial = $("section:nth-of-type("+(i+1)+") .partial-effect");
    showPartials(partial);
  }


}

function showPartials (parentGrid) {
	setTimeout(function () {
		parentGrid.find("span:not(.shown)").first().fadeIn(500);
		parentGrid.find("span:not(.shown)").first().addClass("shown");
		if (parentGrid.find("span:not(.shown)").length > 0) {
			showPartials(parentGrid);
		}

	}, 300)
}
