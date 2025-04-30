import { useEffect, useState } from "react"
import Chart from "react-google-charts"

const AreaChart = ({ historicalData, currencySymbol }) => {
  const [data, setData] = useState([["Date", "Prices"]])

  useEffect(() => {
    if (historicalData?.prices) {
      const formattedData = historicalData.prices.map((item) => [
        new Date(item[0]),
        item[1],
      ])

      setData([["Date", "Prices"], ...formattedData])
    }
  }, [historicalData])

  const options = {
    backgroundColor: "transparent",
    legend: "none",
    curveType: "function",
    hAxis: {
      textStyle: { color: "#FFFFFF" },
      gridlines: { color: "#444444" },
      format: "MMM dd",
    },
    vAxis: {
      textStyle: { color: "#FFFFFF" },
      gridlines: { color: "#444444" },
      format: `'${currencySymbol}'#,##0.00`,
    },
    chartArea: {
      backgroundColor: {
        fill: "transparent",
        opacity: 0,
      },
      width: "90%",
      height: "80%",
    },
    colors: ["#10B981"],
    lineWidth: 3,
    // Trendlines may be specific to certain chart types and might need adjustment
    trendlines: {
      0: {
        type: "linear",
        color: "#00FFFF",
        lineWidth: 1,
        opacity: 0.4,
        showR2: false,
      },
    },
    crosshair: {
      trigger: "both",
      orientation: "vertical",
      color: "#00FFFF",
      opacity: 0.2,
    },
    tooltip: {
      textStyle: { color: "#000000" },
      showColorCode: true,
      isHtml: true,
    },
  }

  return (
    <div className="w-full rounded-xl border border-emerald-500/20 bg-gray-800/20 p-4 backdrop-blur-sm">
      <Chart
        chartType="AreaChart"
        data={data}
        options={options}
        loader={<div className="text-emerald-400">Loading Market Data...</div>}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  )
}

export default AreaChart
