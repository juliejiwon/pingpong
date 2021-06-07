jQuery(function($){
	//topmenu GNB
	$.fn.topmenu = function(options) {
		var opts = $.extend(options);
		var topmenu = $(this);
		var topmenuList = topmenu.find('>ul>li');
		var submenu = topmenu.find('.submenu');
		var submenuList = submenu.find('>ul>li');

		function showMenu() {
			t = $(this).parent('li');
			if (!t.hasClass('m_active')) {
				topmenuList.removeClass('m_active');
				t.addClass('m_active');
				submenu.hide();
				t.find('.submenu').show().css('top', 50).animate( { top: 70, opacity:1 }, 200 );
			}
		}

		function hideMenu() {
			topmenuList.removeClass('m_active');
			submenu.hide();
			activeMenu();
		}

		function activeMenu() {
			if(opts.d1) {
				t = topmenuList.eq(opts.d1-1); 
				t.addClass('m_active');
				t.find('.submenu').show().css('top', 50).animate( { top: 70, opacity:1 }, 200 );
				if(opts.d2) {
					t.find('.submenu>ul>li').eq(opts.d2-1).addClass('on');
				}
			}
		}
		
		return this.each(function() {
			activeMenu();
			topmenuList.find('>a').mouseover(showMenu).focus(showMenu);
			topmenu.mouseleave(hideMenu);
		});
	}
	
	$('#layerPop01, #layerPop02, #layerPop03, #layerPop04').hide();
	$('.layerPop01').click(function(){
		$('#layerPop01').fadeIn();
	});
	$('.layerPop02').click(function(){
		$('#layerPop02').fadeIn();
	});
	$('.layerPop03').click(function(){
		$('#layerPop03').fadeIn();
	});
	$('.layerPop04').click(function(){
		$('#layerPop04').fadeIn();
	});
	$('.closeBtn .close').click(function(){
		$('#layerPop01, #layerPop02, #layerPop03, #layerPop04').fadeOut();
	});
	
});



//체크박스, 라디오 박스 커스텀
function setuplabel(){
	if ($('.comm_check_label input').length) {
		$('.comm_check_label').each(function(){ 
			$(this).removeClass('check_on');
		});
		$('.comm_check_label input:checked').each(function(){ 
			$(this).parent('label').addClass('check_on');
		});                
	};
	if ($('.comm_radio_label input').length) {
		$('.comm_radio_label').each(function(){ 
			$(this).removeClass('radio_on');
		});
		$('.comm_radio_label input:checked').each(function(){ 
			$(this).parent('label').addClass('radio_on');
		});
	};
};

// menu
function myFunction(x) {
  x.classList.toggle("change");
} 

