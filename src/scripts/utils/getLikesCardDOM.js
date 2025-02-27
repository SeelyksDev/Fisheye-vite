export function getLikesCardDOM(card, number) {
    const cardLikeElement = card.querySelector(".number-likes");
    if (cardLikeElement) {
        cardLikeElement.textContent = number;
    }
}