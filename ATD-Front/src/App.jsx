import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Error from "./page/error/error.jsx";

function App() {

   const router = createBrowserRouter([
        {
            path :'/',
            element: <Home></Home>,
            errorElement: <Error/>,
        },
        {
            path :'Login',
            element: <div>Login</div>
        }
    ])

    useEffect(() => {
        initFlowbite();
    }, []);

  return (
      <html>
          <body className="flex flex-col h-screen justify-between">
              <Header></Header>
              <main className="m-auto">
                <RouterProvider router={router} />
              </main>
              <Footer></Footer>
          </body>
      </html>
  )
}

export default App
