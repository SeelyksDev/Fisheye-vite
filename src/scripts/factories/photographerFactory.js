export function photographerFactory(data) {
    return {
        name: data.name,
        id: data.id,
        city: data.city,
        country: data.country,
        tagline: data.tagline,
        price: data.price,
        portrait: data.portrait
    };
}