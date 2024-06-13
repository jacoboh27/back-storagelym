export default {
    servicio_list: (servicio) => {
        return {
            _id: servicio._id,
            title: servicio.title,
            description: servicio.description,
            price_pesos: servicio.price_pesos,
            imagen: servicio.imagen,
            state: servicio.state,
        }
    },
    servicio_list_active: (servicio) => {
        return {
            _id: servicio._id,
            title: servicio.title,
            description: servicio.description,
            price_pesos: servicio.price_pesos,
            imagen: servicio.imagen,
        }
    },
}