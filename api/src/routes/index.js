const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countriesRoutes = require('./countriesRoutes')
const activityRouter = require ('./activitiesRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/countries', countriesRoutes);
router.get('/countries/:id', countriesRoutes);

router.post('/', activityRouter);
router.get('/activities', activityRouter);

module.exports = router;
