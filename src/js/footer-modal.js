const openFtrModalBtn = document.querySelector('[data-modal-btn]');
const ftrModalContainer = document.querySelector('.footer-modal');
const heartButton = document.querySelector('.heart-btn');
const spanLikes = document.querySelector('.likes');

openFtrModalBtn.addEventListener('click', openModal);
let counter = 1;
heartButton.addEventListener('click', () => {
    spanLikes.textContent = (counter++).toString();
});



function openModal() {
        ftrModalContainer.classList.add('opn-ftr_modal');
        window.addEventListener('click', closeModal);
        document.addEventListener('keydown', closeModal);
}

function closeModal(evt) {
const currentClick = evt.target;
if (evt.key === 'Escape' || currentClick === ftrModalContainer) {
    ftrModalContainer.classList.remove('opn-ftr_modal');
    document.removeEventListener('keydown', closeModal);
    window.removeEventListener('click', closeModal);
}}