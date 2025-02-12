/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Nav Menu
// Nav Menu
// Nav Menu
$(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var hash = this.hash;
    var target = $(hash);
    if (target.length) {
      e.preventDefault();

      // Remove active class from all links
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      // Add active class to clicked link
      $(this).closest('li').addClass('active');

      // Handle header special case
      if (hash == '#header') {
        $('#header').removeClass('header-top');
        $("section").removeClass('section-show');
        return;
      }

      // Add header-top class if not present
      if (!$('#header').hasClass('header-top')) {
        $('#header').addClass('header-top');
      }

      // Hide all sections and show target section with animation
      $("section").removeClass('section-show');
      $(hash).addClass('section-show');

      // Handle mobile nav
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').fadeOut();
      }

      // Scroll to top
      $('html, body').animate({
        scrollTop: 0
      }, 200);

      return false;
    }
  }
});

// Activate/show sections on load with hash links
// Handle initial page load and navigation
// Add this at the start of your script to force home on reload
// Activate/show sections on load with hash links
$(window).on('load', function() {
  // Check if we're coming back from a project detail
  const targetSection = sessionStorage.getItem('targetSection');
  
  if (targetSection === 'portfolio') {
    // Clear the stored target
    sessionStorage.removeItem('targetSection');
    // Show portfolio section directly
    $('#header').addClass('header-top');
    $("section").removeClass('section-show');
    $('#portfolio').addClass('section-show');
    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
    $('.nav-menu, .mobile-nav').find('a[href="#portfolio"]').parent('li').addClass('active');
  } else if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    // Handle page reload - go to home
    window.location.hash = '#header';
    $('#header').removeClass('header-top');
    $("section").removeClass('section-show');
    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
    $('.nav-menu, .mobile-nav').find('a[href="#header"]').parent('li').addClass('active');
  } else if (window.location.hash) {
    // Handle normal navigation with hash
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      $("section").removeClass('section-show');
      $(initial_nav).addClass('section-show');
    }
  } else {
    // Default to home
    $('#header').removeClass('header-top');
    $("section").removeClass('section-show');
    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
    $('.nav-menu, .mobile-nav').find('a[href="#header"]').parent('li').addClass('active');
  }
});
// Handle page reload specifically
$(window).on('beforeunload', function() {
  // Store if we're coming from project detail
  const isFromProjectDetail = document.referrer && document.referrer.includes('/projects/');
  if (!isFromProjectDetail) {
    // If it's a normal reload, remove hash
    window.location.hash = '';
  }
});
  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });
  

})(jQuery);
