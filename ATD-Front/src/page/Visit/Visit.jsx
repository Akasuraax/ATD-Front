import './visit.css'
import List from "../../components/List/List.jsx";

function Visit(){
    const visitsDemand = "Demande de visite de personnes agées";
    const lastName = 'Nom'
    const name = 'Prénom'
    const age = 'Âge'
    const address = 'Adresse'
    const zipcode = 'Code postal'
    const action = 'Action'
    const refuse = 'Je ne peux pas'
    const accept = 'J\'y vais !'
    const list = [
        {lastName:"Jean", name: "Martine", age: 98, address: "7 rue des pins perdu",zipcode:94190},
        {lastName:"Pabille", name: "Pena", age: 69, address: "5 rue des pommiers",zipcode:94190},
        {lastName:"Bob-Jean", name: "Jean-Bob", age: 90, address: "7 rue des bois perdu",zipcode:94190},
    ]

    const userActions = [
        { label: {accept}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    return(
        <div className="visit-page">
            <h2 className="text-center m-12">{visitsDemand}</h2>
            <List data={list} column={[{lastName}, {name}, {age}, {address}, {zipcode}, {action}]} actions={userActions}/>
        </div>
    );
}

export default Visit;