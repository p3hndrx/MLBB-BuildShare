// 20220319

var hero_choice = 0;
var heroData;
var build = 0;
var full_build = 0;
var full_build_enc = 0;
var full_build_hash = 0;
var selected_items = [];
var item_data = [];
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
var blessingData = []
var bless_slot = 0
var herojson = '../../MLBB-API/v1/hero-meta-final.json'
var itemjson = '../../MLBB-API/v1/item-meta-final.json'
//var herojson = 'db/hero-meta-final.json'
//var itemjson = 'db/item-meta-final.json'

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
  $.getJSON(herojson, function(h) {
    $.each(h.data, function(i, x) {
      //$("#hero-selectable").append("<div class=\"hero\" id=\"" + x.id + "\">" + x.hero_name + "</div>");
      $("#hero-selectable").append("<div class=\"hero\" id=\"" + x.id + "\" style=\"background-image: url(./img/heroes/" + x.hero_icon + ")\"><span class=\"herotip\">" + x.hero_name + "</span></div>");
      role = x.class.toLowerCase()
      //$("#hero-selectable-" + role).append("<div class=\"hero\" id=\"" + x.id + "\">" + x.hero_name + "</div>");
      $("#hero-selectable-" + role).append("<div class=\"hero\" id=\"" + x.id + "\" style=\"background-image: url(./img/heroes/" + x.hero_icon + ")\"><span class=\"herotip\">" + x.hero_name + "</span></div>");
    });
  });

  //BUILD ITEM CATEGORIES
  itemcat = ["Defense", "Attack", "Magic", "Movement", "Roaming", "Jungling"];
  //itemcat = ["Defense", "Attack", "Magic", "Movement"]
  itemcat.forEach(cattabs);

  function cattabs(item, i) {
    equip = item.toLowerCase()
    //$("#cat-tabs-list").append("<li><a href=\"#tab-" + equip + "\">" + item + "</a></li>");
    if (equip != "roaming" && equip != "jungling") {
      $("#cat-tabs-list").append("<li><a class=\"menu-items\"  href=\"#tab-" + equip + "\">" + item + "</a></li>");
      $("#item-tabs").append("<div id=\"tab-" + equip + "\"><div class=\"item-tab\" id=\"item-selectable-" + equip + "\"></div></div>");
    } else {
      $("#cat-tabs-list").append("<li><a class=\"menu-bless\" href=\"#tab-" + equip + "\">" + item + "</a></li>");
      $("#item-tabs").append("<div id=\"tab-" + equip + "\"><div class=\"bless-tab\" id=\"bless-selectable-" + equip + "\"></div></div>");
    }
  }

  //BUilD ITEM BUTTONS
  $.getJSON(itemjson, function(e) {
    $.each(e.data, function(i, x) {
      equip = x.item_category.toLowerCase()
      //$("#item-selectable").append("<div class=\"item\" id=\"" + x.id + "\">" + x.item_name + "</div>");

      if (equip != "roaming" && equip != "jungling") {
        $("#item-selectable").append("<div class=\"item\" id=\"" + x.id + "\" style=\"background-image: url(./img/items/" + x.icon + ")\"><span class=\"itemtip\">" + x.item_name + "</span></div>");
        $("#item-selectable-" + equip).append("<div class=\"item\" id=\"" + x.id + "\" style=\"background-image: url(./img/items/" + x.icon + ")\"><span class=\"itemtip\">" + x.item_name + "</span></div>");
      } else {
        $("#bless-selectable").append("<div class=\"bless\" id=\"" + x.id + "\" style=\"background-image: url(./img/items/" + x.icon + ")\"><span class=\"itemtip\">" + x.item_name + "</span></div>");
        $("#bless-selectable-" + equip).append("<div class=\"bless\" id=\"" + x.id + "\" style=\"background-image: url(./img/items/" + x.icon + ")\"><span class=\"itemtip\">" + x.item_name + "</span></div>");
      }
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

/* SEARCH JSON */

/*GET HERO*/
function getHeroData(code) {
  $.getJSON(herojson, function(h) {
    $.each(h.data, function(i, x) {
      if (x.id == code) {
        /*console.log(x.hero_icon);
        console.log(x.hero_name);
        console.log(x.class);*/
        heroData = []
        icon = "url(./img/heroes/" + x.hero_icon + ");"
        heroData = [x.hero_icon, x.hero_name, x.class];

        heropic = document.getElementById("hero-portrait");
        $(heropic).attr("style", "background-image:" + icon);
        herolabel = document.getElementById("hero-result");
        herolabel.append(x.hero_name);

        /*BUILD EXPORTABLE*/
        expport = document.getElementById("exp-port");
        $(expport).attr("style", "background-image:" + icon);
        expherolabel = document.getElementById("exp-hero-name");
        expherolabel.innerHTML = "";
        expherolabel.append(x.hero_name);
      }
    });
  });
}
/*GET ITEM*/
function getItemData(code) {
  $.getJSON(itemjson, function(h) {
    $.each(h.data, function(i, x) {
      if (x.id == code) {
        /*console.log(x.id);
        console.log(x.icon);
        console.log(x.item_name);
        console.log(x.item_category);*/
        icon = "url(./img/items/" + x.icon + ");"
        selected_items = [x.id, x.icon, x.item_name, x.item_category];
        /*console.log("Selected Items:" + selected_items);*/

        var itemoverview = document.getElementById("select-result")
        itemoverview.innerHTML = x.item_name;
        itemoverview.classList.add('feedback2');
        var itemicon = document.getElementById("itemicon")
        itemicon.classList.add('itemicon');
        $(itemicon).attr("style", "background-image:" + icon);

        document.getElementById("category").innerHTML = x.item_category;

        $.each(x.data, function(i, y) {

          /*console.log(y.cost);
          console.log(y.summary);*/
          document.getElementById("cost").innerHTML = y.cost;
          document.getElementById("summary").innerHTML = y.summary;

          /*console.log(y.modifiers);
          console.log(y.active);
          console.log(y.passive);
          console.log(y.unique_passive);*/

          var attribox = document.getElementById("attributes");
          attribox.innerHTML = '';
          modifiers = y.modifiers[0];
          var modbox = document.createElement('div');

          for (var key in modifiers) {
            value = modifiers[key];
            key = key.replace(/_/g, ' ');
            var label = modbox.appendChild(document.createElement('span'));
            label.classList.add('attribs');
            label.innerHTML = key + ": ";
            modbox.append(label);
            modbox.append(value);
            modbox.appendChild(document.createElement('br'));
          };

          /*START ACTIVE*/
          active = y.active[0];
          activeexist = 0;

          var activebox = document.createElement('div');
          for (var key in active) {
            value = active[key];
            if (value !== "null" && key !== "modifiers") {
              activeexist = 1;
            } else {
              if (key == "modifiers") {
                modifiers = active[key];
                for (var key in modifiers) {
                  at = modifiers[key];
                  for (var key in at) {
                    value = at[key];
                    if (value !== "null") {
                      activeexist = 1;
                    }
                  }
                }
              }
            }
          }
          if (activeexist == 1) {
            var slabel = activebox.appendChild(document.createElement('span'));
            slabel.classList.add('label');
            slabel.innerHTML = " <br>Active:<hr>";
            activebox.append(slabel);
          }
          for (var key in active) {
            value = active[key];
            if (value !== "null" && key !== "modifiers") {
              if (key == "active_name") {
                activebox.appendChild(document.createElement('br'));
                activebox.append(value);
                activebox.append(": ");
              } else {
                key = key.replace(/_/g, ' ');
                var desc = activebox.appendChild(document.createElement('span'));
                desc.classList.add('attribs');
                desc.innerHTML = value;
                activebox.appendChild(document.createElement('br'));
              }

            } else {
              if (key == "modifiers") {
                modifiers = active[key];
                for (var key in modifiers) {
                  at = modifiers[key];
                  for (var key in at) {
                    value = at[key];
                    key = key.replace(/_/g, ' ');
                    var label = activebox.appendChild(document.createElement('span'));
                    label.classList.add('attribs');
                    label.innerHTML = "<br>" + key + ": ";
                    activebox.append(label);
                    activebox.append(value);
                    activebox.appendChild(document.createElement('br'));
                  }

                };
              }
            }

          } /*END ACTIVE */


          /*START PASSIVE*/
          passive = y.passive[0];
          passiveexist = 0;

          var passivebox = document.createElement('div');
          for (var key in passive) {
            value = passive[key];
            if (value !== "null" && key !== "modifiers") {
              passiveexist = 1;
            } else {
              if (key == "modifiers") {
                modifiers = passive[key];
                for (var key in modifiers) {
                  at = modifiers[key];
                  for (var key in at) {
                    value = at[key];
                    if (value !== "null") {
                      passiveexist = 1;
                    }
                  }
                }
              }
            }
          }
          if (passiveexist == 1) {
            var slabel = passivebox.appendChild(document.createElement('span'));
            slabel.classList.add('label');
            slabel.innerHTML = " <br>Passive:<hr>";
            passivebox.append(slabel);
          }
          for (var key in passive) {
            value = passive[key];
            if (value !== "null" && key !== "modifiers") {
              if (key == "passive_name") {
                passivebox.appendChild(document.createElement('br'));
                passivebox.append(value);
                passivebox.append(": ");
              } else {
                key = key.replace(/_/g, ' ');
                var desc = passivebox.appendChild(document.createElement('span'));
                desc.classList.add('attribs');
                desc.innerHTML = value;
                passivebox.appendChild(document.createElement('br'));
              }

            } else {
              if (key == "modifiers") {
                modifiers = passive[key];
                for (var key in modifiers) {
                  at = modifiers[key];
                  for (var key in at) {
                    value = at[key];
                    key = key.replace(/_/g, ' ');
                    var label = passivebox.appendChild(document.createElement('span'));
                    label.classList.add('attribs');
                    label.innerHTML = "<br>" + key + ": ";
                    passivebox.append(label);
                    passivebox.append(value);
                    passivebox.appendChild(document.createElement('br'));
                  }

                };
              }
            }

          } /*END PASSIVE */

          /*START UNIQUE-PASSIVE*/
          upassive = y.unique_passive;
          upassiveexist = 0;

          var upassivebox = document.createElement('div');
          for (var key in upassive) {
            skill = upassive[key];

            for (var key in skill) {
              value = skill[key];
              //console.log(value);
              if (value !== "null" && key !== "modifiers") {
                upassiveexist = 1;
              } else {
                if (key == "modifiers") {
                  modifiers = upassive[key];
                  for (var key in modifiers) {
                    at = modifiers[key];
                    for (var key in at) {
                      value = at[key];
                      if (value !== "null") {
                        upassiveexist = 1;
                      }
                    }
                  }
                }
              }
            }
          }

          if (upassiveexist == 1) {
            var slabel = upassivebox.appendChild(document.createElement('span'));
            slabel.classList.add('label');
            slabel.innerHTML = " <br>Unique Passive:<hr>";
            upassivebox.append(slabel);
          }
          for (var key in upassive) {
            skill = upassive[key];
            for (var key in skill) {
              value = skill[key];
              if (value !== "null" && key !== "modifiers") {
                if (key == "unique_passive_name") {

                  upassivebox.appendChild(document.createElement('br'));
                  upassivebox.append(value);
                  upassivebox.append(": ");
                } else {
                  key = key.replace(/_/g, ' ');
                  var desc = upassivebox.appendChild(document.createElement('span'));
                  desc.classList.add('attribs');
                  desc.innerHTML = value;
                  upassivebox.appendChild(document.createElement('br'));
                }

              } else {
                if (key == "modifiers") {
                  modifiers = upassive[key];
                  for (var key in modifiers) {
                    at = modifiers[key];
                    for (var key in at) {
                      value = at[key];
                      key = key.replace(/_/g, ' ');
                      var label = upassivebox.appendChild(document.createElement('span'));
                      label.classList.add('attribs');
                      label.innerHTML = "<br>" + key + ": ";
                      upassivebox.append(label);
                      upassivebox.append(value);
                      upassivebox.appendChild(document.createElement('br'));
                    }

                  };
                }
              }
            }
          }; /*END UNIQUE-PASSIVE */

          attribox.append(modbox);
          attribox.append(activebox);
          attribox.append(passivebox);
          attribox.append(upassivebox);
          //itemattribheight();
        });




        return selected_items;
      }
    });
  });
}
/*GET BLESS*/
function getBlessData(code) {
  $.getJSON(itemjson, function(h) {
    $.each(h.data, function(i, x) {
      if (x.id == code) {

        blessingData = []
        icon = "url(./img/items/" + x.icon + ");"
        blessingData = [x.id, x.icon, x.item_name, x.item_category];
        //console.log("Blessing Items:" + blessingData);

        /*UPDATE ICON*/
        blesspic = document.getElementById("bless-slot");
        blesspic.innerHTML = "";

        exp_slot = document.getElementById("exp-bless-slot");
        exp_slot.style.visibility = "visible";
        exp_slot.innerHTML = "";

        /* BUILD CLOSE BUTTON*/
        var slot_div = document.createElement('div');
        slot_div.classList.add('box_select');
        icon = "url(./img/items/" + blessingData[1] + ");"
        $(slot_div).attr("style", "background-image:" + icon);
        var slot_tip = document.createElement('span');
        $(slot_tip).attr("class", "optslottip");
        slot_tip.innerHTML = blessingData[2];
        slot_div.appendChild(slot_tip);
        var slot_close = document.createElement('a');
        slot_close.setAttribute('href', 'javascript:;');
        slot_close.addEventListener("click", blessing_deselect);
        slot_close.style.fontSize = '20px';
        var closeNode = document.createElement('div');
        closeNode.setAttribute('class', 'closebutt');
        slot_close.appendChild(closeNode)
        slot_div.appendChild(slot_close);


        /* FORMAT EXPORT */
        var exp_slot_div = document.createElement('div');
        exp_slot_div.classList.add('exp_box_select');
        $(exp_slot_div).attr("style", "background-image:" + icon);
        var exp_slot_tip = document.createElement('span');
        $(exp_slot_tip).attr("class", "exp_optslottip");
        exp_slot_tip.innerHTML = blessingData[2];
        exp_slot.appendChild(exp_slot_tip);
        exp_slot.appendChild(exp_slot_div);
        /* END FORMAT EXPORT */

        blesspic.appendChild(slot_div);

        /* END FORMAT EXPORT */

        /*BLESSING INFO*/
        var itemoverview = document.getElementById("select-result")
        itemoverview.innerHTML = x.item_name;
        itemoverview.classList.add('feedback2');
        var itemicon = document.getElementById("itemicon")
        itemicon.classList.add('itemicon');
        $(itemicon).attr("style", "background-image:" + icon);

        document.getElementById("category").innerHTML = x.item_category;

        $.each(x.data, function(i, y) {

          /*console.log(y.cost);
          console.log(y.summary);*/
          document.getElementById("cost").innerHTML = y.cost;
          document.getElementById("summary").innerHTML = y.summary;

          /*console.log(y.modifiers);
          console.log(y.active);
          console.log(y.passive);
          console.log(y.unique_passive);*/

          var attribox = document.getElementById("attributes");
          attribox.innerHTML = '';
          modifiers = y.modifiers[0];
          var modbox = document.createElement('div');

          for (var key in modifiers) {
            value = modifiers[key];
            key = key.replace(/_/g, ' ');
            var label = modbox.appendChild(document.createElement('span'));
            label.classList.add('attribs');
            label.innerHTML = key + ": ";
            modbox.append(label);
            modbox.append(value);
            modbox.appendChild(document.createElement('br'));
          };

          /*START ACTIVE*/
          active = y.active[0];
          activeexist = 0;

          var activebox = document.createElement('div');
          for (var key in active) {
            value = active[key];
            if (value !== "null" && key !== "modifiers") {
              activeexist = 1;
            } else {
              if (key == "modifiers") {
                modifiers = active[key];
                for (var key in modifiers) {
                  at = modifiers[key];
                  for (var key in at) {
                    value = at[key];
                    if (value !== "null") {
                      activeexist = 1;
                    }
                  }
                }
              }
            }
          }
          if (activeexist == 1) {
            var slabel = activebox.appendChild(document.createElement('span'));
            slabel.classList.add('label');
            slabel.innerHTML = " <br>Active:<hr>";
            activebox.append(slabel);
          }
          for (var key in active) {
            value = active[key];
            if (value !== "null" && key !== "modifiers") {
              if (key == "active_name") {
                activebox.appendChild(document.createElement('br'));
                activebox.append(value);
                activebox.append(": ");
              } else {
                key = key.replace(/_/g, ' ');
                var desc = activebox.appendChild(document.createElement('span'));
                desc.classList.add('attribs');
                desc.innerHTML = value;
                activebox.appendChild(document.createElement('br'));
              }

            } else {
              if (key == "modifiers") {
                modifiers = active[key];
                for (var key in modifiers) {
                  at = modifiers[key];
                  for (var key in at) {
                    value = at[key];
                    key = key.replace(/_/g, ' ');
                    var label = activebox.appendChild(document.createElement('span'));
                    label.classList.add('attribs');
                    label.innerHTML = "<br>" + key + ": ";
                    activebox.append(label);
                    activebox.append(value);
                    activebox.appendChild(document.createElement('br'));
                  }

                };
              }
            }

          } /*END ACTIVE */


          /*START PASSIVE*/
          passive = y.passive[0];
          passiveexist = 0;

          var passivebox = document.createElement('div');
          for (var key in passive) {
            value = passive[key];
            if (value !== "null" && key !== "modifiers") {
              passiveexist = 1;
            } else {
              if (key == "modifiers") {
                modifiers = passive[key];
                for (var key in modifiers) {
                  at = modifiers[key];
                  for (var key in at) {
                    value = at[key];
                    if (value !== "null") {
                      passiveexist = 1;
                    }
                  }
                }
              }
            }
          }
          if (passiveexist == 1) {
            var slabel = passivebox.appendChild(document.createElement('span'));
            slabel.classList.add('label');
            slabel.innerHTML = " <br>Passive:<hr>";
            passivebox.append(slabel);
          }
          for (var key in passive) {
            value = passive[key];
            if (value !== "null" && key !== "modifiers") {
              if (key == "passive_name") {
                passivebox.appendChild(document.createElement('br'));
                passivebox.append(value);
                passivebox.append(": ");
              } else {
                key = key.replace(/_/g, ' ');
                var desc = passivebox.appendChild(document.createElement('span'));
                desc.classList.add('attribs');
                desc.innerHTML = value;
                passivebox.appendChild(document.createElement('br'));
              }

            } else {
              if (key == "modifiers") {
                modifiers = passive[key];
                for (var key in modifiers) {
                  at = modifiers[key];
                  for (var key in at) {
                    value = at[key];
                    key = key.replace(/_/g, ' ');
                    var label = passivebox.appendChild(document.createElement('span'));
                    label.classList.add('attribs');
                    label.innerHTML = "<br>" + key + ": ";
                    passivebox.append(label);
                    passivebox.append(value);
                    passivebox.appendChild(document.createElement('br'));
                  }

                };
              }
            }

          } /*END PASSIVE */

          /*START UNIQUE-PASSIVE*/
          upassive = y.unique_passive;
          upassiveexist = 0;

          var upassivebox = document.createElement('div');
          for (var key in upassive) {
            skill = upassive[key];

            for (var key in skill) {
              value = skill[key];
              //console.log(value);
              if (value !== "null" && key !== "modifiers") {
                upassiveexist = 1;
              } else {
                if (key == "modifiers") {
                  modifiers = upassive[key];
                  for (var key in modifiers) {
                    at = modifiers[key];
                    for (var key in at) {
                      value = at[key];
                      if (value !== "null") {
                        upassiveexist = 1;
                      }
                    }
                  }
                }
              }
            }
          }

          if (upassiveexist == 1) {
            var slabel = upassivebox.appendChild(document.createElement('span'));
            slabel.classList.add('label');
            slabel.innerHTML = " <br>Unique Passive:<hr>";
            upassivebox.append(slabel);
          }
          for (var key in upassive) {
            skill = upassive[key];
            for (var key in skill) {
              value = skill[key];
              if (value !== "null" && key !== "modifiers") {
                if (key == "unique_passive_name") {

                  upassivebox.appendChild(document.createElement('br'));
                  upassivebox.append(value);
                  upassivebox.append(": ");
                } else {
                  key = key.replace(/_/g, ' ');
                  var desc = upassivebox.appendChild(document.createElement('span'));
                  desc.classList.add('attribs');
                  desc.innerHTML = value;
                  upassivebox.appendChild(document.createElement('br'));
                }

              } else {
                if (key == "modifiers") {
                  modifiers = upassive[key];
                  for (var key in modifiers) {
                    at = modifiers[key];
                    for (var key in at) {
                      value = at[key];
                      key = key.replace(/_/g, ' ');
                      var label = upassivebox.appendChild(document.createElement('span'));
                      label.classList.add('attribs');
                      label.innerHTML = "<br>" + key + ": ";
                      upassivebox.append(label);
                      upassivebox.append(value);
                      upassivebox.appendChild(document.createElement('br'));
                    }

                  };
                }
              }
            }
          }; /*END UNIQUE-PASSIVE */

          attribox.append(modbox);
          attribox.append(activebox);
          attribox.append(passivebox);
          attribox.append(upassivebox);
          //itemattribheight();
        });

        return selected_items;
      }
    });
  });
}


/* SELECTABLE HEROES */
$(function() {
  $(".hero-tab").selectable({
    stop: function() {
      var result = $("#hero-result").empty();
      $(".ui-selected", this).each(function() {
        var index = $(".hero-tab div").index(this);
        getHeroData(this.id);
        //result.append(this.id);
        $(function() {
          $("#hero-menu").tabs({
            collapsible: true,
            active: false
          });
        });
        hero_choice = this.id;
        global(hero_choice, item_slot, opt_slot, bless_slot);
      });
    }
  });
});

/* BLESSING SELECTABLE */
$(function() {
  $(".bless-tab").selectable({
    stop: function() {
      var result = $("#bless-slot").empty();
      $(".ui-selected", this).each(function() {
        var index = $(".bless-tab div").index(this);
        blessingData = []
        getBlessData(this.id);
        bless_slot = this.id;
        console.log(bless_slot)
        global(hero_choice, item_slot, opt_slot, bless_slot);
      });
    }
  });
});

/* BLESSING DESELECT */
function blessing_deselect() {
  $('.bless').removeClass('ui-selected')
  console.log("Clearing Blessing")
  blesspic = document.getElementById("bless-slot");
  blesspic.innerHTML = "";

  exp_slot = document.getElementById("exp-bless-slot");
  exp_slot.innerHTML = "";
  exp_slot.style.visibility = "hidden";

  blessingData = []
  bless_slot = 0
  global(hero_choice, item_slot, opt_slot, bless_slot);
};

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
      //console.log(item_slot[id]);
      //$('#item-selectable .ui-selected').removeClass('ui-selected')
      $("div[class*='item']").removeClass('ui-selected')

    },
    clickHandler: function(e) {
      console.log("Click Handler");
      e.preventDefault();
      var id = e.currentTarget.id.substr(-1);
      var main_slot = document.getElementById("item-slot-" + id);
      main_slot.innerHTML = "";

      var exp_slot = document.getElementById("exp-item-slot-" + id);
      exp_slot.innerHTML = "";

      for (let x = 0; x <= item_slot[id].length - 1; x++) {
        item_slot[id] = []
      }
      for (let x = 0; x <= selected_items.length - 1; x++) {

        //SLOT NORMAL SLOTS
        var slot_div = document.createElement('div');
        slot_div.classList.add('box_select');
        icon = "url(./img/items/" + selected_items[1] + ");"
        $(slot_div).attr("style", "background-image:" + icon);
        var slot_tip = document.createElement('span');
        $(slot_tip).attr("class", "slottip");
        slot_tip.innerHTML = selected_items[2];
        slot_div.appendChild(slot_tip);
        var slot_close = document.createElement('a');
        slot_close.setAttribute('href', 'javascript:;');
        slot_close.addEventListener("click", ItemLoader.clearSlot(id));
        slot_close.style.fontSize = '20px';
        var closeNode = document.createElement('div');
        closeNode.setAttribute('class', 'closebutt');
        slot_close.appendChild(closeNode)
        slot_div.appendChild(slot_close);

        var small_node = document.createElement('small');
        small_node.style.fontSize = '20px';
        //var txNode = document.createTextNode(selected_items[x]);
        //small_node.appendChild(txNode);
        //slot_div.appendChild(document.createElement('br'));
        //slot_div.appendChild(small_node);

        /* FORMAT EXPORT */
        var exp_slot_div = document.createElement('div');
        exp_slot_div.classList.add('exp_box_select');
        $(exp_slot_div).attr("style", "background-image:" + icon);
        var exp_slot_tip = document.createElement('span');
        $(exp_slot_tip).attr("class", "exp_slottip");
        exp_slot_tip.innerHTML = selected_items[2];
        exp_slot_div.appendChild(exp_slot_tip);
        exp_slot.appendChild(exp_slot_div);
        /* END FORMAT EXPORT */

        main_slot.appendChild(slot_div);
        item_slot[id].push(selected_items[x]);
        selected_items = [];
      }

      global(hero_choice, item_slot, opt_slot, bless_slot);
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

      var exp_slot = document.getElementById("exp-opt-slot-" + id);
      exp_slot.innerHTML = "";

      for (let x = 0; x <= opt_slot[id].length - 1; x++) {
        opt_slot[id] = []
      }
      for (let x = 0; x <= selected_items.length - 1; x++) {

        var slot_div = document.createElement('div');
        slot_div.classList.add('box_select');
        icon = "url(./img/items/" + selected_items[1] + ");"
        $(slot_div).attr("style", "background-image:" + icon);
        var slot_tip = document.createElement('span');
        $(slot_tip).attr("class", "optslottip");
        slot_tip.innerHTML = selected_items[2];
        slot_div.appendChild(slot_tip);
        var slot_close = document.createElement('a');
        slot_close.setAttribute('href', 'javascript:;');
        slot_close.addEventListener("click", OptionLoader.clearSlot(id));
        slot_close.style.fontSize = '20px';
        var closeNode = document.createElement('div');
        closeNode.setAttribute('class', 'closebutt');
        slot_close.appendChild(closeNode)
        slot_div.appendChild(slot_close);

        /* FORMAT EXPORT */
        var exp_slot_div = document.createElement('div');
        exp_slot_div.classList.add('exp_box_select');
        $(exp_slot_div).attr("style", "background-image:" + icon);
        var exp_slot_tip = document.createElement('span');
        $(exp_slot_tip).attr("class", "exp_optslottip");
        exp_slot_tip.innerHTML = selected_items[2];

        exp_slot.appendChild(exp_slot_div);
        exp_slot.appendChild(exp_slot_tip);
        /* END FORMAT EXPORT */

        main_slot.appendChild(slot_div);
        opt_slot[id].push(selected_items[x]);
        selected_items = [];
      }

      global(hero_choice, item_slot, opt_slot, bless_slot);
      console.log(item_slot);
      console.log(opt_slot);
    }

  };

  /* SELECTABLE ITEM */
  $(".item-tab").selectable({
    stop: function() {
      //var result = $("#select-result").empty();
      //alert();
      $(".ui-selected", this).each(function() {
        var index = $("#selectable div").index(this);
        //selected_items = []
        //selected_items.push(this.id);
        getItemData(this.id);
        highlight();
        //result.append(this.id);
      });
    },
    autoRefresh: true,
    selected: function (event, ui) {
                if ($(ui.selected).hasClass('click-selected')) {
                    $(ui.selected).removeClass('ui-selected click-selected');
                    dim()

                } else {
                    $(ui.selected).addClass('click-selected');

                }
            },
            unselected: function (event, ui) {
                $(ui.unselected).removeClass('click-selected');
                dim()
            }
  });

  // DEFINE ITEMLOADER SLOTS
  for (let i = 0; i <= 5; i++) {
    var streval = "var slot_data_" + i + " = [];";
    eval(streval);
    $("#item-slot-" + i).click(function(e) { //  alert();
      e.preventDefault();
      dim();
      ItemLoader.clickHandler(e)
    });
  }

  // DEFINE OPT SLOTS
  for (let i = 0; i <= 2; i++) {
    var streval = "var opt_slot_data_" + i + " = [];";
    eval(streval);
    $("#opt-slot-" + i).click(function(e) { //  alert();
      e.preventDefault();
      dim();
      OptionLoader.clickHandler(e)
    });
  }

}); //END LOADABLE

