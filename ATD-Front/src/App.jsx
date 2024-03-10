import {useEffect} from "react";
import {initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx';
import Activity from "./page/Activity.jsx";
import Footer from './components/Footer/Footer.jsx'
import TicketPage from "./page/Ticket/Ticket.tsx";
import Error from "./page/error/error.tsx";
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import Login from "./page/Login/Login.tsx";
import Register from "./page/Register/Register.jsx";
import Visit from "./page/Visit/Visit.jsx";
import BeneficiaryForm from "./page/Register/Forms/beneficiary.tsx";
import PartnerForm from "./page/Register/Forms/partner.tsx";
import VolunteerForm from "./page/Register/Forms/volunteer.tsx";
import TicketTracking from "./page/Ticket/Tracking/TicketTracking.jsx";
import UsersList from "./page/Back/User/UsersList.tsx";
import Vehicle from "./page/Back/Vehicle/Vehicle.tsx";
import Warehouse from "./page/Back/Warehouse/WarehousesList.tsx";
import Recipe from "./page/Back/Recipe/Recipe.jsx";
import ActivityList from "./page/Back/Activity/Activity.jsx";
import Language from "./page/Back/Language/Language.jsx";
import AddType from "./page/Back/Activity/addForm/AddType.jsx";
import UserDetails from "./page/Back/User/UserDetails"
import 'flowbite/dist/flowbite.min.css';
import {useAuth} from "./AuthProvider.jsx";
import WarehouseDetails from "./page/Back/Warehouse/WarehouseDetails";
import AddWarehouse from "./page/Back/Warehouse/addWarehouse";
import VehicleDetails from "./page/Back/Vehicle/vehicleDetails"


function App() {

    const auth = useAuth();

    // eslint-disable-next-line react/prop-types
    function PrivateRoute({children, roles}) {
        console.log(auth.token)
        if(!auth.token) return <Navigate to="/login"/>
        if(!auth.user.roles.some(role => role.id === roles)) return <Error numError="403"/>;
        return children
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root/>,
            errorElement: <Error numError="404"/>,
            children: [
                {
                    path: "",
                    element: <Home/>,
                },
                {
                    path: 'login',
                    element: <Login/>
                },
                {
                    path: 'activity',
                    element: <Activity/>
                },

                {
                    path: 'register',
                    element: <Outlet/>,
                    children: [
                        {
                            path: '',
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
                    path: 'ticket',
                    element: <Outlet/>,
                    children: [
                        {
                            path: '',
                            element: <TicketPage/>
                        },
                        {
                            path: 'suivi',
                            element: <TicketTracking/>
                        }
                    ]
                },
                {
                    path: 'visit',
                    element: <Visit/>
                },
                {
                    path: 'back',
                    element: <PrivateRoute roles={1}><Outlet/></PrivateRoute>,
                    children: [
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
                                    element: <UserDetails/>,
                                }
                            ]
                        },
                        {
                            path: 'vehicles',
                            element: <Outlet/>,
                            children: [
                                {
                                    path: '',
                                    element: <Vehicle/>
                                },
                                {
                                    path: ':vehiclesId',
                                    element: <VehicleDetails/>,
                                }
                            ]
                        },
                        {
                            path: "warehouses",
                            element: <Outlet/>,
                            children: [
                                {
                                    path: '',
                                    element: <Warehouse/>
                                },
                                {
                                    path: ':warehouseId',
                                    element: <WarehouseDetails/>,
                                },
                                {
                                    path: 'add',
                                    element: <AddWarehouse/>,
                                }
                            ]
                        },
                        {
                            path: "recipes",
                            element: <Recipe/>
                        },
                        {
                            path: 'activities',
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
                            element: <Language/>
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
        <RouterProvider router={router}/>
    )
}

function Root() {
    return <>
        <div className="App">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    </>
}

export default App
