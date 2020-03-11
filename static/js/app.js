// from data.js
const tableData = data;

// declaring the table and filter buttons
const table = d3.select("#ufo-table");
const tbody = table.select("tbody");
const filterButton = d3.select("#filter-btn");
const resetButton = d3.select("#clear-filter-btn");

// find all the unique values in the data to display for the user to select
const dateList = tableData.map(item => item.datetime)
    .filter((value, index, self) => self.indexOf(value) === index).sort();
const cityList = tableData.map(item => item.city)
    .filter((value, index, self) => self.indexOf(value) === index).sort();
const stateList = tableData.map(item => item.state)
    .filter((value, index, self) => self.indexOf(value) === index).sort();
const countryList = tableData.map(item => item.country)
    .filter((value, index, self) => self.indexOf(value) === index).sort();
const shapeList = tableData.map(item => item.shape)
    .filter((value, index, self) => self.indexOf(value) === index).sort();

// dropdown list
dateList.forEach(item => {
    d3.select("#datetime_list").append("option").append("value").text(item)
});
cityList.forEach(item => {
    d3.select("#city_list").append("option").append("value").text(item)
});
stateList.forEach(item => {
    d3.select("#state_list").append("option").append("value").text(item)
});
countryList.forEach(item => {
    d3.select("#country_list").append("option").append("value").text(item)
});
shapeList.forEach(item => {
    d3.select("#shape_list").append("option").append("value").text(item)
});

// declare the constants for the filter input buttons
const inputDate = d3.select("#datetime");
const inputCity = d3.select("#city");
const inputState = d3.select("#state");
const inputCountry = d3.select("#country");
const inputShape = d3.select("#shape");

// assign function to handler
const handler = function() {

    tbody.html("");

    let filterDate = inputDate.property("value").trim();
    let filterCity = inputCity.property("value").toLowerCase().trim();
    let filterState = inputState.property("value").toLowerCase().trim();
    let filterCountry = inputCountry.property("value").toLowerCase().trim();
    let filterShape = inputShape.property("value").toLowerCase().trim();

    let filteredData = [];

    if (filterDate !== "") {
        filteredData = tableData.filter(dataRow => dataRow.datetime === filterDate)
    } else filteredData = tableData;
    if (filterCity !== "") {
        filteredData = filteredData.filter(dataRow => dataRow.city === filterCity)
    };
    if (filterState !== "") {
        filteredData = filteredData.filter(dataRow => dataRow.state === filterState)
    };
    if (filterCountry !== "") {
        filteredData = filteredData.filter(dataRow => dataRow.country === filterCountry)
    };
    if (filterShape !== "") {
        filteredData = filteredData.filter(dataRow => dataRow.shape === filterShape)
    };
    
    console.log(filteredData);

    filteredData.forEach(dataRow => {
    let row = tbody.append("tr");
    row.append("td").text(dataRow.datetime);
    row.append("td").text(dataRow.city);
    row.append("td").text(dataRow.state);
    row.append("td").text(dataRow.country);
    row.append("td").text(dataRow.shape);
    row.append("td").text(dataRow.durationMinutes);
    row.append("td").text(dataRow.comments);
    });
    
};

// function to clear the table
const resetTable = function() {
    tbody.html('');
	renderTable(tableData);
};

// after the user enters an input AND hits Enter (return key), the handler function will execute
inputDate.on("change", handler);
inputCity.on("change", handler);
inputState.on("change", handler);
inputCountry.on("change", handler);
inputShape.on("change", handler);
filterButton.on("click", handler);
resetButton.on("click", resetTable);