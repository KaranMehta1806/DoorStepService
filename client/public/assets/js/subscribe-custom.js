// Subscribe form JS
$(".newsletter-form").validator().on("submit", function (event) {
	if (event.isDefaultPrevented()) {
	// handle the invalid form...
		formErrorSub();
		submitMSGSub(false, "Please enter your email correctly.");
	} else {
		// everything looks good!
		event.preventDefault();
	}
});
function callbackFunction (resp) {
	if (resp.result === "success") {
		formSuccessSub();
	}
	else {
		formErrorSub();
	}
}
function formSuccessSub(){
	$(".newsletter-form")[0].reset();
	submitMSGSub(true, "Thank you for subscribing!");
	setTimeout(function() {
		$("#validator-newsletter, #validator-newsletter-2").addClass('hide');
	}, 4000)
}
function formErrorSub(){
	$(".newsletter-form").addClass("animated shake");
	setTimeout(function() {
		$(".newsletter-form").removeClass("animated shake");
	}, 1000)
}
function submitMSGSub(valid, msg){
	if(valid){
		var msgClasses = "validation-success";
	} else {
		var msgClasses = "validation-danger";
	}
	$("#validator-newsletter, #validator-newsletter-2").removeClass().addClass(msgClasses).text(msg);
}

// AJAX MailChimp JS
$(".newsletter-form").ajaxChimp({
	url: "https://Envy Theme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
	callback: callbackFunction
});