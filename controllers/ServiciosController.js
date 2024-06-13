import Servicio from '../models/Servicio'
import Servicios from '../resources/Servicios'
import fs from 'fs'
import path from 'path'

export default {
    register: async(req,res) => {
        try {
            let data = req.body;
            let validService = await Servicio.findOne({ title: { $regex: new RegExp('^' + data.title + '$', 'i') } });
            if(validService){
                res.status(200).json({
                    ok: false,
                    message: 'El servicio o su nombre ya existe, verificalo o elige otro nombre'
                });
                return;
            }

            if(req.files){
                let img_path = req.files.imagen.path;
                let name = img_path.split('\\');
                let imagen_name = name[2];
                req.body.imagen = imagen_name;
            }
            let servicio = await Servicio.create(req.body);
            servicio = await Servicios.servicio_list(servicio);
            res.status(200).json({
                ok: true,
                message: "El servicio se registró exitosamente",
                data: servicio
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    },
    update: async(req,res) => {
        try {
            if(req.files && req.files.imagen){
                let img_path = req.files.imagen.path;
                let name = img_path.split('\\');
                let imagen_name = name[2];
                req.body.imagen = imagen_name;
            }
            await Servicio.findByIdAndUpdate({_id: req.body._id},req.body);

            let ServicioT = await Servicio.findOne({_id: req.body._id});
            res.status(200).json({
                message: "EL SERVICIO SE HA MODIFICADO CORRECTAMENTE",
                servicio: Servicios.servicio_list(ServicioT),
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    },
    list: async(req,res) => {
        try {
            let search = req.query.search;
            let ServiciosList = await Servicio.find({
                $or:[
                    {"title": new RegExp(search, "i")},
                ]
            }).sort({'createdAt': -1});
            ServiciosList = ServiciosList.map((obj) => {
                return Servicios.servicio_list(obj);
            })
            res.status(200).json({
                ListServicios: ServiciosList
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    },
    list_active: async(req,res) => {
        try {
            let Servicios = await Servicio.find({state:1});

            Servicios = Servicios.map((obj) => {
                return Servicios.categorie_list_active(obj);
            })
            res.status(200).json({
                listServicios: Servicios
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    },
    get_image: async(req,res) => {
        try {
            let img = req.params['img'];
            fs.stat('./uploads/servicio/'+img, function(err){
                if(!err){
                    let path_img = './uploads/servicio/'+img;
                    res.status(200).sendFile(path.resolve(path_img));
                }else{
                    let path_img = './uploads/servicio/default.jpg';
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
    remove: async(req,res) => {
        try {
            await Servicio.findByIdAndDelete({_id: req.query._id});
            res.status(200).json({
                message: "EL SERVICIO SE ELIMINÓ CORRECTAMENTE",
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    }
}