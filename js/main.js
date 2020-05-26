(function ($) {
	$('#detail-modal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var title = button.data('title');
		var role = button.data('role');
		var desc = button.data('desc');
		var cat = button.data('cat');
		var feature = button.data('feature');
		var screenshot = button.data('screenshot');
		var demo = button.data('demo');
		var date = button.data('date');
		var modal = $(this);

		var arrFeature = feature.split(';');
		var listFeature = "";
		arrFeature.forEach((feature) => {
			listFeature += `<li>${feature}</li>`;
		});
		listFeature = `<ul>${listFeature}</ul>`;

		var arrScreenshot = screenshot.split(';');
		var listScreenshot = "";
		arrScreenshot.forEach((screenshot) => {
			listScreenshot += `<a href="img/portfolio/${screenshot}.jpg" target="_blank"><img src="img/portfolio/${screenshot}.jpg" /></a>`
		})
		listScreenshot = `<div class="portofolio-imgs">${listScreenshot}</div>`;

		var linkDemo = demo == "none" ? "none" : `<a href="${demo}">${demo}</a>`

		modal.find('.p-title').text(title);
		modal.find('.p-role').text(role);
		modal.find('.p-desc').text(desc);
		modal.find('.p-cat').text(cat);
		modal.find('.p-feature').html(listFeature);
		modal.find('.p-screenshot').html(listScreenshot);
		modal.find('.p-date').text(date);
		modal.find('.p-demo').html(linkDemo);
	})

	const URL_API = "http://mqad21.local/mqad21.github.io/api/portfolio.php"

	$.ajax({
		url: URL_API,
		dataType: 'json',
		success: (result) => {
			var portfolio = result.records;
			console.log(portfolio);
			portfolio.forEach((p) => {
				$("#work-box-cont").html(`
				<div class="col-md-4">
					<div class="work-box" data-toggle="modal"
					data-title="${p.title}"
					data-date="${p.date}"
					data-cat="${p.category}"
					data-desc="${p.description}"
					data-feature="${p.feature}"
					data-role="${p.role}"
					data-screenshot="${p.screenshot}"
					data-demo="${p.demo}"
					data-target="#detail-modal">
					<div class="work-img">
						<img src="img/${p.img_slug}.jpeg" alt="" class="img-fluid">
					</div>
					<div class="work-content">
						<div class="row">
						<div class="col-sm-8">
							<h2 class="w-title">${p.title}</h2>
							<div class="w-more">
							<span class="w-ctegory">${p.category}</span> / <span class="w-date">${p.date}</span>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="w-like">
							<span class="ion-ios-plus-outline"></span>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>	
			`)
			});
		}
	});

	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();

	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	})

	// Preloader
	$(window).on('load', function () {
		if ($('#preloader').length) {
			$('#preloader').delay(100).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	});

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
		return false;
	});

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
		var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);
