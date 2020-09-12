import React from 'react';
import { NavLink } from 'react-router-dom';

import './SearchBar.css';

const SearchBar = ({sortArray,handleSearch,sort,search}) => {

    return (
        <div className="searchbar__container">
            <div className="searchInput__container">
                <input type="text" value={search} className="search__input" onChange={handleSearch} />
                <NavLink className="search__navlink" to={{
                    pathname:"/people",
                    search: `?search=${search.replace(" ","+")}`,
                    state:{page:1}
                }}>Search</NavLink>
            </div>
            <select value={sort} onChange={sortArray} className="selectSort">
                <option value="relevant">Relevant</option>
                <option value="name">A-Z</option>
                <option value="date">Date</option>
            </select>
        </div>
    );
}
 
export default SearchBar;