import routerx from 'express-promise-router'
import VisitasController from '../controllers/VisitasController'
import auth from '../middlewares/auth'

const router = routerx();

router.post("/register", VisitasController.register);
router.get("/list", VisitasController.list);
// router.put("/update", VisitasController.update);
router.delete("/delete", VisitasController.remove);

export default router;