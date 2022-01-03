function readURL(input) {
  console.log('------------------------------------------');
  console.log(input);
  console.log('------------------------------------------');
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#displayImage').attr('src', e.target.result);
      $('#img').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function readURL2(input) {
  console.log('------------------------------------------');
  console.log(input);
  console.log('------------------------------------------');
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#displayImage2').attr('src', e.target.result);
      $('#img2').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function () {
  $('#pilihanGambar').change(function () {
    $('#displayImage').attr('src', $(this).val());
    $('#img').attr('src', $(this).val());
  });
});

$(document).ready(function () {
  $('#pilihanGambar2').change(function () {
    $('#displayImage2').attr('src', $(this).val());
    $('#img2').attr('src', $(this).val());
  });
});
