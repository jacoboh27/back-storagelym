export default {
    product_list: (product) => {
        return {
            _id: product._id,
            title: product.title,
            slug: product.slug,
            //imagen: 'http://localhost:3000'+'/api/products/uploads/product/'+product.imagen,
            imagen: product.imagen,
            categorie: product.categorie,
            price_pesos: product.price_pesos,
            stock: product.stock,
            description: product.description,
            state: product.state,
        }
    }
}