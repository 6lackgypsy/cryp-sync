import { createContext, useEffect, useState } from "react"

export const CryptoContext = createContext()

const CryptoContextProvider = ({ children }) => {
  const [cryptoList, setCryptoList] = useState([])
  const [filteredCryptos, setFilteredCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentCurrency, setCurrentCurrency] = useState({
    name: "USD",
    symbol: "$",
  })

  /* API */
  const fetchCryptoData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_CRYPTO_API_KEY,
      },
    }

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency.name}`,
        options,
      )

      setCryptoList(await res.json())
    } catch (err) {
      console.log("Failed to fetch data: ", err)
    }
  }

  /* Refetch when currency changes */
  useEffect(() => {
    fetchCryptoData()
  }, [currentCurrency])

  /* Refetch when raw list or search term changes */
  useEffect(() => {
    const searchInput = searchTerm.trim().toLowerCase()

    if (searchInput === "") {
      setFilteredCryptos(cryptoList)
    } else {
      setFilteredCryptos(
        cryptoList.filter((item) =>
          item.name.toLowerCase().includes(searchInput),
        ),
      )
    }
  }, [searchTerm, cryptoList])

  return (
    <CryptoContext.Provider
      value={{
        cryptoList,
        filteredCryptos,
        currentCurrency,
        setCurrentCurrency,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContextProvider
