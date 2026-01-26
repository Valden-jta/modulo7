// *---------------------- template ---------------------- *\\

//?_________  Imports _________\\ 
const {Router} = require('express');                        
const router = Router();


//?_________  rutas y metodos _________\\ 
/* Ejemplo
·
· const usersCtrl = require('../controller/user.controller'); 
·
· router.get('/', usersCtrl.getStart);
· router.get('/usuario/', usersCtrl.getUser);
· router.get('/usuario/:name', usersCtrl.getUser2);
· router.post('/usuario', usersCtrl.postUser);
· router.put('/usuario', usersCtrl.putUser);
· router.delete('/usuario', usersCtrl.deleteUser);
·
*/

//?_________  Exports _________\\ 
module.exports = router;