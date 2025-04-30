import { ArrowDown, ArrowUp } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AreaChart from "../components/AreaChart"
import { CryptoContext } from "../context/CryptoContext"

const CoinPage = () => {
  const { cryptoId } = useParams()

  const [coinDetails, setCoinDetails] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [period, setPeriod] = useState("10")
  const [error, setError] = useState(null)

  const { currentCurrency } = useContext(CryptoContext)

  useEffect(() => {
    if (!cryptoId) {
      setError("No cryptocurrency ID provided.")
      return
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_CRYPTO_API_KEY,
      },
    }

    const fetchData = async () => {
      setError(null)

      try {
        const detailsRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}`,
          options
        )

        if (!detailsRes.ok) {
          throw new Error(
            `Error fetching coin details: ${detailsRes.statusText}`
          )
        }

        setCoinDetails(await detailsRes.json())

        const chartRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currentCurrency.name}&days=${period}&interval=daily`,
          options
        )

        if (!chartRes.ok) {
          throw new Error(`Error fetching chart data: ${chartRes.statusText}`)
        }

        setChartData(await chartRes.json())
      } catch (err) {
        console.error(err)
        setError(err.message)
      }
    }

    fetchData()
  }, [currentCurrency, cryptoId, period])

  return !coinDetails || !chartData ? (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  ) : error ? (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <p>{error}</p>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 px-4 py-6 text-white sm:px-[5%] md:px-[8%]">
      <div className="mb-6 flex flex-col items-center gap-4 rounded-xl border border-emerald-500/20 bg-gray-800/30 p-4 backdrop-blur-lg md:flex-row">
        <img
          src={coinDetails.image.large}
          alt={coinDetails.name}
          className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-1 md:h-20 md:w-20"
        />
        <div className="text-center md:text-left">
          <h1 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            {coinDetails.name}{" "}
            <span className="mt-1 ml-2 block text-sm text-cyan-400/80 md:text-lg">
              ({coinDetails.symbol?.toUpperCase()})
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-300/80">
            Rank: #{coinDetails.market_cap_rank}
          </p>
        </div>
      </div>
      <div className="mb-6 rounded-xl border border-emerald-500/20 bg-gray-800/30 p-4 backdrop-blur-md">
        <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <h2 className="text-lg font-semibold text-emerald-400/90">
            {currentCurrency.symbol} Price Chart
          </h2>
          <div className="group relative">
            <select
              value={period}
              className="rounded-lg border border-emerald-500/30 bg-gray-800/60 px-3 py-1.5 text-sm focus:ring-1 focus:ring-emerald-500/30 focus:outline-none"
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="1">24H</option>
              <option value="7">7D</option>
              <option value="10">10D</option>
              <option value="30">30D</option>
              <option value="90">3M</option>
              <option value="365">1Y</option>
            </select>
            <div className="-inset0.5 absolute -z-10 rounded-lg bg-gradient-to-r from-emerald-600/20 to-cyan-500/20 opacity-30 blur-2xl transition duration-150 group-hover:opacity-50" />
          </div>
        </div>
        <div className="h-64 md:h-80">
          <AreaChart
            historicalData={chartData}
            currencySymbol={currentCurrency.symbol}
          />
        </div>
      </div>
      <div className="space-y-3 md:hidden">
        <div className="rounded-lg border border-emerald-500/20 bg-gray-800/30 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cyan-400/80">Current Price</span>
            <span className="text-lg font-bold text-emerald-400">
              {currentCurrency.symbol}
              {coinDetails?.market_data?.current_price?.[
                currentCurrency.name.toLowerCase()
              ] !== undefined
                ? coinDetails.market_data.current_price[
                    currentCurrency.name.toLowerCase()
                  ].toLocaleString()
                : "N/A"}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-gray-800/30 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cyan-400/80">Market Cap</span>
            <span className="text-lg font-bold text-emerald-400">
              {currentCurrency.symbol}
              {coinDetails?.market_data?.market_cap?.[
                currentCurrency.name.toLowerCase()
              ] !== undefined
                ? coinDetails.market_data.market_cap[
                    currentCurrency.name.toLowerCase()
                  ].toLocaleString()
                : "N/A"}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-gray-800/30 p-3 backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-cyan-400/80">24H High</span>
              <div className="flex items-center text-green-400">
                <ArrowUp className="mr-1 h-4 w-4" />
                {currentCurrency.symbol}
                {coinDetails?.market_data?.high_24h?.[
                  currentCurrency.name.toLowerCase()
                ] !== undefined
                  ? coinDetails.market_data.high_24h[
                      currentCurrency.name.toLowerCase()
                    ].toLocaleString()
                  : "N/A"}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-cyan-400/80">24H Low</span>
              <div className="flex items-center text-red-400">
                <ArrowDown className="mr-1 h-4 w-4" />
                {currentCurrency.symbol}
                {coinDetails?.market_data?.low_24h?.[
                  currentCurrency.name.toLowerCase()
                ] !== undefined
                  ? coinDetails.market_data.low_24h[
                      currentCurrency.name.toLowerCase()
                    ].toLocaleString()
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 hidden grid-cols-2 gap-4 md:grid lg:grid-cols-3">
        <div className="rounded-xl border border-emerald-500/20 bg-gray-800/30 p-4 backdrop-blur-md">
          <h3 className="mb-2 text-sm text-cyan-400/80">Current Price</h3>
          <p className="text-2xl font-bold text-emerald-500">
            {currentCurrency.symbol}
            {coinDetails?.market_data?.current_price?.[
              currentCurrency.name.toLowerCase()
            ] !== undefined
              ? coinDetails.market_data.current_price[
                  currentCurrency.name.toLowerCase()
                ].toLocaleString()
              : "N/A"}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-gray-800/30 p-4 backdrop-blur-md">
          <h3 className="mb-2 text-sm text-cyan-400/80">Market Cap</h3>
          <p className="text-2xl font-bold text-emerald-500">
            {currentCurrency.symbol}
            {coinDetails?.market_data?.market_cap?.[
              currentCurrency.name.toLowerCase()
            ] !== undefined
              ? coinDetails.market_data.market_cap[
                  currentCurrency.name.toLowerCase()
                ].toLocaleString()
              : "N/A"}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-gray-800/30 p-4 backdrop-blur-md">
          <h3 className="mb-2 text-sm text-cyan-400/80">24H Range</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-green-400">
              <ArrowUp className="mr-1 h-5 w-5" />
              {currentCurrency.symbol}
              {coinDetails?.market_data?.high_24h?.[
                currentCurrency.name.toLowerCase()
              ] !== undefined
                ? coinDetails.market_data.high_24h[
                    currentCurrency.name.toLowerCase()
                  ].toLocaleString()
                : "N/A"}
            </div>
            <div className="flex items-center text-red-400">
              <ArrowDown className="mr-1 h-5 w-5" />
              {currentCurrency.symbol}
              {coinDetails?.market_data?.low_24h?.[
                currentCurrency.name.toLowerCase()
              ] !== undefined
                ? coinDetails.market_data.low_24h[
                    currentCurrency.name.toLowerCase()
                  ].toLocaleString()
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 gap-4 space-y-3 md:grid md:grid-cols-2 md:space-y-0">
        <div className="rounded-lg border border-emerald-500/20 bg-gray-800/30 p-4 backdrop-blur-md md:rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-emerald-400/90 md:text-base">
              24h Change
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-base md:text-lg ${coinDetails.market_data.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}
              >
                {coinDetails.market_data.price_change_percentage_24h.toFixed(2)}
                %
              </span>
              {coinDetails.market_data.price_change_percentage_24h > 0 ? (
                <ArrowUp className="h-5 w-5 text-green-400" />
              ) : (
                <ArrowDown className="h-5 w-5 text-red-400" />
              )}
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-gray-800/30 p-4 backdrop-blur-md md:rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-emerald-400/90 md:text-base">
              24h Volume
            </span>
            <span className="text-lg text-cyan-400 md:text-xl">
              {currentCurrency.symbol}
              {coinDetails?.market_data?.total_volume?.[
                currentCurrency.name.toLowerCase()
              ] !== undefined
                ? coinDetails.market_data.total_volume[
                    currentCurrency.name.toLowerCase()
                  ].toLocaleString()
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinPage
