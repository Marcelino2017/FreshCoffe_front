import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify";
import { categorias as categoriaDB } from "../data/categorias";
import clientAxios from '../config/axios'

const QuioscoContex = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriaDB);
    let [categoriaActual, setCategoriaActual] = useState({});
    let [modal, setModal] = useState(false);
    let [producto, setProducto] = useState({});
    let [pedido, setPedido] = useState([]);
    let [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async () => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN')
            const { data } = await clientAxios('/api/categoria', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategorias(data.data);
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])
    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)

    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({ categoria_id, ...producto }) => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado Corectamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado el Pedido')
        }
    }

    const handleEditarCantidad = id => {
        const productoActlizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActlizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del pedido')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clientAxios.post('/api/pedidos', 
            {
                total: total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                }),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message)
            setTimeout(() => {
                setPedido([])
            }, 1000);

            //Cerrar la sesion del usuario
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN')
                logout();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickCompletarPedido = async id => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN')
            await clientAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <QuioscoContex.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido
            }}
        >{children}</QuioscoContex.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContex;