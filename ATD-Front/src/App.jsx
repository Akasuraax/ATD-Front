import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx';
import Activity from "./page/Activity.jsx";
import Footer from './components/Footer/Footer.jsx'
import ActivityForm from "./page/ActivityForm/ActivityForm.jsx";
import Ticket from "./page/Ticket/Ticket.jsx";
import Error from "./page/error/error.jsx";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Login from "./page/Login/Login.jsx";
import Register from "./page/Register/Register.jsx";
import LanguageSelector from "./components/LanguageSelector.jsx";
import BeneficiaryForm from "./page/Register/Forms/beneficiary.jsx";
import PartnerForm from "./page/Register/Forms/partner.jsx";
import VolunteerForm from "./page/Register/Forms/volunteer.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path :'/',
            element: <Root/>,
            errorElement:<Error/>,
            children : [
                {
                    path :"",
                    element: <Home/>
                },
                {
                    path :'login',
                    element: <Login/>
                },
                {
                    path :'register',
                    element: <Outlet/>,
                    children : [
                        {
                            path :'',
                            element: <Register/>,
                        },
                        {
                            path: 'beneficiaire',
                            element: <BeneficiaryForm/>
                        },
                        {
                            path: 'partenaire',
                            element: <PartnerForm/>
                        },
                        {
                            path: 'benevole',
                            element: <VolunteerForm/>
                        }
                    ]
                },
                {
                    path :'ticket',
                    element: <Ticket/>
                },

            ]
        },
        {
            path :'Activities',
            element: <Activity></Activity>
        }


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
        <body>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </body>
    </>
}

export default App
