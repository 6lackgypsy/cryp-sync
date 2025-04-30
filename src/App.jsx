import { Route, Routes } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import CoinArea from "./pages/CoinArea"
import Crypto from "./pages/Crypto"

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<CoinArea />} />
          <Route path="/crypto/:cryptoId" element={<Crypto />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
