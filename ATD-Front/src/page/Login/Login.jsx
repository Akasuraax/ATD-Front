import './login.css'
import loginPic from '../../../files/image/login-pic.png'

function Login(){
    const connect = "Connexion";
    const email = "Email/Identifiant";
    const password = "Mot de passe";
    const showPwd = "Afficher le mot de passe";
    const connectBtn = "Se connecter";
    const forgotPwd = "Mot de passe oublié ?";

    return(
        <div className="login-page">
            <div className="login-img">
                <img src={loginPic}
                     alt="Login Picture"
                     />
            </div>
            <div className="login-form">
                <h2 className="connect-title text-center">{connect}</h2>

                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label form="email" className="block text-center mb-2 text-sm font-medium text-gray-900 dark:text-white">{email}</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    <div className="mb-5">
                        <label form="password" className="block text-center mb-2 text-sm font-medium text-gray-900 dark:text-white">{password}</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="checkbox w-4 h-4 border border-gray-300 rounded bg-gray-50" required/>
                        </div>
                        <label form="remember"
                               className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{showPwd}</label>
                    </div>
                    <button type="submit" className="connect-btn text-white focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto text-center block mx-auto">{connectBtn}</button>
                </form>
            </div>
        </div>
    )
}

export default Login;