var maxHeight = 0;
var maxWidth = 0;
calculateHeight();


function calculateHeight() {
  maxHeight = window.innerHeight;
  maxWidth = window.innerWidth;
  console.log("Height:"+maxHeight);
  console.log("Width:"+ maxWidth);
};

window.resize = function() {
  calculateHeight()
};
window.onscroll = function() {
  scrollFunction();
  calculateHeight();
  y = 0
  y = y += document.body.scrollTop;
  console.log(y)
};

function scrollFunction() {
  //console.log(document.body.scrollTop)
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

    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
      calculateHeight();
      document.getElementById("slots").classList.add("buildfloat");
      /*if (maxWidth < 750) {
          document.getElementById("slots").classList.add("float-margin")
          }*/
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
      if (document.body.scrollTop > 275 || document.documentElement.scrollTop > 275) {
        calculateHeight();
        document.getElementById("dropslots").classList.remove("itemfloat");

        title = document.getElementById("title").offsetHeight;
        hero = document.getElementById("hero-container").offsetHeight;
        slots = document.getElementById("slots").offsetHeight;

        console.log("Window: " + maxHeight)
        console.log("Title: " + title)
        console.log("Herobox: " + hero)
        console.log("Slots: " + slots)
        if (maxWidth < 750) {
          document.getElementById("slots").classList.add("float-margin")
          //document.getElementById("dropslots").classList.add("float-margin")

          const tabs = document.querySelectorAll(`[id^="item-selectable"]`);

          for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.add("mini-scroll")
            }
          } else {
          const tabs = document.querySelectorAll(`[id^="item-selectable"]`);
          for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("mini-scroll")
          }
        }
        if (maxWidth >= 750) {

          const tabs = document.querySelectorAll(`[id^="item-selectable"]`);
          let box = document.querySelector('.item-info');
          let width = box.offsetWidth;
          let height = box.offsetHeight;

          for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.add("bigger-scroll")
            }
          } else {
          const tabs = document.querySelectorAll(`[id^="item-selectable"]`);
          for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("bigger-scroll")
          }
        }

        document.getElementById("dropslots").classList.add("itemlock");
        offset = (title + hero + slots) - 10
        console.log(offset)
        document.getElementById("dropslots").style.top = offset + "px";

      } else {
        document.getElementById("dropslots").classList.remove("itemlock");
      }

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

      //document.getElementById("spacer").style.height="0px";*/
    }


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


}
