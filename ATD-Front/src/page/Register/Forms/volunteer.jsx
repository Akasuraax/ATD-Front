import volunteerImg from "../../../../files/image/benevole.png";
import volunteerIcon from "../../../../files/image/benevole-icone.png";
import "../register.css";
import {useTranslation} from "react-i18next";
function VolunteerForm() {

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
    const pwd = t("register.volunteer.pwd")
    const confirmPwd = t("register.volunteer.confirmPwd")
    const registerBtn = t("register.volunteer.registerBtn")

    return (
        <div className="custom-form">
            <div className="form-img">
                <img src={volunteerImg} alt="Image partenaire"/>
            </div>

            <div className="flex items-center justify-center p-5">
                <div className="mx-auto w-full max-w-[650px] bg-white">
                    <img src={volunteerIcon} className="custom-icon d-block m-auto" width={64}/>
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
    );
}

export default VolunteerForm;