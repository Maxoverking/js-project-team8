const openFtrModalBtn = document.querySelector('[data-modal-btn]');
const ftrModalContainer = document.querySelector('.footer-modal');


openFtrModalBtn.addEventListener('click', openModal);
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
    }
}

function createTeamCardMarkup() {
    
}