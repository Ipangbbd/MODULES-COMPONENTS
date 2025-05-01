const imgUpload = document.getElementById('imageUpload');
const loadImgBtn = document.getElementById('loadImage');
const gridSizeInput = document.getElementById('gridSize');
const imgContainer = document.getElementById('imageContainer');

loadImgBtn.addEventListener('click', () => imageUpload.click());
imgUpload.addEventListener('change', handleImageUpload);

function handleImageUpload(event){
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => createImageGrid(reader.result);
        reader.readAsDataURL(file);
    }
}

function createImageGrid(imageSrc) {
    imgContainer.innerHTML = ``;
    const gridSize = parseInt(gridSizeInput.value) || 4;
    const cardWidth = imgContainer.clientWidth / gridSize;
    const cardHeight = imgContainer.clientHeight / gridSize;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const card = document.createElement('div');

            card.className = 'card';
            card.style.width = `${cardWidth}px`;
            card.style.height = `${cardHeight}px`;
            card.style.left = `${col * cardWidth}px`;
            card.style.top = `${row * cardHeight}px`;
            card.style.backgroundImage = `url('${imageSrc}')`;
            card.style.backgroundSize = `${imgContainer.clientWidth}px ${imgContainer.clientHeight}px`;
            card.style.backgroundPosition = `-${col * cardWidth}px -${row * cardHeight}px`;

            card.addEventListener('click', () => makeCardDisappear(card));
            imgContainer.appendChild(card);
        }
    }
}

function makeCardDisappear(card) {
    card.classList.add('disappearing');
    setTimeout(() => card.remove(), 500);
    if (!document.querySelector('.card:not(.disappearing)')) {
        setTimeout(() => alert('all card have been disappeared!'), 500);
    }
}