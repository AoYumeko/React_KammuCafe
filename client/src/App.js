import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import TransactionPage from "./pages/TransactionPage";
import LoginComponent from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminRegister from './pages/admin/AdminRegister';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/admin/" element={<LoginComponent />} />
          <Route path="/admin/transactions/" element={<AdminDashboard />} />
          <Route path="/admin/products/" element={<AdminProducts />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;