import { openModal } from './modal';

const refs = {
  loginBtn: document.querySelector('.login'),
  registerBtn: document.querySelector('.register'),
  loginForm: document.querySelector('#login'),
  registerForm: document.querySelector('#register'),
  btnForm: document.querySelector('.btn-form'),
  authBtn: document.querySelector('[data-page="log-in"]'),
};

refs.loginBtn.addEventListener('click', onLogin);
refs.registerBtn.addEventListener('click', onRegister);

function onRegister() {
  refs.loginForm.style.left = '-450px';
  refs.registerForm.style.left = '20px';
  refs.btnForm.style.left = '180px';
  refs.registerBtn.classList.add('active');
  refs.loginBtn.classList.remove('active');
}

function onLogin() {
  refs.loginForm.style.left = '0px';
  refs.registerForm.style.left = '450px';
  refs.btnForm.style.left = '0px';
  refs.registerBtn.classList.remove('active');
  refs.loginBtn.classList.add('active');
}

refs.authBtn.addEventListener('click', () => {
  openModal('auth');
});
