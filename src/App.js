import './App.css';
import { useState, useEffect } from 'react';

function App() {

  //intializing state variables
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [dateRangeSearch, setDateRangeSearch] = useState('');

  //dummy data
  const data = [
    {"id":1,"name":"Divavu","startDate":"9/19/2017","endDate":"3/9/2018","budget":88377},
    {"id":2,"name":"Jaxspan","startDate":"11/21/2017","endDate":"2/21/2027","budget":608715},
    {"id":3,"name":"Miboo","startDate":"11/1/2017","endDate":"6/20/2017","budget":239507},
    {"id":4,"name":"Trilith","startDate":"8/25/2017","endDate":"11/30/2023","budget":179838},
    {"id":5,"name":"Layo","startDate":"11/28/2017","endDate":"3/10/2018","budget":837850},
    {"id":6,"name":"Photojam","startDate":"7/25/2017","endDate":"6/23/2026","budget":858131},
    {"id":7,"name":"Blogtag","startDate":"6/27/2017","endDate":"1/15/2024","budget":109078},
    {"id":8,"name":"Rhyzio","startDate":"10/13/2017","endDate":"1/25/2025","budget":272552},
    {"id":9,"name":"Zoomcast","startDate":"9/6/2017","endDate":"11/10/2025","budget":301919},
    {"id":10,"name":"Realbridge","startDate":"3/5/2018","endDate":"10/2/2017","budget":505602}
  ];


  useEffect(() => {
    // Map the data and calculate the status (active or inactive) based on the date
    const currentDate = new Date();

    const mappedCampaigns = data.map(campaign => {
      const startDate = new Date(campaign.startDate);
      const endDate = new Date(campaign.endDate);

      const status = endDate >= currentDate ? 'active' : 'inactive';

      return {
        id: campaign.id,
        name: campaign.name,
        status,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        budget: campaign.budget,
      };
    });

        const filteredCampaigns = mappedCampaigns.filter(campaign =>
          campaign.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
          isDateInRange(campaign.startDate, dateRangeSearch) &&
          isDateInRange(campaign.endDate, dateRangeSearch)
        );

    

        setCampaigns(filteredCampaigns);
    }, [nameSearch, dateRangeSearch]);

    //date filter function
    const isDateInRange = (dateString, searchDateRange) => {
      const date = new Date(dateString);
    
      // Parse the searchDateRange into start and end dates
      const [startString, endString] = searchDateRange.split('-').map(str => str.trim());
    
      try {
        const startDate = startString ? new Date(startString) : null;
        const endDate = endString ? new Date(endString) : null;
    
        // Check if the end date is after or equal to the start date
        if (startDate && endDate && endDate < startDate) {
          return false; // End date before start date, not within range
        }
    
        // Check if the date is within the specified range
        return (
          (!startDate || date >= startDate) &&
          (!endDate || date <= endDate)
        );
      } catch (error) {
        // Handle parsing errors
        console.error("Error parsing date:", error);
        return false;
      }
    };


        //getting input values
        const handleNameSearchChange = event => {
          setNameSearch(event.target.value);
        };
      
        const handleDateRangeSearchChange = event => {
          setDateRangeSearch(event.target.value);
        };

  return (
    //frontend
    <div>
      <div className="search-container">
        <input
            type="text"
            placeholder="Search by name"
            value={nameSearch}
            onChange={handleNameSearchChange}
          />
          <input
            type="text"
            placeholder="Search by date range (e.g., 2023-01-01 - 2023-12-31)"
            value={dateRangeSearch}
            onChange={handleDateRangeSearchChange}
          />
         </div>
      <table id="campaignTable">
        <tr className="active">
          <th>Name</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Budget (in USD)</th>
        </tr>
        {campaigns.map(campaign => (
          <tr key={campaign.id} className={campaign.status}>
            <td>{campaign.name}</td>
            <td className={campaign.status}>
              <span className="status-icon">
                {campaign.status === 'active' ? '\u2713' : '\u2717'}
              </span> {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </td>
            <td>{campaign.startDate}</td>
            <td>{campaign.endDate}</td>
            <td>${campaign.budget}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;