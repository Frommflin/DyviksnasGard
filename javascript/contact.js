$(document).on("submit", "#contactForm", function(event){
    event.preventDefault();

    $.ajax({
        url: "./php/contactEmail.php",
        method: "POST",
        data: new FormData(this),
        contentType:false,
        processData:false,
        success: function(data){
            alert(data);
        },
        error: function(error){
            alert(error);
        }
    })
});