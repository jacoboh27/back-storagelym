import routerx from 'express-promise-router'
import User from './User'
import Categorie from './Categorie'
import Product from './Product'
import Visitas from './Visitas'
import Servicio from './Servicio'
import Orders from './Orders'

const router = routerx();

router.use('/users', User);
router.use('/categories', Categorie);
router.use('/products', Product);
router.use('/visitas', Visitas);
router.use('/servicios', Servicio);
router.use('/orders', Orders);

export default router;