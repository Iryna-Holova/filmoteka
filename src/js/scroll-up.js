refs = {
    scrollUp: document.querySelector('#buttonUp'),
}

refs.scrollUp.addEventListener('click', scrollUpFn);

console.log(refs.scrollUp)

function scrollUpFn() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.onscroll = function () { scrollFunction() }

function scrollFunction() {
    if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
        refs.scrollUp.style.display = 'block';
    }
    else {
        refs.scrollUp.style.display = 'none';
    }
}