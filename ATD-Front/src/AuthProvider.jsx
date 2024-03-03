import {useContext, createContext, useState, useEffect} from "react";
import {logInUser} from "./apiService/UserService";
import {useToast} from "./components/Toast/ToastContex.tsx";
import Cookies from "js-cookie";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const storedToken = Cookies.get("site");
    const storedUser = Cookies.get("user");

    const [token, setToken] = useState(storedToken || null);
    const [user, setUser] = useState(JSON.parse(storedUser) || null);

    const {pushToast} = useToast();

    const loginAction = async (data) => {
        try {
            const res = await logInUser(data,null)
            if (res.status === 200) {
                setUser(res.data.user);
                setToken(res.data.token);

                Cookies.set("site", res.data.token, { expires: 5 });
                Cookies.set("user", JSON.stringify(res.data.user), { expires: 5 });
                return true;
            }
            throw new Error(res.data.message);
        } catch (err) {
            pushToast({
                content: "identifiant ou mot de passe incorrecte",
                type: "failure"
            });
        }
    };

    const logOut = () => {
        setUser(null);
        setToken(null);
        Cookies.remove("site");
        Cookies.remove("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};