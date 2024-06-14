import bcrypt from 'bcryptjs'
import models from '../models'
import resources from '../resources'

export default {
    register: async(req, res) => {
        try {
            console.log("req.body:", req.body);

            const { nombre, direccion, telefono, fecha, userId, serviceId } = req.body;
            //Verificamos que se hayan recibido todos los campos necesarios.
            if ( !nombre || !direccion || !telefono || !fecha || !userId || !serviceId ) {
                return res.status(200).json({
                    ok: false,
                    message: 'Proporcione todos los datos necesarios.',
                });
            }

            const visitExist = await models.Visita.findOne({ userId, fecha }).select(["_id"]);

            if (visitExist) {
                return res.status(200).json({
                    ok: false,
                    message: "¡Ya agendaste una visita domiciliaria para ese día!"
                });
            }

            const visita = await models.Visita.create(req.body);
            if (visita) {
                res.status(200).json({
                    ok: true,
                    message: "La visita domiciliaria se registró exitosamente, pronto uno de nuestros expertos se pondrá en contacto contigo"
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: "No fue posible registrar la visita, por favor intenta más tarde."
                });
            }
        } catch (error) {
            console.log("error: ", error);
            res.status(500).send({
                ok: false,
                message: 'Error al registrar la vista, por favor intenta más tarde.'
            });
        }
    },
    list: async(req, res) => {
        try {
            var search = req.query.search;
            let Visitas = await models.Visita.find({
                $or:[
                    {"nombre": new RegExp(search, "i")},
                ]
            }).sort({'createdAt': -1});
            Visitas = Visitas.map((visita) => {
                return resources.Visita.visita_list(visita);
            });
            res.status(200).json({
                ok: true,
                visitas: Visitas
            });
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIÓ UN ERROR'
            });
            console.log("error: ", error);
        }
    },
    // update: async(req, res) => {
    //     try {
    //         if (req.files) {
    //             var img_path = req.files.avatar.path;
    //             var name = img_path.split('//');
    //             var avatar_name = name[2];
    //             console.log("avatar_name", avatar_name);
    //         }
    //         if (req.body.password) {
    //             req.body.password = await bcrypt.hash(req.body.password, 10);
    //         }
    //         await models.User.findByIdAndUpdate({_id: req.body._id}, req.body);
    //         let UserT = await models.User.findOne({_id: req.body._id});
    //         res.status(200).json({
    //             message: 'USUARIO MODIFICADO EXITOSAMENTE',
    //             user: resources.User.user_list(UserT)
    //         });
    //     } catch (error) {
    //         res.status(500).send({
    //             message: 'OCURRIÓ UN ERROR'
    //         });
    //         console.log("error: ", error);
    //     }
    // },
    remove: async(req, res) => {
        try {
            const id = req.query.id;
            if (!id) {
                res.status(200).json({
                    ok: false,
                    message: 'Proporcione todos los datos incorrectos'
                });  
            }
            const Visita = await models.Visita.findByIdAndDelete({_id: id});
            if (Visita) {
                res.status(200).json({
                    ok: true,
                    message: 'La visita se eliminó exitosamente'
                });   
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'No fue posible editar la visita'
                }); 
            }
        } catch (error) {
            res.status(500).send({
                ok: false,
                message: 'OCURRIÓ UN ERROR'
            });
            console.log("error: ", error);
        }
    }
}