import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const searchBoxRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // For Pagination
  const [cities, setCities] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(3);

  //All the below sections can be broken into child components as we are using react
  const handleSearchTable = (e) => {
    setSearchText(e.target.value);
  };

  const loadData = async () => {
    console.log('called');
    setLoading(true);

    const options = {
      method: 'GET',
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
      params: {
        namePrefix: searchText, //This I have to google as didn't know what was the name of param for search
        limit: perPage,
        offset: (currentPage - 1) * perPage, // Pagination calculation
      },
      headers: {
        // Getting the keys and endpoints from .env.local file for Production it should be .env.production
        'x-rapidapi-key': process.env.REACT_APP_RAPID_KEY, // get your key from https://rapidapi.com/wirefreethought/api/geodb-cities
        'x-rapidapi-host': process.env.REACT_APP_RAPID_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setCities(response.data.data);
      setTotalCount(response.data.metadata.totalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //Default data fetched by API is 5 and max it can fetch 10 items and user should be limited and some kind of warning should be given if user enters input above 10.
  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 10) {
      alert('Maximum limit is 10 items');
      setPerPage(10);
    } else if (value < 1) {
      setPerPage(1);
    } else {
      setPerPage(value);
    }
  };

  //Keyboard Shortcut for Focus on Searchbar
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        if (searchBoxRef.current) {
          searchBoxRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Bonus - Implement a way that API calls are not made on every keystroke. added debouncing
  useEffect(() => {
    let debounceFetch;
    if (searchText) {
      debounceFetch = setTimeout(() => {
        loadData();
      }, 500);
    } else {
      loadData();
    }

    return () => clearTimeout(debounceFetch);
    // eslint-disable-next-line
  }, [searchText, currentPage, perPage]);

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className='app-container'>
      <h2>
        Search Places ( Pagination will be shown as when user types in searchbox because with default per page limit as
        3 it was showing 25000 buttons )
      </h2>
      <div className='listing-searchbar'>
        <input
          ref={searchBoxRef}
          type='text'
          placeholder='Search places...'
          className='form-control pl-4'
          value={searchText}
          onChange={handleSearchTable}
        />
        <span>Ctrl + /</span>
      </div>
      <input
        type='number'
        value={perPage}
        onChange={handleLimitChange}
        placeholder='Items per page'
        style={{ float: 'right' }}
        min='1'
        max='10'
      />
      {loading ? (
        <div className='loader'></div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {cities.length === 0 && !loading ? (
              <tr>
                <td colSpan='3'>No result found</td>
              </tr>
            ) : (
              cities.map((city, index) => (
                <tr key={city.id}>
                  <td>{index + 1}</td>
                  <td>{city.name}</td>
                  <td>
                    {city.country}{' '}
                    <img
                      src={`${process.env.REACT_APP_FLAGS_ENDPOINT}${city.countryCode}/flat/32.png`}
                      alt={city.country}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Added Pagination with SearchText as there were 70000 records and Pagination can work more stable with if user has searched */}
      {totalPages > 1 && searchText && (
        <div className='pagination'>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} disabled={currentPage === i + 1}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
