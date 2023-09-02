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
            const { data } = await clientAxios('/api/categoria')
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

    const handleSubmitNuevaOrden = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clientAxios.post('/api/pedidos', 
            {
                total
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
                handleSubmitNuevaOrden
            }}
        >{children}</QuioscoContex.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContex;