import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import Error from "./page/error/error.jsx";
import {createBrowserRouter, Outlet, Router, RouterProvider} from "react-router-dom";
import Login from "./page/Login/Login.jsx";
import Register from "./page/Register/Register.jsx";

function App() {

   const router = createBrowserRouter([
        {
            path :'/',
            element: <Root/>,
            children : [
                {
                    path :"",
                    element: <Home/>
                },
                {
                    path :'Login',
                    element: <Login></Login>
                },
                {
                    path :'Register',
                    element: <Register></Register>
                },
            ]
        },


    ])

    useEffect(() => {
        initFlowbite();
    }, []);

  return (
    <RouterProvider router={router} />
  )
}

function Root() {
    return <>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
}

export default App
