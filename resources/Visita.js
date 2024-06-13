export default {
    visita_list: (visita) => {
        return {
            _id: visita._id,
            nombre: visita.nombre,
            direccion: visita.direccion,
            telefono: visita.telefono,
            fecha: visita.fecha,
        }
    }
}