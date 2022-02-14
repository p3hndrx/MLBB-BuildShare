
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

/* LOADABLE ITEM */
$(function() {

var selected_items = [];
var item_slot = {0:[],1:[],2:[],3:[],4:[],5:[]};
const ItemLoader = {
  loaded_items: [],
  def_slot:null,
  load: function(i){

     eval("slot_data_"+i+"= loaded_items");
     //alert()
  },
  unload: function(){

  },
  getOpenSlot:function(){

  },
  clearSlot:function(id){
     console.log("Clear Slot"+id);
     item_slot[id] = [];

     this.def_slot = document.getElementById("item-slot-"+id);
     this.def_slot.innerHTML = '';
     console.log(this.def_slot.parentNode.children[id]);


  },
  clickHandler:function(e){
       console.log("Click Handler");
       e.preventDefault();
       var id = e.currentTarget.id.substr(-1);
       var main_slot = document.getElementById("item-slot-"+id);
       main_slot.innerHTML = "";
       var slot_div = document.createElement('div');
       var slot_close = document.createElement('a');
       slot_close.setAttribute('href', 'javascript:;');
       slot_close.addEventListener("click", ItemLoader.clearSlot(id));
       slot_close.style.fontSize = '20px';
       var closeNode = document.createTextNode('X');
       slot_close.appendChild(closeNode);
       //item_slot[id].splice(0, item_slot[id].length);
      // item_slot[id].push(selected_items);
       //var out = '<div>';
       //out += '<a href="javascript:void(0);" style="font-size:10px;" onclick="this.clearSlot('+id+');">X</a>';
        //console.log(selected_items.length);
       slot_div.appendChild(slot_close);
       for(let x=0;x<=item_slot[id].length-1;x++){
          var small_node = document.createElement('small');
          small_node.style.fontSize = '20px';
          var txNode = document.createTextNode(item_slot[id][x]);
          small_node.appendChild(txNode);
          slot_div.appendChild(document.createElement('br'));
          slot_div.appendChild(small_node);
         //out += "<small style='font-size:10px;'>"+selected_items[x]+"</small> <br/>";
       }
       for(let x=0;x<=selected_items.length-1;x++){
          item_slot[id].push(selected_items[x]);

          var small_node = document.createElement('small');
          small_node.style.fontSize = '20px';
          var txNode = document.createTextNode(selected_items[x]);
          small_node.appendChild(txNode);
          slot_div.appendChild(document.createElement('br'));
          slot_div.appendChild(small_node);
         //out += "<small style='font-size:10px;'>"+selected_items[x]+"</small> <br/>";
       }
       //out += "</div>"
       main_slot.appendChild(slot_div);
       selected_items = [];
       console.log(item_slot[id].length);
      //$(".item-tab").selectable( "refresh" );
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
    autoRefresh:true
});
for(let i=0;i<=5;i++){
   var streval = "var slot_data_"+i+" = [];";
   eval(streval);
   $("#item-slot-"+i).click(function(e){             //  alert();
            e.preventDefault();
            ItemLoader.clickHandler(e)

   });
   //$("#item-slot-"+i).click( function(i){ ItemLoader.clickHandler(i); });

}

});


/* SORTABLE BUILD ITEM  */
$(function() {
  //$("#sortable").sortable();
  //$("#sortable").disableSelection();
});




