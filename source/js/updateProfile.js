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
