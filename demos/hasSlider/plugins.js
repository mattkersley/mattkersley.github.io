(function($){
    //default settings
    var defaults = {
        paginationVisible       : true,
        auto                    : true,
        delay                   : 5000,
        transitionSpeed         : 'slow'
    };
    
    var timer = null;
    
    

    //function to change "pages"
    function goToPage(banner){
    
        if(!banner.animated){
    
            banner.items.css('z-index', '5');

            //loop through banner items
            banner.items.each(function(i){
    
                //cache current item
                var $this = $(this);
    
                //if item is the one to show
                if (i === banner.pageNum) {
        
                    //set z-index to 6 & fade in
                    banner.animated = true;
                    $this.css('z-index','6').stop().fadeTo(banner.settings.transitionSpeed, 1, function(){
                        banner.items.not($this).hide();
                        banner.animated = false;
                    });
        
                }
                
            });
	    
	        //loop through banner page links
	        banner.nav.children().each(function(i){
	        
	            //cache current link
	            var $this = $(this);
	
	            //set all links to transparent
	            $this.removeClass('active');
	        
	            //hilight current item's link
	            if($this.data('index') === banner.pageNum){
	                $this.addClass('active');
	            }
	        });
        
        }

        nextPage(banner);
    
    }    
    //function to initiate next page in banner
    function nextPage(banner){
        
        //if banner is automatic
        if(banner.settings.auto) {
            
            //and if the banner isn't paused
            if(!banner.paused) {
                
                //if the banner is not on the last item, set to next item
                if((banner.pageNum + 1) < banner.items.length){
                    banner.pageNum++;
                } 
                
                //otherwise, set next "page" to the first one
                else {
                    banner.pageNum = 0;
                }
                
                //go to next "page" after the delay defined in the settings
                timer = window.setTimeout(function(){goToPage(banner);}, banner.settings.delay);
                
            }
        }
        
    }

    //killer banner plugin
    $.fn.killerBanner = function(options){
    
        //cache jquery objects
        var banner = {
            container   : $(this),                              //container div
            items       : $(this).find('li'),                   //slides (list items)
            settings    : $.extend({}, defaults, options),      //merge default options with user defined options
            nav         : {},                                   //used to store the banner navigation container element
            paused      : false,                                //used to stop animation when banner is being hovered
            animated    : false,                                //stores animation state for preventing flicker
            pageNum     : 0                                     //used to store the current displayed item index
        };
        
        //prevent animation when user hovers the banner
        banner.container.bind({
            mouseenter   : function(){
                banner.paused = true;
                banner.pageNum--;
                window.clearTimeout(timer);
            },
            mouseleave    : function(){
                if(banner.settings.auto){
                    banner.paused = false;
                    nextPage(banner);
                }
            }
        });
            
        //if paging is on
        if(banner.settings.paginationVisible){
        
        
            //add pages container, then cache it
            $('<div id="bannerNav">').prependTo('#banner-nav-container');
            banner.nav = $('#bannerNav');
        
            //loop through items
            banner.items.each(function(i){
            
                //add link to banner which
                $('<a>'+(i+1)+'</a>')
                    .data('index',i)
                    .appendTo(banner.nav);
                    
            });
                
            //click event adds active class and changes page
            banner.nav.children().each(function(i){
                $(this).click(function(){
                    if(!banner.animated){
                        banner.pageNum = $(this).data('index');
                        goToPage(banner);
						banner.nav.children().removeClass('active');
						$(this).addClass('active');
                    }
                }).hover(
                	function(){banner.paused = true;},
                	function(){banner.paused = false;}
                );
            });

            //set first link opacity
            banner.nav.children(':first').addClass('active');
        
            //hide all banner items, then show the first one
            banner.items.hide().first().show();

            //go to next page if auto is on
            goToPage(banner);
        
        }
    
    };

})(jQuery);
