import React, { useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import * as IoIcons from 'react-icons/io'
import Input from './Input'


require('./carrito.css')
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '95%',
      },
    },
  }));
  
const Formulario = () => {
    const classes = useStyles();
    //Creo un estado para cada uno de mis inputs, donde va el campo y un booleano para saber si es valido
    const [nombre, setNombre] = useState({campo:'', valido: null});
    const [apellido, setApellido] = useState({campo:'', valido: null});
    const [correo, setCorreo] = useState({campo:'', valido: null});
    const [correo2, setCorreo2] = useState({campo:'', valido: null});
    const [telefono, setTelefono] = useState({campo:'', valido: null});
    const [direccion, setDireccion] = useState({campo:'', valido: null});

   //Creo un estado para saber si el formulario es correcto y poder enviarlo
    const [formularioValido, setFormularioValido] = useState(null)

    //Creo un objeto donde tiene la info del cliente para guardarlo en la db
    const [datosForm, setDatosForm] = useState({
      Clinombre: '',
      Cliapellido: '',
      Clicorreo: '',
      Clitelefono: '',
      Clidireccion: '',
    })

    //Las expresiones regulares que voy a usar para validar. Sacadas de internet 
    const expresiones = {
      usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
      nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
      password: /^.{4,12}$/, // 4 a 12 digitos.
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      telefono: /^\d{7,14}$/, // 7 a 14 numeros.,
      direccion: /^[0-9a-zA-Z. ]{5,40}$/
    }

    //Funcion para validar que ambos correos sean iguales
    const validarCorreo2 = () => {
      //Si hay algo en el correo
      if(correo.campo.length >0){

        if(correo2.campo !== correo.campo){
          //Si los campos no son iguales, no es valido
          setCorreo2((prevState) =>{
            return{...prevState, valido: 'incorrecto'}
          })
        }else{
          setCorreo2((prevState) =>{
            return{...prevState, valido: 'correcto'}
          })
        }
      }
    }


    const onSubmit= (e) => {
        e.preventDefault()
        //verifico si todos los inputs son correctos
        if(
          nombre.valido === 'correcto' &&
          apellido.valido === 'correcto' &&
          correo.valido === 'correcto' &&
          correo2.valido === 'correcto' &&
          telefono.valido === 'correcto' &&
          direccion.valido === 'correcto'
        ){

          //Si es asi entonces el formulario es valido
          setFormularioValido(true)

          //Guardo en mi objeto la info del cliente
          setDatosForm(
            datosForm.Clinombre = nombre.campo,
            datosForm.Cliapellido = apellido.campo,
            datosForm.Clicorreo = correo.campo,
            datosForm.Clitelefono = telefono.campo,
            datosForm.Clidireccion = direccion.campo

          )
            console.log(datosForm)
            //Seteo los campos
          setNombre({campo: '', valido: null})
          setApellido({campo: '', valido: null})
          setCorreo({campo: '', valido: null})
          setCorreo2({campo: '', valido: null})
          setTelefono({campo: '', valido: null})
          setDireccion({campo: '', valido: null})
        }else{
          setFormularioValido(false)
        }
    }

    return (
        <div className='container-form'>
             <div className='container-precio d-flex align-items-center justify-content-center'>
      
                    <IoIcons.IoIosPricetags className='mr-2' color='ffa333' size={25}/>
                    <span className='form-precio m-0'>Total: $5952</span>
                        
            </div>  

            <br/>
            <h5 className='form-titulo'>Finalice su compra</h5>

        <form className={classes.root} onSubmit={onSubmit}>
          
           <Input estado={nombre} setEstado = {setNombre} className='mr-auto ml-auto mb-5 w-75 '
                  placeholder='Nombre'
                  type='text'
                  name='nombre'
                  mensajeError = 'Este campo es requerido. Mínimo 4 letras sin números'
                  expresionRegular =  {expresiones.nombre}
                  valido = {nombre.valido}
            />

            <Input estado={apellido} setEstado = {setApellido} className='mr-auto ml-auto mb-5 w-75 '
                  placeholder='Apellido'
                  type='text'
                  name='apellido'
                  mensajeError = 'Este campo es requerido. Mínimo 4 letras sin números'
                  expresionRegular = {expresiones.nombre}
                  valido = {apellido.valido}
            />
             <Input estado={correo} setEstado = {setCorreo} className='mr-auto ml-auto mb-5 w-75 '
                  placeholder='Correo'
                  type='email'
                  name='email'
                  mensajeError = 'Ingrese un correo valido'
                  expresionRegular = {expresiones.correo}
                  valido = {correo.valido}
            />

             <Input estado={correo2} setEstado = {setCorreo2} className='mr-auto ml-auto mb-5 w-75 '
                  placeholder='Confirme su correo'
                  type='email'
                  name='email2'
                  mensajeError = 'El correo no coincide'
                 // expresionRegular = {expresiones.correo}
                  funcion={validarCorreo2}
                  valido = {correo2.valido}
            />
            <Input estado={telefono} setEstado = {setTelefono} className='mr-auto ml-auto mb-5 w-75 '
                  placeholder='telefono'
                  type='text'
                  name='Telefono'
                  mensajeError = 'Este campo es obligatorio. No se permiten guiones ni espacios'
                  expresionRegular = {expresiones.telefono}
                  valido = {telefono.valido}
            />
            <Input estado={direccion} setEstado = {setDireccion} className='mr-auto ml-auto mb-5 w-75 '
                  placeholder='Direccion'
                  type='text'
                  name='dirección'
                  mensajeError = 'Este campo es requerido'
                  expresionRegular = {expresiones.direccion}
                  valido = {direccion.valido}
            />
          

          {formularioValido === false ? <h1>Complete el formulario</h1> : ''}

          <button type="submit" className="btn btn-danger">Enviar</button>
    </form>
        </div>
    )
}

export default Formulario
