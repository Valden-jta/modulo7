// *---------------------- template ---------------------- *\\

//?_________  Imports _________\\ 
const {Router} = require('express');                        
const router = Router();


//?_________  rutas y metodos _________\\ 
const userCtrl = require('../controller/user.controller'); 

router.post('/login', userCtrl.getUser);
router.post('/register', userCtrl.postUser);
router.put('/usuarios', userCtrl.putUser);

//?_________  Exports _________\\ 
module.exports = router;