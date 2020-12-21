const {Router} = require('express');
const {check} = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { 
    editarDeportista, 
    getDeportistas, 
    crearDeportista, 
    eliminarDeportista, 
    getOneDeportista 
} = require('../controllers/deportistaControllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');




const router = Router();

router.use(validarJWT)
// /api/deportista
router.get('/', getDeportistas);
router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio!').not().isEmpty(),
        check('identificacion', 'Numero de identificacion es obligatorio!').not().isEmpty(),
        check('fechaNacimiento', 'Debe de digitar correctamente la fecha de nacimiento').custom( isDate ),
        validarCampos


    ],
    crearDeportista
);
router.get('/:id', getOneDeportista);

router.put('/edit/:id',editarDeportista );
router.delete('/delete/:id',eliminarDeportista);



module.exports = router;