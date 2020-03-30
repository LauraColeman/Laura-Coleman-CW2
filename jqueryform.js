//Form validation.
//General Outline and guidance from https://github.com/1000hz/bootstrap-validator, https://mdbootstrap.com/snippets/jquery/temp/1911742?action=prism_export, https://codepen.io/JacobLett/full/EPbZOr and https://github.com/bootstrapbay/contact-form/blob/master/index.php.

$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
       
        formError();
        submitMSG(false, "Have you missed something?");
    } else {
       
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    $.ajax({
        type: "POST",
        url: "assets/php/form-process.php",
        data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted. We will get back to you as soon as possible.")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}