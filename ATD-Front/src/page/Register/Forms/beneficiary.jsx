import beneficiaryImg from "../../../../files/image/beneficiaire.png";
import beneficiaryIcon from "../../../../files/image/beneficiaire-icone.png";
import "../register.css";
import {useTranslation} from "react-i18next";
import {Beneficiary} from "../../../interfaces/user.ts"
import InputField from "../../../components/input/inputField.jsx";
import SelectField from "../../../components/input/SelectField.jsx";
import ValidPwd from "../../../components/input/ValidPwd.jsx";

function BeneficiaryForm() {

    const {t} = useTranslation();

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
    const registerBtn = t("register.beneficiary.registerBtn")


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

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
                                            label={birthDate}
                                            type="date"
                                            name="birthDate"
                                            id="birthDate"
                                        />
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <SelectField
                                            label={gender}
                                            id="gender"
                                            options={[
                                                {value: 'male', label: male},
                                                {value: 'female', label: female},
                                                {value: 'unspecified', label: unspecified},
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
                                            required={false}
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

export default BeneficiaryForm;