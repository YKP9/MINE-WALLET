
import { Register } from "./pages/Register/register"
import { Login } from "./pages/Login/login"
import "./styleSheets/alignments.css"
import "./styleSheets/custom-components.css"
import "./styleSheets/form-elements.css"
import "./styleSheets/layout.css"
import "./styleSheets/text-elements.css"
import "./styleSheets/theme.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"



function App() {
  

  return (
    <div>
  
      <BrowserRouter>

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>


      </BrowserRouter>

    </div>
  )
}

export default App
