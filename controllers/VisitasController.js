import bcrypt from 'bcryptjs'
import models from '../models'
import resources from '../resources'

export default {
    register: async(req, res) => {
        try {
            console.log("req.body:", req.body);
            const visita = await models.Visita.create(req.body);
            res.status(200).json(visita);
        } catch (error) {
            res.status(500).send({
                message: 'NO FUE POSIBLE REGISTRAR LA VISITA'
            });
            console.log("error: ", error);
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
            Visitas = Users.map((visita) => {
                return resources.Visita.visita_list(visita);
            });
            res.status(200).json({
                Visitas: Visitas
            });
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIÓ UN ERROR'
            });
            console.log("error: ", error);
        }
    },
    update: async(req, res) => {
        try {
            if (req.files) {
                var img_path = req.files.avatar.path;
                var name = img_path.split('//');
                var avatar_name = name[2];
                console.log("avatar_name", avatar_name);
            }
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            await models.User.findByIdAndUpdate({_id: req.body._id}, req.body);
            let UserT = await models.User.findOne({_id: req.body._id});
            res.status(200).json({
                message: 'USUARIO MODIFICADO EXITOSAMENTE',
                user: resources.User.user_list(UserT)
            });
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIÓ UN ERROR'
            });
            console.log("error: ", error);
        }
    },
    remove: async(req, res) => {
        try {
            const UserT = await models.User.findByIdAndDelete({_id: req.query._id});
            res.status(200).json({
                message: 'USUARIO ELIMINADO EXITOSAMENTE'
            });
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIÓ UN ERROR'
            });
            console.log("error: ", error);
        }
    }
}