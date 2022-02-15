var hero_choice = 0;
var build = 0;
var full_build = 0;
var selected_items = [];
var item_slot = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: []
};
var opt_slot = {
  0: [],
  1: []
};

/*///BUILD LISTS */
$(document).ready(function() {
  //BUILD HERO CATEGORIES
  roles = ["Mage", "Tank", "Marksman", "Assassin", "Fighter", "Support"];
  roles.forEach(buildtabs);

  function buildtabs(item, i) {
    role = item.toLowerCase()
    $("#hero-tabs-list").append("<li><a href=\"#hero-tab-" + role + "\">" + item + "</a></li>");
    $("#hero-tabs").append("<div id=\"hero-tab-" + role + "\"><div class=\"hero-tab\" id=\"hero-selectable-" + role + "\"></div></div>");
  }

  //BUilD HERO BUTTONS
  $.getJSON('../db/herodb.json', function(h) {
    $.each(h.data, function(i, x) {
      $("#hero-selectable").append("<div class=\"hero\" id=\"" + x.id + "\">" + x.hero_name + "</div>");
      role = x.class.toLowerCase()
      $("#hero-selectable-" + role).append("<div class=\"hero\" id=\"" + x.id + "\">" + x.hero_name + "</div>");
    });
  });

  //BUILD ITEM CATEGORIES
  itemcat = ["Defense", "Attack", "Magic", "Movement", "Roaming", "Jungling"];
  itemcat.forEach(cattabs);

  function cattabs(item, i) {
    equip = item.toLowerCase()
    $("#cat-tabs-list").append("<li><a href=\"#tab-" + equip + "\">" + item + "</a></li>");
    $("#item-tabs").append("<div id=\"tab-" + equip + "\"><div class=\"item-tab\" id=\"item-selectable-" + equip + "\"></div></div>");
  }

  //BUilD ITEM BUTTONS
  $.getJSON('../db/itemdb.json', function(e) {
    $.each(e.data, function(i, x) {
      $("#item-selectable").append("<div class=\"item\" id=\"" + x.id + "\">" + x.item_name + "</div>");
      equip = x.item_category.toLowerCase()
      $("#item-selectable-" + equip).append("<div class=\"item\" id=\"" + x.id + "\">" + x.item_name + "</div>");
    });
  });
});

/* COLLAPSIBLE HEROES */
$(function() {
  $("#hero-menu").tabs({
    collapsible: true,
    active: false
  });
});

/* TABBED HEROES */
$(function() {
  $("#hero-tabs").tabs();
});

/* SELECTABLE HEROES */
$(function() {
  $(".hero-tab").selectable({
    stop: function() {
      var result = $("#hero-result").empty();
      $(".ui-selected", this).each(function() {
        var index = $(".hero-tab div").index(this);
        result.append(this.id);
        hero_choice = this.id;
        global(hero_choice, item_slot, opt_slot);
      });
    }
  });
});

/*HERO PORTRAIT*/


/* TABBED ITEM */
$(function() {
  $("#item-tabs").tabs();
});

