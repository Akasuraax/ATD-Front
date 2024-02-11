import {useTranslation} from "react-i18next";

function InputPwd(){
    const { t } = useTranslation();
    const showPwd = t("login.showPwd");

    const seePwd = () => {
        const inputPwd = document.getElementById("password");
        if(inputPwd.type === "password")inputPwd.type = "text";
        else inputPwd.type = "password";
    }

    return (
        <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
                <input id="seePwd" type="checkbox" onClick={seePwd}
                       className="checkbox w-4 h-4 border border-gray-300 rounded bg-gray-50"/>

            </div>
            <label form="remember"
                   className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{showPwd}</label>
        </div>
    )
}

export default InputPwd;

