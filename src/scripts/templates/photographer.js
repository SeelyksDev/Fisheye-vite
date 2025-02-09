import { displayModal } from '../utils/contactForm.js'

export function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        article.innerHTML = `
            <a href="../../photographer.html?id=${id}" target="_blank">
                <img src=${
                    picture ? picture : "account.png"
                } alt="" aria-hidden="true" ></img>
                <h2>${name}</h2>
                <p class="overview-location">${city}, ${country}</p>
                <p class="overview-description">${tagline}</p>
                <p class="overview-price" aria-label="${price} euros par jour">${price}€/jour</p>
            </a>
        `;
        return article;
    }
    function getDetailsDOM() {
        const photographHeader = document.querySelector(".photograph-header");

        photographHeader.innerHTML = `
            <div class="photograph-header-informations">
                <h1 class="photograph-name" aria-label="${name}.">${name}</h1>
                <address class="photograph-location">
                    <p class="photograph-city" aria-label="${city}.">${city},</p>
                    <p class="photograph-country" aria-label="${country}.">${country}</p>
                </address>
                <p class="photograph-description" aria-label="${tagline}.">${tagline}</p>
            </div>
            <button class="contact_button" aria-haspopup="dialog" aria-label="Ouvrir le formulaire de contact">Contactez-moi</button>
            <img class="photograph-img" src="./assets/photographers/${
                portrait ? portrait : account.png
            }" alt="" aria-label="Photo de ${name}"></img>
        `;

        const pricePerDay = document.querySelector(".price-per-day");
        pricePerDay.innerHTML = `<p class="price" aria-label="${price}€ par jour">${price}€ / jour</p>`;

        const contactButton = document.querySelector(".contact_button");
        contactButton.addEventListener("click", displayModal);
    }

    return { getUserCardDOM, getDetailsDOM };
}