/* GLOBAL MANIPS */
function global(hero_choice, item, optional) {
  buildstring = JSON.stringify(item);

  //display feedback:
  build = buildstring + "-" + JSON.stringify(optional);
  build = build.replace(/\[\]/g, "");
  build = build.replace(/[,]/g, "");
  build = build.replace(/["']/g, "");
  build = build.replace(/[0-9]:/g, "");
  build = build.replace(/[\[\]]/g, "");
  build = build.replace(/[{}]/g, "");

  //construct full build
  full_build = hero_choice + "-" + build
  full_build_enc = btoa(full_build);

  console.log(full_build)
  console.log(full_build_enc)
  var buildbox = document.getElementById("build-feedback");

  if (hero_choice == 0 || buildstring.includes("[]") == true) {
    //buildbox.innerHTML = full_build + "<br>" + full_build_enc
    buildbox.innerHTML = "<br>Please complete the build."
    if (hero_choice == 0) {
      buildbox.innerHTML += "<br>Please select a hero."
    }
    if (buildstring.includes("[]") == true) {
      buildbox.innerHTML += "<br>Please slot more items."
    }
  } else {
    buildbox.innerHTML = "<form><input type='text' id='build-code' value='" + full_build_enc + "'\></form>"
    buildbox.innerHTML += "<br>You can use this code with the Discord Bot!"
  }

}

/* LOADABLE ITEMS */
$(function() {

  /* MAIN ITEMS */
  const ItemLoader = {
    loaded_items: [],
    def_slot: null,
    load: function(i) {
      eval("slot_data_" + i + "= loaded_items");
      //alert()
    },
    unload: function() {},
    getOpenSlot: function() {},
    clearSlot: function(id) {
      console.log("Clear Slot" + id);
      this.def_slot = document.getElementById("item-slot-" + id);
      this.def_slot.innerHTML = '';
      item_slot[id].push();
      console.log(item_slot[id]);
      //$('#item-selectable .ui-selected').removeClass('ui-selected')
      $("div[class*='item']").removeClass('ui-selected')

    },
    clickHandler: function(e) {
      console.log("Click Handler");
      e.preventDefault();
      var id = e.currentTarget.id.substr(-1);
      var main_slot = document.getElementById("item-slot-" + id);
      main_slot.innerHTML = "";

      for (let x = 0; x <= item_slot[id].length - 1; x++) {
        item_slot[id] = []
      }
      for (let x = 0; x <= selected_items.length - 1; x++) {

        var slot_div = document.createElement('div');
        slot_div.classList.add('box_select');

        var slot_close = document.createElement('a');
        slot_close.setAttribute('href', 'javascript:;');
        slot_close.addEventListener("click", ItemLoader.clearSlot(id));
        slot_close.style.fontSize = '20px';
        var closeNode = document.createTextNode('X');
        slot_close.appendChild(closeNode)
        slot_div.appendChild(slot_close);

        var small_node = document.createElement('small');
        small_node.style.fontSize = '20px';
        var txNode = document.createTextNode(selected_items[x]);
        small_node.appendChild(txNode);
        slot_div.appendChild(document.createElement('br'));
        slot_div.appendChild(small_node);

        main_slot.appendChild(slot_div);
        item_slot[id].push(selected_items[x]);
        selected_items = [];
      }

      global(hero_choice, item_slot, opt_slot);
      console.log(item_slot);
      console.log(opt_slot);

    }

  };

  /* OPTIONAL ITEM */
  const OptionLoader = {
    opt_loaded_items: [],
    def_slot: null,
    load: function(i) {

      eval("opt_slot_data" + i + "= opt_loaded_items");
      //alert()
    },
    clearSlot: function(id) {
      console.log("Clear Slot" + id);
      this.def_slot = document.getElementById("opt-slot-" + id);
      this.def_slot.innerHTML = '';
      opt_slot[id].push();
      $('#item-selectable .ui-selected').removeClass('ui-selected')
    },
    clickHandler: function(e) {
      console.log("Option Handler");
      e.preventDefault();
      var id = e.currentTarget.id.substr(-1);
      var main_slot = document.getElementById("opt-slot-" + id);
      main_slot.innerHTML = "";

      for (let x = 0; x <= opt_slot[id].length - 1; x++) {
        opt_slot[id] = []
      }
      for (let x = 0; x <= selected_items.length - 1; x++) {

        var slot_div = document.createElement('div');
        slot_div.classList.add('box_select');

        var slot_close = document.createElement('a');
        slot_close.setAttribute('href', 'javascript:;');
        slot_close.addEventListener("click", OptionLoader.clearSlot(id));
        slot_close.style.fontSize = '20px';
        var closeNode = document.createTextNode('X');
        slot_close.appendChild(closeNode)
        slot_div.appendChild(slot_close);

        var small_node = document.createElement('small');
        small_node.style.fontSize = '20px';
        var txNode = document.createTextNode(selected_items[x]);
        small_node.appendChild(txNode);
        slot_div.appendChild(document.createElement('br'));
        slot_div.appendChild(small_node);

        main_slot.appendChild(slot_div);
        opt_slot[id].push(selected_items[x]);
        selected_items = [];
      }

      global(hero_choice, item_slot, opt_slot);
      console.log(item_slot);
      console.log(opt_slot);
    }

  };

  /* SELECTABLE ITEM */
  $(".item-tab").selectable({
    stop: function() {
      var result = $("#select-result").empty();
      //alert();
      $(".ui-selected", this).each(function() {
        var index = $("#selectable div").index(this);
        selected_items = []
        selected_items.push(this.id);
        result.append(this.id);
      });
    },
    autoRefresh: true

  });

  // DEFINE ITEMLOADER SLOTS
  for (let i = 0; i <= 5; i++) {
    var streval = "var slot_data_" + i + " = [];";
    eval(streval);
    $("#item-slot-" + i).click(function(e) { //  alert();
      e.preventDefault();
      ItemLoader.clickHandler(e)
    });
  }

  // DEFINE OPT SLOTS
  for (let i = 0; i <= 2; i++) {
    var streval = "var opt_slot_data_" + i + " = [];";
    eval(streval);
    $("#opt-slot-" + i).click(function(e) { //  alert();
      e.preventDefault();
      OptionLoader.clickHandler(e)
    });
  }

}); //END LOADABLE



/* SORTABLE BUILD ITEM  */
$(function() {
  //$("#sortable").sortable();
  //$("#sortable").disableSelection();
});
