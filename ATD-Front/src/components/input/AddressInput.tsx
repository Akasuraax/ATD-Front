import React, {useState} from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


const AddressInput = ({ onAddressSelect, address }) => {

    const [selectedPlace, setSelectedPlace] = useState();

    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey="AIzaSyCTX6tfJY5SiK7aCEOjROPRZvy4c9-WzDY"
                apiOptions={{ language: 'fr', region: 'fr' }}
                selectProps={{
                    address,
                    onChange: onAddressSelect,
                }}
            />
        </div>
    );
}


export default AddressInput;