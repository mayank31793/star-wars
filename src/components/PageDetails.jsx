import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import './PageDetails.css';
import Pagination from './Pagination';

const PageDetails = ({match:{params:{id}}, sort, pageCount}) => {

    const [pageData,setPageData] = useState([]);
    const [pageDataPeople,setPageDataPeople] = useState([]);

    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/?page=${id}`)
        .then((res) => {
            setPageData(res.data)
            setPageDataPeople(res.data.results)
        })

    },[id])

    const dateFormat = (dateFormat) => {
        var newDate = new Date(dateFormat);
        return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
    }

    return (
        <div className="pageDetails__container">
            <ul>
                {
                    sort == 'name' ?
                    [...pageDataPeople].sort((a,b) => (
                        a.name.toLowerCase() > b.name.toLowerCase()? 1 : -1
                    )).map((res,i) => (
                        <NavLink to={`/person/${res.url.split("/")[res.url.split("/").length - 2]}`} key={i} className="listitem">
                            <li key={i}>
                                <h4>{res.name}</h4>
                                <p><b>Date Created:</b>{dateFormat(res.created)}</p>
                            </li>
                        </NavLink>
                    ))
                    :
                    sort == 'date'?
                    [...pageDataPeople].sort((a,b) => (
                        dateFormat(a.created) > dateFormat(b.created)?-1:1
                    )).map((res,i) => (
                        <NavLink to={`/person/${res.url.split("/")[res.url.split("/").length - 2]}`} key={i} className="listitem">
                            <li key={i}>
                                <h4>{res.name}</h4>
                                <p><b>Date Created:</b>{dateFormat(res.created)}</p>
                            </li>
                        </NavLink>
                    ))
                    :
                    pageDataPeople.map((res,i) => (
                        <NavLink to={`/person/${res.url.split("/")[res.url.split("/").length - 2]}`} key={i} className="listitem">
                            <li key={i}>
                                <h4>{res.name}</h4>
                                <p><b>Birth Year:</b>{res.birth_year}</p>
                                <p><b>Date Created:</b>{dateFormat(res.created)}</p>

                            </li>
                        </NavLink>
                    ))
                }
            </ul>
            <Pagination pageCount={pageCount} searchPagination={false} location={undefined} />
        </div>
    );
}
 
export default PageDetails;