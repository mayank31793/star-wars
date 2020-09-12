import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile, faQuestion, faUserCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';

import './PersonDetails.css';

const PersonDetails = ({match:{params:{personId}}}) => {

    const [personData,setPersonData] = useState({});
    const [personDataPeople,setPersonDataPeople] = useState([]);
    const [species,setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://swapi.dev/api/people/${personId}`)
        .then((res) => {
            setLoading(false);
            setPersonData(res.data)
            return res.data
        })
        .then((response) => {
            if(response.species.length != 0){
                console.log('not empty');
                axios.get(response.species[0])
                .then((res) => {
                    setSpecies(res.data.name)
                })
            }
            else{
                console.log(' empty');
            }
        })
    },[personId])

    console.log(personData.species, species);

    if(loading){
        return <Loading />
    }

    return (
        <div className="personDetails__container">
            <p>this is person numner {personData.name}</p>
            <p>this is person numner {personData.height}</p>
            {species == 'Droid' ? <FontAwesomeIcon icon={faMobile} /> : species == 'Human' ? <FontAwesomeIcon icon={faUserCircle} />: <FontAwesomeIcon icon={faQuestion} /> }
        </div>
    );
}
 
export default PersonDetails;