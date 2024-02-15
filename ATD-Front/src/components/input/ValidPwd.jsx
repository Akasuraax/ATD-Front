import InputField from "./inputField.jsx";
import React, {useState} from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";



// ...

const ValidPwd = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [diff, setDiff] = useState(false);

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const { t } = useTranslation();

    const pwd = t("register.beneficiary.pwd");
    const confirmPwd = t("register.beneficiary.confirmPwd");
    const showPwd = t("login.showPwd");

    const handlePasswordChange = (e) => {
        if(e.target.name === "pwd") {
            if (e.target.value !== confirmPassword) setDiff(true);
            else setDiff(false);
        }
        else {
            if (e.target.value !== password) setDiff(true)
            else setDiff(false);
        }
    };

    return (
        <div className="mb-5 pt-3">
            <div className="-mx-5 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <InputField
                        label={pwd}
                        type={showPassword ? 'text' : 'password'}
                        name="pwd"
                        id="pwd"
                        minLength="8"
                        value={password}
                        className={diff ? 'border-red-600' : ''}
                        onChange={(e) => {
                            setPassword(() => e.target.value);
                            handlePasswordChange(e);
                        }}
                    />
                </div>
                <div className={"w-full px-3 sm:w-1/2"}>
                    <InputField
                        label={confirmPwd}
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPwd"
                        id="confirmPwd"
                        minLength="8"
                        value={confirmPassword}
                        className={diff ? 'border-red-600' : ''}
                        onChange={(e) => {
                            setConfirmPassword(() => e.target.value);
                            handlePasswordChange(e);
                        }}
                    />
                </div>
            </div>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input
                        id="seePwd"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        className="checkbox w-4 h-4 border border-gray-300 rounded bg-gray-50"
                    />
                </div>
                <label
                    form="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    {showPwd}
                </label>
            </div>
        </div>
    );
};

export default ValidPwd;


