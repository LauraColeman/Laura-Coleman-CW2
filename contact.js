$(function () {

    // Bootstrap validator

    $('#contact-form').validator();


    // Form submitted
    $('#contact-form').on('submit', function (e) {

        // if succesfully validated
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST 
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    

                    
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                   
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // Reset form when sent
                    if (messageAlert && messageText) {
                        
                        $('#contact-form').find('.messages').html(alertBox);
                        // resets form to blank
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});