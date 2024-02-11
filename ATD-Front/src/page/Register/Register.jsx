import React, { useState } from 'react';
import './register.css';
import {redirect, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


function Register() {
    const { t } = useTranslation();

    const partnerText = t("register.partnerText");
    const beneficiaryText = t("register.beneficiaryText");
    const volunteerText = t("register.volunteerText");

    const btnPartner = t("register.btnPartner");
    const btnVolunteer = t("register.btnVolunteer");
    const btnBeneficiary = t("register.btnBeneficiary");

    const navigate = useNavigate();
    const toLink = (link) => {
        navigate("/register/" + link);
    }

    return (
        <main>
            <div className="register-images">
                <div className="partner">
                    <p className="text-white">{partnerText}</p>
                    <button type="button" onClick={() => toLink("partenaire")}
                            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">{btnPartner}</button>
                </div>
                <div className="beneficiary">
                    <p className="text-white">{beneficiaryText}</p>
                    <button type="button" onClick={()=>toLink("beneficiaire")}
                            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">{btnBeneficiary}</button>
                </div>
                <div className="volunteer">
                    <p className="text-white">{volunteerText}</p>
                    <button type="button" onClick={() => toLink("benevole")}
                            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">{btnVolunteer}</button>
                </div>
            </div>
        </main>
    );
}

export default Register;