// HIGHLIGHT BOX
function highlight() {
  for (let i = 0; i <= 5; i++) {
    let divElement = document.querySelector("#item-slot-" + i);
    divElement.classList.add("highlight");
  }
  for (let i = 0; i <= 1; i++) {
    let div = document.querySelector("#opt-slot-" + i);
    div.classList.add("highlight");
  }
}

function dim() {
  for (let i = 0; i <= 5; i++) {
    let divElement = document.querySelector("#item-slot-" + i);
    divElement.classList.remove("highlight");
  }
  for (let i = 0; i <= 1; i++) {
    let div = document.querySelector("#opt-slot-" + i);
    div.classList.remove("highlight");
  }
}


/* BLESSING TAB SWITCH */
$(function() {
  $("#bless-slot").bind("click", function(event) {
    //$("#item-tabs").tabs("option", "active", 6);
  });
});

// GLOBAL DESELECT
function clearselect()
{
selected_items=[]
$('.item-tab .ui-selected').removeClass('ui-selected')
dim()
};


/* TABBED ITEM */
$(function() {
  $("#item-tabs").tabs();
});

/* TABBED BUILDER */
$(function() {
  $("#dropslots").tabs();
});

/* GLOBAL MANIPS */
function global(hero_choice, item, optional, blessing) {
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
  full_build = hero_choice + "-" + build + "-" + blessing
  full_build_enc = btoa(full_build);
  full_build_hash = md5(full_build_enc);

  console.log(full_build)
  console.log(full_build_enc)
  var buildbox = document.getElementById("build-feedback");

  if (hero_choice == 0 || buildstring.includes("[]") == true) {
    //buildbox.innerHTML = full_build + "<br>" + full_build_enc
    buildbox.innerHTML = "This build requires more info..."
    //document.getElementById("build-copy").innerHTML = '';
    if (hero_choice == 0) {
      buildbox.innerHTML += "<li>Please select a hero."
    }
    if (buildstring.includes("[]") == true) {
      buildbox.innerHTML += "<li>Please slot more items."
    }
  } else {
    $("#dropslots").tabs("option", "active", 1);
    buildbox.innerHTML = "<form><textarea rows='4' cols='50' id='build-code' class='buildtext' onclick='copytoclip();'>" + full_build_hash + "</textarea>"
    buildbox.innerHTML += "<br>You can use this code with the Discord Bot! <br>OR...<div class='sharebox'><a href='javascript:download();' class='sharebutt'>Download</a></div>"

  }
};

