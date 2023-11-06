import './App.css';

function App() {
  return (
    <div>
       <div class="search-container">
        <input type="text" placeholder='enter search'/>
    </div>
    <table id="campaignTable">
        <tr class="active">
            <th>Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Budget (in USD)</th>
        </tr>
        <tr class="inactive">
            <td>John Doe</td>
            <td class="active"><span class="status-icon">&#10003;</span> Active</td>
            <td>2023-11-06</td>
            <td>2023-11-20</td>
            <td>$1,000</td>
        </tr>
        <tr class="active">
            <td>Jane Smith</td>
            <td class="inactive"><span class="status-icon">&#10007;</span> Inactive</td>
            <td>2023-11-10</td>
            <td>2023-11-15</td>
            <td>$800</td>
        </tr>
    </table>
    </div>
  );
}

export default App;
