import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx';
import Activity from "./page/Activity.jsx";
import Footer from './components/Footer/Footer.jsx'
import Ticket from "./page/Ticket/Ticket.jsx";
import Error from "./page/error/error.jsx";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Login from "./page/Login/Login.jsx";
import Register from "./page/Register/Register.jsx";
import Visit from "./page/Visit/Visit.jsx";
import BeneficiaryForm from "./page/Register/Forms/beneficiary.jsx";
import PartnerForm from "./page/Register/Forms/partner.jsx";
import VolunteerForm from "./page/Register/Forms/volunteer.jsx";
import TicketTracking from "./page/Ticket/Tracking/TicketTracking.jsx";
import User from "./page/Back/User/User.jsx";
import Vehicle from "./page/Back/Vehicle/Vehicle.jsx";
import Warehouse from "./page/Back/Warehouse/Warehouse.jsx";
import Recipe from "./page/Back/Recipe/Recipe.jsx";
import ActivityList from "./page/Back/Activity/Activity.jsx";
import Language from "./page/Back/Language/Language.jsx";

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
                    path :'activities',
                    element: <Activity/>
                },
                {
                    path:'back/activities',
                    element: <ActivityList/>
                },
                {
                  path: 'back/languages',
                  element:<Language/>
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
                    element: <Outlet/>,
                    children : [
                        {
                            path:'',
                            element: <Ticket/>
                        },
                        {
                            path:'suivi',
                            element: <TicketTracking/>
                        }
                    ]
                },
                {
                    path:'visit',
                    element: <Visit/>
                },
                {
                    path: 'back/users',
                    element: <User/>
                },
                {
                    path: 'back/vehicles',
                    element: <Vehicle/>
                },
                {
                    path : "back/warehouses",
                    element: <Warehouse/>
                },
                {
                    path: "back/recipes",
                    element: <Recipe/>
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
        <body>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </body>
    </>
}

export default App
