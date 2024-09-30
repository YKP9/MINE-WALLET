import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { Register } from "./pages/Register/register";
import { Login } from "./pages/Login/login";
import { Home } from "./pages/Home/home";
import { ProtectedRoute } from "./components/protectedRoutes";
import { PublicRoute } from "./components/publicRoutes";
import { Loader } from "./components/spinner";
import { TransactionHistory } from "./pages/Transactions/transaction";
import { TransactionSuccessul } from "./pages/MessagePopup/Success";
import { TransactionFailed } from "./pages/MessagePopup/Failed";
import { RequestMoney } from "./pages/Request/requestFund";
import { AdminVerification } from "./pages/Users/users";
import { TransactionDashboard } from "./pages/Users/usersTransaction";
import { UserProfile } from "./pages/Profile/userProfile";
import { ProfileEditor } from "./pages/Profile/editProfile";

import "./styleSheets/alignments.css";
import "./styleSheets/custom-components.css";
import "./styleSheets/form-elements.css";
import "./styleSheets/layout.css";
import "./styleSheets/text-elements.css";
import "./styleSheets/theme.css";
import "./styleSheets/sucessfulTransaction.css";
import "./styleSheets/failedTransaction.css";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/successful-transaction"
            element={
              <ProtectedRoute>
                <TransactionSuccessul />
              </ProtectedRoute>
            }
          />
          <Route
            path="/failed-transaction"
            element={
              <ProtectedRoute>
                <TransactionFailed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <RequestMoney />
              </ProtectedRoute>
            }
          />

         <Route  path="/users" element={ 
          <ProtectedRoute>
          < AdminVerification />
         </ProtectedRoute>
          } />

          <Route path="/admin-transactions" element = {
            <ProtectedRoute>
              <TransactionDashboard />
            </ProtectedRoute>
          }   />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <ProfileEditor />
              </ProtectedRoute>
            }
          />

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
