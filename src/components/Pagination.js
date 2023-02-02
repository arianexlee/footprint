const Pagination = ({numResults, currentPage, resultsPerPage, firstResultIndex, lastResultIndex, pageSetter}) => {

    //logic to handle what numbers are displayed to user about the number of results and current
    //index of results being dispalyed
    if (lastResultIndex > numResults) {
        lastResultIndex = numResults
    }

    //logic to handle whether or not "Previous" and "Next" buttons are active
    let previousIsActive;
    let nextIsActive;

    if (currentPage === 1) {
        previousIsActive = false
    } else {
        previousIsActive = true
    }

    if (lastResultIndex === numResults) {
        nextIsActive = false
    } else {
        nextIsActive = true
    }


    return(
        <div className='flex flex-row justify-between'>
            <div>
                <h1> Showing {firstResultIndex + 1} to {lastResultIndex} of {numResults} results</h1>
            </div>
            <div className="flex flex-row space-x-2" >
                {/* on Click, buttons will respectively move backward or forward a page if activated */}
                <button className="px-3 py-[6px] text-sm leading-5 border-[1px] rounded-md"
                disabled={!previousIsActive}
                onClick={() => pageSetter(currentPage - 1)}
                style={{ borderColor: previousIsActive === true ? '#D4D4D4' : '#E2E2E2', color: previousIsActive === true ? '#000000' : '#8D8D8D'}}>
                    <h1>Previous</h1>
                </button>
                <button className="px-3 py-[6px] text-sm leading-5 border-[1px] rounded-md"
                disabled={!nextIsActive}
                onClick={() => pageSetter(currentPage + 1)}
                style={{ borderColor: nextIsActive === true ? '#D4D4D4' : '#E2E2E2', color: nextIsActive === true ? '#000000' : '#8D8D8D'}}>
                    <h1>Next</h1>
                </button>
            </div>
        </div>


    )
}

export default Pagination