/*COPY TO CLIPBOARD*/
function copytoclip() {
  var copyText = document.getElementById("build-code");
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
  document.getElementById("build-copy").innerHTML = "<br>Copied to Clipboard.";
  upload();
}
/*END COPY-TO-CLIP

/*UPLOAD*/
function upload() {
  //console.log("Posting: " + full_build_enc);
  html2canvas(document.querySelector("#export"), {
    onclone: function(clonedDoc) {
      clonedDoc.getElementById('export').style.display = 'block';
    }
  }).then(canvas => {

    var dataNAME = full_build_hash
    var dataREF = full_build_enc
    var dataURL = canvas.toDataURL("image/png");

    $.ajax({
      type: "POST",
      url: "upload.php",
      data: {
        name: dataNAME,
        imgBase64: dataURL,
        ref: dataREF
      }
    }).done(function(o) {
      console.log('saved:' + dataREF);
    });
  });
};

/*HTML2 CANVAS */
function download() {
  html2canvas(document.querySelector("#export"), {
    onclone: function(clonedDoc) {
      clonedDoc.getElementById('export').style.display = 'block';
    }
  }).then(canvas => {
    //document.body.appendChild(canvas)
    saveAs(canvas.toDataURL(), full_build_hash + '.png');
  });
}

/*SAVE AS*/
function saveAs(uri, filename) {

  var link = document.createElement('a');

  if (typeof link.download === 'string') {

    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);

  } else {

    window.open(uri);

  }
}

/*HELP DIALOG*/
$(function() {
  $("#help").dialog({
    autoOpen: false,
    modal: true,
    draggable: false,
    resizable: false,

    width: 635,
    dialogClass: 'no-close success-dialog',
    open: function() {
      $(".ui-dialog-titlebar-close").hide();
    }

  });
});


function openhelp() {
  $("#help").dialog("open");
}

function closehelp() {
  $("#help").dialog("close");
}
