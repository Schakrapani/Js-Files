/* ===================================================
 * contact.js
 * ===================================================*/

define(
	[
	'jquery',
	'jquery-loadmask',
	'magnific-popup'],
	function(
		$,
		LoadMask,
		MagnificPopup){
	
	// --------------------------------------------------------------------
	// Private variables
	
	var contactSeller = $('.seller-contact');
	var minutesToMonitor = 100000;
	var requestLoopTimer = -1;


	// --------------------------------------------------------------------	

	/**
	 * Initialize Contact seller form
	 *
	 * @access	private
	 */

	var initializeContactSellerForm = function(){

		onContactSellerClick();
		onSigninClick();
		onRegisterFormSubmit();
		onRegisterPdpFormSubmit();
		onLoginFormSubmit();
		onOtpFormSubmit();
		onUserConfirmMobile();
		onResndOtpClick();
		onPopupCloseClick();
		onOtpBasedLogin();
		onUpdateMobileNumber();
		onUpdateMobileNumberLoggedin();
		onUpdateMobileNumberViewDetail();
	};

	// --------------------------------------------------------------------	

	/**
	 * Show Login Form
	 *
	 * @access	private
	 */

	var onSigninClick = function(){
		$(document).on('click','#sign',function(e){
			e.preventDefault();
			$('.user-contact').hide();
			$('.otp-section').hide();
			$('.login-contact').show();
		});
	};
	
	// --------------------------------------------------------------------
	
	/**
	 * Otp based user login.
	 *
	 * @access	private
	 */
	
	var onOtpBasedLogin = function(){
		$(document).on('click','#otpbasedlogin',function(e){
			e.preventDefault();
			var formURL   = $(this).attr('class');
			var postData  = $(this).serializeArray();
			var listingid  = $('#result_listing_id').val();
			var sellertype = $('#result_seller_type').val();
			var mobile  = $('#result_user_mobile').val();
			var userid  = $('#result_user_id').val();
			
			postData.push({name: 'user_mobile', value: mobile});
			postData.push({name: 'user_id', value: userid});
			postData.push({name: 'listing_id', value: listingid});
			postData.push({name: 'seller_type', value: sellertype});
									
			$("#sign_up").mask("Loading...");
			$.ajax(
			{
				url : formURL,
				type: "POST",
				data : postData,
				dataType: 'JSON',
				success: function(data){
					$('#sign_up .sign_up_append').html(data.html);
	        		$('#listingid').val(data.listingid);
	        		$('#userid').val(data.userid);
	        		$('#mobileno').val(data.mobile_number);
	        		$("#sign_up").unmask();
	        		if(data.mob_sta == 'notverified'){
	        			requestLoopVerfication(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
	        		}
				}
			});
			return false;
		});
	};
	
	// --------------------------------------------------------------------	

	/**
	 * Show Login Form
	 *
	 * @access	private
	 */

	var onPopupCloseClick = function(){
		$(document).on('click','.close-popup',function(e){
			e.preventDefault();
			$.magnificPopup.close()
		
		});
	};
	
	// --------------------------------------------------------------------	
	
	var onResndOtpClick = function(){
		$(document).on('click','#resendotp',function(e){
			e.preventDefault();
			
			var formURL   = $(this).attr('class');
			var postData  = $(this).serializeArray();
			
			var userid   = $('#userid').val();
			var mobileno = $('#mobileno').val();
			
			postData.push({name: 'userid', value: userid});
			postData.push({name: 'mobileno', value: mobileno});
									
			$("#sign_up").mask("Loading...");
			$.ajax(
			{
				url : formURL,
				type: "POST",
				data : postData,
				dataType: 'JSON',
				success: function(data){
					if(data.status == 'sucess'){
						$("#sign_up").unmask();
						if(data.limt == '3'){
							$("#resendotp-p").hide();
						}
					}else if(data.status == 'failure'){
						$("#sign_up").unmask();
					}else if(data.status == 'limit-crossed'){
						alert('Limit Exceed');
						$("#sign_up").unmask();
					}
				}
			});
			return false;
		});
	};
	
	// --------------------------------------------------------------------

	/**
	 * On Submit of login form
	 *
	 * @access	private
	 */
	
	
	var onLoginFormSubmit = function(){
		
		$(document).on('submit','.user-login-contact-modal-form',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL = $(this).attr("action");
		    
		    $("#sign_up").mask("Loading...");
			    
			$.ajax(
			{
				url : formURL,
				type: "POST",
				data : postData,
				dataType: 'JSON',
				success: function(data){
					//alert(data);
					if(data.status == 'sucess'){
						$('.login-contact').remove();
						if(data.state == 'mob_notchanged'){
							$('#sign_up .sign_up_append').html(data.html);
			        		$('#login-tabs').html(data.html_ano);
						}else if(data.state == 'mob_changed'){
							$('#sign_up .sign_up_append').html(data.html);
							$('#login-tabs').html(data.html_ano);
			        		$('#listingid').val(data.listingid);
			        		$('#userid').val(data.userid);
			        		$('#mobileno').val(data.mobile_number);
			        		if(data.mob_sta == 'notverified'){
			        			requestLoopVerfication(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
			        		}
						}
		        		$("#sign_up").unmask();
					}else if(data.status == 'error'){
		        		$("#sign_up").unmask();
		        		if(data.user_email == 'User Email cannot be blank.'){
		        			$('#user_login_email_contact').show();
			    		}else{
			    			$('#user_login_email_contact').hide();
			    		}
		        		if(data.user_pass == 'User Pass cannot be blank.'){
			    			$('#user_login_pass_contact').show();
			    		}else{
			    			$('#user_login_pass_contact').hide();
			    		}
		        		if(data.incorrect == 'Incorrect username or password.'){
		        			$('#user_login_error_contact').html('The email or password you entered is incorrect.');
			    			$('#user_login_error_contact').show();
		        		}else{
		        			$('#user_login_error_contact').hide();
		        		}
		        	}
					
					
				}
			
			});
			return false;
			
		});
		
	};
	

	// --------------------------------------------------------------------	

	/**
	 * On Submit of registration form
	 *
	 * @access	private
	 */

	var onRegisterFormSubmit = function(){
		
		$(document).on('submit','.register-modal-form',function(e){
			
			e.preventDefault();
			
			$("#sign_up").mask("Loading...");
			
			var postData = $(this).serializeArray();
		    var formURL  = $(this).attr("action");
		    var formId   = $(this).attr('id');
		    
		    var email     = $('#user_reg_email').val();
		    var mobile    = $('#user_reg_mobile').val();
		    var listingid = $('#user-reg-listing').val();
		    		    
		    if(formId == 'contactseller/userverification'){
		    	postData.push({name: 'formtype', value: 'contactseller-session'});	
		    }
		    		    
		    $.ajax(
		    {
		        url : formURL,
		        type: "POST",
		        data : postData,
		        dataType: 'JSON',
		        success: function(data){
		        	//alert(data.status);
		        	if(data.status == 'sucess'){
		        		//$('.login-blk').html(data.html_ano).addClass('logout');
		        		$('.user-contact').remove();
		        		$('#sign_up .sign_up_append').html(data.html);
		        		$('#listingid').val(data.listingid);
		        		$('#userid').val(data.userid);
		        		$('#mobileno').val(data.mobile_number);
		        		$("#sign_up").unmask();
		        		if(data.mob_sta == 'notverified'){
		        			requestLoopVerfication(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
		        		}else if(data.mob_sta == 'verified' && data.seller_type == 'call'){
		        			requestCallToSeller(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
		        		}
		        		
		        	}else if(data.status == 'error'){
		        		
		        		if(data.user_name == 'User Name cannot be blank.'){
		        			$('#usern').show();
		        		}else{
		        			$('#usern').hide();
		        		}
		        		if(data.user_mobile == 'User Mobile cannot be blank.'){
		        			$('#mobile').show();
		        		}else if(data.user_mobile == 'User Mobile must be a number.'){
		        			$('#mobile').html('Please enter valid Mobile Number.');
		        			$('#mobile').show();
		        		}
		        		else{
		        			$('#mobile').hide();
		        		}
		        		if(data.user_email == 'User Email cannot be blank.'){
		        			$('#email').show();
		        		}else if(data.user_email == 'User Email is not a valid email address.'){
		        			$('#email').html('Please enter valid Email.');
		        			$('#email').show();
		        		}else if(data.user_email == 'email already exist.'){
		        			/*$('#email').html('Email already exists.');
		        			$('#email').show();*/
		        			$('#sign_up .sign_up_append').html(data.html);
			    			$('#login-email-mobil-error').html('<b>An account with EmailID '+email+' already exists. Please sign in to connect with seller.</b>');
			    			$('#user-login-email-id').val(email);
			    			$('#login-listingid').val(listingid);
		        		}
		        		else{
		        			$('#email').hide();
		        		}
		        		
		        		if(data.message == 'exception'){
		        			$('#error-ex').show();
		        		}else{
		        			$('#error-ex').hide();
		        		}
		        		
		        		if(data.message == 'email and mobile exits'){
		        			$('#sign_up .sign_up_append').html(data.html);
			    			$('#login-email-mobil-error').html('<b>An account with EmailID '+email+' and Mobile Number '+mobile+' already exists. Please sign in to connect with seller.</b>');
			    			$('#user-login-email-id').val(email);
			    			$('#listingid').val(data.listingid);
			        		$('#userid').val(data.userid);
			        		$('#mobileno').val(data.mobile_number);
			        		if(data.mob_sta == 'notverified'){
			        			requestLoopVerfication(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
			        		}
		        		}else{
		        			$('#error-ex').hide();
		        		}
		        		
		        		$("#sign_up").unmask();
		        	}
		        }

		    });
			return false;
		});

	};
	
	
	var onRegisterPdpFormSubmit = function(){
		$(document).on('click','#seller-contact-pdp',function(e){
			e.preventDefault();
			
			$("body").mask("Loading...");

			var postData = $('.register-modal-pdp-form').serializeArray();
		    var formURL  = $('.register-modal-pdp-form').attr("action");
		    var formId   = $('.register-modal-pdp-form').attr("id");
		    postData.push({name: "UserRegistration[form_name]", value: "contactseller-pdp"});
		    
		    if(formId == 'contactseller/userverification'){
		    	postData.push({name: 'formtype', value: 'contactseller-session'});	
		    }

		    $.ajax(
		    {
		        url : formURL,
		        type: "POST",
		        data : postData,
		        dataType: 'JSON',
		        success: function(data){
		        	if(data.status == 'sucess'){
		        		$('#login-tabs').html(data.html_ano);
		        		$.magnificPopup.open({
						  items: {
						    	src: data.html,
						    	type: 'inline',
							},
							modal: true,
							callbacks: {
							    close: function() {
							      $('#sign_up').remove();
							      clearInterval(requestLoopTimer);
							    }
							}
						});
						$('#listingid').val(data.listingid);
						$('#userid').val(data.userid);
						$("body").unmask();
						if(data.mob_sta == 'notverified'){
		        			requestLoopVerfication(data.url,{userid: data.userid,listingid: data.listingid});
		        		}else if(data.mob_sta == 'verified' && data.seller_type == 'call'){
		        			requestCallToSeller(data.url,{userid: data.userid,listingid: data.listingid});
		        		}
					}else if(data.status == 'error'){
						if(data.user_name == 'User Name cannot be blank.'){
		        			$('#user-pdp').show();
		        		}else{
		        			$('#user-pdp').hide();
		        		}
		        		if(data.user_mobile == 'User Mobile cannot be blank.'){
		        			$('#mobile-pdp').show();
		        		}else if(data.user_mobile == 'User Mobile must be a number.'){
		        			$('#mobile-pdp').html('Please enter valid Mobile Number.');
		        			$('#mobile-pdp').show();
		        		}
		        		else{
		        			$('#mobile-pdp').hide();
		        		}
		        		if(data.user_email == 'User Email cannot be blank.'){
		        			$('#email-pdp').show();
		        		}else if(data.user_email == 'User Email is not a valid email address.'){
		        			$('#email-pdp').html('Please enter valid Email.');
		        			$('#email-pdp').show();
		        		}else if(data.user_email == 'email already exist.'){
		        			$('#email-pdp').html('Email already exists.');
		        			$('#email-pdp').show();
		        		}
		        		else{
		        			$('#email-pdp').hide();
		        		}
		        		
		        		if(data.message == 'exception'){
		        			$('#error-ex-pdp').show();
		        		}else{
		        			$('#error-ex-pdp').hide();
		        		}
		        		
		        		$("body").unmask();
		           	}
		        }

		    });
			return false;

		});
	};

	// --------------------------------------------------------------------	
	
	/**
	 * On Submit of Otp form
	 *
	 * @access	private
	 */

	var onOtpFormSubmit = function(){

		$(document).on('submit','.otp-modal-form',function(e){
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL = $(this).attr("action");
		    
		    $("#sign_up").mask("Loading...");

		    $.ajax(
		    {
		        url : formURL,
		        type: "POST",
		        data : postData,
		        dataType: 'JSON',
		        success: function(data){
		        	//alert(data.status);
		        	if(data.status == 'sucess' && data.state == 'loggedin'){
		        		$('.otp-modal-form').remove();
		        		$('#sign_up .sign_up_append').html(data.html);
		        		$('.login-blk').html(data.html_ano).addClass('logout');
		        		$("#sign_up").unmask();
		        		clearInterval(requestLoopTimer);
		        		if(data.seller_type == 'call'){
		        			requestCallToSeller(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
		        		}
		        	}else if(data.status == 'sucess' && data.state == 'notloggedin'){
		        		$('#sign_up .sign_up_append').html(data.html);
		        		$("#sign_up").unmask();
		        		clearInterval(requestLoopTimer);
		        		if(data.seller_type == 'call'){
		        			requestCallToSeller(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
		        		}
		        	}else if(data.status == 'failure'){
		        		$("#sign_up").unmask();
		        		alert(data.message);
		        		
		        	}
		        }

		    });
			return false;
		});
	};
	
	// --------------------------------------------------------------------
	
	/**
	 * request loop to check verfied
	 *
	 * @access	private
	 */

	var requestLoopVerfication = function(url,data){
		var time = 0;
		var requestSending = false;
		requestLoopTimer = setInterval(function(){
			time += 3000;
			if(time < minutesToMonitor)
			{
				if(!requestSending)
				{
					requestSending = true;
					$.ajax({
						url: url,
						type: "POST",
						data: data,
						dataType: 'JSON',
						success: function(data){
							//alert(data);
							if(data.status == 'sucess' && data.state == 'loggedin'){
								requestSending = true;
				        		$('.otp-modal-form').remove();
				        		$('#sign_up .sign_up_append').html(data.html);
				        		$('.login-blk').html(data.html_ano).addClass('logout');
				        		requestCallToSeller(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
				        		clearInterval(requestLoopTimer);
				        	}else if(data.status == 'sucess' && data.state == 'notloggedin'){
				        		$('#sign_up .sign_up_append').html(data.html);
				        		$("#sign_up").unmask();
				        		clearInterval(requestLoopTimer);
				        		if(data.seller_type == 'call'){
				        			requestCallToSeller(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
				        		}
				        	}else if(data.status == 'failure'){
				        		//$("#sign_up").unmask();
				        		requestSending = false;
				        	}
							
						}
					});
				}
			}else{
				$.magnificPopup.close();
				clearInterval(requestLoopTimer);
			}
			
		},3000);

	};

	

	// --------------------------------------------------------------------	
	
	var onUserConfirmMobile = function(){
		
		$(document).on('submit','.user-mobile-confirm',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL  = $(this).attr("action");
		    $("#sign_up").mask("Loading...");
		    postData.push({name: 'formtype', value: 'contactseller-signin'});
		    postData.push({name: "UserRegistration[form_name]", value: "contactseller-signin"});
		    $.ajax(
			{
				url : formURL,
				type: "POST",
			    data : postData,
			    dataType: 'JSON',
			    success: function(data){
			    	if(data.status == 'sucess'){
		        		$('.user-mobile-confirm').remove();
		        		$('#sign_up .sign_up_append').html(data.html);
		        		$("#sign_up").unmask();
		        		if(data.mob_sta == 'notverified'){
		        			requestLoopVerfication(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
		        		}else if(data.mob_sta == 'verified' && data.seller_type == 'call'){
		        			requestCallToSeller(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number});
		        		}
		        	}else if(data.status == 'error'){
		        		$("#sign_up").unmask();
		        		if(data.user_mobile == 'User Mobile cannot be blank.'){
		        			$('#mobile_confirm_error').show();
		        		}else if(data.user_mobile == 'User Mobile must be a number.'){
		        			$('#mobile_confirm_error').html('Please enter valid Mobile Number.');
		        			$('#mobile_confirm_error').show();
		        		}
		        	}
			    }
			});
			return false;
		    
		});
		
	};
	
	
	// --------------------------------------------------------------------
	
	/**
	 * request loop to check verfied
	 *
	 * @access	private
	 */

	var requestCallToSeller = function(url,data){
		$.ajax({
			url: url,
			type: "POST",
			data: data,
			dataType: 'JSON',
			success: function(data){
				//alert(data);
				if(data.status == 'sucess'){
	        		$('.connect-to-seller').remove();
	        		$('#sign_up .sign_up_append').html(data.html);
	        		clearInterval(requestLoopTimer);
	        		$("#sign_up").unmask();
	        		requestCallLoopVerfication(data.url,{userid: data.userid,sid: data.responsesid,listingid: data.listingid,mobileno: data.mobileno});
	        	}else if(data.status == 'failure'){
	        		$('.connect-to-seller').remove();
	        		$('#sign_up .sign_up_append').html(data.html);
	        		clearInterval(requestLoopTimer);
	        		$("#sign_up").unmask();
	        	}
			}
		});
	};
	
	
	// --------------------------------------------------------------------
	
	
	/**
	 * request loop to check verfied
	 *
	 * @access	private
	 */

	var requestCallLoopVerfication = function(url,data){
		var time = 0;
		var requestSending = false;
		requestLoopTimer = setInterval(function(){
			time += 3000;
			if(time < minutesToMonitor)
			{
				if(!requestSending)
				{
					requestSending = true;
					$.ajax({
						url: url,
						type: "POST",
						data: data,
						dataType: 'JSON',
						success: function(data){
							//alert(data);
							if(data.status == 'Sucess'){
								requestSending = false;
								if(data.call_Status == 'completed'){
									requestSending = true;
									clearInterval(requestLoopTimer);
									$('.call-in-progress').remove();
					        		$('#sign_up .sign_up_append').html(data.html);
					        		$("#sign_up").unmask();
					        		$("#contacted-"+data.listingid).show();
					        	}else if(data.call_Status == 'failed' || data.call_Status == 'busy' || data.call_Status == 'no-answer'){
					        		requestSending = true;
									clearInterval(requestLoopTimer);
									$('.call-in-progress').remove();
					        		$('#sign_up .sign_up_append').html(data.html);
					        		$("#sign_up").unmask();
					        		$("#contacted-"+data.listingid).show();
					        	}
				        		
				        	}else if(data.status == 'failure'){
				        		$("#sign_up").unmask();
				        		requestSending = false;
				        	}
						}
					});
				}
				
			}else{
				$.magnificPopup.close();
				clearInterval(requestLoopTimer);

			}
			
		},3000);

	};

	// --------------------------------------------------------------------	
	
	
	/**
	 * request loop to check verfied
	 *
	 * @access	private
	 */

	var requestEmailtoBuyer = function(url,data){
		$.ajax({
			url: url,
			type: "POST",
			data: data,
			dataType: 'JSON',
			success: function(data){
				alert(data);
				/*if(data.status == 'sucess'){
	        		$('.connect-to-seller').remove();
	        		$('#sign_up').append(data.html);
	        		clearInterval(requestLoopTimer);
	        		$("#sign_up").unmask();
	        		requestCallLoopVerfication(data.url,{userid: data.userid,sid: data.responsesid,listingid: data.listingid});
	        	}else if(data.status == 'failure'){
	        		$('.connect-to-seller').remove();
	        		$('#sign_up').append(data.html);
	        		clearInterval(requestLoopTimer);
	        		$("#sign_up").unmask();
	        	}*/
			}
		});
	};
	
	
	// --------------------------------------------------------------------


	/**
	 * On Contact Seller Click
	 *
	 * @access	private
	 */

	var onContactSellerClick = function(){
		$(document).on('click','.seller-contact',function(e){
			e.preventDefault();
			var url = $(this).attr('href');
			$.ajax({
				url: url,
				success:function(data){
				$.magnificPopup.open({
					  items: {
					    	src: data,
					    	type: 'inline',
						},
						modal: true,
						callbacks: {
						    close: function() {
						      $('#sign_up').remove();
						      clearInterval(requestLoopTimer);
						    }
						}
					});

				},
				error: function(){

				}

			})
			return false;
		});
	};
	
	// --------------------------------------------------------------------	
	
	var onUpdateMobileNumber = function(){
		
		$(document).on('submit','.call-disconnected',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL  = $(this).attr("action");
		    
		    $("#sign_up").mask("Loading...");
		   
		    $.ajax(
			{
				url : formURL,
				type: "POST",
			    data : postData,
			    dataType: 'JSON',
			    success: function(data){
			    	if(data.status == 'sucess'){
			    		if(data.state == 'loggedin'){
			    			$("#sign_up").unmask();
			    			alert('Updated Successfully');
			    		}else if(data.state == 'notloggedin'){
			    			//alert(1);
			    			$('#sign_up .sign_up_append').html(data.html);
			        		$("#userid").val(data.userid);
			        		$("#mobileno").val(data.mobileno);
			        		$("#emailid").val(data.user_email);
			        		$("#sign_up").unmask();
			    		}
			    	}
			    }
			});
			return false;
		    
		});
		
	};
	
	// --------------------------------------------------------------------	
	
	var onUpdateMobileNumberViewDetail = function(){
		
		$(document).on('submit','.view-contact-details',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL  = $(this).attr("action");
		    
		    $("#sign_up").mask("Loading...");
		   
		    $.ajax(
			{
				url : formURL,
				type: "POST",
			    data : postData,
			    dataType: 'JSON',
			    success: function(data){
			    	if(data.status == 'sucess'){
			    		if(data.state == 'loggedin'){
			    			$("#sign_up").unmask();
			    			alert('Updated Successfully');
			    		}else if(data.state == 'notloggedin'){
			    			//alert(1);
			    			$('#sign_up .sign_up_append').html(data.html);
			        		$("#userid").val(data.userid);
			        		$("#mobileno").val(data.mobileno);
			        		$("#emailid").val(data.user_email);
			        		$("#sign_up").unmask();
			    		}
			    	}
			    }
			});
			return false;
		    
		});
		
	};
	
	// --------------------------------------------------------------------	
	
	var onUpdateMobileNumberLoggedin = function(){
		
		$(document).on('submit','.user-password-form',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL  = $(this).attr("action");
		    
		    $("#sign_up").mask("Loading...");
		   
		    $.ajax(
			{
				url : formURL,
				type: "POST",
			    data : postData,
			    dataType: 'JSON',
			    success: function(data){
			    	if(data.status == 'sucess'){
			    		$("#sign_up").unmask();
			    		$('#login-tabs').html(data.html);	
			    		$('#sign_up .sign_up_append').html('Mobile Number is updated successfully');
			    	}
			    }
			});
			return false;
		    
		});
		
	};

	
	// --------------------------------------------------------------------	

	/**
	 * Initialize javascript module
	 *
	 * @access	public
	 */

	var initialize = function(){
		if(contactSeller.length > 0)
		{
			initializeContactSellerForm();
		}

	};

	return {
		initialize: initialize,
		requestCallToSeller:requestCallToSeller,
	};
});