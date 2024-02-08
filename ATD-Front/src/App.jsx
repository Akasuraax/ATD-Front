import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Ticket from "./page/Ticket/Ticket.jsx";

function App() {

   const router = createBrowserRouter([
        {
            path :'/',
            element: <Home></Home>
        },
        {
            path :'Login',
            element: <div>Login</div>
        },{
            path:'Ticket',
            element: <Ticket></Ticket>
       }

    ])

    useEffect(() => {
        initFlowbite();
    }, []);

  return (
      <html>
          <body>
              <Header></Header>
              <RouterProvider router={router} />
              <Footer></Footer>
          </body>
      </html>
  )
}

export default App
