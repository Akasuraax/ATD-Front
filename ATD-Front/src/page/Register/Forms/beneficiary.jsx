import beneficiaryImg from "../../../../files/image/beneficiaire.png";
import beneficiaryIcon from "../../../../files/image/beneficiaire-icone.png";
import "../register.css";
import {useTranslation} from "react-i18next";
import InputPwd from "../../../components/inputPwd/inputPwd.jsx";
import { Beneficiary } from "../../../interfaces/user.ts"

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


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        if (form.elements["pwd"].value !== form.elements["confirmPwd"].value) {
            // Passwords do not match, handle accordingly (display an error message, etc.)
            form.elements["pwd"].value = '';
            form.elements["confirmPwd"].value = '';
            return;
        }



        const lastName = form.elements["lastName"].value;
        const name = form.elements["name"].value;
        const birthDate = form.elements["birthDate"].value;
        const gender = form.elements["gender"].value;
        const email = form.elements["email"].value;
        const phone = form.elements["phone"].value;
        const zipcode = form.elements["zipcode"].value;
        const address = form.elements["address"].value;
        const pwd = form.elements["pwd"].value;

        const beneficiary = new Beneficiary(name, lastName, phone, address, zipcode, pwd, email, new Date(birthDate), gender);
        console.log(beneficiary);
    }


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
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5 pt-3">
                                <div className="-mx-5 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label form="lastName">{lastName}</label>
                                            <input required type="text" name="lastName" id="lastName"
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label form="name">{name}</label>
                                            <input required type="text" name="name" id="name"
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
                                            <select required name="gender" id="gender"
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
                                            <input required type="email" name="email" id="email"
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label form="phone">{phone}</label>
                                            <input required type="tel" name="phone" id="phone" pattern="[0-9]{10}"
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
                                            <input required type="text" name="zipcode" id="zipcode" pattern="[0-9]{5}"
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                        </div>
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
                            <div className="mb-5 pt-3">
                                <div className="-mx-5 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label form="pwd">{pwd}</label>
                                            <input required type="password" name="pwd" id="pwd"
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"/>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label form="confirmPwd">{confirmPwd}</label>
                                            <input required type="password" name="confirmPwd" id="confirmPwd"
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