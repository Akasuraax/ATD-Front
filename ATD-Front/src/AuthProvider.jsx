import {useContext, createContext, useState} from "react";
import {logInUser} from "./apiService/UserService";
import Cookies from "js-cookie";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");
    const [token, setToken] = useState(storedToken || null);
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

    const loginAction = async (data) => {
        try {
            const res = await logInUser(data)
            if (res.status === 200) {
                setUser(res.data.user);
                setToken(res.data.token);
                Cookies.set("token", res.data.token, { expires: 5 });
                Cookies.set("user", JSON.stringify(res.data.user), { expires: 5 });
                return true;
            }
            throw new Error(res.data.message);
        } catch (err) {
            return false;
        }
    };

    const logOut = () => {
        setUser(null);
        setToken(null);
        Cookies.remove("token");
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