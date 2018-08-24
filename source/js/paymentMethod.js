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
