import models from '../models'
import resources from '../resources'
import fs from 'fs'
import path from 'path'

export default {
    register: async(req,res) => {
        try {
            let data = req.body;
            let valid_Product = await models.Product.findOne({ title: { $regex: new RegExp('^' + data.title + '$', 'i') } });
            if(valid_Product){
                res.status(200).json({
                    code: 403,
                    message: 'EL PRODUCTO YA EXISTE'
                });
                return;
            }
            data.slug = data.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            if(req.files){
                var img_path = req.files.imagen.path;
                var name = img_path.split('\\');
                var imagen_name = name[2];
                data.imagen = imagen_name;
            }
            let product = await models.Product.create(data);
            res.status(200).json({
                message: "EL PRODUCTO SE REGISTRÓ EXITOSAMENTE"
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
        }
    },

    update:async(req,res) => {
        try {
            let data = req.body;      
            let valid_Product = await models.Product.findOne({title: data.title, _id: {$ne : data._id}});
            if(valid_Product){
                res.status(200).json({
                    code: 403,
                    message: 'EL PRODUCTO YA EXISTE'
                });
                return;
            }
            data.slug = data.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            if(req.files && req.files.imagen){
                var img_path = req.files.imagen.path;
                var name = img_path.split('\\');
                var imagen_name = name[2];
                data.imagen = imagen_name;
            }
            await models.Product.findByIdAndUpdate({_id:data._id},data);
            res.status(200).json({
                message: "EL PRODUCTO SE ACTUALIZÓ EXITOSAMENTE"
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
        }
    },

    list:async(req,res) => {
        try {
            var filter = [];
            if (req.query.search && req.query.search.trim() !== '') { 
                filter.push({ title: new RegExp(req.query.search, "i") });
            }
            if (req.query.categorie && req.query.categorie.trim() !== '') { 
                filter.push({ categorie: req.query.categorie });
            }
              
            let products = []; 
            if (filter.length > 0) { 
            products = await models.Product.find({ $and: filter }).populate("categorie"); 
            } else { 
            products = await models.Product.find().populate("categorie"); 
            }
            products = products.map((product) => {
                return resources.Product.product_list(product);
            });

            res.status(200).json({
                products: products,
            })
        } catch (error) {
            res.status(500).send({
                message: "COURRIO UN PROBLEMA"
            });
        }
    },

    list_active:async(req,res) => {
        try {
            var filter = [];
            if (req.query.search && req.query.search.trim() !== '') { 
                filter.push({ title: new RegExp(req.query.search, "i") });
            }
            if (req.query.categorie && req.query.categorie.trim() !== '') { 
                filter.push({ categorie: req.query.categorie });
            }
                          
            let products = []; 
            if (filter.length > 0) { 
            products = await models.Product.find({ $and: filter, state: 1 }).populate("categorie"); 
            } else { 
            products = await models.Product.find({state:1}).populate("categorie"); 
            }
            products = products.map((product) => {
                return resources.Product.product_list(product);
            });

            res.status(200).json({
                products: products,
            })
        } catch (error) {
            res.status(500).send({
                message: "COURRIO UN PROBLEMA"
            });
        }
    },

    remove:async(req,res) => {
        try {
            let _id = req.query._id;
            await models.Product.findByIdAndDelete({_id: _id});
            res.status(200).json({
                message: "EL PRODUCTO SE ELIMINÓ EXITOSAMENTE"
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
        }
    },

    obtener_imagen:async(req,res) => {
        try {
            var img = req.params['img'];
            fs.stat('./uploads/product/'+img, function(err){
                if(!err){
                    let path_img = './uploads/product/'+img;
                    res.status(200).sendFile(path.resolve(path_img));
                } else {
                    let path_img = './uploads/product/default.jpg';
                    res.status(200).sendFile(path.resolve(path_img));
                }
            })
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    },

    show: async(req,res) => {
        try {
            var product_id = req.params.id;
            let PRODUCT = await models.Product.findById({_id: product_id}).populate("categorie");
            res.status(200).json({
                product: resources.Product.product_list(PRODUCT),
            })
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    },

    register_imagen:async(req,res) => {
        try {
            var img_path = req.files.imagen.path;
            var name = img_path.split('\\');
            var imagen_name = name[2];     
            let product = await models.Product.findByIdAndUpdate({_id: req.body._id},{
                $push: {
                    galerias: {
                        imagen: imagen_name,
                        _id: req.body.__id
                    }
                }
            })
            res.status(200).json({
                message: "LA IMAGEN SE SUBIÓ EXITOSAMENTE",
                imagen: {
                    imagen: 'http://localhost:3000'+'/api/products/uploads/product/'+imagen_name,
                    _id: req.body.__id
                }
            })
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
        }
    },

    remove_imagen:async(req,res) => {
        try {
            await models.Product.findByIdAndUpdate({_id: req.body._id},{
                $pull: {
                    galerias: {
                        _id: req.body.__id
                    }
                }
            })
            res.status(200).json({
                message: "LA IMAGEN SE ELIMINÓ EXITOSAMENTE",
            })
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
        }
    },
}