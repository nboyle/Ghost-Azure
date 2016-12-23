(function($) {

/*------------------------------------------------------
/* Check user agent
/* ---------------------------------------------------*/
var mobileAgents = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (mobileAgents.Android() || mobileAgents.BlackBerry() || mobileAgents.iOS() || mobileAgents.Opera() || mobileAgents.Windows());
	}
};


/*------------------------------------------------------
/* Add Placeholder to MailChimp
/* ---------------------------------------------------*/
	$(".mc-field-group input").attr("placeholder", "Enter your email");


/*------------------------------------------------------
/* Sidebar Fixed Scroll
/* ---------------------------------------------------*/
	jQuery(window).load(function() {
		if(!mobileAgents.any()) {
			$("#stick, .breadcrumbs").stick_in_parent();
			$(".sharing-button-outer").stick_in_parent({
				offset_top: 70,
			});
		}
	});


/*------------------------------------------------------
/* Search function / ghostHunter.js
/* ---------------------------------------------------*/
	$("#search-field").ghostHunter({
		results: "#ghost-search-results",
		onKeyUp: true,
		info_template: "<p>Articles: {{amount}}</p>",
		result_template: "<a href='{{link}}'><div class='title'>{{title}}</div><small class='label'>{{pubDate}}</small></a>",
		onComplete: function( results ){
			$("#display-search").show();
			$("html, body").animate({ scrollTop: 0 }, "fast");
		},
	});

		// Close result
		$("#display-search span, body").click(function(){
			$("#display-search").hide();
		});
		$(window).scroll(function() {
			$("#display-search").hide();
		});


		// Repositioning #DisplaySearch
		var BoxeeBox = $('.header-outer')
		$('#display-search').css({ top: BoxeeBox.outerHeight() });


/*------------------------------------------------------
/* Infinite scroll
/* ---------------------------------------------------*/
	$('.main-inner .main').infinitescroll({
		navSelector : ".infinitescroll-pagination", // selector for the paged navigation (it will be hidden)
		nextSelector : ".infinitescroll-pagination .next-posts", // selector for the NEXT link (to page 2)
		itemSelector : ".main .post", // selector for all items you'll retrieve
		animate: true,
		loading: {
			finishedMsg: "<em>You've reached the end of the site.</em>",
			img: 'https://2.bp.blogspot.com/-JkxqE7CINtQ/V-0K35ShTHI/AAAAAAAAJLc/MBNj2t7G_TY0d9VuZnfLbf0Bhi_snpmbACLcB/s1600/icon-loading.gif',
			msg: null,
			msgText: "Loading ...",
		},
	});

    // kill scroll binding
    $(window).unbind('.infscr');

    // Trigger on button click
	$(".infinitescroll-pagination .next-posts").click(function(){
		$('.main-inner .main').infinitescroll('retrieve');
			return false;
	});

    // remove the paginator when we're done.
	$(document).ajaxError(function(e,xhr,opt){
		if (xhr.status == 404) $('.infinitescroll-pagination .next-posts').remove();
	});


/*------------------------------------------------------
/* Tweet it Like a Pro
/* ---------------------------------------------------*/
	$(".post .post-body blockquote").each(function(){
		var completeurl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
			completeurl = encodeURIComponent(completeurl);

		var entityMap = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': '&quot;',
			"'": '&#39;',
			";": '&#58;',
		};
		var tweetshare = "https://twitter.com/share?url=" + completeurl;
		var getquote = $(this).find("p").text().replace(/[&<>"';\/]/g, function (s) { return entityMap[s]; });

		$(this).append("<div class='tweetthis'><a target='_blank' title='Tweet this' href='" + tweetshare + "&amp;text=" + getquote + " - via '>Tweet</a></div>")
	});


}(jQuery));