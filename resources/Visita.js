export default {
    visita_list: (visita) => {
        return {
            _id: visita._id,
            userId: visita.userId,
            serviceId: visita.serviceID,
            nombre: visita.nombre,
            direccion: visita.direccion,
            telefono: visita.telefono,
            fecha: visita.fecha,
        }
    }
}