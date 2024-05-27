import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from "./utils/AuthContext"
import PrivateRoutes from "./components/PrivateRoutes"
import Login from "./pages/Login"
import Room from "./pages/Room"
import Register from './pages/Register'


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
