import { openModal } from './modal';

const refs = {
  loginBtn: document.querySelector('.login'),
  registerBtn: document.querySelector('.register'),
  loginForm: document.querySelector('#login'),
  registerForm: document.querySelector('#register'),
  btnBox: document.querySelector('.button-box'),
  authBtn: document.querySelector('[data-page="log-in"]'),
};

refs.loginBtn.addEventListener('click', onLogin);
refs.registerBtn.addEventListener('click', onRegister);

function onRegister() {
  refs.btnBox.classList.add('active');
}

function onLogin() {
  refs.btnBox.classList.remove('active');
}

refs.authBtn.addEventListener('click', () => {
  openModal('auth');
});
