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

// second step--------------------------------------------------------------------
function allCheckGeneral() {
  const isNamePass = $('input[name=name]').hasClass('success');
  const isPhonePass = $('input[name=phone]').hasClass('success');
  const isYearPass = $('select[name=year]').hasClass('success');
  const isMonthPass = $('select[name=month]').hasClass('success');
  const isDayPass = $('select[name=day]').hasClass('success');
  const isCityPass = $('select[name=city]').hasClass('success');
  const isDistPass = $('select[name=dist]').hasClass('success');
  const isAddressPass = $('input[name=address]').hasClass('success');
  const isAllPass = isNamePass && isPhonePass && isYearPass && isMonthPass
    && isDayPass && isCityPass && isDistPass && isAddressPass;
  const $nextBtn = $('.formGeneral .nextBtn');
  $nextBtn.attr('href', `${isAllPass ? './step3.html' : 'javascript:;'}`);
  $nextBtn[isAllPass ? 'addClass' : 'removeClass']('successBtn');
}

function nameChecked() {
  const name = $('input[name=name]').val();
  name !== '' ? $(this).addClass('success') : $(this).removeClass('success');
  allCheckGeneral();
}

function phoneChecked() {
  const phoneNum = $('input[name=phone]').val();
  let isPhoneNumSuccess = /^09\d{8}/.test(phoneNum);
  if (phoneNum === '') isPhoneNumSuccess = '';
  validate(isPhoneNumSuccess, '.phone');
  allCheckGeneral();
}

$('input[name=name]').on('input', nameChecked);
$('input[name=phone]').on('input', phoneChecked);


let startDate = moment('1960/01/01', 'YYYY/MM/DD');
const yearArray = [];
while (startDate.isBefore(moment())) {
  yearArray.push(startDate.format('YYYY'));
  startDate = startDate.add(1, 'y');
}
const yearHTML = yearArray.map(year => `
  <option value="${year}">${year}</option>
`).join('');
$('.formGeneral select[name=year]').html(`<option value="0" disabled selected>YYYY</option>${yearHTML}`);

const monthArray = [];
for (i = 1; i <= 12; i += 1) {
  monthArray.push(i);
}
const monthHTML = monthArray.map(month => `
  <option value="${month}">${month}</option>
`).join('');
$('.formGeneral select[name=month]').html(`<option value="0" disabled selected>MM</option>${monthHTML}`);

function dateChecked() {
  const dayArray = [];
  const currentYear = $('select[name=year]').val();
  const currentMonth = $('select[name=month]').val();
  if (currentYear !== null) $('select[name=year]').addClass('success');
  if (currentMonth !== null) $('select[name=month]').addClass('success');
  if (!currentYear || !currentMonth) return;
  const currentDate = moment(`${currentYear}/${currentMonth}/1`, 'YYYY/MM/DD');
  for (i = 1; i <= currentDate.daysInMonth(); i += 1) {
    dayArray.push(i);
  }
  const dayHTML = dayArray.map(day => `
    <option value="${day}">${day}</option>
  `).join('');
  $('.formGeneral select[name=day]').html(`<option value="0" disabled selected>DD</option>${dayHTML}`);
  allCheckGeneral();
}

$('select[name=year]').on('input', dateChecked);
$('select[name=month]').on('input', dateChecked);
$('select[name=day]').on('input', function () {
  $(this).addClass('success');
});

$.getJSON('region.json', (data) => {
  const cityHTML = data.city.map((city, idx) => `<option value='${idx}'>${city}</option>`).join('');
  $('select[name=city]').html(`<option value="" disabled selected>City</option>${cityHTML}`);
  $('select[name=city]').on('input', function () {
    const distHTML = data.dist[this.value].map((dist, idx) => `<option value="${idx}">${dist}</option>`).join('');
    $('select[name=dist]').html(`<option value="" disabled>Dist</option>${distHTML}`);
    $('select[name=dist]').addClass('success');
  });
});

$('select[name=city]').on('input', function () {
  $(this).addClass('success');
  allCheckGeneral();
});
$('select[name=dist]').on('input', allCheckGeneral);
$('input[name=address]').on('input', function () {
  $(this).val() ? $(this).addClass('success') : $(this).removeClass('success');
  allCheckGeneral();
});

// fourth step--------------------------------------------------------------------
function allCheckPayment() {
  const isCardNumPass = $('input[name=cardNum]').hasClass('success');
  const isCardHolderNamePass = $('input[name=cardHolderName]').hasClass('success');
  const isBankNamePass = $('input[name=bankName]').hasClass('success');
  const isCvvPass = $('input[name=cvv]').hasClass('success');
  const isYearPass = $('select[name=year]').hasClass('success');
  const isMonthPass = $('select[name=month]').hasClass('success');
  const isAllPass = isCardNumPass && isCardHolderNamePass && isBankNamePass
    && isCvvPass && isMonthPass && isYearPass;
  const $nextBtn = $('.formPayment .nextBtn');
  $nextBtn.attr('href', `${isAllPass ? './finish.html' : 'javascript:;'}`);
  $nextBtn[isAllPass ? 'addClass' : 'removeClass']('successBtn');
}

