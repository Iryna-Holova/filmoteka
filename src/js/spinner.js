import {Spinner} from 'spin.js';

const opts = {
  lines: 10,
  length: 44,
  width: 21,
  radius: 45,
  scale: 0.5,
  corners: 1,
  speed: 1,
  rotate: 0,
  animation: 'spinner-line-fade-quick',
  direction: 1,
  color: '#ff6b08',
  fadeColor: 'transparent',
  top: '50%',
  left: '50%',
  shadow: '0 0 1px transparent',
  zIndex: 2000000000,
  className: 'spinner',
  position: 'absolute',
};

export const spinner = new Spinner(opts);