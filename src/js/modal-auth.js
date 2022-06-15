import { openModal } from './modal';

const refs = {
  loginBtn: document.querySelector('.login'),
  registerBtn: document.querySelector('.register'),
  loginForm: document.querySelector('#login'),
  registerForm: document.querySelector('#register'),
  btnForm: document.querySelector('.btn-form'),
  authBtn: document.querySelector('.auth-btn'),
};

refs.loginBtn.addEventListener('click', login);
refs.registerBtn.addEventListener('click', register);

function register() {
  refs.loginForm.style.left = '-400px';
  refs.registerForm.style.left = '50px';
  refs.btnForm.style.left = '110px';
}

function login() {
  refs.loginForm.style.left = '50px';
  refs.registerForm.style.left = '450px';
  refs.btnForm.style.left = '0px';
}

refs.authBtn.addEventListener('click', () => {
  openModal('auth');
  //   console.log('refs.autnBtn');
});
