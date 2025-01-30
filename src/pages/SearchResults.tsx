import { useLocation, useNavigate } from 'react-router';

const SearchResults = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');

    if(searchQuery?.length==0){
        navigate("/")
    }

    return (
        <h1 className='text-center font-bold text-2xl'>{searchQuery}</h1>
    )
}

export default SearchResults