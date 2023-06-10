import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './view/Inicio'
import Login from './view/Login'
import Resgistro from './view/Resgistro'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element:<Inicio/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: '/auth/login',
                element:<Login/>
            },
            {
                path: '/auth/registro',
                element:<Resgistro/>
            }
        ]
    }
])


export default router