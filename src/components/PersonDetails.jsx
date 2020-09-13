import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faQuestion, faUserCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';

import './PersonDetails.css';

const PersonDetails = ({match:{params:{personId}}}) => {

    const [personData,setPersonData] = useState({});
    const [personDataPeople,setPersonDataPeople] = useState([]);
    const [species,setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/${personId}`)
        .then((res) => {
            setLoading(false);
            setPersonData(res.data)
            console.log("reaching here",res.data)
            return res.data
        })
        .then((response) => {
            if(response.species.length != 0){
                console.log('not empty',response.species[0].replace("http","https"));
                // var replaceStr = response.species[0].replace("http","https");
                // var replaceStr = window.location.pathname.split('/')[window.location.pathname.split('/').length - 2]
                axios.get(`https://cors-anywhere.herokuapp.com/${response.species[0]}`)
                .then((res) => {
                    setSpecies(res.data.classification)
                })
            }
            else{
                console.log(' empty');
            }
        })
    },[personId])

    // console.log(personData.species, species);

    if(loading){
        return <Loading />
    }

    return (
        <div className="personDetails__container">
            <div className="person__icon">
                {species == 'artificial' ? <FontAwesomeIcon icon={faRobot} /> : species == 'mammal' ? <FontAwesomeIcon icon={faUserCircle} />: <FontAwesomeIcon icon={faQuestion} /> }
            </div>
            <div>
                <p><b>Name:</b> {personData.name}</p>
                <p><b>Height:</b> {personData.height}</p>
                <p><b>Mass:</b> {personData.mass}</p>
                <p><b>Hair Color:</b> {personData.hair_color}</p>
                <p><b>SKin Color:</b> {personData.skin_color}</p>
                <p><b>Eye Color:</b> {personData.eye_color}</p>
                <p><b>Gender:</b> {personData.gender}</p>
            </div>
        </div>
    );
}
 
export default PersonDetails;