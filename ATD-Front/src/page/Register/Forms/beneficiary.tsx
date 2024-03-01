import beneficiaryImg from "../../../../files/image/beneficiaire.png";
import beneficiaryIcon from "../../../../files/image/beneficiaire-icone.png";
import "../register.css";
import {useTranslation} from "react-i18next";
import InputField from "../../../components/input/inputField.jsx";
import SelectField from "../../../components/input/SelectField.jsx";
import ValidPwd from "../../../components/input/ValidPwd.jsx";
import {ISendBeneficiary} from "../../../interfaces/user";
import {postUser} from "../../../apiService/UserService";
import {useToast} from "../../../components/Toast/ToastContex";

function BeneficiaryForm() {

    const {pushToast} = useToast();

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const beneficiary:ISendBeneficiary = {
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

        const res = await postUser(beneficiary,pushToast,'beneficiary')
        console.log(res)
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