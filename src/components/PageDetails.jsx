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
                        a.name.toLowerCase() > b.name.toLowerCase()
                    )).map((res,i) => (
                        <li key={i}>
                            <NavLink to={`/person/${res.url.split("/")[res.url.split("/").length - 2]}`}>
                                {res.name}
                            </NavLink>
                            <p>{dateFormat(res.created)}</p>
                        </li>
                    ))
                    :
                    sort == 'date'?
                    [...pageDataPeople].sort((a,b) => (
                        dateFormat(a.created) > dateFormat(b.created)
                    )).map((res,i) => (
                        <li key={i}>
                            <NavLink to={`/person/${res.url.split("/")[res.url.split("/").length - 2]}`}>
                                {res.name}
                            </NavLink>
                            <p>{dateFormat(res.created)}</p>
                        </li>
                    ))
                    :
                    pageDataPeople.map((res,i) => (
                        <li key={i}>
                            <NavLink to={`/person/${res.url.split("/")[res.url.split("/").length - 2]}`}>
                                {res.name}
                            </NavLink>
                            <p>{dateFormat(res.created)}</p>
                        </li>
                    ))
                }
            </ul>
            <Pagination pageCount={pageCount} searchPagination={false} location={undefined} />
        </div>
    );
}
 
export default PageDetails;