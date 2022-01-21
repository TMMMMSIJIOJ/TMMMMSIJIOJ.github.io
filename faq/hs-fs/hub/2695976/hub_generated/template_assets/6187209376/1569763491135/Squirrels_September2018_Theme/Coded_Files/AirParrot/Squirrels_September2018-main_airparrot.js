$(function() {

    /** 
     * Mobile Nav
     *
     * Hubspot Standard Toggle Menu
     */

    $('.custom-menu-primary').addClass('js-enabled');
    
    /* Mobile button with three lines icon */
        $('.custom-middle-logo-group .custom-logo').after('<div class="mobile-trigger"></div>');
        
  
  $('.custom-menu-primary .hs-menu-wrapper > ul > li.hs-item-has-children > a').append('<svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002  c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z" fill="#121313" id="Expand_More"></path><g></g><g></g><g></g><g></g><g></g><g></g></svg>');
    /* Uncomment for mobile button that says 'MENU' 
        $('.custom-menu-primary .hs-menu-wrapper').before('<div class="mobile-trigger">MENU</div>');
    */
    
    $('.custom-menu-primary .flyouts .hs-item-has-children > a').after(' <div class="child-trigger"><i></i></div>');
    $('.mobile-trigger').click(function() {
        $('.custom-menu-primary .hs-menu-wrapper').slideToggle(250);
        $('body').toggleClass('mobile-open');
        $('.child-trigger').removeClass('child-open');
        $('.custom-menu-primary .hs-menu-children-wrapper').slideUp(250);
        return false;
     });

    $('.child-trigger').click(function() {
        $(this).parent().siblings('.hs-item-has-children').find('.child-trigger').removeClass('child-open');
        $(this).parent().siblings('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250);
      	$(this).parent().siblings().removeClass('active-li');
        $(this).next('.hs-menu-children-wrapper').slideToggle(250);
        $(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250);
        $(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.child-trigger').removeClass('child-open');
        $(this).toggleClass('child-open');
      	$(this).parent().toggleClass('active-li');
        return false;
    });

  $(window).scroll(function(){
     var distanceY = window.pageYOffset || document.documentElement.scrollTop,
         shrinkOn = 300,
         body = document.querySelector("body");
     if ($(this).scrollTop() > $('.custom-header-group').outerHeight()){
       $('body').addClass("scroll-fixed");
     }
     else{
       $('body').removeClass("scroll-fixed");
     }
    });
 		var d = 0,
      c, a = [],
      e = 0,
      h, g = [],
      l = [],
      k = [];
  $.each($(".custom-menu-primary .hs-menu-flow-horizontal > ul > li"), function(j) {
    h = "", e = 0;
    a[j] = $(this).children("a").text().length;
    for (c = 0; c < a[j]; c++) {
      k[j] = $(this).children("a").text().toLowerCase().replace(/[_\W]+/g, "-");
      g[c] = k[j].charAt(c);
      if (g[c] == "-") {
        e++
      }
      if (e < 3) {
        h = h.concat(g[c])
      }
    }
    l[j] = h;
    $(this).addClass("hs-item-" + (j + 1) + " hs-" + l[j]);
    j++
  });
  $(".banner-image img").each(function(e){
        var imagePath = $(this).attr('src');
        $(this).closest('.custom-banner').css('background-image', 'url(' + imagePath + ')');
        $(this).closest('.row-fluid-wrapper').remove();
 	}); 
  
 $('#win-btn-list').click(function(){
$(this).next().slideToggle();
});

  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top -98
        }, 600);
        return false;
      }
    }
    });
  });

  $('.custom-header-top-menu ul li a').each(function(){
    var altText= $(this).text().toLowerCase().trim().replace(/[_\s]/g, '-')
    $(this).parent().addClass(altText);
  });

  $('.custom-header-top-menu ul li.contact > a, .custom-popup-opener').click(function(){
    $('body').toggleClass('popup-show');
  });
  $('.custom-airparrot-popup-group').click(function(){
    $('body').removeClass('popup-show');
  });
  $('.custom-airparrot-popup-inner-group').click(function(e){
    e.stopPropagation();
  });
  
  $(".custom-popup-opener").click(function(){
    $('body,html').animate({scrollTop:0},500);
    return false;
  });
  setTimeout(function(){
    $('.hs-popup-inner-group .hs_message:parent').each(function () {
      $(this).insertBefore($(this).prev('.hs-richtext'));
    });
  },2000);

  

});