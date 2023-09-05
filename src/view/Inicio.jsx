import Producto from "../componets/Producto";
import { productos as data } from "../data/productos"
import useQuiosco from "../../hooks/useQuiesco";
import useSWR from "swr";
import clientAxios from "../config/axios";


export default function Inicio() {

    const { categoriaActual } = useQuiosco();
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clientAxios('/api/productos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR('/api/productos', fetcher, {
        refreshInterval: 1000
    })

    if (isLoading) {
        return 'Cargando...'
    }
    
    const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)

    return (
        <>            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {productos.map(producto => (
                    <Producto
                        key={producto.imagen}
                        producto={producto}
                        botonAgregar={true}
                    />
                ))}
            </div>
        </>
    )
}
