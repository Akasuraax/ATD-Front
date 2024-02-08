import React, { useState } from 'react';
import './register.css';
import partnerImg from "../../../files/image/partenaire.jpeg";
import beneficiaryImg from "../../../files/image/beneficiaire.png";
import volunteerImg from "../../../files/image/benevole.png";
import partnerIcon from "../../../files/image/partenaire-icone.png";
import beneficiaryIcon from "../../../files/image/beneficiaire-icone.png";
import volunteerIcon from "../../../files/image/benevole-icone.png";

function Register() {
    const [showPartnerForm, setShowPartnerForm] = useState(false);
    const [showBeneficiaryForm, setShowBeneficiaryForm] = useState(false);
    const [showVolunteerForm, setShowVolunteerForm] = useState(false);
    const handlePartnerClick = () => {
        setShowPartnerForm(true);
    };

    const handleBeneficiaryClick = () =>{
        setShowBeneficiaryForm(true);
    }

    const handleVolunteerClick = () =>{
        setShowVolunteerForm(true);
    }

    return (
        <div>
            {!showPartnerForm && !showVolunteerForm && !showBeneficiaryForm && <Choices handlePartnerClick={handlePartnerClick} handleBeneficiaryClick={handleBeneficiaryClick} handleVolunteerClick={handleVolunteerClick}  />}
            {showPartnerForm && !showVolunteerForm && !showBeneficiaryForm && <PartnerForm />}
            {!showPartnerForm && !showVolunteerForm && showBeneficiaryForm && <BeneficiaryForm />}
            {!showPartnerForm && showVolunteerForm && !showBeneficiaryForm && <VolunteerForm />}
        </div>
    );
}

function Choices({ handlePartnerClick, handleBeneficiaryClick, handleVolunteerClick }) {
    const partnerText = "Faites la différence en devenant notre partenaire. Votre entreprise peut avoir un impact positif immédiat. Rejoignez-nous dès maintenant !";
    const beneficiaryText = "Explorez de nouveaux horizons en acceptant le partage. Des individus compatissants sont prêts à vous accompagner. Ouvrez la porte à une multitude d'opportunités d'entraide dans votre chemin.";
    const volunteerText = "Faites partie de quelque chose de plus grand en devenant bénévole. Votre contribution, même minime, peut changer des vies. Rejoignez-nous, faites une différence !";

    return (
        <div className="register-images">
            <div className="partner">
                <p className="text-white">{partnerText}</p>
                <button type="button" onClick={handlePartnerClick} className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Devenir Partenaire</button>
            </div>
            <div className="beneficiary">
                <p className="text-white">{beneficiaryText}</p>
                <button type="button" onClick={handleBeneficiaryClick} className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Devenir Bénéficiaire</button>
            </div>
            <div className="volunteer">
                <p className="text-white">{volunteerText}</p>
                <button type="button" onClick={handleVolunteerClick} className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Devenir Bénévole</button>
            </div>
        </div>
    );
}

function PartnerForm() {

    const register = "Partenaire"
    const name = "Prénom"
    const lastName = "Nom"
    const companyName = "Nom de l'entreprise"
    const siret = "N°Siret"
    const email = "Email"
    const zipcode = "Code postal"
    const address = "Adresse"
    const phone = "Numéro de téléphone"
    const pwd = "Mot de passe"
    const confirmPwd = "Valider le mot de passe"
    const registerBtn = "S'inscrire"

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

function BeneficiaryForm() {
    const register = "Bénéficiaire"
    const name = "Prénom"
    const lastName = "Nom"
    const birthDate = "Date de naissance"
    const gender = "Sexe"
    const male = "Homme"
    const female = "Femme"
    const unspecified = "Ne pas spécifier"
    const email = "Email"
    const zipcode = "Code postal"
    const address = "Adresse"
    const phone = "Numéro de téléphone"
    const pwd = "Mot de passe"
    const confirmPwd = "Valider le mot de passe"
    const registerBtn = "S'inscrire"
    return (
        <div className="custom-form">
            <div className="form-img">
                <img src={beneficiaryImg} alt="Image partenaire"/>
            </div>

            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[650px] bg-white">
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

function VolunteerForm() {
    const register = "Bénévole"
    const name = "Prénom"
    const lastName = "Nom"
    const birthDate = "Date de naissance"
    const gender = "Sexe"
    const male = "Homme"
    const female = "Femme"
    const unspecified = "Ne pas spécifier"
    const email = "Email"
    const zipcode = "Code postal"
    const address = "Adresse"
    const phone = "Numéro de téléphone"
    const pwd = "Mot de passe"
    const confirmPwd = "Valider le mot de passe"
    const registerBtn = "S'inscrire"
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

export default Register;
