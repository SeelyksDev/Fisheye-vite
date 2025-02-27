export function mediaFactory(data) {
    return {
        id: data.id,
        photographerId: data.photographerId,
        title: data.title,
        image: data.image || null,
        video: data.video || null,
        likes: data.likes
    };
}