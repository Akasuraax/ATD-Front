import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import {createBrowserRouter, Outlet, Router, RouterProvider} from "react-router-dom";

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
                    path :"Login",
                    element: <div>Login</div>
                }
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
    </>
}

export default App
