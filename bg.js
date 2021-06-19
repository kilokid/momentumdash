const body = document.querySelector('body');
const IMAGE_NUMBER = 4;

function showImage(number) {
    const img = new Image();
    img.src = `img/${number + 1}.jpg`;
    img.classList.add('bgImage');
    body.prepend(img);
}

function getRandom() {
    const number = Math.floor(Math.random() * IMAGE_NUMBER);
    return number;
}
function init() {
    const randomNumber = getRandom();
    showImage(randomNumber);
}

init();