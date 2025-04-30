import { ChevronUp } from "lucide-react"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CryptoContext } from "../context/CryptoContext"

const CoinArea = () => {
  const { filteredCryptos, currentCurrency, setCurrentCurrency } =
    useContext(CryptoContext)

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false)

  const handleCurrencySelection = (selectedCurrency) => {
    switch (selectedCurrency) {
      case "eur":
        setCurrentCurrency({ name: "eur", symbol: "€" })
        break
      case "inr":
        setCurrentCurrency({ name: "inr", symbol: "₹" })
        break
      default:
        setCurrentCurrency({ name: "usd", symbol: "$" })
    }

    setIsCurrencyDropdownOpen(false)
  }

  return (
    <div className="relative z-0 min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 px-4 py-6 text-white sm:px-[5%] md:py-10">
      <div className="group relative mb-8 space-y-4 text-center md:mb-12">
        <div className="animate-pulse-slow absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-30 blur-3xl" />
        <h1 className="animate-gradient-x bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-3xl leading-tight font-bold text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
          Crypto <br />{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-xl text-transparent sm:text-2xl md:text-3xl lg:text-4xl">
            Market Intelligence
          </span>
        </h1>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-300/80 sm:text-base md:text-lg">
          Track realtime crypto market metrics with advanced analytics and{" "}
          <span className="mx-2 bg-gradient-to-r from-emerald-400/80 to-cyan-400/80 bg-clip-text text-transparent">
            neural network predictions
          </span>
        </p>
      </div>
      <div className="mb-2.5 hidden grid-cols-5 gap-4 rounded border border-emerald-500/20 bg-gray-800/40 px-4 py-4 text-sm backdrop-blur-lg md:grid">
        <p className="text-emerald-400/90">Rank</p>
        <p className="text-cyan-400/90">Coins</p>
        <div
          className="group relative flex cursor-pointer items-center gap-1"
          onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
        >
          <span>Price</span>
          <div className="flex items-center gap-1">
            <span className="text-emerald-400/90">
              ({currentCurrency.symbol})
            </span>
            <ChevronUp
              className={`h-4 w-4 text-cyan-400/80 transition-transform ${isCurrencyDropdownOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        <p className="text-center">24H flux</p>
        <p className="text-right">Market Cap</p>
      </div>
      {isCurrencyDropdownOpen && (
        <div className="relative z-30 rounded-lg border border-emerald-500/20 bg-gray-800/95 shadow-2xl backdrop-blur-xl">
          {["usd", "eur", "inr"].map((code) => (
            <div
              key={code}
              className="flex cursor-pointer items-center gap-2 px-4 py-3 transition-colors hover:bg-emerald-600/30"
              onClick={() => handleCurrencySelection(code)}
            >
              <span className="text-emerald-400/80">
                {code === "usd" ? "$" : code === "€" ? "eur" : "₹"}
              </span>
              <span className="text-gray-100">{code.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}
      <div className="relative z-10 space-y-3">
        {filteredCryptos.slice(0, 12).map((item) => (
          <Link
            to={`/crypto/${item.id}`}
            key={item.id}
            className="group block rounded-xl border border-emerald-500/10 bg-gray-800/30 p-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-700/40"
          >
            <div className="space-y-3 md:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-emerald-400/80">
                    #{item.market_cap_rank}
                  </span>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-0.5 sm:h-8 sm:w-8"
                  />
                  <div className="">
                    <p className="text-sm font-medium text-gray-100 sm:text-base">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-cyan-400/80 sm:text-sm">
                      {item.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-100 sm:text-base">
                    {currentCurrency.symbol}
                    {item.current_price.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-emerald-500/10 pt-2">
                <div
                  className={`flex items-center gap-1 text-sm sm:text-base ${item.price_change_percentage_24h > 0 ? "text-emerald-400" : "text-red-400"}`}
                >
                  <span>
                    {item.price_change_percentage_24h > 0 ? "▲" : "▼"}
                  </span>
                  {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-100 sm:text-base">
                    {currentCurrency.symbol}
                    {item.market_cap.toLocaleString()}
                  </p>
                  <p className="mt-0.5 text-xs text-emerald-400/60 sm:text-sm">
                    Vol:{currentCurrency.symbol}
                    {item.total_volume.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            {/* Desktop View */}
            <div className="hidden grid-cols-5 items-center gap-4 md:grid">
              <span className="text-sm text-emerald-400/80 lg:text-base">
                #{item.market_cap_rank}
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-0.5 lg:h-10 lg:w-10"
                />
                <div>
                  <p className="text-base font-medium text-gray-100 lg:text-lg">
                    {item.name}
                  </p>
                  <p className="text-xs text-cyan-400/80 lg:text-sm">
                    {item.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-cyan-400/80">
                  {currentCurrency.symbol}
                </span>
                <span className="text-gray-100">
                  {item.current_price.toLocaleString()}
                </span>
              </div>
              <div
                className={`rounded-full px-2 py-1 text-center text-sm lg:text-base ${item.price_change_percentage_24h > 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-400/20 text-red-400"}`}
              >
                <span className="mr-1">
                  {item.price_change_percentage_24h > 0 ? "▲" : "▼"}
                </span>
                {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-100 lg:text-base">
                  {currentCurrency.symbol}
                  {item.market_cap.toLocaleString()}
                </p>
                <p className="mt-0.5 text-xs text-emerald-400/60 lg:text-sm">
                  Vol:{currentCurrency.symbol}
                  {item.total_volume.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CoinArea
