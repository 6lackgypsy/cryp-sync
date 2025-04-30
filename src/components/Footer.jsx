const Footer = () => {
  return (
    <div className="w-full border-t border-emerald-500/20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-6 shadow-[0_0_30px_-10px_rgba(34,197,94,0.1)] backdrop-blur-xl">
      <div className="px-[5%] md:px-[8%] lg:px-[10%]">
        <p className="text-md text-center text-gray-300 transition-colors duration-150 hover:text-cyan-400/90 md:text-base">
          <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            &copy; {new Date().getFullYear()} CrypSync. All Rights Reserved.
          </span>{" "}
          <br />
          <span className="text-sm">
            All market data sourced from CoinGecko API
          </span>
        </p>
      </div>
    </div>
  )
}

export default Footer
