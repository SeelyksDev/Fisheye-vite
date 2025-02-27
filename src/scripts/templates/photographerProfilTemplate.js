import { displayModal } from '../utils/contactForm.js';

export function photographerProfilTemplate(data) {
    function getProfilDOM() {
        const photographHeader = document.querySelector(".photograph-header");

        photographHeader.innerHTML = `
            <div class="photograph-header-informations">
                <h1 class="photograph-name" aria-label="${data.name}.">${data.name}</h1>
                <address class="photograph-location">
                    <p class="photograph-city" aria-label="${data.city}.">${data.city},</p>
                    <p class="photograph-country" aria-label="${data.country}.">${data.country}</p>
                </address>
                <p class="photograph-description" aria-label="${data.tagline}.">${data.tagline}</p>
            </div>
            <button class="contact_button" aria-haspopup="dialog" aria-label="Ouvrir le formulaire de contact">Contactez-moi</button>
            <img class="photograph-img" src="./assets/photographers/${
                data.portrait ? data.portrait : "account.png"
            }" alt="" aria-label="Photo de ${data.name}"></img>
        `;

        const pricePerDay = document.querySelector(".price-per-day");
        pricePerDay.innerHTML = `<p class="price" aria-label="${data.price}€ par jour">${data.price}€ / jour</p>`;

        const contactButton = document.querySelector(".contact_button");
        contactButton.addEventListener("click", displayModal);
    }
    return { getProfilDOM }
}
