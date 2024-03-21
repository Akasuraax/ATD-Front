import {useEffect} from "react";
import {initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx';
import Activity from "./page/Activity.jsx";
import Footer from './components/Footer/Footer.jsx'
import TicketPage from "./page/Ticket/Ticket.tsx";
import MessageTicket from "./page/Message/MessagesTicket.tsx"
import Error from "./page/error/error.tsx";
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import Login from "./page/Login/Login.tsx";
import Register from "./page/Register/Register.jsx";
import Visit from "./page/Visit/Visit.jsx";
import BeneficiaryForm from "./page/Register/Forms/beneficiary.tsx";
import PartnerForm from "./page/Register/Forms/partner.tsx";
import VolunteerForm from "./page/Register/Forms/volunteer.tsx";
import TicketTracking from "./page/Ticket/Tracking/TicketTracking.tsx";
import UsersList from "./page/Back/User/UsersList.tsx";
import Vehicle from "./page/Back/Vehicle/Vehicle.tsx";
import Warehouse from "./page/Back/Warehouse/WarehousesList";
import ActivityList from "./page/Back/Activity/Activity.jsx";
import Language from "./page/Back/Language/LanguagesList.tsx";
import UserDetails from "./page/Back/User/UserDetails"
import 'flowbite/dist/flowbite.min.css';
import {useAuth} from "./AuthProvider.jsx";
import WarehouseDetails from "./page/Back/Warehouse/WarehouseDetails";
import RecipesList from "./page/Back/recipe/recipesList";
import AddWarehouse from "./page/Back/Warehouse/addWarehouse";
import VehicleDetails from "./page/Back/Vehicle/vehicleDetails"
import Profile from "./page/Profile/Profile";
import AddLanguage from "./page/Back/Language/AddLanguage.tsx";
import LanguageDetails from "./page/Back/Language/LanguageDetails.tsx";
import RolesList from "./page/Back/Role/RolesList.tsx";
import AddRole from "./page/Back/Role/AddRole.tsx";
import RoleDetails from "./page/Back/Role/RoleDetails.tsx";
import TypesList from "./page/Back/Type/TypesList.tsx";
import AddType from "./page/Back/Type/AddType.tsx";
import TypeDetails from "./page/Back/Type/TypeDetails.tsx";
import Planning from "./page/Planning/Planning"
import AddRecipe from "./page/Back/recipe/AddRecipe";
import EventsList from "./page/Back/event/eventsList";


function App() {

    const auth = useAuth();

    // eslint-disable-next-line react/prop-types
    function PrivateRoute({children, roles}) {
        console.log(auth.token)
        if(!auth.token) return <Navigate to="/login"/>
        if(!auth.user.roles.some(role => role.id === roles)) return <Error numError="403"/>;
        return children
    }
    console.log(auth.user)
    function Token({children}) {
        if(!auth.token) return <Navigate to="/login"/>
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
                    path: 'planning',
                    element: <Planning/>
                },
                {
                    path: 'profile/:userId',
                    element: <Token><Profile/></Token>,
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
                        },
                        {
                            path: ':ticketId',
                            element: <MessageTicket/>
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
                            path:'events',
                            element:<Outlet/>,
                            children: [
                                {
                                    path:'',
                                    element: <EventsList/>
                                },
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
                            element: <Outlet/>,
                            children: [
                                {
                                    path: '',
                                    element: <RecipesList/>
                                },
                                {
                                    path: 'add',
                                    element: <AddRecipe/>,
                                }
                            ]
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
                            element: <Outlet/>,
                            children: [
                                {
                                    path: '',
                                    element: <Language/>
                                },
                                {
                                    path: 'add',
                                    element: <AddLanguage/>
                                },
                                {
                                    path: ':abbreviation',
                                    element: <LanguageDetails/>
                                }
                            ]
                        },
                        {
                            path: 'roles',
                            element: <Outlet/>,
                            children: [
                                {
                                    path: '',
                                    element: <RolesList/>
                                },
                                {
                                    path: 'add',
                                    element: <AddRole/>
                                },
                                {
                                    path: ':roleId',
                                    element: <RoleDetails/>
                                }
                            ]
                        },
                        {
                            path: 'types',
                            element: <Outlet/>,
                            children: [
                                {
                                    path:'',
                                    element: <TypesList/>
                                },
                                {
                                    path: 'add',
                                    element: <AddType/>
                                },
                                {
                                    path: ':typeId',
                                    element: <TypeDetails/>
                                }
                            ]
                        }
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
