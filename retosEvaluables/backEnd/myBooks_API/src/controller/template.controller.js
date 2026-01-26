// *---------------------- template ---------------------- *\\
//?_________  Imports _________\\ 


//?_________ Datos _________\\ 
 //Ej: let usuario {name: 'Javier', surname: 'de la Torre Aragón'}


//?_________ Funciones _________\\ 
/*

API VERBS   =   CRUD
------------------------
GET         =   SELECT
POST        =   INSERT
PUT         =   UPDATE
DELETE      =   DELETE

/* Ejemplo
// localhost:3000/usuario?parametro=valor
function getUser(req,res){
    // el parametro enviado se guarda en el objeto query 
    // (guarda en clave valor todos los parametros y valores que se pasen)
    let name = req.query.name;
    // condicion: si el usuario no es null Y no pasan parametro enviado o este coincide con el del name del usuario
    if (usuario != null && (!name || name === usuario.name)) {
        res.send({error: false, code:200, data: usuario});
     } else  {
         res.send({error:true, code: 200, message: 'El usuario no existe'});
     }
}

// localhost:3000/usuario/valor
function getUser2(req, res) {
    //En router hemos indicado en la ruta, que este parametro que se pasa correspone al name 
    let name = req.params.name;
    // la condicion funciona igual que en anterior caso
    if (usuario != null && (!name || name === usuario.name)) {
       res.send({error: false, code:200, data: usuario});
    } else  {
        res.send({error:true, code: 200, message: 'El usuario no existe'});
    }
}

function postUser(req, res) {
    let answer;
    console.log(req.body);
    if (usuario === null) {
        // atributo:req.body.dato  --> atributo es el que yo tengo creado, y en dato tengo que ponerlo como lo recibo de postman
        usuario = {name:req.body.name, surname:req.body.surname};
        answer = {error: false, code:200, message:'Usuario creado', data:usuario};
    } else {
        answer = {error:true, code: 200, message: 'El usuario ya existe'};
    }
    res.send(answer)
}

function putUser(req,res) {
    let answer;
    if (usuario != null) {
        usuario.name =req.body.name;
        usuario.surname = req.body.surname;
        console.log(req.body);
        answer = {error: false, code:200, message:'Usuario modificado', data:usuario};
    } else {
        answer = {error:true, code: 200, message: 'El usuario no existe'};
    }
    res.send(answer);
}

function deleteUser(req,res) {
    let answer;
    if (usuario != null) {
        usuario = null;
        answer = {error: false, code:200, message:'Usuario eliminado', data:usuario};
    } else {
        answer = {error:true, code: 200, message: 'El usuario ya existe'};
    }
    res.send(answer);
}
*/

//?_________ Exports _________\\ 

module.exports = { usuario, getStart, getUser, getUser2, postUser, putUser, deleteUser } 