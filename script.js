// U.S. CPI (All Urban Consumers)
const cpiData = {
  1980: 82.4,
  1981: 90.9,
  1982: 96.5,
  1983: 99.6,
  1984: 103.9,
  1985: 107.6,
  1986: 109.6,
  1987: 113.6,
  1988: 118.3,
  1989: 124.0,
  1990: 130.7,
  1991: 136.2,
  1992: 140.3,
  1993: 144.5,
  1994: 148.2,
  1995: 152.4,
  1996: 156.9,
  1997: 160.5,
  1998: 163.0,
  1999: 166.6,
  2000: 172.2,
  2001: 177.1,
  2002: 179.9,
  2003: 184.0,
  2004: 188.9,
  2005: 195.3,
  2006: 201.6,
  2007: 207.3,
  2008: 215.3,
  2009: 214.5,
  2010: 218.1,
  2011: 224.9,
  2012: 229.6,
  2013: 232.9,
  2014: 236.7,
  2015: 237.0,
  2016: 240.0,
  2017: 245.1,
  2018: 251.1,
  2019: 255.7,
  2020: 258.8,
  2021: 271.0,
  2022: 292.6,
  2023: 303.1,
  2024: 319.1 // Estimate
};

document.getElementById("roiForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const address = document.getElementById("address").value;
  const purchasePrice = parseFloat(document.getElementById("purchasePrice").value);
  const purchaseYear = parseInt(document.getElementById("purchaseYear").value);
  const currentValue = parseFloat(document.getElementById("currentValue").value);
  const currentYear = parseInt(document.getElementById("currentYear").value);
  const ownershipCostPercent = parseFloat(document.getElementById("ownershipCostPercent").value) || 1.5;
  const sellingCostPercent = parseFloat(document.getElementById("sellingCostPercent").value) || 6;

  let cpiStart = cpiData[purchaseYear];
let cpiEnd = cpiData[currentYear];

// Handle 2025 fallback estimation FIRST
if (purchaseYear === 2025 && !cpiStart) {
  const lastKnown = cpiData[2024];
  cpiStart = lastKnown * 1.035;
}
if (currentYear === 2025 && !cpiEnd) {
  const lastKnown = cpiData[2024];
  cpiEnd = lastKnown * 1.035;
}

// Only now check for missing data
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

  const avgHomeValue = (purchasePrice + currentValue) / 2;
  const totalOwnershipCost = avgHomeValue * (ownershipCostPercent / 100) * yearsHeld;
  const sellingCost = currentValue * (sellingCostPercent / 100);

  const netNominalProfit = currentValue - purchasePrice - totalOwnershipCost - sellingCost;
  const netRealProfit = currentValue - inflationAdjustedPrice - totalOwnershipCost - sellingCost;

  let resultsHTML = `
    <h2>Results:</h2>
    <p>Nominal Gain: $${nominalGain.toFixed(2)}</p>
    <p>Inflation-Adjusted Purchase Price: $${inflationAdjustedPrice.toFixed(2)}</p>
    <p>Real Gain: $${realGain.toFixed(2)}</p>
    <p>Annualized Real ROI: ${(annualizedRealROI * 100).toFixed(2)}%</p>

    <h3>Ownership & Selling Costs:</h3>
    <p>Total Estimated Ownership Costs: $${totalOwnershipCost.toFixed(2)}</p>
    <p>Selling Costs (e.g. Realtor fees): $${sellingCost.toFixed(2)}</p>

    <h3>Net Profit:</h3>
    <p>Net Nominal Profit (after costs): $${netNominalProfit.toFixed(2)}</p>
    <p>Net Real Profit (inflation-adjusted): $${netRealProfit.toFixed(2)}</p>
  `;

  if (currentYear === 2025 || purchaseYear === 2025) {
    resultsHTML += `<p><em>Note: 2025 CPI is an estimated value based on 3.5% projected inflation.</em></p>`;
  }

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
