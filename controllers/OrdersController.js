import Order from '../models/Order'
import User from '../models/User';
// import Servicios from '../resources/Servicios'

export default {
    register: async(req, res) => {
        try {
            let data = req.body;
            if (!data) {
                return res.status(400).json({
                    ok: false,
                    message: "Ingresa todos los datos necesarios",
                }); 
            }
    
            const validateUser = await User.findOne({_id: req.body.userId});
            if (!validateUser) {
                return res.status(400).json({
                    ok: false,
                    message: 'El usuario ingresado no existe'
                });
            }
    
            // Check if phone and address are provided in req.body
            const { address, phone } = req.body;
    
            // If phone or address in user data is missing, update it with the provided data
            if (!validateUser.phone || !validateUser.address) {
                validateUser.phone = phone || validateUser.phone;
                validateUser.address = address || validateUser.address;
                console.log("llega hasta aqui")
                console.log("validateUser:", validateUser)
                await validateUser.save();
            }
            
            let orden = await Order.create(data);
            if (orden) {
                return res.status(200).json({
                    ok: true,
                    message: "La orden se registró exitosamente.",
                    data: orden
                });
            } else {
                return res.status(200).json({
                    ok: false,
                    message: "No ha sido posible registrar la orden.",
                }); 
            }
    
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    },
    list: async(req,res) => {
        try {
            // let search = req.query.search;
            let OrdersList = await Order.find({}).sort({'createdAt': -1});
            // ServiciosList = ServiciosList.map((obj) => {
            //     return Servicios.servicio_list(obj);
            // })
            if (!OrdersList) {
                return res.status(200).json({
                    ok: false,
                    message: "No ha sido posible listar las ordenes de compra.",
                });
            }
            res.status(200).json({
                ok: true,
                ListOrders: OrdersList
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    },
    remove: async(req,res) => {
        try {
            let id = req.query.id;
            if (!id) {
                return res.status(400).json({
                    ok: false,
                    message: "Ingresa todos los datos necesarios",
                }); 
            }

            await Order.findByIdAndDelete({_id: id});
            res.status(200).json({
                message: "EL PEDIDO SE ELIMINÓ CORRECTAMENTE",
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIÓ UN ERROR"
            });
            console.log(error);
        }
    },
    // update: async(req,res) => {
    //     try {
    //         if(req.files && req.files.imagen){
    //             let img_path = req.files.imagen.path;
    //             let name = img_path.split('\\');
    //             let imagen_name = name[2];
    //             req.body.imagen = imagen_name;
    //         }
    //         await Servicio.findByIdAndUpdate({_id: req.body._id},req.body);

    //         let ServicioT = await Servicio.findOne({_id: req.body._id});
    //         res.status(200).json({
    //             message: "EL SERVICIO SE HA MODIFICADO CORRECTAMENTE",
    //             servicio: Servicios.servicio_list(ServicioT),
    //         });
    //     } catch (error) {
    //         res.status(500).send({
    //             message: "OCURRIÓ UN ERROR"
    //         });
    //         console.log(error);
    //     }
    // },

}