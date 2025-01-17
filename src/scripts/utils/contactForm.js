import { getPhotographerById } from "../pages/photographer.js";

export function displayModal() {
    const modal = document.getElementById("contact_modal");
    const backgroundTransparent = document.querySelector(".background-modal");
    const closeModalForm = document.querySelector('.contact_modal_form');
    modal.style.display = "block";
    backgroundTransparent.style.display = "block";
    closeModalForm.addEventListener('click', closeModal)
}

 function closeModal() {
    const modal = document.getElementById("contact_modal");
    const backgroundTransparent = document.querySelector(".background-modal");
    modal.style.display = "none";
    backgroundTransparent.style.display = "none";
}

async function displayName() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");
    const toNumberId = Number(photographerId);

    if (photographerId) {
        const { photographerDetails } = await getPhotographerById(toNumberId);

        if (photographerDetails) {
            const modalTitle = document.querySelector(".modal-title");
            const span = document.createElement("span");
            span.classList.add("modal-title-name");
            span.textContent = photographerDetails.name;
            modalTitle.appendChild(span);
        }
    }
}

displayName();
