$( document ).ready(function() {
	console.log('ready');
   var browserheight = $( window ).height();
	$('.nav-sidebar').css({'height' : browserheight })
	$('#canvas').css({'height' : browserheight })
	$('#canvas .bar').css({'height' : browserheight })
	
});