import React, { useState } from 'react';
import './register.css';

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
    return (
        <div>
            <div></div>
        </div>
    );
}

function BeneficiaryForm(){
    return (
        <div>
            <p>Formulaire de bénéficiaire</p>
        </div>
    );
}

function VolunteerForm(){
    return (
        <div>
            <p>Formulaire de bénévole</p>
        </div>
    );
}

export default Register;
