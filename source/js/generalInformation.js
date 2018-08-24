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
