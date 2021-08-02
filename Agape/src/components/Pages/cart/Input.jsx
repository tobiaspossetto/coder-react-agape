import React,{useEffect} from 'react'

const Input = (props) => {


    //Si detecta algun cambio voy guardando el texto en el estado campo de cada input
    const onChange = (e) => {
       props.setEstado({...props.estado, campo: e.target.value})
    }


    //Este  useEffect prueba que no se renderiza  sin necesidad
    // useEffect(() => {
    //     console.log('montado')
    // },[])

    //Ingresa a las validaciones cada vez que se teclea dentro o se ingresa a el
    const validaciones = () => {
        //Si el input tiene asignada una expresionRegular
        if(props.expresionRegular){
            
            //Verifica que la cumpla usando test()
            if(props.expresionRegular.test(props.estado.campo)){
                //el contenido del estado valido es un string porque lo asigno a los estilos en css
                props.setEstado({...props.estado, valido: 'correcto'})
            }else{
              
                props.setEstado({...props.estado, valido: 'incorrecto'})
            }
        }

       
        
    }

    return (
        <div className="d-block mr-auto ml-auto  w-75 ">
             <input className={'w-100 input ' + props.valido}
                    type={props.type}
                     placeholder={props.placeholder}
                     id={props.id} 
                     name={props.name}
                     value={props.estado.campo}
                     onChange={onChange}
                     onKeyUp={validaciones}
                     onBlur={validaciones}
                     
                     >
                         
            </input>
            
            <span className={`leyenda-defecto  leyenda-${props.valido}`}>{props.mensajeError}</span>
        </div>
    )
}

export default Input
