jQuery(document).ready(function($) {

    'use strict';

    // Testimonials View1 Slider Function
    $('.ritekhana-testimonial-view1').slick({
      dots: false,
      infinite: true,
      arrows: false,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    // Responsive Main Menu Function
    jQuery('#main-menu').smartmenus({
      subMenusSubOffsetX: 1,
      subMenusSubOffsetY: -10
    });

    //***************************
    // Parent AddClass Function
    //***************************
    jQuery(".sm-blue ul").parent("li").addClass("subdropdown-addicon");

    // Menu Link Function
    jQuery( ".ritekhana-menu-link" ).on("click", function() {
      jQuery( "#main-nav" ).slideToggle( "slow", function() {
      });
    });

    //***************************
    // Fancybox Function
    //***************************
    jQuery(".fancybox").fancybox({
      openEffect  : 'elastic',
      closeEffect : 'elastic',
    });

    //***************************
    // Click to Top Button
    //***************************
    jQuery('.ritekhana-back-top').on("click", function() {
        jQuery('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    jQuery('#main-menu').on('click', 'li', function() {
      // check if route is active so not to request the function route again
      if(!jQuery(this).hasClass('active')){
          jQuery('ul li').removeClass('active');
          jQuery(this).addClass('active');
          jQuery('.ritekhana-header-btn').removeClass('clicked');
      }
  });

  jQuery('.ritekhana-header-btn').on('click', function(){
    if(!jQuery(this).hasClass('clicked')){
      jQuery(this).addClass('clicked');
      jQuery('#main-menu li').removeClass('active');
    }
  });


});

jQuery('.progressbar1').progressBar({
    shadow : false,
    percentage : true,
    animation : true,
});

//***************************
// FilterAble Function
//***************************
jQuery(window).on('load', function() {
    var $grid = $('.health-project-modren,.health-gallery-simple').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows'
    });
    // filter functions
    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
    // bind filter button click
    $('.filters-button-group').on( 'click', 'a', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
    });
    // change is-checked class on buttons
    $('.filters-button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'a', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });
});


$('.ritekhana-input-tags').selectize({
  plugins: ['remove_button'],
  persist: false,
  create: true,
  render: {
    item: function(data, escape) {
      return '<div>' + escape(data.text) + '</div>';
    }
  },
  onDelete: function(values) {
    return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
  }
});
$('#input-tags6').selectize({
  plugins: ['restore_on_backspace'],
  persist: false,
  create: true,
});

/* Language Selector */
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showLangs() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
