/* hasSlider | mattkersley */
(function($){
//##########################################################################
//
//	HASSLIDER
//	Converts any <ul> or <ol> into a fully functioning slider
//
//**************************************************************************
//
//	Written by: Matt Kersley
//
//##########################################################################
    
    
    // Default plugin options - can be changed when called in user script
    // ---------------------------------------------------------------------
    var defaults = {
        namespace        : 'hs',         //namespace for the sliders
        slideshow        : true,         //automated transitions
        animation        : 'crossfade',  //available: crossfade, slide
        slideDirection   : 'horizontal', //direction of slide animation (horizontal/vertical)
        animationSpeed   : 700,          //speed of the transitions
        animationDelay   : 3000,         //time between each transition
        navPages         : true,         //pages controls
        navDirectional   : true,         //next/prev controls
        prevText         : '&#9664;',    //previous slide button text
        nextText         : '&#9654;',    //next slide button text
        maxWidth         : 1170,         //max width of slider
        beforeAnimation  : function(){}, //before animation callback function
        afterAnimation   : function(){}  //after animation callback function
    };



    // Storage variables
    // ---------------------------------------------------------------------
    var sliderCount     = 0;
    
    
    
    // isList()
    // checks to see if the plugin is called against a list of some sort
    // ---------------------------------------------------------------------
    function isList($this) {
        return $this.is('ul, ol');
    }
    
    
    
    // slideshow()
    // alternates the "is animated" state that's checked throughout the script
    // ---------------------------------------------------------------------
    function slideshow(slider) {
        if(slider.settings.slideshow && !slider.paused){
            slider.timer = setTimeout(function(){nextPage(slider);}, slider.settings.animationDelay);
        }
    }
    
    
    
    // animSwitch()
    // alternates the "is animated" state that's checked throughout the script
    // ---------------------------------------------------------------------
    function animSwitch(slider) {
        if(slider.animated){
            slider.animated = false;
        } else {
            slider.animated = true;
        }
    }



    // setNavPageClass()
    // adds a class to the active "navPage" item
    // ---------------------------------------------------------------------
    function setNavPageClass(slider) {
        if(slider.pages !== null){
            slider.pages.find('a').each(function(){
                if($(this).index() === slider.targetPage.index()){
                    $(this).addClass('active');
                } else {
                    $(this).removeAttr('class');
                }
            });
        }
    }



    // setCurrentPage()
    // used to set the target page as the current page
    // ---------------------------------------------------------------------
    function setCurrentPage(slider) {
        slider.currentPage = slider.targetPage;
        slider.targetPage  = null;
    }



    // crossFadeToPage()
    // crossfade transition to specific slide number
    // ---------------------------------------------------------------------
    function crossfadeToPage(slider) {
        
        //do animation unless it's already being animated, or the user selects the same slide as is currently displayed
        if(!slider.animated && slider.currentPage.index() !== slider.targetPage.index()){
            
            setNavPageClass(slider);
                    
            //switch "animated" state
            animSwitch(slider);
        
            //honor callback before animation
            slider.settings.beforeAnimation();
            
            //bring target slide to "front", fade in, then hide previous slide
            slider.targetPage
                .css({zIndex: 4})
                .stop()
                .animate({opacity:1}, slider.settings.animationSpeed, function(){

                    //set current page
                    setCurrentPage(slider);
                    
                    //honor callback after animation
                    slider.settings.afterAnimation();
                    
                    //set all slides at the same level
                    slider.items.css({zIndex: 2, opacity: 0});
                    slider.currentPage.css({opacity: 1, zIndex:3, width:'100%'});

                    //set animation to "stopped"
                    animSwitch(slider);
                    
                });
        }
 
    }



    // slideToPage()
    // slide transition to specific slide number
    // ---------------------------------------------------------------------
    function slideToPage(slider) {
        
        //do animation unless it's already being animated, or the user selects the same slide as is currently displayed
        if(!slider.animated && slider.currentPage.index() !== slider.targetPage.index()){

            setNavPageClass(slider);
                    
            //switch "animated" state
            animSwitch(slider);
        
            //honor callback before animation
            slider.settings.beforeAnimation();
            
            var targetIndex   = slider.targetPage.index();
            
            if(slider.settings.slideDirection === 'horizontal'){
                
                //animate margin based on # of slides
                slider.list.animate({marginLeft: -(slider.inner.width() * targetIndex)}, slider.settings.animationSpeed, function(){
    
                    //set current page
                    setCurrentPage(slider);
                    
                    //honor callback after animation
                    slider.settings.afterAnimation();
    
                    //set animation to "stopped"
                    animSwitch(slider);
                });
            }
            
            if(slider.settings.slideDirection === 'vertical'){
                //animate margin based on # of slides
                slider.list.animate({marginTop: -(slider.inner.height() * targetIndex)}, slider.settings.animationSpeed, function(){
    
                    //set current page
                    setCurrentPage(slider);
                    
                    //honor callback after animation
                    slider.settings.afterAnimation();
    
                    //set animation to "stopped"
                    animSwitch(slider);
                });
            }
        }
               
    }



    // prevPage()
    // animate to previous slide
    // ---------------------------------------------------------------------
    function prevPage(slider) {
        
        //find previous slide for target
        var prevSlide = slider.currentPage.prev();
        if(prevSlide.length){
            slider.targetPage = slider.currentPage.prev();
        } else {
            slider.targetPage = slider.items.last();
        }
        
        //perform animation
        switch(slider.settings.animation){
            case 'crossfade':
                crossfadeToPage(slider);
                break;
            case 'slide':
                slideToPage(slider);
                break;
        }
        
    }



    // nextPage()
    // animate to next slide
    // ---------------------------------------------------------------------
    function nextPage(slider) {
    
        //find next slide for target
        var nextSlide = slider.currentPage.next();
        if(nextSlide.length){
            slider.targetPage = slider.currentPage.next();
        } else {
            slider.targetPage = slider.items.first();
        }

        //perform animation
        switch(slider.settings.animation){
            case 'crossfade':
                crossfadeToPage(slider);
                break;
            case 'slide':
                slideToPage(slider);
                break;
        }
        
        slideshow(slider);
    }
    
    
    
    // getTargetPage()
    // gets the target page when paging is clicked
    // ---------------------------------------------------------------------
    function getTargetPage(slider, index){
    
        var $elem = {};
    
        slider.items.each(function(){
            if($(this).index() === index){
                $elem = $(this);
            }
        });
        
        return $elem;
    }
    
    
    
    // assignEvents()
    // adds event logic to the slider elements
    // ---------------------------------------------------------------------
    function assignEvents(slider){

        //set the slider to stop transitions when it's being hovered
        slider.outer
            .mouseenter(function(){
                slider.paused = true;
                window.clearTimeout(slider.timer);
            })
            .mouseleave(function(){
                slider.paused = false;
                slideshow(slider);
            });
                
        //directional nav clicks
        if(slider.settings.navDirectional){
            slider.navPrev.click(function(){
               prevPage(slider);
            });
            slider.navNext.click(function(){
                nextPage(slider);
            });
        }
        
        //paging click
        if(slider.pages !== null){
            slider.pages.find('a').click(function(){
                if(!slider.animated){
                
                    var index = $(this).index();
                    slider.targetPage = getTargetPage(slider, index);
                    
                    //get correct target page
                    switch(slider.settings.animation){
                        case 'crossfade':
                            crossfadeToPage(slider);
                            break;
                        case 'slide':
                            slideToPage(slider);
                            break;
                    }
                }
            });
        }
    }



    // generatePrevNext()
    // generates the HTML for the "prev-next" navigation
    // ---------------------------------------------------------------------
    function generateNav(slider) {

        //create nav html
        var nav  = '<div class="hs-prevnext">';
            nav +=     '<a class="hs-prev">'+slider.settings.prevText+'</a>';
            nav +=     '<a class="hs-next">'+slider.settings.nextText+'</a>';
            nav += '</div>';

        //add nav to the page
        $(nav).prependTo(slider.outer);
        
        //add nav container and links to the slider object for reference
        slider.nav      = $('#'+slider.settings.namespace+'-slider-'+sliderCount+' .hs-prevnext');
        slider.navPrev  = $('#'+slider.settings.namespace+'-slider-'+sliderCount+' .hs-prev');
        slider.navNext  = $('#'+slider.settings.namespace+'-slider-'+sliderCount+' .hs-next');
    }



    // generatePages()
    // generates the HTML for the "pages" navigation
    // ---------------------------------------------------------------------
    function generatePages(slider) {

        //create "pages" container
        $('<div class="hs-pages">').prependTo(slider.outer);
        
        //add nav pages container to the slider object for reference
        slider.pages = $('#'+slider.settings.namespace+'-slider-'+sliderCount+' .hs-pages');
        
        //loop through items and create the page links
        slider.items.each(function(i){
            $('<a>'+(i+1)+'</a>')
                .data('index',i)
                .appendTo(slider.pages);
        });
        
    }



    // setSliderHeight()
    // sets slider height based on image
    // ---------------------------------------------------------------------
    function setTheHeight(slider) {

        //get the height of the first slider image
        var theHeight = 0;
        if(slider.hasImages){
            theHeight = slider.outer.width() / slider.aspectRatio;
        } else {
            theHeight = slider.items.height();
        }
                
        //set the height of the slider elements
        slider.inner.css('height', theHeight);
        slider.items.css('height', theHeight);
        slider.outer.css('height', theHeight);
    }



    // setStyles()
    // Styles the slider based on animationType
    // ---------------------------------------------------------------------
    function setStyles(slider) {

        switch(slider.settings.animation){
        
            //"crossfade" slider styling
            case 'crossfade':
                //set all slides to be invisible except the first
                slider.items.css({
                    zIndex   : 2,
                    opacity  : 0,
                    position : 'absolute'
                }).first().css({
                    zIndex   : 3,
                    opacity  : 1
                });
                
                //exit
                break;
            
            //"slide" slider styling
            case 'slide':
                
                //if it's a horizontal slider
                if(slider.settings.slideDirection === 'horizontal'){

                    //float the list items and set their width
                    slider.items.css({
                        float: 'left',
                        width: slider.inner.width()
                    });
                     
                    //set slider width and position
                    slider.list.css({
                        width      : slider.inner.width() * slider.items.length,
                        marginLeft : -(slider.currentPage.index() * slider.inner.width())
                    });
                    
                    
                }
                
                //if it's a vertical slider, set position
                if(slider.settings.slideDirection === 'vertical'){
                    slider.list.css({
                        marginTop : -(slider.currentPage.index() * slider.inner.height())
                    });
                }
                
                //exit
                break;
        
        }
        
    }



    // buildSlider()
    // generates the HTML for the slider elements (containers & navigation)
    // ---------------------------------------------------------------------
    function buildSlider(slider) {
    
        //create outer container element (contains paging)
        var wrappers  = '<div id="'+slider.settings.namespace+'-slider-'+sliderCount+'" class="'+slider.settings.namespace+'-slider">';
            wrappers += '<div class="hs-inner">';
        slider.list.wrap(wrappers);
        
        //add container elements to the slider object
        slider.outer = $('#'+slider.settings.namespace+'-slider-'+sliderCount);
        slider.inner = $('#'+slider.settings.namespace+'-slider-'+sliderCount+' .hs-inner');
        
        //set the max width of the slider
        slider.outer.css('max-width', slider.settings.maxWidth);
        
        //set the aspect ratio of the slider
        slider.aspectRatio = slider.outer.width() / slider.items.outerHeight();
        
        //set slider height
        setTheHeight(slider);
        
        //add index value to slide
        slider.items.each(function(i){
            $(this).data('index', i);
        });
        
        //generate paging controls
        if(slider.settings.navPages){
            generatePages(slider);
            if(slider.pages !== null){slider.pages.find('a:first').addClass('active');}
        }
        
        //generate directional nav
        if (slider.settings.navDirectional) {
            generateNav(slider);
        }
        
        //assign events where appropriate
        assignEvents(slider);
        
        //set any styling
        setStyles(slider);
    
        //add 1 to the slider count
        sliderCount = sliderCount+1;
    }
    


    // hasSlider()
    // jQuery plugin's main function
    // ---------------------------------------------------------------------
    $.fn.hasSlider = function(options){
    
        //make sure the slider element is a <ul> or <ol>
        if(isList($(this))){
    
            //create slider object
            var slider = {
                list          : $(this),                              //container div
                items         : $(this).find('>li'),                  //slides (list items)
                settings      : $.extend({}, defaults, options),      //merge default options with user defined options
                outer         : null,                                 //outer container element generated by the plugin
                inner         : null,                                 //inner container element generated by the plugin
                pages         : null,                                 //used to store the slider pages navigation
                nav           : null,                                 //used to store the slider next-prev navigation
                navPrev       : null,                                 //used to store the slider prev link
                navNext       : null,                                 //used to store the slider prev link
                paused        : false,                                //used to stop animation when slider is being hovered
                animated      : false,                                //stores animation state for preventing flicker
                currentPage   : null,                                 //used to store the current displayed slide
                targetPage    : null,                                 //used to store the selected item index
                timer         : null,                                 //keeps track of currently scheduled animations
                aspectRatio   : null,
                hasImages     : false
            };
            
            //set currentPage to first slide
            slider.currentPage = slider.items.first();
    
            if(slider.list.find('img:last').length){
                slider.hasImages = true;
            }
    
            if(slider.hasImages && document.cookie.indexOf('hasSlider') === -1){
                slider.list.find('img:last').load(function(){buildSlider(slider);});
            } else {
                document.cookie = 'hasSlider=1';
                buildSlider(slider);
            }
            
            slideshow(slider);
            
        }//end isList()
        
        //if it's not a list, alert the user
        else {
            window.alert('hasSlider only works with <ul> or <ol> elements');
        }
        
        //set slider height on container re-size
        $(window).resize(function(){setStyles(slider);setTheHeight(slider);});

    };

})(jQuery);