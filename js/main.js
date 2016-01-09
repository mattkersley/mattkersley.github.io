(function($){

  $('document').ready(function(){

    // If we're on anything other than the homepage, add a loading animation.
    // We don't need one on the homepage because of the logo animation timeframe
    if(!($('body').is('.home'))){
      $('<div class="loader"><div></div><div></div><div></div></div>').insertBefore('.page-content');
    }

  });

  // add "loaded" class when document is fully loaded
  $(window).load(function(){ $('body:not(.home)').addClass('loaded'); });

})(jQuery);
