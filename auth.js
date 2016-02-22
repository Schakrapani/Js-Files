/* ===================================================
 * auth.js
 * ===================================================*/

define(
	[
	'Angular',
	'jquery',
	'blockui',
	'jquery-loadmask',
	'magnific-popup',
	'app/contact'],
	function(
		$,
		Blockui,
		Loadmask,
		MagnificPopup,
		Contact){
	
	// --------------------------------------------------------------------
	// Private variables
	var loginDropdown = $('.login-dropdown');
	var minutesToMonitor = 100000;
	var requestLoopTimer = -1;
	

	// --------------------------------------------------------------------	

	/**
	 * Initialize auth form
	 *
	 * @access	private
	 */

	var initializeAuthForm = function(){
		onLoginLinkClick();
		onAuthTabClick();
		dismissAuthDropdown();
		onUserRegisterFormSubmit();
		onUserOtpFormSubmit();
		onUserLoginFormSubmit();
		onUserPasswordResetFormSubmit();
		onForgotPasswordClick();
		onUserForgotpasswordFormSubmit();
		onUserForgotpasswordotpFormSubmit();
		onUserForgotpasswordresetFormSubmit();
	};
	
	
	// --------------------------------------------------------------------	
	
	var onForgotPasswordClick = function(){
		$(document).on('click','#forgot-password',function(e){
			e.preventDefault();
			var classname = $(this).attr("class");
			var listingid = $('#result_listing_id').val();
			var emailid   = $('#result_user_email').val();
			var mobileno  = $('#result_user_mobile').val();
			
			if(classname == 'login-form'){
				$('.ulogin').hide();
				$('.ulogin').hide();
				$('#user-forgot-pass-form').show();
			}else if(classname == 'contactseller-form'){
				var formURL   = $(this).attr('href');
				var postData  = '';
				$("#sign_up").mask("Loading...");
				$.ajax(
				{
					url : formURL,
					type: "POST",
					data : postData,
					dataType: 'JSON',
					success: function(data){
						if(data.status == 'sucess'){
							$('#sign_up .sign_up_append').html(data.html);
							$('#uloginemail').val(emailid);
							$('#uformobile').val(mobileno);
							$('#listingid').val(listingid);
			        		$("#sign_up").unmask();
						}
					}
				});
				return false;
			}
			
		});
	};
	
	// --------------------------------------------------------------------	
	
	/**
	 * On Submit of Forgotpassword form
	 *
	 * @access	private
	 */
	
	
	var onUserForgotpasswordFormSubmit = function(){

		$(document).on('submit','.user-forgot-password-modal-form',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL  = $(this).attr("action");
		    var valId    = $('#form-type').val();
		    var listingid= $('#listingid').val();
		    
		    if(valId == 'login-form'){
		    	$("#login-tabs").mask("Loading...");
		    }
		    if(valId == 'contact-seller'){
		    	$("#sign_up").mask("Loading...");
		    }
		    		    
		    $.ajax(
		    {
		        url : formURL,
		        type: "POST",
		        data : postData,
		        dataType: 'JSON',
		        success: function(data){
		        	if(data.status == 'sucess'){
		        		if(valId == 'login-form'){
			        		$('#user-forgot-error').hide();
			        		$("#login-tabs").unmask();
			        		$('#login-tabs').html(data.html);
			        		$('#form-type').val(valId);
		        		}
		        		if(valId == 'contact-seller'){
		        			$('#sign_up .sign_up_append').html(data.html);
		        			$('#form-type').val(valId);
		        			$('#listingid').val(listingid);
		        			$("#sign_up").unmask();
		    		    }
		        	}else if(data.status == 'error'){
		        		if(valId == 'login-form'){
		        			$("#login-tabs").unmask();
		        		}
		        		if(valId == 'contact-seller'){
		        			$("#sign_up").unmask();
		    		    }
		        		if(data.user_forgot_email == 'User Forgot Email cannot be blank.'){
			    			$('#user-forgot-email').show();
			    		}else{
			    			$('#user-forgot-email').hide();
			    		}
			    		if(data.user_forgot_mobile == 'User Forgot Mobile cannot be blank.'){
			    			$('#user-forgot-mobile').show();
			    		}
			    		else{
			    			$('#user-forgot-mobile').hide();
			    			if(data.user_forgot_mobile['0'] == 'User Forgot Mobile must be a number.'){
				    			$('#user-forgot-mobile').html('Please enter valid Mobile Number.');
				    			$('#user-forgot-mobile').show();
				    		}
			    			else if(data.user_forgot_mobile['0'] == 'User Forgot Mobile is too short (minimum is 10 characters).' || data.user_pass == 'User Forgot Mobile is too long (maximum is 11 characters).'){
				    			$('#user-forgot-mobile').html('Mobile Number should length of 10 to 11 characters.');
				    			$('#user-forgot-mobile').show();
				    		}
			    			else if(data.user_forgot_mobile['1'] == 'User Forgot Mobile is too short (minimum is 10 characters).' || data.user_pass == 'User Forgot Mobile is too long (maximum is 11 characters).'){
				    			$('#user-forgot-mobile').html('Mobile Number should length of 10 to 11 characters.');
				    			$('#user-forgot-mobile').show();
				    		}else{
				    			$('#user-forgot-mobile').hide();
				    		}
			    	  }
			    		
		        	}else if(data.status == 'failure'){
		        		if(valId == 'login-form'){
		        			$("#login-tabs").unmask();
		        		}
		        		if(valId == 'contact-seller'){
		        			$("#sign_up").unmask();
		    		    }
		        		$('#user-forgot-error').html('The email you entered is incorrect.');
		    			$('#user-forgot-error').show();
		    			
		        	}
		        }

		    });
			return false;
		});
	};
	
	// --------------------------------------------------------------------
	
	/**
	 * On Submit of Forgotpasswordotp form
	 *
	 * @access	private
	 */
	
	
	var onUserForgotpasswordotpFormSubmit = function(){

		$(document).on('submit','.user-forgot-otp-password-modal-form',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL  = $(this).attr("action");
		    var valId    = $('#form-type').val();
		    var listingid= $('#listingid').val();
		    
		    if(valId == 'login-form'){
		    	$("#login-tabs").mask("Loading...");
		    }
		    if(valId == 'contact-seller'){
		    	$("#sign_up").mask("Loading...");
		    }
		    		    
		    $.ajax(
		    {
		        url : formURL,
		        type: "POST",
		        data : postData,
		        dataType: 'JSON',
		        success: function(data){
		        	if(data.status == 'success'){
		        		if(valId == 'login-form'){
			        		$("#login-tabs").unmask();
			        		$('#login-tabs').html(data.html);
			        		$('#form-type').val(valId);	
		        		}	
		        		if(valId == 'contact-seller'){
		        			$('#sign_up .sign_up_append').html(data.html);
		        			$('#form-type').val(valId);
		        			$('#listingid').val(listingid);
		        			$('#mobileno').val(data.mobileno);
			        		$("#sign_up").unmask();
		    		    }
		        	}else if(data.status == 'error'){
		        		if(valId == 'login-form'){
		        			$("#login-tabs").unmask();
		        		}
		        		if(valId == 'contact-seller'){
		        			$("#sign_up").unmask();
		    		    }
		        		if(data.message == 'Enter Otp Number'){
		        			$('#forgot-otp-error').html('Please enter Otp Number.');
			    			$('#forgot-otp-error').show();
			    		}
			    	}else if(data.status == 'failure'){
			    		$("#login-tabs").unmask();
			    		if(valId == 'contact-seller'){
		        			$("#sign_up").unmask();
		    		    }
			    		if(data.message == 'Enter Valid Otp'){
			    			$('#forgot-otp-error').html('Please enter Valid Otp Number.');
			    			$('#forgot-otp-error').show();
			    		}
			    	}else{
			    		if(valId == 'login-form'){
			    			$("#login-tabs").unmask();
			    		}
			    		if(valId == 'contact-seller'){
		        			$("#sign_up").unmask();
		    		    }
		    			$('#forgot-otp-error').hide();
		    		}
		        }

		    });
			return false;
		});
	};
	
	// --------------------------------------------------------------------
	
	/**
	 * On Submit of Forgotpasswordotp form
	 *
	 * @access	private
	 */
	
	
	var onUserForgotpasswordresetFormSubmit = function(){

		$(document).on('submit','.user-forgot-reset-password-modal-form',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL  = $(this).attr("action");
		    var valId    = $('#form-type').val();
		    var listingid= $('#listingid').val();
		    
		    if(valId == 'login-form'){
		    	$("#login-tabs").mask("Loading...");
		    }
		    if(valId == 'contact-seller'){
		    	$("#sign_up").mask("Loading...");
		    }
		    
		    $.ajax(
		    {
		        url : formURL,
		        type: "POST",
		        data : postData,
		        dataType: 'JSON',
		        success: function(data){
		        	if(data.status == 'sucess'){
		        		if(valId == 'login-form'){
			        		$('#ul-tabs').remove();
							$('.uregister').remove();
							$('.ulogin').remove();
							$('#login-tabs').html(data.html);
							$('#form-type').val(valId);
			        		$("#login-tabs").unmask();
		        		}
		        		if(valId == 'contact-seller'){
		        			 $('#sign_up .sign_up_append').html(data.html);
		        			 $('#form-type').val(valId);
		        			 $('#listingid').val(listingid);
		        			 $('#ul-tabs').remove();
							 $('.uregister').remove();
							 $('.ulogin').remove();
							 $('#login-tabs').html(data.html_ano);
				        	 $("#sign_up").unmask();
				        	 if(data.sellertype == 'call'){
				        		 Contact.requestCallToSeller(data.url,{userid: data.userid,listingid: data.listingid,mobileno: data.mobile_number}); 
				        	 }
				        	 
		      		    }
		        		
		        	}else if(data.status == 'error'){
		        		if(valId == 'login-form'){
		        			$("#login-tabs").unmask();
		        		}
		        		if(valId == 'contact-seller'){
		        			$("#sign_up").unmask();
		      		    }
		        		if(data.user_new_password == 'User New Password cannot be blank.'){
			    			$('#user-forgot-new-password').show();
			    		}else if(data.user_new_password['0'] == 'User New Password is too short (minimum is 6 characters).' || data.user_new_password['0'] == 'User New Password is too long (maximum is 16 characters).'){
			    			$('#user-forgot-new-password').html('Password should length of 6 to 16 characters.');
			    			$('#user-forgot-new-password').show();
			    		}else{
			    			$('#user-forgot-new-password').hide();
			    		}
			    		if(data.user_confirm_password == 'User Confirm Password cannot be blank.'){
			    			$('#user-forgot-confirm-password').show();
			    		}else{
			    			$('#user-forgot-confirm-password').hide();
			    		}
			    		if(data.user_new_password['0'] == 'User New Password must be repeated exactly.' || data.user_new_password['1'] == 'User New Password must be repeated exactly.'){
			    			$('#user-forgot-confirm-password').html('Password and Confirm password mismatch.');
			    			$('#user-forgot-confirm-password').show();
			    		}else{
			    			$('#user-forgot-confirm-password').hide();
			    		}
			    	}else if(data.status == 'failure'){
			    		if(valId == 'login-form'){
			    			$("#login-tabs").unmask();
			    		}
			    		if(valId == 'contact-seller'){
		        			$("#sign_up").unmask();
		      		    }
			    		if(data.message == 'Password Not Update Successfully.'){
			    			$('#user-forgot-confirm-password').html('Password Not Update Successfully.');
			    			$('#user-forgot-confirm-password').show();
			    		}
			    	}
		        }

		    });
			return false;
		});
	};
	
	// --------------------------------------------------------------------
	
	/**
	 * On Submit of user registration form
	 *
	 * @access	private
	 */
	
	var onUserRegisterFormSubmit = function(){
		
		$(document).on('submit','.user-register-modal-form',function(e){
			
			e.preventDefault();
			
			var postData = $(this).serializeArray();
		    var formURL  = $(this).attr("action");
		    
		    var email   = $('#uemailid').val();
		    var mobile  = $('#umobileno').val();
		    
		    //postData.push({name: 'user_registration', value: 'user-registration'});
		    
		    $("#login-tabs").mask("Loading...");
		    
			$.ajax(
			{
				url : formURL,
				type: "POST",
			    data : postData,
			    dataType: 'JSON',
			    success: function(data){
			    	//alert(data.status);
			    	if(data.status == 'sucess'){
			    		$('#ul-tabs').remove();
						$('.uregister').remove();
						$('.ulogin').remove();
			    		$('#login-tabs').html(data.html);
			    		$("#login-tabs").unmask();
			    		$('#userid').val(data.userid);
		        		$('#mobileno').val(data.mobile_number);	
			    		var missvalue = 'missedcall';
			    		requestLoopVerfication(data.url,{userid: data.userid,user_registration: missvalue,mobileno: data.mobile_number});
			    	}else if(data.status == 'error'){
			    		$("#login-tabs").unmask();
			    		
			    		if(data.user_name == 'User Name cannot be blank.'){
			    			$('#user_name').show();
			    		}else{
			    			$('#user_name').hide();
			    		}
			    		if(data.user_mobile == 'User Mobile cannot be blank.'){
			    			$('#user_mobile').show();
			    		}else if(data.user_mobile == 'User Mobile must be a number.'){
			    			$('#user_mobile').html('Please enter valid Mobile Number.');
			    			$('#user_mobile').show();
			    		}
			    		else{
			    			$('#user_mobile').hide();
			    		}
			    		if(data.user_email == 'User Email cannot be blank.'){
			    			$('#user_email').show();
			    		}else if(data.user_email == 'User Email is not a valid email address.'){
			    			$('#user_email').html('Please enter valid Email.');
			    			$('#user_email').show();
			    		}else if(data.user_email == 'email already exist.'){
			    			$('#user_email').html('Email already exists.');
			    			$('#user_email').show();
			    			$('#sign-in-tab').click();
			    			$('#email-mobil-error').html('<b>An account with EmailID '+email+' already exists.</b>');
			    			$('#uloginemail').val(email);
			    		}
			    		else{
			    			$('#user_email').hide();
			    		}
			    		if(data.user_pass == 'User Pass cannot be blank.'){
			    			$('#user_pass').show();
			    		}else if(data.user_pass == 'User Pass is too short (minimum is 6 characters).' || data.user_pass == 'User Pass is too long (maximum is 16 characters).'){
			    			$('#user_pass').html('Password should length of 6 to 16 characters.');
			    			$('#user_pass').show();
			    		}			    		
			    		else{
			    			$('#user_pass').hide();
			    		}
			    		if(data.user_confirm_pass == 'User Confirm Pass cannot be blank.'){
			    			$('#user_confirm_pass').show();
			    		}else{
			    			$('#user_confirm_pass').hide();
			    		}
			    		if(data.user_pass == 'User Pass must be repeated exactly.'){
			    			$('#user_confirm_pass').html('Password and Confirm password mismatch.');
			    			$('#user_confirm_pass').show();
			    		}else{
			    			$('#user_confirm_pass').hide();
			    		}
			    		/*if(data.user_mobile == 'email and mobile number already exist.'){
			    			$('#sign-in-tab').click();
			    			$('#email-mobil-error').html('<b>An account with EmailID '+email+' and Mobile Number '+mobile+' already exists.</b>');
			    			$('#uloginemail').val(email);
			    		}*/
			    					    		
		        		if(data.message == 'exception'){
		        			$('#error-ex').show();
		        		}else{
		        			$('#error-ex').hide();
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

	var requestLoopVerfication = function(url,data){
		var time = 0;
		requestLoopTimer = setInterval(function(){
			time += 3000;
			if(time < minutesToMonitor)
			{
				$.ajax({
					url: url,
					type: "POST",
					data: data,
					dataType: 'JSON',
					success: function(data){
						//alert(data);
						if(data.status == 'sucess'){
							$('.user-otp-form').remove();
			        		$('#login-tabs').html(data.html);
			        		clearInterval(requestLoopTimer);
			        		$("#login-tabs").unmask();
			        	}else if(data.status == 'failure'){
			        		$("#sign_up").unmask();
			        		//alert(data.message);
			        	}
						
					}
				});
			}else{
				$.magnificPopup.close();
				clearInterval(requestLoopTimer);
			}
			
		},3000);

	};

	// --------------------------------------------------------------------
	
	/**
	 * On Submit of Otp form
	 *
	 * @access	private
	 */
	
	
	var onUserOtpFormSubmit = function(){

		$(document).on('submit','.user-otp-form',function(e){
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL = $(this).attr("action");
		    
		    $("#login-tabs").mask("Loading...");
		    
		    $.ajax(
		    {
		        url : formURL,
		        type: "POST",
		        data : postData,
		        dataType: 'JSON',
		        success: function(data){
		        	//alert(data.message);
		        	$("#sign_up").unmask();
		        	if(data.status == 'sucess'){
		        		$('.user-otp-form').remove();
		        		$('#login-tabs').html(data.html);
		        		$("#login-tabs").unmask();
		        		clearInterval(requestLoopTimer);
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
	 * On Submit of login form
	 *
	 * @access	private
	 */
		
	var onUserLoginFormSubmit = function(){
		
		$(document).on('submit','.user-login-modal-form',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL = $(this).attr("action");
		    
		    $("#login-tabs").mask("Loading...");

			$.ajax(
			{
				url : formURL,
				type: "POST",
				data : postData,
				dataType: 'JSON',
				success: function(data){
					//alert(data);
					if(data.status == 'sucess'){
						$('#ul-tabs').remove();
						$('.uregister').remove();
						$('.ulogin').remove();
		    			$('#login-tabs').html(data.html);
						$("#login-tabs").unmask();
					}else if(data.status == 'error'){
		        		$("#login-tabs").unmask();
		        		if(data.user_email == 'User Email cannot be blank.'){
		        			$('#user_login_email').show();
			    		}else{
			    			$('#user_login_email').hide();
			    		}
		        		if(data.user_pass == 'User Pass cannot be blank.'){
			    			$('#user_login_pass').show();
			    		}else{
			    			$('#user_login_pass').hide();
			    		}
		        		if(data.incorrect == 'Incorrect username or password.'){
		        			$('#user_login_error').html('The email or password you entered is incorrect.');
			    			$('#user_login_error').show();
		        		}else{
		        			$('#user_login_error').hide();
		        		}
		        	}
					
					
				}
			
			});
			return false;
			
		});
		
	};
	
	// --------------------------------------------------------------------
	
	/**
	 * On User Password Reset Form.
	 *
	 * @access	private
	 */
		
	var onUserPasswordResetFormSubmit = function(){
		
		$(document).on('submit','.user-email-verify',function(e){
			
			e.preventDefault();
			var postData = $(this).serializeArray();
		    var formURL = $(this).attr("action");
		    
		    alert(formURL);
		    
		    //$("#login-tabs").mask("Loading...");

			$.ajax(
			{
				url : formURL,
				type: "POST",
				data : postData,
				dataType: 'JSON',
				success: function(data){
					alert(data);
					/*if(data.status == 'sucess'){
						$('#ul-tabs').remove();
						$('.uregister').remove();
						$('.ulogin').remove();
		    			$('#login-tabs').append(data.html);
						$("#login-tabs").unmask();
					}else if(data.status == 'error'){
		        		$("#login-tabs").unmask();
		        		if(data.user_email == 'User Email cannot be blank.'){
		        			$('#user_login_email').show();
			    		}else{
			    			$('#user_login_email').hide();
			    		}
		        		if(data.user_pass == 'User Pass cannot be blank.'){
			    			$('#user_login_pass').show();
			    		}else{
			    			$('#user_login_pass').hide();
			    		}
		        		if(data.incorrect == 'Incorrect username or password.'){
		        			$('#user_login_error').html('The email or password you entered is incorrect.');
			    			$('#user_login_error').show();
		        		}else{
		        			$('#user_login_error').hide();
		        		}
		        	}*/
				}
			
			});
			return false;
			
		});
		
	};


	// --------------------------------------------------------------------	

	/**
	 * on click of login link in header
	 *
	 * @access	private
	 */

	var onLoginLinkClick = function(){
		loginDropdown.click(function(e){
			e.preventDefault();
			e.stopPropagation();
			if(!$(this).hasClass('active'))
			{
				initBlockUi();
				$(this).addClass('active');
				$('.login-blk').show();
			}
		});
		
	};

	var initBlockUi = function(){
		$.blockUI.defaults.overlayCSS.cursor = 'auto';
		$.blockUI.defaults.baseZ = 999;
		$.blockUI({ 
			message: null,
			bindEvents: false
		});
	};


	var dismissAuthDropdown = function(){
		$(document).click(function (e)
		{
			if($(e.target).closest('.login-blk').length == 0){
				if($('.login-blk').is(':visible'))
				{
					
		       	 	$('.login-blk').hide();
		        	$.unblockUI();
		        	loginDropdown.removeClass('active');
				}
			}
			
		});
	};
	

	// --------------------------------------------------------------------	

	/**
	 * Auth forms Tab Switch
	 *
	 * @access	private
	 */

	var onAuthTabClick = function(){
		$(document).on('click','#login-tabs ul li a',function(e){
			e.preventDefault();
			$('#login-tabs ul li').removeClass('active');
			$(this).parent().addClass('active');
			$('#login-tabs .tab').removeClass('active');
			$($(this).attr('href')).addClass('active');
		});
		
	};
	
	


	// --------------------------------------------------------------------	

	/**
	 * Initialize javascript module
	 *
	 * @access	public
	 */

	var initialize = function(){
		if(loginDropdown.length > 0){
			initializeAuthForm();
		}
		
	};

	return {
		initialize: initialize,
	};
});
