import * as styles from './style.md.scss';

function component() {
  const element = document.createElement('div');
  element.classList.add(styles.baseSeed);
  element.innerHTML = 'BASE SEED';
  return element;
}

document.body.appendChild(component());
