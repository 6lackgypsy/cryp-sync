import { Coins, Search } from "lucide-react"
import { useContext, useState } from "react"
import { useLocation } from "react-router-dom"
import { CryptoContext } from "../context/CryptoContext"

const Navbar = () => {
  const location = useLocation()

  const { cryptoList = [], setSearchTerm } = useContext(CryptoContext)

  const [input, setInput] = useState("")
  const [filteredCoins, setFilteredCoins] = useState([])

  const handleInput = (e) => {
    const value = e.target.value
    setInput(value)

    if (value === "") {
      setSearchTerm("")
      setFilteredCoins([])
    } else {
      const suggestions = cryptoList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )

      setFilteredCoins(suggestions.slice(0, 5))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setFilteredCoins([])
    setSearchTerm(input)
  }

  return (
    <nav className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-gray-700/30 bg-gray-900/80 px-[5%] py-5 backdrop-blur-md md:flex-nowrap md:px-[8%] lg:px-[10%]">
      <a
        href="/"
        className="order-1 flex flex-shrink-0 items-center gap-2 transition-transform hover:scale-105"
      >
        <Coins className="h-8 w-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
          CrypSync
        </span>
      </a>
      {/* Searchbar */}
      {location.pathname === "/" ? (
        <form
          className="relative order-3 mx-0 w-full max-w-2xl flex-1 md:order-2 md:mx-4 md:w-auto"
          onSubmit={handleSubmit}
        >
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-600/40 to-cyan-500/40 opacity-30 blur transition duration-300 group-hover:opacity-50" />
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search Crypto..."
                required
                className="placeholder:gray-400 w-full rounded-full border border-gray-800/30 bg-gray-800/60 px-6 py-3 text-gray-200 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:outline-none"
                value={input}
                onChange={handleInput}
              />
              <button className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-1.5 text-white transition-all hover:scale-105">
                <Search className="pointer-events-none h-4 w-4" />
              </button>
            </div>
          </div>
          {filteredCoins.length > 0 && (
            <ul className="absolute z-10 mt-2 w-full rounded-lg border-gray-200 bg-gray-800/95 shadow-xl backdrop-blur-md">
              {filteredCoins.map((coin, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-4 py-4 text-gray-100 hover:bg-emerald-600/30"
                  onClick={() => {
                    setInput(coin.name)
                    setFilteredCoins([])
                  }}
                >
                  {coin.name}
                </li>
              ))}
            </ul>
          )}
        </form>
      ) : (
        <h3 className="order-1 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
          Coin Details
        </h3>
      )}
    </nav>
  )
}

export default Navbar
