import "../../css/style.css";
import { photographerFactory } from "../factories/photographerFactory.js";
import { photographerHomeTemplate } from '../templates/photographerHomeTemplate.js';


export async function getPhotographers() {
    const url = "/src/data/photographers.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`reponse : ${response.status}`);
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

async function displayData(photographers) {
    const photographersSection =  document.querySelector(".photographer_section");

    if (photographersSection) {
        photographers.forEach((photographer) => {
            const photographerData = photographerFactory(photographer);
            const template = photographerHomeTemplate(photographerData).getPhotographerPreviewDOM();
            photographersSection.appendChild(template);
        });
    }
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();