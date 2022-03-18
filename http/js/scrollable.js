
window.onscroll = function() {scrollFunction()};


function scrollFunction() {
  console.log(document.body.scrollTop)
  if (document.body.scrollTop > 175 || document.documentElement.scrollTop > 175) {
    document.getElementById("title").classList.add("float");
    document.getElementById("hero-container").classList.add("herofloat");
    document.getElementById("hero-menu").classList.add("hide-scroll");

    //resize portrait
    document.getElementById("hero-portrait").classList.remove("hero-portrait");
    document.getElementById("hero-portrait").classList.add("hero-portrait-scroll");
    //reposition label
    document.getElementById("feedback").classList.remove("herolabel");
    document.getElementById("feedback").classList.add("herolabel-scroll");

    document.getElementById("build").style.marginTop = "450px";
  } else {
    document.getElementById("title").classList.remove("float");
    document.getElementById("hero-container").classList.remove("herofloat");
    document.getElementById("hero-menu").classList.remove("hide-scroll");
     //resize portrait
    document.getElementById("hero-portrait").classList.add("hero-portrait");
    document.getElementById("hero-portrait").classList.remove("hero-portrait-scroll");
      //reposition label
    document.getElementById("feedback").classList.add("herolabel");
    document.getElementById("feedback").classList.remove("herolabel-scroll");

    document.getElementById("build").style.marginTop = "20px";

  }

  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    document.getElementById("slots").classList.add("buildfloat");
    //change size of boxes
    for (let i = 0; i <= 5; i++) {
       var boxid = "item-slot-" + i;
       document.getElementById(boxid).classList.remove("box")
       document.getElementById(boxid).classList.add("box-float")
    }
    for (let i = 0; i <= 1; i++) {
       var optid = "opt-slot-" + i;
       document.getElementById(optid).classList.remove("box-opt")
       document.getElementById(optid).classList.add("box-opt-float")
    }
    document.getElementById("bless-slot").classList.remove("box-opt")
    document.getElementById("bless-slot").classList.add("box-opt-float")

    //bump selector down
    document.getElementById("dropslots").classList.add("itemfloat");
    //document.getElementById("spacer").style.height="330px";
  } else {
    document.getElementById("slots").classList.remove("buildfloat");

    for (let i = 0; i <= 5; i++) {
       var boxid = "item-slot-" + i;
       document.getElementById(boxid).classList.add("box")
       document.getElementById(boxid).classList.remove("box-float")
    }
    for (let i = 0; i <= 1; i++) {
       var optid = "opt-slot-" + i;
       document.getElementById(optid).classList.add("box-opt")
       document.getElementById(optid).classList.remove("box-opt-float")
    }
    document.getElementById("bless-slot").classList.add("box-opt")
    document.getElementById("bless-slot").classList.remove("box-opt-float")
    document.getElementById("dropslots").classList.remove("itemfloat");
    //document.getElementById("spacer").style.height="0px";
  }
  /*
  var height = document.getElementById("slots").offsetHeight;
  document.getElementById("dropslots").style.marginTop = height + 'px';
  $(window).scroll(function(){
    $("#dropslots").css("top",Math.max(0,750-$(this).scrollTop()));
});*/
}