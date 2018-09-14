var gs = gs || {};
gs.searchOpen = false;

function onReady()
{
  gs.centerStartPosition();
  gs.passwordCheck();
  gs.searchTrigger();
  // pss.init();
  gs.adSizeCheck();
  gs.marquee();
  gs.ajaxcomment();
}

function onResize()
{
  gs.adSizeCheck();
  gs.centerOnResize();
}

$(document).ready(onReady);
$(window).resize(onResize);
