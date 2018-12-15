$(document).ready(function() {
	$(".indi-sidemenu li").click(function() {
		var self = this;
		var lastTarget = $(".indi-sidemenu li.target");
		if (this == lastTarget.get(0)) {
			return;
		}
		lastTarget.removeClass("target");
		$(this).addClass("target");

		var url = $(this).attr("url");
		window.location.href = url;
	});	
});
