import React from 'react'
import { useCart } from '../../context/cart-context'
import { useFirebase } from '../../context/firebase-context'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles';
import * as IoIcons from 'react-icons/io'
import('./carrito.css')

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
  //LIBRERIA REACT-HOOK-FORM
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const { total, cartProducts ,totalItems } = useCart()

  const { isLogged, authGoogle, user,newPedido } = useFirebase()



  const onsubmit = (data) => {
    //Si se envia el form se llama a newPedido pasandole los datos del usuario
    newPedido(data)
  }
  //Si se llama a signIn se ejecuta la funcion del Firebase-context para realizar el loggin
  
  const signIn = () => {
    authGoogle()
  }




  return (
    <div className={cartProducts.length === 0 ? 'formNone' : 'container-form '}>
      <div className='container-precio d-flex align-items-center justify-content-center'>

        <IoIcons.IoIosPricetags className='mr-2' color='ffa333' size={25} />
        
        <span className='form-precio m-0 '>{`Importe total: $${total}`}</span>

      </div>
      <div className='container-precio d-flex align-items-center justify-content-center'>

      <IoIcons.IoIosPricetags className='mr-2' color='ffa333' size={25} />

        <span className='form-precio m-0'>{`Cantidad de productos: ${totalItems}`}</span>

      </div>  

      <br />

      <h5 className='form-titulo'>Finalice su compra</h5>
      {isLogged === true && <>
        <h6 className='m-0 '>Comprando como:</h6>
        <p>{user.name}</p>
      </>}
      <form className={classes.root} onSubmit={handleSubmit(onsubmit)}>


        {/* Esta forma de usar un input es de la libreria, me permite poner las condiciones y el mensaje de error */}
        <input className='input mr-auto ml-auto mb-2 w-75'
          placeholder='Número de teléfono'
          name='telefono'
          {...register('telefono', {
            required: {
              value: true,
              message: 'Este campo es obligatorio.'
            },
            minLength: {
              value: 6,
              message: 'Minimo 6 carácteres'
            }
          })}
        />

        <span className=' leyenda-incorrecto text-danger'>{errors.telefono && errors.telefono.message}</span>
        <input className='input mr-auto ml-auto mb-2 w-75'
          name='direccion'
          placeholder='Dirección'
          {...register('direccion', {
            required: {
              value: true,
              message: 'Este campo es obligatorio.'
            },
            minLength: {
              value: 6,
              message: 'Minimo 6 carácteres'
            }
          })}
        />
        <span className='leyenda-incorrecto text-danger'>{errors.direccion && errors.direccion.message}</span>


        {isLogged === false ?
          //Si no ingreso con una cuenta entonces el boton de enviar se reemplaza por el de ingresar
          <>
            <p className="text-center">Inicie sesión con Google para enviar el pedido</p>
            <button onClick={signIn} type='button' className="btn btn-primary">Entrar con Google</button>
          </>

          : 
          //Se muestra el boton de enviar, el cual solo funciona si no tengo errores en el form gracias a la libreria

          <button type="submit" className="btn btn-danger">Enviar</button>}
       

      </form>
    </div>
  )
}

export default Formulario
