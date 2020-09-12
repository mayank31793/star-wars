import React, {useEffect, useState} from 'react';

import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

import PageDetails from './PageDetails';
import PersonDetails from './PersonDetails';
import Search from './Search';
import './Home.css';
import Loading from './Loading';
import SearchBar from './SearchBar';

const Home = (props) => {
    const [data,setData] = useState({});
    const [people,setPeople] = useState([]);
    const [pageCount,setPageCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sort,setSort] = useState('Sort By');
    const [search,setSearch] = useState(window.location.search);   

    useEffect(() => {
        axios.get('https://swapi.dev/api/people/')
            .then((res) => {
                setLoading(false);
                setData(res.data);
                setPeople(res.data.results);
                setPageCount(res.data.count);
            })
            .catch((error) => {
                setLoading(false);
                setError(!error)
            })

        if(window.location.search != ""){
            setSearch(window.location.search.split("=")[1].replace("+"," "));
        } 
    },[])

    const sortArray = (e) => {
        console.log('this is sort',e.target.value);
        setSort(e.target.value)
    };

    const handleSearch = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setSearch(lowerCase);
    }

    if(loading){
        return <Loading />
    }

    if(error){
        return <FontAwesomeIcon icon={faQuestion} />
    }

    return (
        <div>
            <SearchBar sortArray={sortArray} handleSearch={handleSearch} sort={sort} search={search} />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/page/1" />
                </Route>
                <Route path="/people" exact render={(props) => <Search {...props} people={people} search={search} />} />
                <Route path="/page/:id" exact render={(props) => <PageDetails {...props} sort={sort} pageCount={pageCount} />} />
                <Route path="/person/:personId" exact render={(props) => <PersonDetails {...props} />} />
            </Switch>
        </div>
    );
}
 
export default Home;