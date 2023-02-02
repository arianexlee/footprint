import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import SearchIcon from '../imgs/SearchIcon.png'

function Main() {
    const [data, setData] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('query'))
    const [currentPage, setCurrentPage] = useState(1)
    //state below can be used to change number of results per page
    const [resultsPerPage, setResultsPerPage] = useState(5)

    //Function to handle initial API call, left as separate function for later 
    //flexibility to add in other functionality if needed
    function handleResponse(response) {
      setData(response.data)
    }

    //updates the query + url based on input from user into search bar
    function handleChange(event) {
        let newQuery = event.target.value
        setQuery(newQuery)
        setSearchParams({query: newQuery})
    }

    //implements delay into data request for updated search
    useEffect(() => {
      const timer = setTimeout(() => {
        const lowercase = query.toLowerCase()
        axios
        .get(`https://footprint-cc.preview.onefootprint.com/api/users?search=${lowercase}`)
        .then((response) => setData(response.data))
        .catch((err) => console.error(err))
      }, 300)
  
      return () => clearTimeout(timer)
    }, [query])
  
    //initial gathering of data when page loads
    useEffect(() => {
      axios
        .get("https://footprint-cc.preview.onefootprint.com/api/users")
        .then((response) => handleResponse(response))
        .catch((err) => console.error(err))
    }, [])
  
    //initializes all of the numbers related to pagination + the results currently being displayed
    const lastResultIndex = currentPage * resultsPerPage
    const firstResultIndex = lastResultIndex - resultsPerPage
    const currentResults = data.slice(firstResultIndex, lastResultIndex)

    return (
      <div className="bg-white w-screen h-screen p-20 space-y-4">
        <div>
          <h1 className="text-[21px] font-bold">Users</h1>
        </div>
        <div className='relative'>
          <div className='absolute top-2 left-4'>
            {/* currently using the search icon as exported from Figma file; 
            slightly blurry but not sure if that was the version intended to be used */}
            <img className='h-4 w-4' src={SearchIcon} alt='search magnifying glass'/>
          </div>
          <input type='text' placeholder='Search' value={query} onChange={(e) => handleChange(e)}
          className='placeholder:text-[#8D8D8D] placeholder:text-[15px] w-[300px] h-8 py-[6px] pl-10 pr-4 flex flex-row items-center rounded-md border-[1px] border-[#E2E2E2]'/>
        </div>
        <hr class="solid bg-[#E2E2E2]"></hr>
        <div className='rounded-md overflow-hidden border-[1px] border-[#E2E2E2]'>
          <Table
            data={currentResults}
            // header names passed in here
            colHeaders={['FULL NAME', 'FOOTPRINT TOKEN', 'STATUS', 'EMAIL', 'SSN', 'PHONE NUMBER', 'DATE']}
          />
        </div>
        <div>
            <Pagination
                //number of total results
                numResults={data.length}
                currentPage={currentPage}
                resultsPerPage={resultsPerPage}
                firstResultIndex={firstResultIndex}
                lastResultIndex={lastResultIndex}
                //function passed in used to change the page of results being displayed
                pageSetter={setCurrentPage}
            />
        </div>
      </div>
    );
  }

  export default Main; 
