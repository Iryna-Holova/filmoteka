// функционал спиннера, используется в асинхронных функциях

const markup = `<div class="half-circle-spinner">
  <div class="circle circle-1"></div>
  <div class="circle circle-2"></div>
</div>`;

export default function addSpinner(container) {
    container.innerHTML = markup;
}