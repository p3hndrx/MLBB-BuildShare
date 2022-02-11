
/*///BUILD LISTS */
 $(document).ready(function() {
    //BUILD HERO CATEGORIES
    roles = ["Mage", "Tank", "Marksman", "Assassin", "Fighter", "Support" ];
    roles.forEach(buildtabs);
    function buildtabs(item, i) {
        role = item.toLowerCase()
        $("#hero-tabs-list").append("<li><a href=\"#hero-tab-"+role+"\">"+item+"</a></li>");
        $("#hero-tabs").append("<div id=\"hero-tab-"+role+"\"><div class=\"hero-tab\" id=\"hero-selectable-"+role+"\"></div></div>");
    }

    //BUilD HERO BUTTONS
    $.getJSON('../db/herodb.json', function(h) {
        $.each(h.data, function(i,x) {
            $("#hero-selectable").append("<div class=\"hero\" id=\""+x.id+"\">" + x.hero_name + "</div>");
            role = x.class.toLowerCase()
            $("#hero-selectable-"+role).append("<div class=\"hero\" id=\""+x.id+"\">" + x.hero_name + "</div>");
            });
        });

    //BUILD ITEM CATEGORIES
    itemcat = ["Defense", "Attack", "Magic", "Movement", "Roaming", "Jungling" ];
    itemcat.forEach(cattabs);
    function cattabs(item, i) {
        equip = item.toLowerCase()
        $("#cat-tabs-list").append("<li><a href=\"#tab-"+equip+"\">"+item+"</a></li>");
        $("#item-tabs").append("<div id=\"tab-"+equip+"\"><div class=\"item-tab\" id=\"item-selectable-"+equip+"\"></div></div>");
    }

    //BUilD ITEM BUTTONS
    $.getJSON('../db/itemdb.json', function(e) {
        $.each(e.data, function(i,x) {
                    $("#item-selectable").append("<div class=\"item\" id=\""+x.id+"\">" + x.item_name + "</div>");
                    equip = x.item_category.toLowerCase()
                    $("#item-selectable-"+equip).append("<div class=\"item\" id=\""+x.id+"\">" + x.item_name + "</div>");
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
      });
    }
  });
});

/* TABBED ITEM */
$(function() {
  $("#item-tabs").tabs();
});

/* SELECTABLE ITEM */
$(function() {
  $(".item-tab").selectable({
    stop: function() {
      var result = $("#select-result").empty();
      $(".ui-selected", this).each(function() {
        var index = $("#selectable div").index(this);
        result.append(this.id);
      });
    }
  });
});

/* SORTABLE BUILD ITEM */
$(function() {
  $("#sortable").sortable();
  $("#sortable").disableSelection();
});




