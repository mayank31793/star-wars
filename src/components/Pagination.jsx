import React,{ useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Pagination.css';

const Pagination = ({pageCount,searchPagination,location}) => {

    const newArr = new Array(Math.ceil(pageCount/10));

    for(var i=0;i<newArr.length;i++){
        newArr[i] = i+1;
    }

    const pageDefault = typeof location == 'undefined' ? 1 : location.state == undefined ? 1 : location.state.page;

    return (
        <div className="pagination__container">
            {
                searchPagination ? 
                newArr.map((res) => (
                    <NavLink to={{
                        pathname:"/people",
                        search: `?search=${window.location.search.split("=")[1]}`,
                        state:{page:res}
                    }} 
                    key={res} 
                    className="pagination" 
                    activeClassName={pageDefault == res ? "activeLink": null}
                    >
                        {res}
                    </NavLink>
                ))
                :
                newArr.map((res) => (
                    <NavLink to={`/page/${res}`} 
                    key={res} 
                    className="pagination" 
                    activeClassName="activeLink">
                        {res}
                    </NavLink>
                ))
            }
        </div>
    );
}
 
export default Pagination;