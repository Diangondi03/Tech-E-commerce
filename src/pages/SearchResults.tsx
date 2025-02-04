import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSearch } from '../hooks/useSearch';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');

    const {filteredProducts,loading} = useSearch(searchQuery)


    if(searchQuery?.length==0){
        navigate("/")
    }
    
    return (
        <>
            {filteredProducts.length==0 && !loading && <h1 className='text-center text-4xl my-6'>No results found for: {searchQuery}</h1>}
            {filteredProducts.length>0 && <h1 className=' text-center text-4xl my-6'>Results for: {searchQuery}</h1>}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                {loading && Array.from({length: 3}).map((_,index)=>(
                <ProductCardSkeleton/>
                ))}
        
                {!loading && filteredProducts.map((product,index)=>(
                <ProductCard 
                key={index}
                imageUrl={product?.image}
                title={product?.title}
                price={product?.price}
                discountPercentage={product?.discount}
                id={product?.id}
                />
                ))}


            </div>
        </>
    )
}

export default SearchResults