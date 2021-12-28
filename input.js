function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#displayImage').attr('src', e.target.result);
      $('#img').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function readURL1() {
  console.log('---------berhasil-------');
}
