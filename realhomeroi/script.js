const cpiData = {
  2000: 172.2,
  2005: 195.3,
  2010: 218.1,
  2015: 237.0,
  2020: 258.8,
  2023: 303.1,
  2024: 319.1
};

document.getElementById("roiForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const address = document.getElementById("address").value;
  const purchasePrice = parseFloat(document.getElementById("purchasePrice").value);
  const purchaseYear = parseInt(document.getElementById("purchaseYear").value);
  const currentValue = parseFloat(document.getElementById("currentValue").value);
  const currentYear = parseInt(document.getElementById("currentYear").value);

  const cpiStart = cpiData[purchaseYear];
  const cpiEnd = cpiData[currentYear];

  if (!cpiStart || !cpiEnd) {
    alert("CPI data not available for selected years.");
    return;
  }

  const inflationMultiplier = cpiEnd / cpiStart;
  const inflationAdjustedPrice = purchasePrice * inflationMultiplier;

  const nominalGain = currentValue - purchasePrice;
  const realGain = currentValue - inflationAdjustedPrice;
  const yearsHeld = currentYear - purchaseYear;
  const annualizedRealROI = Math.pow(currentValue / inflationAdjustedPrice, 1 / yearsHeld) - 1;

  let resultsHTML = `
    <h2>Results:</h2>
    <p>Nominal Gain: $${nominalGain.toFixed(2)}</p>
    <p>Inflation-Adjusted Purchase Price: $${inflationAdjustedPrice.toFixed(2)}</p>
    <p>Real Gain: $${realGain.toFixed(2)}</p>
    <p>Annualized Real ROI: ${(annualizedRealROI * 100).toFixed(2)}%</p>
  `;

  if (address.trim() !== "") {
    const encodedAddress = encodeURIComponent(address);
    const zillowUrl = `https://www.zillow.com/homes/${encodedAddress}_rb/`;
    document.getElementById("zillowLink").innerHTML = `
      <p>Need help finding your home’s value or purchase history? 
         <a href="${zillowUrl}" target="_blank">Check Zillow</a>.</p>
    `;
  } else {
    document.getElementById("zillowLink").innerHTML = "";
  }

  document.getElementById("results").innerHTML = resultsHTML;
});
