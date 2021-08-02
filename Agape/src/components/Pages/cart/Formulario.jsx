import React, { useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import * as IoIcons from 'react-icons/io'
import Input from './Input'
import {useCart} from '../../context/cart-context'

import {useFirebase} from '../../context/firebase-context'

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
  
  const {} = useCart()
  const {total,cartProducts,newPedido} = useCart()

    const classes = useStyles();
    //Creo un estado para cada uno de mis inputs, donde va el campo y un booleano para saber si es valido




    const [telefono, setTelefono] = useState({campo:'', valido: null});
    const [direccion, setDireccion] = useState({campo:'', valido: null});

   //Creo un estado para saber si el formulario es correcto y poder enviarlo
    const [formularioValido, setFormularioValido] = useState(null)

    //Creo un objeto donde tiene la info del cliente para guardarlo en la db
    const [datosForm, setDatosForm] = useState({
      
      Clitelefono: '',
      Clidireccion: '',
    })

    //Las expresiones regulares que voy a usar para validar. Sacadas de internet 
    const expresiones = {
      
      telefono: /^[0-9 ]{7,14}$/, // 7 a 14 numeros.,
      direccion: /^[0-9a-zA-Z. ]{5,40}$/
    }

 


   
const {isLogged,authGoogle,user} = useFirebase()

 const signIn = () => {
        authGoogle()
    }
    const onSubmit= (e) => {
        e.preventDefault()
        //verifico si todos los inputs son correctos
        if(
         
          telefono.valido === 'correcto' &&
          direccion.valido === 'correcto' && isLogged === true
        ){

          //Si es asi entonces el formulario es valido
          setFormularioValido(true)
         console.log('ENVIADO')
         newPedido(datosForm)
          //Guardo en mi objeto la info del cliente
          setDatosForm(
           
            datosForm.Clitelefono = telefono.campo,
            datosForm.Clidireccion = direccion.campo

          )
          
        
          setTelefono({campo: '', valido: null})
          setDireccion({campo: '', valido: null})
        }else{
          setFormularioValido(false)
        }
    }

    return (
        <div  className={cartProducts.length === 0 ? 'formNone' : 'container-form '}>
             <div className='container-precio d-flex align-items-center justify-content-center'>
      
                    <IoIcons.IoIosPricetags className='mr-2' color='ffa333' size={25}/>
                    <span className='form-precio m-0'>{`Total: $${total}`}</span>
                        
            </div>  

            <br/>
            
            <h5 className='form-titulo'>Finalice su compra</h5>
            {isLogged === true&& <>
                <h6 className='m-0 '>Comprando como:</h6>
                <p>{user.name}</p>
              </> }
        <form className={classes.root} onSubmit={onSubmit}>
          
         
            <Input estado={telefono} setEstado = {setTelefono} className='mr-auto ml-auto mb-5 w-75 '
                  placeholder='teléfono'
                  type='text'
                  name='Telefono'
                  mensajeError = 'Este campo es obligatorio. Solo se permiten números y espacios'
                  expresionRegular = {expresiones.telefono}
                  valido = {telefono.valido}
            />
            <Input estado={direccion} setEstado = {setDireccion} className='mr-auto ml-auto mb-5 w-75 '
                  placeholder='Dirección'
                  type='text'
                  name='dirección'
                  mensajeError = 'Este campo es requerido. Minimo 5 caracteres'
                  expresionRegular = {expresiones.direccion}
                  valido = {direccion.valido}
            />
          

          {formularioValido === false && <p>Complete el formulario </p>}
          {isLogged === false &&
          <>
          <p className="text-center">Inicie sesión con Google para enviar el pedido</p>
          <button onClick={signIn} className="btn btn-primary">Entrar con Google</button></>}
          
          <button type="submit" className="btn btn-danger">Enviar</button>
    </form>
        </div>
    )
}

export default Formulario
