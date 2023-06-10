import { createContext, useState } from "react"
import { toast } from "react-toastify";
import { categorias as categoriaDB } from "../data/categorias";


const QuioscoContex = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriaDB);
    let [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    let [modal, setModal] = useState(false);
    let [producto, setProducto] = useState({});
    let [pedido, setPedido] = useState([]);

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
                handleEliminarProductoPedido
            }}
        >{children}</QuioscoContex.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContex;