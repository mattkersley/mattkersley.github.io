/*
	jquery.grumble.js
	Author: 	Matt Kersley
	
	---------------------------------------------------------------------------------------
	
	DESCRIPTION:
		This plugin imitates growl for the mac (http://growl.info/screenshots.php)
	
	---------------------------------------------------------------------------------------
	
	USAGE:
		$.grumble({
				title			: 	'the tile of your grumble',
				message			: 	'main message for your grumble', 
				template		: 	'HTML template for each grumble (add %title% and %message% to output the title and message)',
				dockCSS			: 	'grumbles container css (for positioning)',
				fade			: 	fade on or off [true/false],
				fadeSpeed		: 	milliseconds for length of fade effect (applies to all grumbles after being changed),
				displayOffset	: 	milliseconds added or removed from display length of message,
				finalOpacity	: 	decimal for the opacity of the message when fully displayed
		});

	---------------------------------------------------------------------------------------
	
	NOTES:
		each grumble should last as long as it takes to read (average read time)
		each grumble should be offset by the previous grumble's position
		grumbles should be templated (for styling purposes)

	---------------------------------------------------------------------------------------
	
*/

//keep the $ character for jQuery use
(function($) {

	var grumbleCount = 0;

	//Grumble namespace
	$.grumble = {
		
		//function that creates a new grumble
		create : function(options){
		
			//default settings, overwritten by options if provided
			$.grumble.settings = $.extend({
				title			: 	'Grumble title',
				message			: 	'Grumble message', 
				template		: 	'<h1>%title%</h1><p>%message%</p>',
				dockCSS			: 	'position:absolute;right:10px;top:10px;width:200px;z-index:9999;',
				fadeSpeed		: 	1,
				displayOffset	: 	2,
				finalOpacity	: 	1
			}, options);
			
			//add title and message to grumble template
			$.grumble.settings.template = $.grumble.settings.template.replace(/%title%/, $.grumble.settings.title );
			$.grumble.settings.template = $.grumble.settings.template.replace(/%message%/, $.grumble.settings.message );
			
			//get message length (in words - average of 6.1 chars per word)
			var words = ($.grumble.settings.title.length + $.grumble.settings.message.length) / 6.1;
			
			//words per second based on average of 275 words a minute (average reading speed)
			var wordsPerSecond = 60/275;
			
			//get display time
			displayTime =  ((words * wordsPerSecond) * 1000) + ($.grumble.settings.displayOffset * 1000);
			
			//create grumble dock
			var dock = document.getElementById('grumbleDock');
			if(!dock){
				$('body').append('<div id="grumbleDock" style="'+$.grumble.settings.dockCSS+'"></div>');
			}
			
			//add grumble to dock
			$.grumble.add(displayTime);			
		},	
		
		
		//appends grumble to the dock
		add : function(displayTime){
			
			//increment the count by one
			grumbleCount++;
			
			//append grumble to dock
			$('#grumbleDock').append(
				'<div id="grumble'+grumbleCount+'" class="grumble">'+
					$.grumble.settings.template+
					
					//define hidden fields for each grumble's settings to be remembered when created
					'<input id="grumble'+grumbleCount+'-speed" type="hidden" value="'+$.grumble.settings.fadeSpeed+'" />'+
					'<input id="grumble'+grumbleCount+'-offset" type="hidden" value="'+$.grumble.settings.displayOffset+'" />'+
					'<input id="grumble'+grumbleCount+'-opacity" type="hidden" value="'+$.grumble.settings.finalOpacity+'" />'+
				'</div>'
			);
			
			$('#grumble'+grumbleCount)
				.click(function(){$.grumble.remove($(this).attr('id'));})
				.fadeTo(0,0)
				.fadeTo(($.grumble.settings.fadeSpeed * 1000), $.grumble.settings.finalOpacity, function(){
					setTimeout('$.grumble.remove(\''+$(this).attr('id')+'\')', displayTime);
			});
		},
		
		remove : function(id){
			
			//get grumble settings from hidden fields
			$.grumble.settings.fadeSpeed = $('#'+id+'-speed').val();
			$.grumble.settings.displayOffset = $('#'+id+'-offset').val();
			$.grumble.settings.finalOpacity = $('#'+id+'-opacity').val();
			
			$('#' + id)
				.animate({opacity:'0'}, ($.grumble.settings.fadeSpeed * 1000), function(){
				$(this).animate({height:'0px'}, function(){
					$(this).remove();
				});
			});
		}
	};
	
})(jQuery);
