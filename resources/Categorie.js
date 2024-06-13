export default {
    categorie_list: (categorie) => {
        return {
            _id: categorie._id,
            title: categorie.title,
            imagen: categorie.imagen,
            state: categorie.state,
        }
    },
    categorie_list_active: (categorie) => {
        return {
            _id: categorie._id,
            title: categorie.title,
        }
    },
}