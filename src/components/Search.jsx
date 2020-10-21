import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

import './Search.css';
import Loading from './Loading';
import Pagination from './Pagination';

const Search = ({match,location,history,search}) => {

    const [loading, setLoading] = useState(true);
    const [searchObject,setSearchObject] = useState({});
    const [searchCount,setSearchCount] = useState(history.length);
    const [searchArray,setSearchArray] = useState([]);

    useEffect(() => {
        if(location.state != undefined){
            axios.get(`https://swapi.dev/api/people/?search=${location.search.split("=")[1].toLowerCase()}&page=${location.state.page}`)
            .then((res) => {
                setLoading(false);
                setSearchObject(res.data);
                setSearchCount(res.data.count);
                return res.data;
            })
            .then((response) => {
                setSearchArray(response.results);
            });
        }
        else{
            axios.get(`https://swapi.dev/api/people/?search=${location.search.split("=")[1].toLowerCase()}&page=1`)
            .then((res) => {
                setLoading(false);
                setSearchObject(res.data);
                setSearchCount(res.data.count);
                return res.data;
            })
            .then((response) => {
                setSearchArray(response.results);
            });
        }
    },[location])

    const dateFormat = (dateFormat) => {
        var newDate = new Date(dateFormat);
        return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
    }
    
    if(loading){
        return <Loading />
    }

    if(!search){
        return <Redirect to="/" />
    }

    return (
        <div className="search__container">
            <ul>
                {
                    searchArray.length > 0 ?
                    searchArray.map((res,i) => (
                        <NavLink to={`/person/${res.url.split("/")[res.url.split("/").length - 2]}`} key={i} className="listitem">
                            <li key={i}>
                                <h4>{res.name}</h4>
                                <p><b>Birth Year:</b>{res.birth_year}</p>
                                <p><b>Date Created:</b>{dateFormat(res.created)}</p>
                            </li>
                        </NavLink>
                    )):
                    <li className="not__found">
                        <FontAwesomeIcon icon={faExclamation} />
                        <p>No Character By Name {`"${location.search.split("=")[1].replace("+"," ")}"`}</p>
                    </li>
                }
            </ul> 
            {
                searchArray.length > 0 ?
                <Pagination pageCount={searchCount} searchPagination={true} location={location} />
                :null
            }
        </div>
    );
}
 
export default Search;