(function ($) {

	$.fn.ribbonSlider = function (options) {

		/*	DEFAULT PLUGIN SETTINGS
		****************************************************************************/
		var settings = {
			auto: true,				//automatically move on
			delay: 3000,			//delay between animations
			heightRatio:0.5625,		//ratio used to set height of slides
			opacity: 0.5,			//opacity of outer slides
			scalePercentage: 0.85,	//size of outer slides in relation to main slide
			speed: 2000				//speed of slide
		},
		isHovered = false,
		timer = null;
		


		/*	CHECK IF PASSED OBJECT IS AN <ol> OR <ul> ELEMENT
		**	plugin only works with these elements
		****************************************************************************/
		function isList($this) {
			return $this.is('ul, ol');
		}



		/*	BUILD HTML ELEMENTS
		**	generates the secondary slides and wrapping divs for the slider to work
		****************************************************************************/
		function buildSliderElements($this) {

			//check is elements already exist
			if (!$('#rrs-c').length) {

				//container divs
				var strContainer = '<div id="rrs-s"><div id="rrs-c">',
					strPrev = '<div id="rrs-p">',
					strNext = '<div id="rrs-n">';

				//wrap slider with containers
				$this.wrap(strContainer);

				//add next/prev slides
				$('#rrs-s')
					.prepend(strPrev)
					.append(strNext)
					.hover(
						function(){isHovered = true;clearTimeout(timer)},
						function(){isHovered = false;}
					);

				//clone slides for prev/next slides
				$this.clone().removeAttr('id').appendTo('#rrs-p, #rrs-n');
				$('#rrs-p a, #rrs-n a').removeAttr('href');

			}//end check for existing elements

		}//end buildSliderElements()



		/*	QUEUE ANIMATIONS
		**	For automatic animation on load and when not hovered
		****************************************************************************/
		function queueAnim($this) {
			
			//if animation is set as auto, and the slider isn't being hovered
			if(settings.auto && !isHovered){
			
				//go to next slide and queue the next slide using the delay setting
				nextSlide($this);
				timer = setTimeout(function($this){nextSlide($this);}, settings.delay);
				setTimeout(function($this){queueAnim($this);}, settings.delay);		
			}
			
			//otherwise check again in a while for animation to be activiated
			else {
				setTimeout(function($this){queueAnim($this);}, settings.delay);
			}
		}



		/*	NEXT SLIDE
		**	function to perform the left slide animation and item re-ordering
		****************************************************************************/
		function nextSlide($this) {

			if (!$('#rrs-s ul:animated').length) {

				//cache image for sizing and slide elements
				var $prev = $('#rrs-p ul'),
					$curr = $('#rrs-c ul'),
					$next = $('#rrs-n ul');

				//prev slide
				$prev.animate({
					marginLeft: -(($prev.find('li:first').width() * 2) - $prev.parent().width())
				}, settings.speed, function () {
					$prev.find('li:first').appendTo($prev);
					$prev.css('margin-left', -($prev.find('li:first').width() - $prev.parent().width()));
				});

				//current slide
				$curr.animate({
					marginLeft: -(($curr.find('li:first').width() * 2) - $curr.parent().width())
				}, settings.speed, function () {
					$curr.find('li:first').appendTo($curr);
					$curr.css('margin-left', 0);
				});

				//next slide
				$next.animate({
					marginLeft: -($next.find('li:first').width())
				}, settings.speed, function () {
					$next.find('li:first').appendTo($next);
					$next.css('margin-left', 0);
				});
			}
		}



		/*	SLIDE RIGHT
		**	function to perform the right slide animation and item re-ordering
		****************************************************************************/
		function prevSlide($this) {

			if (!$('#rrs-s ul:animated').length) {

				//cache image for sizing and slide elements
				var $prev = $('#rrs-p ul'),
					$curr = $('#rrs-c ul'),
					$next = $('#rrs-n ul');

				//prev slide
				$prev.find('li:last').prependTo($prev);
				$prev.css('margin-left', $prev.css('margin-left').replace('px', '') - $prev.find('li:first').width());
				$prev.animate({
					marginLeft: -($prev.find('li:first').width() - $prev.parent().width())
				}, settings.speed);

				//current slide
				$curr.find('li:last').prependTo($curr);
				$curr.css('margin-left', $curr.css('margin-left').replace('px', '') - $curr.find('li:first').width());
				$curr.animate({
					marginLeft: 0
				}, settings.speed);

				//next slide
				$next.find('li:last').prependTo($next);
				$next.css('margin-left', $next.css('margin-left').replace('px', '') - $next.find('li:first').width());
				$next.animate({
					marginLeft: 0
				}, settings.speed);
			}
		}



		/*	BUILD DEFAULT STYLES
		**	insert css styling vital to plugin functionality (dynamic stuff)
		****************************************************************************/
		function buildStyles($this) {

			//cache image for sizing etc
			var $img = $this.parent().parent(),
				$width = $img.width(),
				$height = $width * settings.heightRatio;

			
			$('#rrs-s')
				.css('position', 'relative')
				.find('*')
				.removeAttr('style');

			//set middle slide dimensions
			$('#rrs-c')
				.css({
					width: $width,
					height: $height,
					overflow: 'hidden',
					position: 'relative'
				})
				.find('ul').css({
					width: $width * $('#rrs-c li').length
				})
				.find('li').css({
					"float": 'left',
					"height": '100%'
				})
				.find('img').css('width', $('#rrs-c').width());
				
			if($width < $(window).width()){

				//set "previous" slider position
				$('#rrs-p')
					.click(function () {prevSlide($this); })
					.hover(
						function () {$(this).stop().animate({opacity: 1}, 'slow'); },
						function () {$(this).stop().animate({opacity: settings.opacity}, 'slow'); }
					)
					.css({
						width: ($(window).width() - $width) / 2,
						height: $height * settings.scalePercentage,
						overflow: 'hidden',
						position: 'absolute',
						left: -(($(window).width() - $width) / 2),
						top: ($height - ($height * settings.scalePercentage))/2,
						opacity: settings.opacity,
						cursor: 'pointer',
						display: 'block'
					})
					.find('ul').css({
						width: ($width * settings.scalePercentage) * $this.find('li').length,
						marginLeft: -(($width * settings.scalePercentage) - (($(window).width() - $width)/2))
					})
					.find('li').css({
						"float": 'left',
						"width": ($width * settings.scalePercentage)
					})
					.find('img').css('width', ($width * settings.scalePercentage));
	
				//set "next" slider position
				$('#rrs-n')
					.click(function(){nextSlide($this);})
					.hover(
						function(){$(this).stop().animate({opacity:1},'slow');},
						function(){$(this).stop().animate({opacity:settings.opacity},'slow');}
					)
					.css({
						width: ($(window).width() - $width) / 2,
						height: $width * settings.scalePercentage,
						overflow: 'hidden',
						position: 'absolute',
						right: -(($(window).width() - $width) / 2),
						top: ($height - ($height * settings.scalePercentage))/2,
						opacity: settings.opacity,
						cursor: 'pointer',
						display: 'block'
					})
					.find('ul').css({
						width: ($width * settings.scalePercentage) * $this.find('li').length
					})
					.find('li').css({
						"float": 'left',
						"width": ($img.width() * settings.scalePercentage)
					})
					.find('img').css('width', ($width * settings.scalePercentage));	
			
			} else {
				$('#rrs-p, #rrs-n').css('display','none');
			}
		}//end buildStyles()



		/*	RUN PLUGIN FUNCTIONS ON LOAD AND BROWSER RESIZE
		**	set of functions to run on load and when browsing environment changes
		****************************************************************************/
		function run($this) {

			//build slider elements
			buildSliderElements($this);
			
			//create required slider styling
			buildStyles($this);

			//set initial slides up
			$('#rrs-c li:first').appendTo('#rrs-c ul');
			$('#rrs-n li:first').appendTo('#rrs-n ul');
			$('#rrs-n li:first').appendTo('#rrs-n ul');
			
			//start auto animation if it's set
			setTimeout(function($this){queueAnim($this);}, settings.delay);				

		}//end run()



		/*	RUN WHEN PLUGIN IS CALLED
		**	loop through matched elements and maintain chain-ability in jQuery
		****************************************************************************/
		return this.each(function() {

			//cache "this"
			var $this = $(this);

			//if selector is a list element, continue, otherwise, alert user
			if (isList($this)){

				//override the default settings if user provides some
				if (options){$.extend(settings, options);}

				//run plugin
				run($this);

				//bind event to browser resize
				$(window).resize(function(){
					buildStyles($this);
				});

			} else {
				alert('Responsive Ribbon Slider only works with UL or OL elements');
			}

		});//end return

	};//end ribbonSlider()

}(jQuery));