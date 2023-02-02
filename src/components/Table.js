//function to clean status data format
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//function to clean phone number format
function cleanPhoneNumber(number) {
    const noOneNum = number.slice(1)
    const newNum = noOneNum.replaceAll('-', '')
    return '(' + newNum.slice(1,4) + ') ' + newNum.slice(4,7) + '-' + newNum.slice(7);
}

//function to clean phone date format
function cleanDate(originalDate) {
    const day = originalDate.slice(5, 7) + '/' + originalDate.slice(8, 10) + '/' + originalDate.slice(2, 4)
    let hour = originalDate.slice(11, 13)
    let hourInt = parseInt(hour)
    const minutes = originalDate.slice(13, 16)
    let timeOfDay = 'am'
    if (hourInt > 12) {
        const newHourInt =  hourInt - 12
        hour = newHourInt.toString()
        timeOfDay = 'pm'
    }
    const time = hour + minutes + timeOfDay
    return day + ', ' + time
}

//component for individual data row of table 
const TableRow = ({widthPercentage, fullName, token, status, email, ssn, phoneNumber, date}) => {
    const capitalStatus = capitalizeFirstLetter(status)
    const cleanedNumber = cleanPhoneNumber(phoneNumber)
    const newDate = cleanDate(date)
    return(
        <div className="bg-white border-t-[1px] border-[#E2E2E2] flex flex-row text-[15px] leading-5">
            <div className="h-[46px] px-5 py-3 flex flex-row items-center" 
            style={{width: `${widthPercentage}%`}}>
                <h1>{fullName}</h1>
            </div>
            <div className="h-[46px] px-5 py-[10px] flex flex-row items-center" 
            style={{width: `${widthPercentage}%`}}>
                <div className="p-1 bg-[#F7F7F7] border-[1px] border-[#E2E2E2] rounded w-full text-[#991008]">
                    <h1 className="overflow-hidden text-ellipsis text-sm">{token}</h1>
                </div>
            </div>
            <div className="h-[46px] px-5 py-3 flex flex-row items-center"
                style={{width: `${widthPercentage}%`}}>
                <div className="py-1 px-2 rounded-full text-[13px] leading-4 font-medium"
                style={{backgroundColor: `${status}` === 'verified' ? '#E9F5F1' : '#FFF2F0', color: `${status}` === 'verified' ? '#0A6A4A' : '#991008'}}>
                    <h1>{capitalStatus}</h1>
                </div>
            </div>
            <div className="h-[46px] px-5 py-3 flex flex-row items-center" 
            style={{width: `${widthPercentage}%`}}>
                <h1 className="overflow-hidden text-ellipsis">{email}</h1>
            </div>
            <div className="h-[46px] px-5 py-3 flex flex-row items-center" 
            style={{width: `${widthPercentage}%`}}>
                <h1>{ssn}</h1>
            </div>
            <div className="h-[46px] px-5 py-3 flex flex-row items-center" 
            style={{width: `${widthPercentage}%`}}>
                <h1>{cleanedNumber}</h1>
            </div>
            <div className="h-[46px] px-5 py-3 flex flex-row items-center" 
            style={{width: `${widthPercentage}%`}}>
                <h1>{newDate}</h1>
            </div>
        </div>

    )
}

//component for header of table
const TableHeader = ({colHeaders, widthPercentage}) => {
    return(
        <div className="flex flex-row w-full">
            {colHeaders.map((header) => {
                return(
                <TableHeaderCol
                title={header}
                widthPercentage={widthPercentage}
                />
                )
            })}
        </div>
    )
}

//component for column of header of table
const TableHeaderCol = ({title, widthPercentage}) => {
    return(
        <div className=" h-10 px-5 py-3 flex flex-row items-center bg-[#F7F7F7]" 
        style={{width: `${widthPercentage}%`}}>
            <h1 className="w-full text-xs leading-4 align-middle">
                {title}
            </h1>
        </div>
    )
}

const Table = ({data, colHeaders}) => {
    const numCols = colHeaders.length
    //variable that determines column width for all child components based on number of columns(header row & data rows)
    const widthPercentage = 100/numCols
    return (
        <div className="rounded-md">
            <TableHeader
                colHeaders={colHeaders}
                widthPercentage={widthPercentage}
            />
            {/* maps each person to a their own row */}
            {data.map((personData) => {
                return(
                    <TableRow
                        widthPercentage={widthPercentage}
                        fullName={personData.name}
                        token={personData.footprintToken}
                        status={personData.status}
                        email={personData.email}
                        ssn={personData.ssn}
                        phoneNumber={personData.phone}
                        date={personData.createdAt}
                    />
                )
            })}
        </div> 
    )
}

export default Table;

