import { openModal } from './modal';

const refs = {
  loginBtn: document.querySelector('.login'),
  registerBtn: document.querySelector('.register'),
  loginForm: document.querySelector('#login'),
  registerForm: document.querySelector('#register'),
  btnForm: document.querySelector('.btn-form'),
  authBtn: document.querySelector('[data-page="log-in"]'),
};

refs.loginBtn.addEventListener('click', login);
refs.registerBtn.addEventListener('click', register);

function register() {
  refs.loginForm.style.left = '-450px';
  refs.registerForm.style.left = '20px';
  refs.btnForm.style.left = '180px';
}

function login() {
  refs.loginForm.style.left = '0px';
  refs.registerForm.style.left = '450px';
  refs.btnForm.style.left = '0px';
}

refs.authBtn.addEventListener('click', () => {
  openModal('auth');
});
