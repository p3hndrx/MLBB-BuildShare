 $(function() {
   $("#hero-menu").tabs({
     collapsible: true,
     active: false
   });
 });

 $(function() {
   $("#hero-tabs").tabs();
 });

 $(function() {
   $(".hero-tab").selectable({
     stop: function() {
       var result = $("#select-result").empty();
       $(".ui-selected", this).each(function() {
         var index = $("#selectable div").index(this);
         result.append((index + 1));
       });
     }
   });
 });


 $(function() {
   $("#tabs").tabs();
 });

 $(function() {
   $(".menu").selectable({
     stop: function() {
       var result = $("#select-result").empty();
       $(".ui-selected", this).each(function() {
         var index = $("#selectable div").index(this);
         result.append((index + 1));
       });
     }
   });
 });

 $(function() {
   $("#sortable").sortable();
   $("#sortable").disableSelection();
 });
