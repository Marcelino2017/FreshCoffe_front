import { Link } from "react-router-dom"

export default function Resgistro() {
  return (
    <>
        <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
        <p>Crea tu cuenta  llenando el formulario</p>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <from>
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
                        placeholder="Nombre"
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
                    />
                </div>

                <input 
                    type="submit" 
                    value="Crear Cuenta"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                />
            </from>
        </div>
        <nav className="mt-5">
            <Link to="/auth/login">
                ¿Ya tienes Cuenta? Inicia Sesión
            </Link>
        </nav>
    </>
  )
}
