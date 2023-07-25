const body = document.querySelector('#body');
//Navigation
const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');
const navList = document.getElementsByClassName('nav-link');
const btnUp = document.querySelector('#btn-up');
//Modal window
const btnSend = document.querySelector('#contacts-button');
const modalContact = document.querySelector('#modal-contact');
const bg = document.querySelector('#bg');
const btnClose = document.querySelector('#btn-close');
//Modal elements
const inputList = document.getElementsByClassName('input');
const inputsRequired = document.querySelectorAll('#input-name, #input-email')
const inputName = document.querySelector('#input-name');
const inputEmail = document.querySelector('#input-email');
const lblCheck = document.querySelector('#lbl-box');
const lblMobile = document.querySelector('#lbl-in-mobile');
const checkBox = document.querySelector('#checkbox');
const numericInput = document.querySelector('#numeric-input');
const textArea = document.querySelector('#text-area');
const btnSubmit = document.querySelector('#button-submit');

$(document).ready(function() {
  Inputmask().mask(document.getElementById('numeric-input'));
});

if (window.innerHeight <= 500) {
  AOS.init({
    once: true
  });
} else {
  AOS.init();
}

navBtn.onclick = () => {
  if (nav.classList.toggle('open')) {
    body.classList.add('no-scroll')
  } else {
    nav.classList.toggle('open')
    body.classList.remove('no-scroll')
  }
}

btnUp.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Появление кнопки прокрутки в зависимости от позиции пользователя на сайте
window.addEventListener('scroll', () => {
  // определяем величину прокрутки
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
  scrollY > 400 ? btnUp.classList.remove('btn-up-hide') : btnUp.classList.add('btn-up-hide');
});

document.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(nav);
  if (!withinBoundaries && nav.classList.contains('open')) {
    nav.classList.remove('open')
    body.classList.remove('no-scroll')
  }
})

// Появление модального окна по клику на кнопку "Send message"
btnSend.onclick = () => {
  modalContact.classList.add('show-modal')
  bg.classList.add('show-bg')
  body.classList.add('no-scroll')
  btnUp.classList.add('btn-up-hide')
}
function clearModal () {
  for (let i = 0; i < inputList.length; i++) {
    inputList[i].value = ""
  }
  textArea.value = ""
  checkBox.checked = false
  lblMobile.classList.add('mobile-hide')
}

// Закрытие модального окна обратной формы
btnClose.onclick = () => {
  modalContact.classList.remove('show-modal')
  bg.classList.remove('show-bg')
  body.classList.remove('no-scroll')
  btnUp.classList.remove('btn-up-hide')
  clearModal();
}

var t = '';
// Удаление подсказки
for (let i = 0; i < inputList.length; i++) {
  inputList[i].addEventListener('focus', function () {
    t = inputList[i].placeholder;
    inputList[i].placeholder = '';
  })
  inputList[i].addEventListener('blur', function () {
    inputList[i].placeholder = t;
  });
}

lblCheck.onclick = () => {
  if (lblMobile.classList.contains('mobile-hide')) {
    lblMobile.classList.remove('mobile-hide')
  } else {
    lblMobile.classList.add('mobile-hide')
  }
}

numericInput.addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9, +]/g, '');
});

btnSubmit.onclick = () => {
  let num = 'Call on this number: '
  if (numericInput.value != '') {
    num = num + numericInput.value
  } else {
    num = '';
  }
  if (inputName.value != '' && inputEmail.value != '') {
    let offer = "Hello! You have new offer from: " + inputName.value + "\nWrite on Email: " + inputEmail.value + '\n' + num
          + '\nMessage to you:\n' + textArea.value
    alert(offer)

    var formData = offer
    var xhr = new XMLHttpRequest()
    xhr.open('POST', '/send-form.php', true)
    xhr.setRequestHeader('Content-Type', "offer/x-www-form-urlencoded")
    xhr.onload = function() {
      if (xhr.status === 200) {
        alert('Заявка успешно отправлена!');
        // Дополнительные действия после успешной отправки
      } else {
        alert('Ошибка при отправке заявки. Статус: ' + xhr.status);
        // Дополнительные действия при ошибке отправки
      }
    };
    xhr.send(formData);

    clearModal()
    modalContact.classList.remove('show-modal')
    bg.classList.remove('show-bg')
    body.classList.remove('no-scroll')
    btnUp.classList.remove('btn-up-hide')
  }
  else {
    var textArray = [];
    for (let i = 0; i < inputsRequired.length; i++) {
      textArray.push(inputsRequired[i].placeholder)
      if (inputsRequired[i].value == '') {
        inputsRequired[i].placeholder = 'Это обязательное поле*'
        inputsRequired[i].classList.add('void-field')
      }
    }
    setTimeout(function() {
      for (let i = 0; i < inputsRequired.length; i++) {
        inputsRequired[i].placeholder = textArray[i]
        inputsRequired[i].classList.remove('void-field')
      }
    }, 5000);
  }
}

// Адаптив закрытия панеи навигации
window.addEventListener('resize', (e) => {
  if (window.innerWidth <= 1230) {
    for (let i = 0; i < navList.length; i++) {
      navList[i].onclick = () => {
        nav.classList.remove('open');
        body.classList.remove('no-scroll')
      };
    }
  }
});

// Плавная прокрутка к якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    // Скролл к якорной ссылке
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});