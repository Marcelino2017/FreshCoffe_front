import useSWR from 'swr'
import clientAxios from '../config/axios'
import Producto from '../componets/Producto'

export default function Productos() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clientAxios('/api/productos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(datos => datos.data)

    const {data, error, isLoading} = useSWR('/api/productos', fetcher, {refreshInterval: 10000})

    console.log(data);


    if (isLoading) return 'Cargando...'
    return (
        <div>
            <h1 className="text-4xl font-black">Productos</h1>
            <p className="text-2xl my-10">
                Maneja la disponibilidada desde aqui
            </p>
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {data.data.map(producto => (
                    <Producto
                        key={producto.imagen}
                        producto={producto}
                        botonDisponible={true}
                    />
                ))} 
            </div>
        </div>
    )
}