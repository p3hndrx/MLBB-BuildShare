/* COLLAPSIBLE HEROES */
$(function() {
  $("#hero-menu").tabs({
    collapsible: true
    /*active: false*/
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
        var index = $("#hero-selectable div").index(this);
        result.append(this.id);
      });
    }
  });
});

/* TABBED ITEM */
$(function() {
  $("#tabs").tabs();
});

/* SELECTABLE ITEM */
$(function() {
  $(".menu").selectable({
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
