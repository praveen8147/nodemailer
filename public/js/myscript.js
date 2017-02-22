$(document).ready(function() {

  $("#clear").click(function() {
    $(this).closest('form').find("input[type=text], textarea").val("");
  });

  $("#formApp").validate({
    rules: {
      email: {
        required: true
      },

      subject: {
        required: true
      },
      content: {
        required: true

      }

    }

  });
  $('#btnSubmit').click(function() {
    if ($("#formApp").valid()) {
      alert('Email Sent!!');
      return;
    }
  });
});
