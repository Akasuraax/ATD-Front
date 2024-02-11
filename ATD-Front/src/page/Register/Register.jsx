import React, { useState } from 'react';
import './register.css';
import {redirect, useNavigate} from "react-router-dom";


function Register() {
    const partnerText = "Faites la différence en devenant notre partenaire. Votre entreprise peut avoir un impact positif immédiat. Rejoignez-nous dès maintenant !";
    const beneficiaryText = "Explorez de nouveaux horizons en acceptant le partage. Des individus compatissants sont prêts à vous accompagner. Ouvrez la porte à une multitude d'opportunités d'entraide dans votre chemin.";
    const volunteerText = "Faites partie de quelque chose de plus grand en devenant bénévole. Votre contribution, même minime, peut changer des vies. Rejoignez-nous, faites une différence !";

    const navigate = useNavigate();
    const toLink = (link) => {
        navigate("/register/" + link);
    }

    return (
        <div className="register-images">
            <div className="partner">
                <p className="text-white">{partnerText}</p>
                <button type="button" onClick={() => toLink("partenaire")}
                        className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Devenir Partenaire
                </button>
            </div>
            <div className="beneficiary">
                <p className="text-white">{beneficiaryText}</p>
                <button type="button" onClick={()=>toLink("beneficiaire")}
                        className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Devenir
                    Bénéficiaire
                </button>
            </div>
            <div className="volunteer">
                <p className="text-white">{volunteerText}</p>
                <button type="button" onClick={() => toLink("benevole")}
                        className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Devenir Bénévole
                </button>
            </div>
        </div>
    );
}

export default Register;
