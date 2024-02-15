import partnerImg from "../../../../files/image/partenaire.jpeg";
import partnerIcon from "../../../../files/image/partenaire-icone.png";
import "../register.css";
import {useTranslation} from "react-i18next";
import ValidPwd from "../../../components/input/ValidPwd.jsx";
import InputField from "../../../components/input/inputField.jsx";
function PartnerForm() {

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


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e)
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