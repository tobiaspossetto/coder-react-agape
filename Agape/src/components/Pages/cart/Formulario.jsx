import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import * as IoIcons from 'react-icons/io'
import { useCart } from '../../context/cart-context'
import { useFirebase } from '../../context/firebase-context'
import { useForm } from 'react-hook-form'
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

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const { total, cartProducts, newPedido, verificar } = useCart()
  const classes = useStyles();
  const { isLogged, authGoogle, user } = useFirebase()



  const onsubmit = (data) => {
    newPedido(data)
  }
  const signIn = () => {
    authGoogle()
  }




  return (
    <div className={cartProducts.length === 0 ? 'formNone' : 'container-form '}>
      <div className='container-precio d-flex align-items-center justify-content-center'>

        <IoIcons.IoIosPricetags className='mr-2' color='ffa333' size={25} />
        <span className='form-precio m-0'>{`Total: $${total}`}</span>

      </div>

      <br />

      <h5 className='form-titulo'>Finalice su compra</h5>
      {isLogged === true && <>
        <h6 className='m-0 '>Comprando como:</h6>
        <p>{user.name}</p>
      </>}
      <form className={classes.root} onSubmit={handleSubmit(onsubmit)}>



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

          <>
            <p className="text-center">Inicie sesión con Google para enviar el pedido</p>
            <button onClick={signIn} type='button' className="btn btn-primary">Entrar con Google</button>
          </>

          :

          <button type="submit" className="btn btn-danger">Enviar</button>}
       

      </form>
    </div>
  )
}

export default Formulario
