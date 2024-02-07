import volunteerImg from '../../../files/image/benevole.png'
import partnerImg from '../../../files/image/partenaire.png'
import beneficiaryImg from '../../../files/image/beneficiaire.png'
import './register.css'

function Register(){
    const buttonText = "Nous rejoindre"
    const partnerText = "Faites la différence en devenant notre partenaire. Votre entreprise peut avoir un impact positif immédiat. Rejoignez-nous dès maintenant !"
    const beneficiaryText = "Explorez de nouveaux horizons en acceptant le partage. Des individus compatissants sont prêts à vous accompagner. Ouvrez la porte à une multitude d'opportunités d'entraide dans votre chemin."
    const volunteerText = "Faites partie de quelque chose de plus grand en devenant bénévole. Votre contribution, même minime, peut changer des vies. Rejoignez-nous, faites une différence !"

    return(
        <div className="register-images">
            <div className="partner">
                <img src={partnerImg} alt="Illustration bénévole"/>
            </div>
            <div className="beneficiary">
                <img src={beneficiaryImg} alt="Illustration bénévole"/>
            </div>
            <div className="volunteer">
                <img src={volunteerImg} alt="Illustration bénévole"/>
            </div>
        </div>
    )
}

export default Register;