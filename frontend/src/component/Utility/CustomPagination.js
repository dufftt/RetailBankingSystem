import React, {useState} from 'react';
import {Pagination} from '@zendeskgarden/react-pagination';

const CustomPagination = () => {
    const [page, setPage] = useState(1);

    return <Pagination totalPages={3} pageGap={3} currentPage={page} onChange={setPage}/>;
};

export default CustomPagination;
