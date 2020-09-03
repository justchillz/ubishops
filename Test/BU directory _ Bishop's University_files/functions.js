/**
 * Functionality specific to Twenty Thirteen.
 *
 * Provides helper functions to enhance the theme experience.
 */

var popupCookieName;

document.addEventListener("DOMContentLoaded", function() {
    
    var element = document.getElementsByClassName('apparmor-alert')[0];
    //var element =  document.getElementById('AppArmorAlertID_7');
    if (element)
    {
      document.body.classList.add('AppArmor-active');
    }
});

( function( $ ) {
    
    
    
    

	popupCookieName = $('html').is('[lang^=fr]') ? 'popmake-auto-open-5372-14e9d3f6dd5' : 'popmake-auto-open-412-14e9d3f6dd5';

	var body    = $( 'body' ),
	    _window = $( window ),
		nav, buttons, menu, buttonSearch, toolsMenu;

	nav = $( '.navbar' );
	buttons = $( '.btn-toggle' );
//        buttonSearch = $('.search-form');
	menu = nav.find( '.nav-menu' );
    toolsMenu = nav.find('.tools-menu');
	/**
	 * Adds a top margin to the footer if the sidebar widget area is higher
	 * than the rest of the page, to help the footer always visually clear
	 * the sidebar.
	 */
	$( function() {

		if ( body.is( '.sidebar' ) ) {
			var sidebar   = $( '#secondary .widget-area' ),
			    secondary = ( 0 === sidebar.length ) ? -40 : sidebar.height(),
			    margin    = $( '#tertiary .widget-area' ).height() - $( '#content' ).height() - secondary;

			if ( margin > 0 && _window.innerWidth() > 999 ) {
				$( '#colophon' ).css( 'margin-top', margin + 'px' );
			}
		}
	} );

	/**
	 * Enables menu toggle for small screens.
	 */
	( function() {
		if ( ! nav || ! buttons ) {
			return;
		}
//
//		// Hide button if menu is missing or empty.
//		if ( ! menu || ! menu.children().length ) {
//
//			//buttons.attr('nav-menu').hide();
//
//		}
//                if ( ! toolsMenu || ! toolsMenu.children().length ) {
//
//			//buttons.attr('tools-menu').hide();
//		}

		//Hide menu on mouseout
		nav.on('mouseleave', function(){
			nav.removeClass('toggled-on');
			$(buttons).attr( 'aria-expanded', 'false' );
			menu.attr( 'aria-expanded', 'false' );
		});

		buttons.on( 'click.bu', function() {
			var navTarget = nav.siblings('#'+$(this).attr('data-menu'));
			if ( !navTarget.hasClass( 'toggled-on' ) ) {
				nav.removeClass('toggled-on');
				buttons.attr( 'aria-expanded', 'false' );
			}

			navTarget.toggleClass( 'toggled-on' );
			if ( navTarget.hasClass( 'toggled-on' ) ) {
				$( this ).attr( 'aria-expanded', 'true' );
				menu.attr( 'aria-expanded', 'true' );
				if ( navTarget.is('#search-tool') ){
					navTarget.find('#cse-search-form input[name=search]').focus();
				}
			} else {
				nav.removeClass('toggled-on');
				$( this ).attr( 'aria-expanded', 'false' );
				menu.attr( 'aria-expanded', 'false' );
			}



		} );

		// Fix sub-menus for touch devices.
		if ( 'ontouchstart' in window ) {
			menu.find( '.menu-item-has-children > a, .page_item_has_children > a' ).on( 'touchstart.bu', function( e ) {
				var el = $( this ).parent( 'li' );

				if ( ! el.hasClass( 'focus' ) ) {
					e.preventDefault();
					el.toggleClass( 'focus' );
					el.siblings( '.focus' ).removeClass( 'focus' );
				}
			} );
		}

		// Better focus for hidden submenu items for accessibility.
		menu.find( 'a' ).on( 'focus.bu blur.bu', function() {
			$( this ).parents( '.menu-item, .page_item' ).toggleClass( 'focus' );
		} );
	} )();

//        (function(){
//            if ( ! buttonSearch ){
//                return;
//            }
//
//             buttonSearch.find('.search-field').on('focus.bu blur.bu', function(){
//                 buttonSearch.toggleClass('focused');
//             });
//
//        })();

	/**
	 * @summary Add or remove ARIA attributes.
	 * Uses jQuery's width() function to determine the size of the window and add
	 * the default ARIA attributes for the menu toggle if it's visible.
	 * @since Twenty Thirteen 1.5
	 */
	function onResizeARIA() {
		if ( 643 > _window.width() ) {
		//	buttons.attr( 'aria-expanded', 'false' );
		//	menu.attr( 'aria-expanded', 'false' );
			buttons.attr( 'aria-controls', 'primary-menu' );
		} else {
		//	buttons.removeAttr( 'aria-expanded' );
		//	menu.removeAttr( 'aria-expanded' );
			buttons.removeAttr( 'aria-controls' );
		}
	}

	_window
		.on( 'load.bu', onResizeARIA )
		.on( 'resize.bu', function() {
			onResizeARIA();
	} );
        
        
        

	/**
	 * Makes "skip to content" link work correctly in IE9 and Chrome for better
	 * accessibility.
	 *
	 * @link http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
	 */
	_window.on( 'hashchange.bu', function() {
		var element = document.getElementById( location.hash.substring( 1 ) );

		if ( element ) {
			if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) {
				element.tabIndex = -1;
			}

			element.focus();
		}
	} );

	/**
	 * Arranges footer widgets vertically.
	 */
	if ( $.isFunction( $.fn.masonry ) ) {
		var columnWidth = body.is( '.sidebar' ) ? 228 : 245;

		$( '#secondary .widget-area' ).masonry( {
			itemSelector: '.widget',
			columnWidth: columnWidth,
			gutterWidth: 20,
			isRTL: body.is( '.rtl' )
		} );
	}


        /**
         * add overlay to images using class "masked"
         */
        var maskedImages = $('img.masked');
        if( maskedImages.length ) {
            $.each( maskedImages, function(index, element){
                var mask = $('<div>').addClass('mask');
                var wrapper = $('<div>').addClass('masked-container');
                $(element)
                    .wrapAll(wrapper)
                    .after(mask);
            });
        }

    function orderHome() {
    	var cookie = $.cookie( popupCookieName );

        switch ( cookie ){
            case "Prospective student": 
                $('#text-4, #text-8').insertAfter( $('#text-2') );
                $('#text-6, #text-12').insertAfter( $('#text-8') );
                $('#text-3').insertAfter( $('#mosaic-top-students') );
                $('#bu-home-sidebar').insertAfter( $('#mosaic-alumni') );
                $('#text-4, #text-7').find('.light, .dark').toggleClass('dark light');
                break;
                
            case "Student":
                $('#text-13').insertAfter( $('#storify') );
                $('#text-3').insertAfter( $('#text-13') );
                $('#text-4, #text-8').insertAfter( $('#mosaic-alumni') );
                $('#bu-home-sidebar').insertAfter( $('#mosaic-top-students') );
                $('#text-7').find('.light, .dark').toggleClass('dark light');
                break;
                
            case "Parent":
                $('#text-4, #text-8').insertAfter( $('#text-2') );
                $('#text-5, #mosaic-top-students').insertAfter( $('#text-8') );
                $('#text-7, #mosaic-alumni').insertAfter(  $('#mosaic-top-students') );
                $('#bu-home-sidebar').insertAfter( $('#mosaic-alumni') ); 
                $('#text-6, #text-12').insertAfter( $('#bu-home-sidebar') );
                $('#storify').insertAfter(  $('#text-3') );
                $('#text-4, #text-6').find('.light, .dark').toggleClass('dark light');
                break; 
            
            case "Alumni":
            case "Alumnus":    
                $('#text-7, #mosaic-alumni').insertAfter(  $('#storify') );
                $('#bu-home-sidebar').insertAfter( $('#mosaic-alumni') ); 
                $('#text-4, #text-8').insertAfter( $('#mosaic-top-students') );
                $('#text-7, #text-3, #text-5').find('.light, .dark').toggleClass('dark light');
                break;    
            
            
            case "Faculty & staff":
                $('#text-13').insertAfter( $('#text-2') );
                $('#bu-home-sidebar').insertAfter( $('#text-13') );  
                $('#text-3').insertAfter( $('#mosaic-top-students') );
                $('#text-4, #text-8').insertAfter( $('#mosaic-alumni') );
                $('#text-7, #text-2').find('.light, .dark').toggleClass('dark light');
                break;
        }
        

    }


	$( function() {
	    var cookie = $.cookie( popupCookieName );

	    if(typeof cookie !== 'undefined'){
	        $('.popmake').addClass('force-hide');
	        orderHome();
	    }

	    var choices = $('.btn-choice');

		$(choices).bind('click', function(e){
			choices.removeClass('active');
			$(this).addClass('active');
			$.cookie(popupCookieName, $(this).text(), { expires: 364, path: '/' });
			orderHome();
			$('.popmake').fadeOut();
		});

		$('.btnSkip').bind('click', function(e){
			$.cookie(popupCookieName, 'skip');
			$('.popmake').fadeOut();
		});
    });


	function onResizeStorify() {
            $story = $('#storify');
            
            
            if( !$story.length) {
                return;
            }
            
        //detect the max height of the text for the row
        var maxHeight = 0;
        $texts = $story.find('.bu-content p.post-text').each(function (index) {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        })
        $story.find('.bu-content').css('height', maxHeight + 70);
            
        //detect number of box to show on one row
        if ($story.width() < 1016) {
            $story.find('.storify-post').css('width','48%');
        }else{
            $story.find('.storify-post').css('width','24%');
		}

        // var heightUnit = Math.max($story.width()/4-10, 100);
        //
        // $story.find('.bu-content' ).css('height', heightUnit );

	}

	_window
		.on( 'load.bu', onResizeStorify )
		.on( 'resize.bu', function() {
			onResizeStorify();
	} );




} )( jQuery );