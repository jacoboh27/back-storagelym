import routerx from 'express-promise-router'
import User from './User'
import Categorie from './Categorie'
import Product from './Product'
import Visitas from './Visitas'
import Servicio from './Servicio'

const router = routerx();

router.use('/users', User);
router.use('/categories', Categorie);
router.use('/products', Product);
router.use('/visitas', Visitas);
router.use('/servicios', Servicio);

export default router;