import maksymUrl from '../images/team-pictures/maksym.webp'
import sergeyUrl from '../images/team-pictures/sergey.webp'
import ivanKUrl from '../images/team-pictures/ivanK.webp'
import tatianaUrl from '../images/team-pictures/tatiana.webp'
import vanyaUrl from '../images/team-pictures/vanya.webp'
import evgenyUrl from '../images/team-pictures/evgeny.webp'
import romanUrl from '../images/team-pictures/roman.webp'
import romaUrl from '../images/team-pictures/roma.webp'
import SerChistyakovUrl from '../images/team-pictures/SerChistyakov.webp'
import ivanKUrl from '../images/team-pictures/ivanK.webp'

const openFtrModalBtn = document.querySelector('[data-modal-btn]');
const ftrModalContainer = document.querySelector('.footer-modal');
const teamContainer = document.querySelector('.team-container');

openFtrModalBtn.addEventListener('click', openModal);
function openModal() {
        ftrModalContainer.classList.add('opn-ftr_modal');
        window.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
    createTeamCardMarkup()
}

function closeModal(evt) {
const currentClick = evt.target;
if (evt.key === 'Escape' || currentClick === ftrModalContainer) {
    ftrModalContainer.classList.remove('opn-ftr_modal');
    document.removeEventListener('keydown', closeModal);
    window.removeEventListener('click', closeModal);
    teamContainer.innerHTML = '';
    }
}

function createTeamCardMarkup() {
    const markupTeamFooter = `<li class="team-data">
                            <img  class="round" src="${maksymUrl}" alt="Averkin Maksym" >
                            <a class="github" href="https://github.com/Maxoverking" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                          <div class="team-title">
                            <p>Team Leader</p>
                            <span>Averkin Maksym</span>
                          </div>
                            
                        </li>
                        <li class="team-data">
                            <img  class="round" src="${sergeyUrl}" alt="Scrum Sergey Yurtin">
                            <a class="github" href="https://github.com/SergY29" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                            <div class="team-title">
                            <p>Scrum Master</p>
                            <span>Sergey Yurtin</span>
                          </div>
                        </li>
                        <li class="team-data">
                            <img  class="round" src="${ivanKUrl}" alt="Koshel Ivan" >
                            <a class="github" href="https://github.com/Ivan-GoIT" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                            <div class="team-title">
                            <p>Developer</p>
                            <span>Koshel Ivan</span>
                          </div>
                        </li>
                        <li class="team-data">
                            <img  class="round" src="${tatianaUrl}" alt="Tetiana Vielkova" >
                            <a class="github" href="https://github.com/TetianaVielkova" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                            <div class="team-title">
                            <p>Developer</p>
                            <span>Tetiana Vielkova</span>
                          </div>
                        </li>
                        <li class="team-data">
                            <img  class="round" src="${vanyaUrl}" alt="IvanBogachov" >
                            <a class="github" href="https://github.com/IvanBogachov" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                            <div class="team-title">
                            <p>Developer</p>
                            <span>Ivan Bogachov</span>
                          </div>
                        </li>
                        <li class="team-data">
                            <img  class="round" src="${evgenyUrl}" alt="Malobrodsky Evgeni" >
                            <a class="github" href="https://github.com/leroyiq" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                            <div class="team-title">
                            <p>Developer</p>
                            <span>Malobrodsky Evgeni</span>
                          </div>
                        </li>
                        <li class="team-data">
                            <img  class="round" src="${romanUrl}" alt="Roman Denisenko" >
                            <a class="github" href="https://github.com/Romannorish" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                            <div class="team-title">
                            <p>Developer</p>
                            <span>Roman Denisenko</span>
                          </div>
                        </li>
                         <li class="team-data">
                            <img  class="round" src="${romaUrl}" alt="Andrey Serdyukov" >
                            <a class="github" href="https://github.com/s1avyan" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                            <div class="team-title">
                            <p>Developer</p>
                            <span>Andrey Serdyukov</span>
                          </div>
                        </li>
                         <li class="team-data">
                            <img  class="round" src="${SerChistyakovUrl}" alt="Sergey Chistyakov" >
                            <a class="github" href="https://github.com/Sergey3355" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                           <div class="team-title">
                            <p>Developer</p>
                            <span>Sergey Chistyakov</span>
                          </div>
                        </li>
                         <li class="team-data">
                            <img  class="round" src="${SerChistyakovUrl}" alt="Ivan Sytnik" >
                            <a class="github" href="https://github.com/IvanSytnik" aria-label="github">
                            <svg width="26" height="20"; >
                                <use href="/src/images/sprite.svg#icon-github"></use>
                            </svg>
                          </a>
                            <div class="team-title">
                            <p>Developer</p>
                            <span>Ivan Sytnik</span>
                          </div>
                        </li>`
    teamContainer.innerHTML = markupTeamFooter;
}