$(document).ready(function(){
	
	//체크박스, 라디오 박스 커스텀 - 이벤트 실행
	$('.comm_check_label, .comm_radio_label').click(function(){
		setuplabel();
	});
	setuplabel(); 

	// 모바일 스크롤 락 & 언락 설정
	function preventDefault(e){
		e.preventDefault();
	}
	function disableScroll(){
		document.body.addEventListener('touchmove', preventDefault, { passive: false });
	}
	function enableScroll(){
		document.body.removeEventListener('touchmove', preventDefault, { passive: false });
	}

	//앵커태그 부드럽게 이동
	$('.btn_scr_down, .btn_go').on('click', function(event){
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});
	
	//전체메뉴
	$('#header .btn_menu').click(function(){
		if ($('#header .btn_menu').hasClass('change')){
			$('body').addClass('fixed');
			$('html').css({overflow:'hidden'});
			$('#AllMenu').slideDown(300);
			disableScroll();
		} else {
			$('body').removeClass('fixed');
			$('html').css({'overflow':''});
			$('#AllMenu').slideUp(300);
			enableScroll();
		}
	})

	var win = $(window);
	var vh = 0;
    $('.winH').height(win.height());
    $(window).on('load resize',function(){
        $('.winH').height($(this).height());
        vh = $(window).height();
    });

	$.fn.isInViewport = function() {
	  var elementTop = $(this).offset().top;
	  var elementBottom = elementTop + $(this).outerHeight();

	  var viewportTop = $(window).scrollTop();
	  var viewportBottom = viewportTop + $(window).height();

	  return (elementBottom > viewportTop + (vh/5))  && (elementTop < viewportBottom - (vh/5)) ;
	};

	$('#mainvisual').addClass('active');

	$('.aniBox, #PrdSlideArea, #SeriesSlideArea, #section03').each(function(){
		if($(this).isInViewport()){
			$(this).addClass('active');
		}
	});

	$(window).on('load resize scroll',function(){
		$('#mainvisual').addClass('active');

		$('.aniBox, #PrdSlideArea, #SeriesSlideArea, #section03').each(function(){
			if($(this).isInViewport()){
				$(this).addClass('active');
			}
		});
	});

	//page refresh stop animation
	const classes = document.body.classList;
	var timer = 0;
	function reaninone(){
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		else
			classes.add('stop-transitions');
		
		timer = setTimeout(function(){
			classes.remove('stop-transitions');
			timer = null;
		}, 100);
	}


	window.addEventListener('resize', function () {
		reaninone();
	});

	var h=window.location.hash.replace(/^#/,'');
    if(h==='section03'){
		reaninone();
    }

	//LNB
	$('.SNBWrap .menu_on').click(function(){
		$(this).toggleClass('active');
		$(this).next('.menu').slideToggle(300);
	})

	$(window).resize(function(){
		var winW = $(window).outerWidth();

		$('.SNBWrap .menu_on').removeClass('active');

		if (winW < 721){
			$('.SNBWrap .menu').hide();
		} else {
			$('.SNBWrap .menu').show();
		}
	}).resize();


	//비주얼
	$(window).resize(function(){
		var winW = $(window).width();
			winH = $(window).height();
			headerH = $('#header').height();

		$('#mainvisual').height(winH);
	}).resize();
	

	//비주얼 비디오 플레이
	var	videoArea = $('#mainvisual .ImgArea .VideoArea');
		video = $('#mainvisual_video');

	
	video[0].load();

	$(window).resize(function(){
		var winW = $(window).width();

		if (winW < 850){
			videoArea.addClass('fixed');

			if (videoArea.hasClass('playing')){
				video.prop('controls', true);
			}
		} else {
			videoArea.removeClass('fixed');
			video.prop('controls', false);
		}
	}).resize();

	$(".btn_play").on("click", function() {
		if ($(this).hasClass('stop')){
			$(this).removeClass('stop');
			videoArea.removeClass('playing');
			video.prop('controls', false);
			video[0].pause();

		} else {
			$(this).addClass('stop');
			videoArea.addClass('playing');
			video[0].play();

			
			if (videoArea.hasClass('fixed')){
				video.prop('controls', true);
			} else {
				video.prop('controls', false);
			}
		}
	});

	$(".btn_close").on("click", function() {
		$('.btn_play').removeClass('stop');
		videoArea.removeClass('playing');
		video.prop('controls', false);
		video[0].pause();
	});

	video.on("ended", function() {
		$('.btn_play').removeClass('stop');
		video[0].load();
	});


	//section01
	$('.PrdSlide').slick({
		slidesToShow: 1,
		autoplay: false,
		infinite: true
	});
	setTimeout(function() {
	  $('#PrdSlideArea .slick-prev').append('<div class="prev-slick-arrow arrow-icon"><span>PREV</span></div><div class="prev-slick-img slick-thumb-nav"><img src="/prev.jpg" class="img-responsive"></div>');
	  $('#PrdSlideArea .slick-next').append('<div class="next-slick-img slick-thumb-nav"><img src="/next.jpg" class="img-responsive"></div><div class="next-slick-arrow arrow-icon"><span>NEXT</span></div>');
	  get_prev_slick_img();
	  get_next_slick_img();
	}, 500);

	$('.PrdSlide').on('click', '.slick-prev', function() {
	  get_prev_slick_img();
	});
	$('.PrdSlide').on('click', '.slick-next', function() {
	  get_next_slick_img();
	});
	$('.PrdSlide').on('swipe', function(event, slick, direction) {
	  if (direction == 'left') {
		get_prev_slick_img();
	  }
	  else {
		get_next_slick_img();
	  }
	});
	$('#PrdSlideArea .slick-dots').on('click', 'li button', function() {
	  var li_no = $(this).parent('li').index();
	  if ($(this).parent('li').index() > li_no) {
		get_prev_slick_img()
	  }
	  else {
		get_next_slick_img()
	  }
	});
	function get_prev_slick_img() {
	  // For prev img
	  var prev_slick_img = $('.PrdSlide .slick-current').prev('.slick-slide').find('img').attr('src');
	  $('#PrdSlideArea .prev-slick-img img').attr('src', prev_slick_img);
	  // For next img
	  var prev_next_slick_img = $('.PrdSlide .slick-current').next('.slick-slide').find('img').attr('src');
	  $('#PrdSlideArea .next-slick-img img').attr('src', prev_next_slick_img);
	}
	function get_next_slick_img() {
	  // For next img
	  var next_slick_img = $('.PrdSlide .slick-current').next('.slick-slide').find('img').attr('src');
	  $('#PrdSlideArea .next-slick-img img').attr('src', next_slick_img);
	  // For prev img
	  var next_prev_slick_img = $('.PrdSlide .slick-current').prev('.slick-slide').find('img').attr('src');
	  $('#PrdSlideArea .prev-slick-img img').attr('src', next_prev_slick_img);
	}


	//section02
	$('.SeriesSlide').slick({
		fade: true,
		slidesToShow: 1,
		autoplay: false,
		infinite: false,
		arrows: false,
		asNavFor: '.SeriesPaging',
		responsive: [
			{
			  breakpoint: 721,
			  settings: {
				dots: true,
			  }
			}
		]
	});
	$('.SeriesPaging').slick({
		infinite: false,
		vertical: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.SeriesSlide',
		focusOnSelect: true,
		responsive: [
			{
			  breakpoint: 1451,
			  settings: {
				vertical: false,
				arrows: false,
				swipeToSlide: true
			  }
			},
			{
			  breakpoint: 1025,
			  settings: {
				vertical: false,
				arrows: false,
				swipeToSlide: true,
				slidesToShow: 3.2,
			  }
			}
		]
	});

});