import partnerImg from "../../../../files/image/partenaire.jpeg";
import partnerIcon from "../../../../files/image/partenaire-icone.png";
import "../register.css";
import {useTranslation} from "react-i18next";
import ValidPwd from "../../../components/input/ValidPwd.jsx";
import {ISendPartner} from "../../../interfaces/user.js";
import InputField from "../../../components/input/inputField.jsx";
import {postUser} from "../../../apiService/UserService.js";
import {useToast} from "../../../components/Toast/ToastContex.js";
import {useNavigate} from 'react-router-dom';

function PartnerForm() {
    const navigate = useNavigate();

    const {pushToast} = useToast();
    const { t } = useTranslation();

    const register = t("register.partner.register")
    const name = t("register.partner.name")
    const lastName = t("register.partner.lastName")
    const companyName = t("register.partner.companyName")
    const siret = t("register.partner.siret")
    const email = t("register.partner.email")
    const zipcode = t("register.partner.zipcode")
    const address = t("register.partner.address")
    const phone = t("register.partner.phone")
    const registerBtn = t("register.partner.registerBtn")


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const partner:ISendPartner = {
            forname : form.elements["lastName"].value,
            name : form.elements["name"].value,
            email : form.elements["email"].value,
            phone_number : form.elements["phone"].value,
            zipcode : form.elements["zipcode"].value,
            address : form.elements["address"].value,
            password : form.elements["pwd"].value,
            siret_number : form.elements["siret"].value,
            compagny : form.elements["companyName"].value
        }

        const res = await postUser(partner,pushToast,'partner')
        if(res.status === 201)
            navigate(`/login`)
    }

    return (
        <main>
            <div className="form-img">
                <img src={partnerImg} alt="Image partenaire"/>
            </div>
            <div className="custom-form">
                <div className="form-icon">
                    <div className="mx-auto w-full max-w-[650px] bg-white">
                        <img src={partnerIcon} className="custom-icon d-block m-auto" width={64}/>
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
                                        <InputField
                                            label={companyName}
                                            type="text"
                                            name="companyName"
                                            id="companyName"
                                        />
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <InputField
                                            label={siret}
                                            type="text"
                                            name="siret"
                                            id="siret"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5 pt-3">
                                <div className="-mx-5 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <InputField
                                            label={email}
                                            type="email"
                                            name="email"
                                            id="email"
                                        />
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <InputField
                                            label={phone}
                                            type="text"
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
                                        <InputField
                                            label={address}
                                            type="text"
                                            name="address"
                                            id="address"
                                        />
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

export default PartnerForm;