$('.cardNum i').hide();
$('input[name=cardNum]').on('keyup', function (e) {
  this.value = this.value.replace(/\s/g, '');
  const visa = /^4[0-9]{12}(?:[0-9]{3})?$/.test(this.value);
  const master = /^5[1-5][0-9]{14}$/.test(this.value);
  visa ? $('.cardNum #visa').show()
    && $('input[name=cardNum] ').removeClass('warning')
    && $('.cardNum .warningSet').hide()
    && $(this).addClass('success')
    : master ? $('.cardNum #master').show()
      && $('input[name=cardNum] ').removeClass('warning')
      && $('.cardNum .warningSet').hide()
      && $(this).addClass('success')
      : this.value === '' ? $('input[name=cardNum] ').removeClass('warning')
        && $('.cardNum .warningSet').hide()
        && $('.cardNum #visa').hide() && $('.cardNum #master').hide()
        && $(this).removeClass('success')
        : $('input[name=cardNum] ').addClass('warning')
        && $('.cardNum .warningSet').show()
        && $('.cardNum #visa').hide() && $('.cardNum #master').hide()
        && $(this).removeClass('success');
  this.value.length < 19
    && ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))
    && (() => {
      this.value = this.value.replace(/\s/g, '');
      this.value = this.value.replace(/(\d{4})/g, '$1 ');
    })();
  allCheckPayment();
});

$('input[name=cardHolderName]').on('input', function () {
  this.value = this.value.replace(/[^A-Za-z]/g, '');
  $(this)[$(this).val() === '' ? 'removeClass' : 'addClass']('success');
  allCheckPayment();
});

$('input[name=bankName]').on('input', function () {
  this.value = this.value.replace(/[^A-Za-z]/g, '');
  $(this)[$(this).val() === '' ? 'removeClass' : 'addClass']('success');
  allCheckPayment();
});

$('input[name=cvv]').on('input', function () {
  this.value = this.value.replace(/[^\d]/g, '');
  $(this)[this.value.length < 3 ? 'removeClass' : 'addClass']('success');
  allCheckPayment();
});

const expireYear = [];
let startExpireDate = moment('2030/01/01', 'YYYY/MM/DD');
while (startExpireDate.isAfter(moment())) {
  expireYear.push(startExpireDate.format('YY'));
  startExpireDate = startExpireDate.subtract(1, 'y');
}
const expireYearHTML = expireYear.reverse().map(year => `
  <option value="20${year}">${year}</option>
`).join('');
$('.formPayment select[name=year]').html(`<option value="0" disabled selected>YY</option>${expireYearHTML}`);

const expireMonth = [];
for (let i = 1; i <= 12; i += 1) {
  expireMonth.push(i);
}
const expireMonthHTML = expireMonth.map(month => `
  <option value="${month}">${month}</option>
`).join('');
$('.formPayment select[name=month]').html(`<option value="0" disabled selected>MM</option>${expireMonthHTML}`);

$('select[name=year]').on('input', allCheckPayment);
$('select[name=month]').on('input', allCheckPayment);

// third step--------------------------------------------------------------------
const $img = $('.img');
const $form = $('form');
const addedFile = [];
$('.photoList').hide();

const showImage = (list) => {
  $('.photoList').hide();
  $img.find('img').removeAttr('src');
  $img.find('.delete').hide();
  list.forEach((file, idx) => {
    $img.eq(idx).find('img').attr('src', URL.createObjectURL(file));
    $img.eq(idx).find('img').next().css('display', 'block');
    $('.photoList').show();
  });
  $('.formUpdate .nextBtn')[list.length === 3 ? 'addClass' : 'removeClass']('successBtn');
  $('.formUpdate .nextBtn').attr('href', `${list.length === 3 ? './step4.html' : 'javascript:;'}`);
  $('.file > div').css('border-color', `${list.length === 3 ? '#0275D8' : 'black'}`);
  $('.file > div').css('color', `${list.length === 3 ? '#0275D8' : '#9B9B9B'}`);
};

$('input[type=file]').on('input', function () {
  $('.formUpdate .warn').hide();
  const selectFile = [].slice.call(this.files);
  $form[0].reset();
  addedFile.length + selectFile.length <= 3
    ? (() => {
      const task = [];
      selectFile.forEach((file) => {
        task.push(new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = function () {
            resolve({ width: this.width, height: this.height });
          };
          img.onerror = ((e) => {
            reject(e.type);
          });
        }));
      });
      Promise.all(task).then((result) => {
        const checkImage = result.length <= 3 && result.every(file => file.width <= 150 || file.height <= 150);
        checkImage
          ? (() => {
            selectFile.forEach((file) => {
              addedFile.push(file);
            });
            showImage(addedFile);
          })()
          : $('.formUpdate .warn').html('<i class="fas fa-exclamation-triangle"></i>FILE IS OVER THE MAXIMUM SIZE').show();
      });
    })()
    : $('.formUpdate .warn').html('<i class="fas fa-exclamation-triangle"></i>OVER THREE IMAGES').show();
});

$('.delete i').on('click', function () {
  addedFile.splice($img.index($(this).closest('.img')), 1);
  showImage(addedFile);
});
