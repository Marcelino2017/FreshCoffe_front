import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import clientAxios from '../config/axios'
import Alert from '../componets/Alerta'
import { useAuth } from '../../hooks/useAuth'


export default function Resgistro() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([])
    const { registro } = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => {
        e.preventDefault();
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        registro(datos, setErrores)
    }

    return (
        <>
            <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
            <p>Crea tu cuenta  llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form 
                    onSubmit={handleSubmit} 
                    noValidate
                >
                    {errores ? errores.map((error, index) => <Alert key={index}> {error} </Alert>) : null}
                    
                    <div className="mb-4">
                        <label 
                            className="text-slate-800"
                            htmlFor="name"
                        >Nombre:</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name"
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Tu Nombre"
                            ref={nameRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label 
                            className="text-slate-800"
                            htmlFor="email"
                        >Email:</label>
                        <input 
                            type="text" 
                            id="email"
                            name="email" 
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Email"
                            ref={emailRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label 
                            className="text-slate-800"
                            htmlFor="password"
                        >Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Password"
                            ref={passwordRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label 
                            className="text-slate-800"
                            htmlFor="password_confirmation"
                        >Password:</label>
                        <input 
                            type="password" 
                            id="password_confirmation"
                            name="password_confirmation" 
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Repertir Password"
                            ref={passwordConfirmationRef}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Crear Cuenta"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>
            <nav className="mt-5">
                <Link to="/auth/login">
                    ¿Ya tienes Cuenta? Inicia Sesión
                </Link>
            </nav>
        </>
    )
}
