import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const SearchResults = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if(searchQuery?.length==0){
        navigate("/")
    }

    return (
        <h1 className='font-bold text-center text-4xl my-6'>{searchQuery}</h1>
    )
}

export default SearchResults