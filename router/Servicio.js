import routerx from 'express-promise-router'
import ServiciosController from '../controllers/ServiciosController'
import auth from '../middlewares/auth'
import multiparty from 'connect-multiparty'

var path = multiparty({uploadDir: './uploads/servicio'})
const router = routerx();

router.post("/register", [auth.verifyAdmin,path], ServiciosController.register);
router.put("/update", [auth.verifyAdmin,path], ServiciosController.update);
router.get("/list", auth.verifyAdmin, ServiciosController.list);
router.get("/list_active", ServiciosController.list_active);
router.delete("/delete", auth.verifyAdmin, ServiciosController.remove);
router.get("/uploads/servicio/:img", ServiciosController.get_image);

export default router;