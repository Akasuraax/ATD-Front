import React, { useState } from 'react';
import axios from 'axios';
import {postAddress} from "../../apiService/address";
import {useToast} from "../Toast/ToastContex";

function AdresseInput() {
    const [suggestions, setSuggestions] = useState([]);
    const {pushToast} = useToast();

    const handleInputChange = async (event) => {
        const inputValue = event.target.value;
        try {
            const response = await postAddress({input:inputValue});
            console.log(response)
            setSuggestions(response.data.data.predictions);
        } catch (error) {
            console.error('Erreur lors de la récupération des suggestions d\'adresse', error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Entrez votre adresse" onChange={handleInputChange} />
            <ul>
                {suggestions?.map((suggestion) => (
                    <li key={suggestion.id}>{suggestion.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default AdresseInput;
