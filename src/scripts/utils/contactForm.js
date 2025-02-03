import { getPhotographerById } from "../pages/photographer.js";

function handleKeyDownEscape(event) {
    if (event.key === "Escape") {
        closeModal();
    }
}

function handleEnterPress(event) {
    if (event.key === "Enter") {
        closeModal();
    }
}


export function displayModal() {
    const modal = document.getElementById("contact_modal");
    const backgroundTransparent = document.querySelector(".background-modal");
    const closeModalForm = document.querySelector(".close_modal_form");
    const headerPhotograph = document.querySelector('.header-photograph');
    const main = document.getElementById('main');

    modal.style.display = "block";
    backgroundTransparent.style.display = "block";
    closeModalForm.setAttribute('tabIndex', "0")
    closeModalForm.addEventListener("click", closeModal);
    closeModalForm.addEventListener("keydown", handleEnterPress);

    window.addEventListener("keydown", handleKeyDownEscape);
    headerPhotograph.setAttribute("aria-hidden", "true");
    headerPhotograph.setAttribute("inert", "");
    main.setAttribute("aria-hidden", "true");
    main.setAttribute("inert", "");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const backgroundTransparent = document.querySelector(".background-modal");
    const closeModalForm = document.querySelector(".close_modal_form");
    const headerPhotograph = document.querySelector('.header-photograph');
    const main = document.getElementById('main');
    modal.style.display = "none";
    backgroundTransparent.style.display = "none";
    closeModalForm.removeEventListener("click", closeModal);
    closeModalForm.removeEventListener("keydown", handleEnterPress);
    window.removeEventListener("keydown", handleKeyDownEscape);
    headerPhotograph.removeAttribute('aria-hidden');
    headerPhotograph.removeAttribute('inert')
    main.removeAttribute('aria-hidden');
    main.removeAttribute('inert');
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

function sendInformation() {
    const firstname = document.getElementById("firstname").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log({ firstname, name, email, message });
}

const sendBtnForm = document.querySelector(".send_btn_form");
sendBtnForm?.addEventListener("click", (e) => {
    e.preventDefault();
    sendInformation();
});

displayName();
