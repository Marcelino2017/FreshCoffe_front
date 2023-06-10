import { Outlet } from "react-router-dom"
import Sidebar from "../componest/Sidebar"
import Resumen from "../componest/Resumen"
import useQuiosco from "../../hooks/useQuiesco"
import Modal from "react-modal"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ModalProducto from "../componest/ModalProducto"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root');

export default function Layout() {

  const { modal, handleClickModal } = useQuiosco();

  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
        </main>

        <Resumen />
      </div>

      <Modal isOpen={modal} style={customStyles}>
        <ModalProducto />
      </Modal>

      <ToastContainer />

    </>
  )
}
