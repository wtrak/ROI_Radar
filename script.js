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

// Wage & COL growth by U.S. state
const wageData = {
  us_avg: { wageGrowth: 0.032, colIncrease: 0.025 },
  alabama: { wageGrowth: 0.029, colIncrease: 0.023 },
  alaska: { wageGrowth: 0.028, colIncrease: 0.022 },
  arizona: { wageGrowth: 0.035, colIncrease: 0.028 },
  arkansas: { wageGrowth: 0.03, colIncrease: 0.024 },
  california: { wageGrowth: 0.033, colIncrease: 0.03 },
  colorado: { wageGrowth: 0.034, colIncrease: 0.027 },
  connecticut: { wageGrowth: 0.031, colIncrease: 0.025 },
  delaware: { wageGrowth: 0.03, colIncrease: 0.024 },
  florida: { wageGrowth: 0.034, colIncrease: 0.028 },
  georgia: { wageGrowth: 0.032, colIncrease: 0.026 },
  hawaii: { wageGrowth: 0.029, colIncrease: 0.03 },
  idaho: { wageGrowth: 0.035, colIncrease: 0.026 },
  illinois: { wageGrowth: 0.031, colIncrease: 0.025 },
  indiana: { wageGrowth: 0.03, colIncrease: 0.023 },
  iowa: { wageGrowth: 0.029, colIncrease: 0.022 },
  kansas: { wageGrowth: 0.03, colIncrease: 0.022 },
  kentucky: { wageGrowth: 0.029, colIncrease: 0.022 },
  louisiana: { wageGrowth: 0.028, colIncrease: 0.021 },
  maine: { wageGrowth: 0.03, colIncrease: 0.023 },
  maryland: { wageGrowth: 0.032, colIncrease: 0.026 },
  massachusetts: { wageGrowth: 0.033, colIncrease: 0.027 },
  michigan: { wageGrowth: 0.03, colIncrease: 0.024 },
  minnesota: { wageGrowth: 0.031, colIncrease: 0.025 },
  mississippi: { wageGrowth: 0.028, colIncrease: 0.021 },
  missouri: { wageGrowth: 0.03, colIncrease: 0.024 },
  montana: { wageGrowth: 0.032, colIncrease: 0.025 },
  nebraska: { wageGrowth: 0.029, colIncrease: 0.022 },
  nevada: { wageGrowth: 0.032, colIncrease: 0.027 },
  new_hampshire: { wageGrowth: 0.031, colIncrease: 0.025 },
  new_jersey: { wageGrowth: 0.032, colIncrease: 0.026 },
  new_mexico: { wageGrowth: 0.028, colIncrease: 0.023 },
  new_york: { wageGrowth: 0.03, colIncrease: 0.028 },
  north_carolina: { wageGrowth: 0.033, colIncrease: 0.025 },
  north_dakota: { wageGrowth: 0.028, colIncrease: 0.022 },
  ohio: { wageGrowth: 0.03, colIncrease: 0.024 },
  oklahoma: { wageGrowth: 0.029, colIncrease: 0.022 },
  oregon: { wageGrowth: 0.031, colIncrease: 0.026 },
  pennsylvania: { wageGrowth: 0.03, colIncrease: 0.025 },
  rhode_island: { wageGrowth: 0.031, colIncrease: 0.025 },
  south_carolina: { wageGrowth: 0.032, colIncrease: 0.025 },
  south_dakota: { wageGrowth: 0.028, colIncrease: 0.021 },
  tennessee: { wageGrowth: 0.031, colIncrease: 0.025 },
  texas: { wageGrowth: 0.034, colIncrease: 0.027 },
  utah: { wageGrowth: 0.035, colIncrease: 0.027 },
  vermont: { wageGrowth: 0.03, colIncrease: 0.025 },
  virginia: { wageGrowth: 0.032, colIncrease: 0.025 },
  washington: { wageGrowth: 0.034, colIncrease: 0.028 },
  west_virginia: { wageGrowth: 0.028, colIncrease: 0.022 },
  wisconsin: { wageGrowth: 0.03, colIncrease: 0.024 },
  wyoming: { wageGrowth: 0.027, colIncrease: 0.021 }
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
  const selectedLocation = document.getElementById("location").value;

  let cpiStart = cpiData[purchaseYear];
  let cpiEnd = cpiData[currentYear];

  if (purchaseYear === 2025 && !cpiStart) {
    cpiStart = cpiData[2024] * 1.035;
  }
  if (currentYear === 2025 && !cpiEnd) {
    cpiEnd = cpiData[2024] * 1.035;
  }

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

  const region = wageData[selectedLocation] || wageData["us_avg"];
  const adjustedRealROI = annualizedRealROI - region.colIncrease + region.wageGrowth;

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

    <h3>Location-Adjusted ROI:</h3>
    <p>Local Wage Growth: ${(region.wageGrowth * 100).toFixed(2)}%</p>
    <p>Local Cost of Living Increase: ${(region.colIncrease * 100).toFixed(2)}%</p>
    <p>ROI Adjusted for Local Wages & COL: ${(adjustedRealROI * 100).toFixed(2)}%</p>
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

// === FUTURE ROI CHART ===
const projGrowth = parseFloat(document.getElementById("projHomeGrowth").value) / 100 || 0.04;
const projInflation = parseFloat(document.getElementById("projInflationRate").value) / 100 || 0.035;

const futureYears = [], nominalValues = [], adjustedValues = [], realRois = [];

for (let i = 1; i <= 10; i++) {
  const year = currentYear + i;
  const nominal = currentValue * Math.pow(1 + projGrowth, i);
  const adjusted = nominal / Math.pow(1 + projInflation, i);
  const realRoi = Math.pow(adjusted / purchasePrice, 1 / (yearsHeld + i)) - 1;

  futureYears.push(year);
  nominalValues.push(Number(nominal.toFixed(0)));
  adjustedValues.push(Number(adjusted.toFixed(0)));
  realRois.push(Number((realRoi * 100).toFixed(2)));
}

// Clean up old chart (safe)
if (window.futureChart && typeof window.futureChart.destroy === 'function') {
  window.futureChart.destroy();
}


const ctx = document.getElementById("futureChart").getContext("2d");
window.futureChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: futureYears,
    datasets: [
      {
        label: "Nominal Home Value",
        data: nominalValues,
        borderColor: "#4CAF50",
        borderWidth: 2,
        fill: false,
        yAxisID: 'y'
      },
      {
        label: "Inflation-Adjusted Value",
        data: adjustedValues,
        borderColor: "#2196F3",
        borderWidth: 2,
        fill: false,
        yAxisID: 'y'
      },
      {
        label: "Annualized Real ROI (%)",
        data: realRois,
        borderColor: "#FF9800",
        borderWidth: 2,
        fill: false,
        yAxisID: 'y1'
      }
    ]
  },
  options: {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Home Value ($)'
        },
        ticks: {
          callback: function(value) {
            return `$${value.toLocaleString()}`;
          }
        }
      },
            y1: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Real ROI (%)'
        },
        grid: {
          drawOnChartArea: false
        },
        min: 0,
        max: Math.max(...realRois) + 1
      }
    }
  }
}); // ← this closes Chart

// === ROI Taper Indicator ===
let roiTaperYear = null;
for (let i = 1; i < realRois.length; i++) {
  const previous = parseFloat(realRois[i - 1]);
  const current = parseFloat(realRois[i]);
  const delta = current - previous;

  if (delta < 0.05) { // threshold for tapering
    roiTaperYear = futureYears[i];
    break;
  }
}

if (roiTaperYear) {
  const taperMessage = document.createElement("p");
  taperMessage.style.fontWeight = "bold";
  taperMessage.style.color = "#b34700";
  taperMessage.textContent = `📉 ROI Taper Detected: Consider selling by ${roiTaperYear} to lock in gains.`;
  document.getElementById("results").appendChild(taperMessage);
}
}); // ← this closes the form submit event listener
