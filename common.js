/* ===================================================
 * common.js
 * ===================================================*/

define(
	[
	'jquery',
	'tinyscrollbar',
	'owl',
	'select2'],
	function(
		$,
		Tinyscrollbar,
		Owl,
		Select2){
	
	// --------------------------------------------------------------------
	// Private variables
	
	var tinyScroll = $('.tiny-scroll');
	var owlCarousel= $('.owl');
	var socialFollow = $('.rg-follow-list');
	var moreLocalitiesLink = $('#showmenu');
	var cityDropdown = $('.city-dropdown');
	

	
	// --------------------------------------------------------------------	

	/**
	 * Initialize tiny scrollbar
	 *
	 * @access	public
	 */
	var initializeTinyScrollBar = function(element){
		element.tinyscrollbar();
	};

	// --------------------------------------------------------------------	

	/**
	 * Initialize Carousel
	 *
	 * @access	public
	 */
	var initializeOwlCarousel = function(element){
		
		$('.item').hover(function () {
	        $(this).find('.icon-hover').show();
	    });
	    $('.item').mouseleave(function () {
	        $(this).find('.icon-hover').hide();
	    });


		element.each(function(i,v){
			var type = $(v).data('type');

			if(type == 'horizontal-single')
			{
				$(v).owlCarousel({
					autoPlay: false,
					items: 1,
					navigation: true,
					pagination: false,
					itemsDesktop: [1199, 1],
					itemsDesktopSmall: [980, 1],
					itemsMobile: [479, 1],
					itemsTablet: [768, 1],
					stopOnHover: true
				});
			}
		});
	};

	// --------------------------------------------------------------------	

	/**
	 * Initialize City Dropdown
	 *
	 * @access	public
	 */
	var initializeCityDropdown = function(){
		cityDropdown.select2();
	};

	

	// --------------------------------------------------------------------	

	/**
	 * Toggle Social Follow Widget
	 *
	 * @access	public
	 */
	var toggleSocialFollow = function(){
		socialFollow.hover(function () {
			$('li',this).addClass('active');
			$('.weight', this).stop().show();
		}, function () {
			$('li',this).removeClass('active');
			$('.weight', this).stop().hide();
		});
	};

	// --------------------------------------------------------------------	

	/**
	 * Toggle Top Localities widget
	 *
	 * @access	private
	 */
	var toggleTopLocalities = function(){

		moreLocalitiesLink.click(function(){
			moreLocalitiesLink.toggleClass('more1 more');
			if (moreLocalitiesLink.text() == "More")
		       moreLocalitiesLink.text("Less")
		    else
		       moreLocalitiesLink.text("More");
			$('#show-bar').slideToggle( 500);
		});
	};


	// --------------------------------------------------------------------	

	/**
	 * Initialize common javascript module
	 *
	 * @access	public
	 */

	var initialize = function(){
		if(tinyScroll.length > 0)
		{
			initializeTinyScrollBar(tinyScroll);
		}
		if(owlCarousel.length > 0)
		{
			initializeOwlCarousel(owlCarousel);
		}
		if(socialFollow.length > 0)
		{
			toggleSocialFollow();
		}
		if(moreLocalitiesLink.length > 0)
		{	
			toggleTopLocalities();
		}
		if(cityDropdown.length > 0)
		{
			initializeCityDropdown();
		}
		
	};

	return {
		initialize: initialize,
		initializeTinyScrollBar: initializeTinyScrollBar
	};
});