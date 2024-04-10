import volunteerImg from "../../../../files/image/benevole.png";
import volunteerIcon from "../../../../files/image/benevole-icone.png";
import "../register.css";
import {useTranslation} from "react-i18next";
import InputField from "../../../components/input/inputField.jsx";
import SelectField from "../../../components/input/SelectField.jsx";
import ValidPwd from "../../../components/input/ValidPwd.jsx";
import {ISendBeneficiary} from "../../../interfaces/user.js";
import {useToast} from "../../../components/Toast/ToastContex.js";
import {postUser} from "../../../apiService/UserService.js";
import {useNavigate} from 'react-router-dom';
import React from "react";

function VolunteerForm() {
    const navigate = useNavigate();
    const {pushToast} = useToast();

    const { t } = useTranslation();

    const register = t("register.volunteer.register")
    const name = t("register.volunteer.name")
    const lastName = t("register.volunteer.lastName")
    const birthDate = t("register.volunteer.birthDate")
    const gender = t("register.volunteer.gender")
    const male = t("register.volunteer.male")
    const female = t("register.volunteer.female")
    const unspecified = t("register.volunteer.unspecified")
    const email = t("register.volunteer.email")
    const zipcode = t("register.volunteer.zipcode")
    const address = t("register.volunteer.address")
    const phone = t("register.volunteer.phone")
    const registerBtn = t("register.volunteer.registerBtn")

    const today = new Date();
    const eighteenYearsAgo = new Date().setFullYear(today.getFullYear() - 16);
    const maxDate = new Date(eighteenYearsAgo).toISOString().split('T')[0];
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const volunteer:ISendBeneficiary = {
            forname : form.elements["lastName"].value,
            name : form.elements["name"].value,
            birth_date : form.elements["birthDate"].value,
            gender : form.elements["gender"].value,
            email : form.elements["email"].value,
            phone_number : form.elements["phone"].value,
            zipcode : form.elements["zipcode"].value,
            address : form.elements["address"].value,
            password : form.elements["pwd"].value
        }



        const res = await postUser(volunteer,pushToast,'volunteer')
        if(res.status === 201)
            navigate(`/login`)
    }

    return (
        <main>
            <div className="form-img">
                <img src={volunteerImg} alt="Image partenaire"/>
            </div>
            <div className="custom-form">
                <div className="form-icon">
                    <div className="d-block m-auto mx-auto w-full max-w-[650px] bg-white">
                        <img src={volunteerIcon} className="custom-icon d-block m-auto" width={64}/>
                        <h1 className="mb-5 block text-center pb-5 text-base sm:text-xl">{register}</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5 pt-3">
                                <div className="-mx-5 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <InputField
                                            label={lastName}
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                        />
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <InputField
                                            label={name}
                                            type="text"
                                            name="name"
                                            id="name"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5 pt-3">
                                <div className="-mx-5 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor={birthDate}>{birthDate}</label>
                                            <input
                                                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md`}
                                                type="date"
                                                name="birthDate"
                                                id="birthDate"
                                                max={maxDate}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <SelectField
                                            label={gender}
                                            id="gender"
                                            options={[
                                                {value: 0, label: male},
                                                {value: 1, label: female},
                                                {value: 2, label: unspecified},
                                            ]}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5 pt-3">
                                <div className="-mx-5 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <InputField
                                            label={email}
                                            type="text"
                                            name="email"
                                            id="email"
                                        />
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <InputField
                                            label={phone}
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            pattern="[0-9]{10}"
                                            placeHorlder="0610101010"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5 pt-3">
                                <div className="-mx-5 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <InputField
                                            label={zipcode}
                                            type="text"
                                            name="zipcode"
                                            id="zipcode"
                                            pattern="[0-9]{5}"
                                            placeHorlder="75001 "
                                        />
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label form="address">{address}</label>
                                            <input required type="text" name="address" id="address"
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ValidPwd/>
                            <div>
                                <button
                                    className="rounded-md py-3 px-4 text-center text-base text-white outline-none">
                                    {registerBtn}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default VolunteerForm;