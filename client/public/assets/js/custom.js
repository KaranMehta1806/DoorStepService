(function($) {

	'use strict';

	// Mean Menu
	$('.mean-menu').meanmenu({
		meanScreenWidth: "992"
	}); 

	// Others Option For Responsive JS
	$(".others-option-for-responsive .dot-menu").on("click", function(){
		$(".others-option-for-responsive .container .container").toggleClass("active");
	});

	// scrollCue Animate
	scrollCue.init();

	// Sticky, Go To Top JS
	$(window).on('scroll', function() { 
		// Header Sticky JS 
		if ($(this).scrollTop() >150){   
			$('.navbar-area').addClass("is-sticky");
		}
		else{
			$('.navbar-area').removeClass("is-sticky"); 
		};
	});

	// aos 
	AOS.init({
		disable: function() {
			var maxWidth = 992;
			return window.innerWidth < maxWidth;
		}
	});

	// Search Menu JS
	$(".others-option-vg .search-icon i").on("click", function(){
		$(".search-overlay").toggleClass("search-overlay-active");
	});
	$(".search-overlay-close").on("click", function(){
		$(".search-overlay").removeClass("search-overlay-active");
	});


	// Testimonials Slider
	$('.testimonials-slider').owlCarousel({
		loop: true,
		margin: 25,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			'<i class="flaticon-back"></i>', 
			'<i class="flaticon-next"></i>',    
		],
		responsivee:{
			0:{
				items:1
			},
			570:{
				items:1
			},
			768:{
				items:2
			},
			992:{
				items:2
			},
			1200:{
				items:2
			}
		}
	});

	// Testimonials Two Slider
	$('.testimonial-two-slider').owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		dots: true,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			'<i class="flaticon-back"></i>', 
			'<i class="flaticon-next"></i>',    
		],
		responsivee:{
			0:{
				items:1
			},
			570:{
				items:1
			},
			768:{
				items:1
			},
			992:{
				items:1
			},
			1200:{
				items:1
			}
		}
	});

	// Testimonials Three Slider
	$('.testimonial-three-slider').owlCarousel({
		loop: true,
		margin: 0,
		nav: false,
		dots: true,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			'<i class="flaticon-back"></i>', 
			'<i class="flaticon-next"></i>',    
		],
		responsivee:{
			0:{
				items:1
			},
			570:{
				items:1
			},
			768:{
				items:1
			},
			992:{
				items:1
			},
			1200:{
				items:1
			}
		}
	});

	// Team Two Slider
	$('.our-team-two-slider').owlCarousel({
		loop: true,
		margin: 20,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			'<i class="flaticon-back"></i>', 
			'<i class="flaticon-next"></i>',    
		],
		responsivee:{
			0:{
				items:1
			},
			570:{
				items:1
			},
			768:{
				items:2
			},
			992:{
				items:3
			},
			1200:{
				items:4
			}
		}
	});

	// Services Two Slider
	$('.services-two-slider').owlCarousel({
		loop: true,
		margin: 20,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			'<i class="flaticon-back"></i>', 
			'<i class="flaticon-next"></i>',    
		],
		responsivee:{
			0:{
				items:1
			},
			570:{
				items:1
			},
			768:{
				items:2
			},
			992:{
				items:3
			},
			1200:{
				items:3
			}
		}
	});

	// Banner Three Slider
	$('.banner-three-slider').owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		dots: false,
		animateOut: 'fadeOut',
        animateIn: 'fadeIn',
		smartSpeed: 2000,
		autoplay: true,
        autoplayTimeout: 5000,
		navText: [
			'<i class="flaticon-back"></i>', 
			'<i class="flaticon-next"></i>',    
		],
		responsivee:{
			0:{
				items:1
			},
			570:{
				items:1
			},
			768:{
				items:1
			},
			992:{
				items:1
			},
			1200:{
				items:1
			}
		}
	});

	// Portfolio Two Slider
	$('.portfolio-two-slider').owlCarousel({
		loop: true,
		margin: 20,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			'<i class="flaticon-back"></i>', 
			'<i class="flaticon-next"></i>',    
		],
		responsivee:{
			0:{
				items:1
			},
			570:{
				items:1
			},
			768:{
				items:1
			},
			992:{
				items:1
			},
			1200:{
				items:1
			}
		}
	});

	// Partner Logo Slider
	$('.partner-logo-slider').owlCarousel({
		loop: true,
		margin: 20,
		nav: false,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		responsivee:{
			0:{
				items:2
			},
			570:{
				items:3
			},
			768:{
				items:4
			},
			992:{
				items:5
			},
			1200:{
				items:5
			}
		}
	});

	// Partner Logo Three Slider
	$('.partner-logo-three-slider').owlCarousel({
		loop: true,
		margin: 20,
		nav: false,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		responsivee:{
			0:{
				items:2
			},
			570:{
				items:3
			},
			768:{
				items:4
			},
			992:{
				items:5
			},
			1200:{
				items:5
			}
		}
	});

	// Partner Two Logo Slider
	$('.partner-logo-two-slider').owlCarousel({
		loop: true,
		margin: 20,
		nav: false,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		responsivee:{
			0:{
				items:2
			},
			570:{
				items:3
			},
			768:{
				items:3
			},
			992:{
				items:3
			},
			1200:{
				items:3
			}
		}
	});

	// Date Picker JS
	$('#datetimepicker').datepicker({
		weekStart: 0,
		todayBtn: "linked",
		language: "es",
		orientation: "bottom auto",
		keyboardNavigation: false,
		autoclose: true
	});

	// Preloader Area
	$(window).on('load', function() {
		$('.preloader').addClass('preloader-deactivate');
	});
	
	// Popup Video
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({ 
		disableOn: 100,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	}); 

	// Odometer JS 
	$('.odometer').appear(function(e) {
		var odo = $(".odometer");
		odo.each(function() {
			var countNumber = $(this).attr("data-count");
			$(this).html(countNumber);
		});
	});   

	// Input Plus & Minus Number JS
	$('.input-counter').each(function() {
		var spinner = jQuery(this),
		input = spinner.find('input[type="text"]'),
		btnUp = spinner.find('.plus-btn'),
		btnDown = spinner.find('.minus-btn'),
		min = input.attr('min'),
		max = input.attr('max');
		
		btnUp.on('click', function() {
			var oldValue = parseFloat(input.val());
			if (oldValue >= max) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue + 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
		btnDown.on('click', function() {
			var oldValue = parseFloat(input.val());
			if (oldValue <= min) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue - 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
	}); 

	// Count Time JS
	function makeTimer() {
		var endTime = new Date("november  30, 2025 17:00:00 PDT");			
		var endTime = (Date.parse(endTime)) / 1000;
		var now = new Date();
		var now = (Date.parse(now) / 1000);
		var timeLeft = endTime - now;
		var days = Math.floor(timeLeft / 86400); 
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }
		$("#days").html(days + "<span>Days</span>");
		$("#hours").html(hours + "<span>Hours</span>");
		$("#minutes").html(minutes + "<span>Minutes</span>");
		$("#seconds").html(seconds + "<span>Seconds</span>");
	} 
	setInterval(function() { makeTimer(); }, 300); 


	// Go to Top
	$(function(){
		// Scroll Event
		$(window).on('scroll', function(){
			var scrolled = $(window).scrollTop();
			if (scrolled > 600) $('.go-top').addClass('active');
			if (scrolled < 600) $('.go-top').removeClass('active');
		});  
		// Click Event
		$('.go-top').on('click', function() {
			$("html, body").animate({ scrollTop: "0" },  500);
		}); 
	});


	
})(jQuery);


// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('bixu_theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('bixu_theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('bixu_theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
        document.getElementById('slider').checked = true;
    }
})();