
$(".featuredIcon").click(function(e){
  $(".featuredIcon").removeClass("bot-left");
  $(this).addClass("bot-left");

  $("#featuredMedia").empty();
  src = $(this).data("src");
  $("#featuredMedia").attr("src", src);
})
