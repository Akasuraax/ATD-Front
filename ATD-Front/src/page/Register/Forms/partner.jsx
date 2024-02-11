import partnerImg from "../../../../files/image/partenaire.jpeg";
import partnerIcon from "../../../../files/image/partenaire-icone.png";
import "../register.css";
import {useTranslation} from "react-i18next";
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
    const pwd = t("register.partner.pwd")
    const confirmPwd = t("register.partner.confirmPwd")
    const registerBtn = t("register.partner.registerBtn")

    return (
        <div className="custom-form">
            <div className="form-img">
                <img src={partnerImg} alt="Image partenaire"/>
            </div>

            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[650px] bg-white">
                    <img src={partnerIcon} className="custom-icon d-block m-auto" width={64}/>
                    <h1 className="mb-5 block text-center pb-5 text-base sm:text-xl">{register}</h1>

                    <form>
                        <div className="mb-5 pt-3">
                            <div className="-mx-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="lastName">{lastName}</label>
                                        <input type="text" name="lastName" id="lastName"
                                               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="name">{name}</label>
                                        <input type="text" name="name" id="name"
                                               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5 pt-3">
                            <div className="-mx-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="companyName">{companyName}</label>
                                        <input type="text" name="companyName" id="companyName"
                                               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="siret">{siret}</label>
                                        <input type="text" name="siret" id="siret"
                                               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5 pt-3">
                            <div className="-mx-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="email">{email}</label>
                                        <input type="text" name="email" id="email"
                                               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="phone">{phone}</label>
                                        <input type="text" name="phone" id="phone"
                                               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="mb-5 pt-3">
                            <div className="-mx-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="zipcode">{zipcode}</label>
                                        <input type="text" name="zipcode" id="zipcode" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="address">{address}</label>
                                        <input type="text" name="address" id="address" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5 pt-3">
                            <div className="-mx-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="pwd">{pwd}</label>
                                        <input type="password" name="pwd" id="pwd"
                                               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label form="confirmPwd">{confirmPwd}</label>
                                        <input type="text" name="confirmPwd" id="confirmPwd"
                                               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                    </div>
                                </div>

                            </div>
                        </div>

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
    );
}

export default PartnerForm;