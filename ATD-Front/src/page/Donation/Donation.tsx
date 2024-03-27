import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast/ToastContex";
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";
import AnimatedNumber from "react-animated-numbers";
import { getTotalDonations } from "../../apiService/DonationService";
import "./donation.css";

export default function Donation() {
    const { t } = useTranslation();
    const [standBy, setStandBy] = useState(false);
    const { pushToast } = useToast();
    const [donation, setDonation] = useState(0); // Initialize donation with 0
    const navigate = useNavigate();

    const [dataGrid, setDataGrid] = useState({});

    useEffect(() => {
        sendRequest();
    }, [dataGrid]);

    async function sendRequest() {
        setStandBy(true);
        try {
            const response = await getTotalDonations(dataGrid, pushToast);
            setDonation(response);
            setStandBy(false);
        } catch (error) {
            setStandBy(false);
        }
    }

    return (
        <main>
            <div className="donation-page">
                <div className="donation-image"></div>
                <div className="donation-data">
                    <h2>{t("donation.total")}</h2>
                    <h3 className="flex justify-center">
                        <AnimatedNumber
                            animateToNumber={donation}
                            animationType={"calm"}
                        />
                        €
                    </h3>

                    <p>{t("donation.thanks")}</p>

                    <stripe-buy-button
                        buy-button-id="buy_btn_1OxvlLCJaEDmVxZfQPSs7c9A"
                        publishable-key="pk_test_51Oxs6xCJaEDmVxZfc4ob9XV222gTMvAlfylfBtMblNWx67BvD4neB5Qev1zyqsJzJjLvjyjjYUaLoLA7TLnDuk4a00lbkv2VmZ"
                    ></stripe-buy-button>
                </div>
            </div>
        </main>
    );
}
