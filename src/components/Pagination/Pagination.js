import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../Button';
import './Pagination.styl';

const Pagination = (props) => {
    const page = +props.page;

    return <div className="Pagination">
        <Link to={page === 2 ?  '/' : `/${page - 1}`} className={page <= 1 ? 'Pagination__disabled' : null}>
            <Button>Next</Button>
        </Link>
        <Link to={`/${page + 1}`}>
            <Button>Previous</Button>
        </Link>
    </div>;
};

export default Pagination;