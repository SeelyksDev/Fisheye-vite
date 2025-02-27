import { renderGallery } from "./renderGallery";
import { updateBorders } from "./updateBorders";

export function handleOptionClick(
    option,
    summary,
    details,
    sortedMedia,
    photographerMedia,
    photographerProfils
) {
    option.setAttribute("tabindex", "0");
    option.addEventListener("click", () => {
        const selectedValue = option.getAttribute("data-value");
        const selectedText = option.textContent;

        const currentlySelected = document.querySelector(".options li.hidden");
        if (currentlySelected) {
            currentlySelected.classList.remove("hidden");
        }

        summary.textContent = selectedText;
        summary.setAttribute("data-value", selectedValue);

        option.classList.add("hidden");
        details.removeAttribute("open");

        if (selectedValue === "popularity") {
            sortedMedia = photographerMedia.sort((a, b) => b.likes - a.likes);
        } else if (selectedValue === "date") {
            sortedMedia = photographerMedia.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
        } else if (selectedValue === "title") {
            sortedMedia = photographerMedia.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }
        renderGallery(sortedMedia, photographerMedia, photographerProfils);
        updateBorders();
    });
}
