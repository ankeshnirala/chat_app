$(document).ready(function () {
  $(".upload-btn").on("click", function () {
    $("#upload-input").click();
  });

  $("#upload-input").on("change", function () {
    const uploadInput = $("#upload-input");

    if (uploadInput.val()) {
      const formData = new FormData();
      formData.append("upload", uploadInput[0].files[0]);

      $.ajax({
        url: "/uploadFile",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
          uploadInput.val("");
        },
      });
    }
  });
});
