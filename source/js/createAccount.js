// first step--------------------------------------------------------------------
function allCheck() {
  const isEmailPass = $('input[name=email]').hasClass('success');
  const isPasswordPass = $('input[name=password]').hasClass('success');
  const isConfirmPasswordPass = $('input[name=confirmPassword]').hasClass('success');
  const isAllPass = isEmailPass && isPasswordPass && isConfirmPasswordPass;
  const $nextBtn = $('.formCreate .nextBtn');
  $nextBtn.attr('href', `${isAllPass ? './step2.html' : 'javascript:;'}`);
  $nextBtn[isAllPass ? 'addClass' : 'removeClass']('successBtn');
}

function validate(success, selector) {
  $(`${selector} input`)[success ? 'removeClass' : success === '' ? 'removeClass' : 'addClass']('warning');
  $(`${selector} .warningSet`)[success ? 'hide' : success === '' ? 'hide' : 'show']();
  $(`${selector} input`)[!success ? 'removeClass' : 'addClass']('success');
}

function emailChecked() {
  const email = $('input[name=email]').val();
  let isEmailSuccess = /.+@.+\..+/.test(email);
  if (email === '') isEmailSuccess = '';
  validate(isEmailSuccess, '.account');
  allCheck();
}

function passwordChecked() {
  const password = $('input[name=password]').val();
  let isPasswordSuccess = /.{8,}/.test(password);
  if (password === '') isPasswordSuccess = '';
  validate(isPasswordSuccess, '.password');
  allCheck();
}

function passwordConfirmChecked() {
  const password = $('input[name=password]').val();
  const passwordConfirm = $('input[name=confirmPassword]').val();
  let isConfirmSuccess = password === passwordConfirm;
  if (passwordConfirm === '') isConfirmSuccess = '';
  validate(isConfirmSuccess, '.confirmPassword');
  allCheck();
}

$('input[name=email]').on('input', emailChecked);
$('input[name=password]').on('input', passwordChecked);
$('input[name=confirmPassword]').on('input', passwordConfirmChecked);
