import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx';
import Activity from "./page/Activity.jsx";
import Footer from './components/Footer/Footer.jsx'
import TicketPage from "./page/Ticket/Ticket.tsx";
import Error from "./page/error/error.jsx";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Login from "./page/Login/Login.jsx";
import Register from "./page/Register/Register.jsx";
import Visit from "./page/Visit/Visit.jsx";
import BeneficiaryForm from "./page/Register/Forms/beneficiary.tsx";
import PartnerForm from "./page/Register/Forms/partner.tsx";
import VolunteerForm from "./page/Register/Forms/volunteer.tsx";
import TicketTracking from "./page/Ticket/Tracking/TicketTracking.jsx";
import UsersList from "./page/Back/User/UsersList.tsx";
import Vehicle from "./page/Back/Vehicle/Vehicle.jsx";
import Warehouse from "./page/Back/Warehouse/Warehouse.jsx";
import Recipe from "./page/Back/Recipe/Recipe.jsx";
import ActivityList from "./page/Back/Activity/Activity.jsx";
import Language from "./page/Back/Language/Language.jsx";
import AddType from "./page/Back/Activity/addForm/AddType.jsx";
import UserDetails from "./page/Back/User/UserDetails"
import 'flowbite/dist/flowbite.min.css';


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
                    path :'activity',
                    element: <Activity/>
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
                            element: <TicketPage/>
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
                    path: 'back',
                    element: <Outlet/>,
                    children : [
                    {
                        path: '',
                        element: <UsersList/>
                    },
                    {
                        path: 'users',
                        element: <Outlet/>,
                        children: [
                            {
                                path: '',
                                element: <UsersList/>
                            },
                            {
                            path: ':userId',
                            element: <UserDetails />,
                            }
                        ]
                    },
                    {
                        path: 'vehicles',
                        element: <Vehicle/>
                    },
                    {
                        path : "warehouses",
                        element: <Warehouse/>
                    },
                    {
                        path: "recipes",
                        element: <Recipe/>
                    },
                    {
                        path:'activities',
                        element: <Outlet/>,
                        children: [
                            {
                                path: '',
                                element: <ActivityList/>
                            },
                            {
                                path: 'add',
                                element: <AddType/>
                            }
                        ]
                    },
                    {
                        path: 'languages',
                        element:<Language/>
                    },
                ]
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
