import routerx from 'express-promise-router'
import OrdersController from '../controllers/OrdersController'
import auth from '../middlewares/auth'
import multiparty from 'connect-multiparty'

var path = multiparty({uploadDir: './uploads/servicio'})
const router = routerx();

router.post("/register", OrdersController.register);
router.get("/list", OrdersController.list);
router.delete("/delete", OrdersController.remove);
// router.put("/update", [auth.verifyAdmin,path], OrdersController.update);

export default router;