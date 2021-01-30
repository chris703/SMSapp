//console.log('estamos en el upload file')

var btnUpload = $(".upload_file"),
box1 = $(".box");
btnUpload.on("change", function (e) {
var ext = btnUpload.val().split('.').pop().toLowerCase();
if ($.inArray(ext, ['json']) == -1) {
    $(".error_msg").text("Not a Json File...");
} else {
    $(".error_msg").text("");
    box1.addClass("file_uploading");
    setTimeout(function () {
        box1.addClass("file_uploaded");
    }, 3000);
    var uploadedFile = URL.createObjectURL(e.target.files[0]);
    setTimeout(function () {
       // $("#uploaded_view").append('<th"' + JSON.parse(uploadedFile) + '" />').addClass("show");
        console.log(uploadedFile);
    }, 3500);
}
});
$(".file_remove").on("click", function (e) {
$("#uploaded_view").removeClass("show");
$("#uploaded_view").find("img").remove();
box1.removeClass("file_uploading");
box1.removeClass("file_uploaded");
})