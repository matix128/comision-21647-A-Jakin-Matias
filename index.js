require('dotenv').config()

const express = require('express')
const helmet = require('helmet');

const app = express()
const PUERTO = process.env.PUERTO
const {DBtest} = require("./database.js");
const tareaModel = require("./tareaModel.js");
app.set("view engine","ejs")

app.use(helmet());
app.use(express.json());
//
app.use(express.urlencoded({ extended: true }));
//
app.get('/', async function (req, res) {
  const Temarios = await tareaModel.findAll();
  
  res.render("inicio",{Temarios:Temarios});

})
//
app.get('/agregar', function (req, res) {
    res.render('agregar');
  })
//
  app.post('/agregar', async function (req, res) {
    console.log(req.body)
    
    const { Titulo, descripcion,URL } = req.body
    
    try{
const nuevoTema = await tareaModel.create({Titulo: Titulo, Contenido:descripcion, Imagen:URL})

if (nuevoTema) {
 
  res.redirect('/');
}else{
  res.send('No pudo'+nuevoTema.id );
}
    
  }catch (err) {res.send('se produjo  un error al cargar el Foro');}
  })
//
app.get('/eliminar/:id', async function (req, res) {
  const { id } = req.params;

  try {
      const borrarTarea = await tareaModel.destroy({
          where: {
              id: id
          }
      })

      if (borrarTarea) {
          res.redirect('/');
      } else {
          res.send('No se pudo borrar el Foro :(')
      }
  } catch (err) {
      res.send('Se produjo un errror al borrar el Foro: ' + err)
  }
})

//

app.get('/editar/:id', async function (req, res) {
  const { id } = req.params;

  try {
      const tarea = await tareaModel.findOne({
          where: {
              id: id
          }
      })

      if (tarea) {
          res.render('editar', { tarea: tarea });
      } else {
          res.send('No se pudo encontrar el Foro :(')
      }
  } catch (err) {
      res.send('Se produjo un errror al buscar el Foro: ' + err)
  }
})

app.post('/editar/:id', async function (req, res) {
  const { id } = req.params;
  const { Titulo, descripcion,URL } = req.body

  try {
      const tareaActualizada = await tareaModel.update(
          {
              Titulo: Titulo,
              Contenido: descripcion,
              Imagen : URL,
              
          }, {
              where: {
                  id: id
              }
          }
      )
      
      if (tareaActualizada) {
          res.redirect('/');
      } else {
          res.send('No se pudo actualizar el Foro :(')
      }
  } catch (err) {
      res.send('Se produjo un errror al actualizar el Foro: ' + err)
  }
})


//
  DBtest();

//
app.listen(PUERTO,()=>{
    console.log(`El server esta andando`+ PUERTO)
})