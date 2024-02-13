import beneficiaryImg from "../../../../files/image/beneficiaire.png";
import beneficiaryIcon from "../../../../files/image/beneficiaire-icone.png";
import "../register.css";
import {useTranslation} from "react-i18next";
function BeneficiaryForm() {

    const { t } = useTranslation();

    const register = t("register.beneficiary.register")
    const name = t("register.beneficiary.name")
    const lastName = t("register.beneficiary.lastName")
    const birthDate = t("register.beneficiary.birthDate")
    const gender = t("register.beneficiary.gender")
    const male = t("register.beneficiary.male")
    const female = t("register.beneficiary.female")
    const unspecified = t("register.beneficiary.unspecified")
    const email = t("register.beneficiary.email")
    const zipcode = t("register.beneficiary.zipcode")
    const address = t("register.beneficiary.address")
    const phone = t("register.beneficiary.phone")
    const pwd = t("register.beneficiary.pwd")
    const confirmPwd = t("register.beneficiary.confirmPwd")
    const registerBtn = t("register.beneficiary.registerBtn")


    return (
        <main>
            <div className="form-img">
                <img src={beneficiaryImg} alt="Image partenaire"/>
            </div>
            <div className="custom-form">
                <div className="form-icon">
                    <div className="d-block m-auto mx-auto w-full max-w-[650px] bg-white">
                        <img src={beneficiaryIcon} className="custom-icon d-block m-auto" width={64}/>
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
                                            <label form="birthDate">{birthDate}</label>
                                            <input type="date" name="birthDate" id="birthDate"
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="gender">{gender}</label>
                                            <select name="gender" id="gender"
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md">
                                                <option value="male">{male}</option>
                                                <option value="female">{female}</option>
                                                <option value="unspecified">{unspecified}</option>
                                            </select>
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
                                            <input type="text" name="zipcode" id="zipcode"
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label form="address">{address}</label>
                                            <input type="text" name="address" id="address"
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
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
        </main>
    );
}

export default BeneficiaryForm;