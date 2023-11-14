import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // State variables for managing campaigns, search query, name search, and date range search
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [dateRangeSearch, setDateRangeSearch] = useState('');

  // Sample campaign data
  const initialData = [
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

    const mappedCampaigns = initialData.map(campaign => {
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

    // Filter campaigns based on name and date range
    const filteredCampaigns = mappedCampaigns.filter(campaign =>
      campaign.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
      isDateInRange(campaign.startDate, dateRangeSearch) &&
      isDateInRange(campaign.endDate, dateRangeSearch)
    );

    // Set the filtered campaigns to state
    setCampaigns(filteredCampaigns);
  }, [nameSearch, dateRangeSearch]);

  // Function to check if a date is within the specified range
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

  // Function to add campaigns to the existing list
  window.addCampaigns = (newCampaigns) => {
    // Combine new campaigns with existing campaigns
    const updatedCampaigns = [...campaigns, ...newCampaigns];

    // Set the updated campaigns to state
    setCampaigns(updatedCampaigns);
  };

  // Event handlers for input changes
  const handleNameSearchChange = event => {
    setNameSearch(event.target.value);
  };

  const handleDateRangeSearchChange = event => {
    setDateRangeSearch(event.target.value);
  };

  // JSX structure for rendering the component
  return (
    <div>
      <div className="search-container">
        {/* Input for searching by name */}
        <input
          type="text"
          placeholder="Search by name"
          value={nameSearch}
          onChange={handleNameSearchChange}
        />
        {/* Input for searching by date range */}
        <input
          type="text"
          placeholder="Search by date range (e.g., 2023-01-01 - 2023-12-31)"
          value={dateRangeSearch}
          onChange={handleDateRangeSearchChange}
        />
      </div>
      {/* Table structure for displaying campaigns */}
      <table id="campaignTable">
        <tr className="active">
          <th>Name</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Budget (in USD)</th>
        </tr>
        {/* Mapping through filtered campaigns to render table rows */}
        {campaigns.map(campaign => (
          <tr key={campaign.id} className={campaign.status}>
            <td>{campaign.name}</td>
            <td className={campaign.status}>
              {/* Displaying status icon based on campaign status */}
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

// Exporting the App component
export default App;
