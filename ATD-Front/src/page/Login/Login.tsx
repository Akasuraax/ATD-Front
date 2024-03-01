import './login.css'
import InputPwd from "../../components/inputPwd/inputPwd.jsx"
import {useTranslation} from "react-i18next";
import {logIn, logInUser} from "../../apiService/UserService";
import {useToast} from "../../components/Toast/ToastContex";

function Login(){

    const { t } = useTranslation();
    const {pushToast} = useToast();


    const connect = t("login.connect");
    const email = t("login.email");
    const password = t("login.password");
    const connectBtn = t("login.connectBtn");
    const forgotPwd = t("login.forgotPwd");


    const login = async (e) => {
        e.preventDefault();
        const form = e.target;

        console.log(form.elements["password"].value)

        const login = {
            email: form.elements["email"].value,
            password: form.elements["password"].value
        }
        const res = await logInUser(login,pushToast)
    }

    return(
        <main>
            <div className="login-page">
                <div className="login-img">

                </div>
                <div className="login-form">
                    <h2 className="connect-title text-center">{connect}</h2>

                    <form className="max-w-sm mx-auto" onSubmit={login}>
                        <div className="mb-5">
                            <label form="email" className="block text-center mb-2 text-sm font-medium text-gray-900 dark:text-white">{email}</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required/>
                        </div>
                        <div className="mb-5">
                            <label form="password" className="block text-center mb-2 text-sm font-medium text-gray-900 dark:text-white">{password}</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required/>
                        </div>

                        <InputPwd/>

                        <button type="submit" className="connect-btn text-white focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto text-center block mx-auto">{connectBtn}</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Login;