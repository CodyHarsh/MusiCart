import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductState } from "./context/ProductContext";
import { CartState } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "./components/LoadingBar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import { GlobalState } from "./context/GlobalContext";
import Feedback from "./pages/Feedback";
import PageNotFound  from "./pages/PageNotFound";
import SingleInvoice from "./pages/SingleInvoice";
import Login from "./pages/Login"

// Lazy load components
const Home = React.lazy(() => import("./pages/Home"));
//const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Product = React.lazy(() => import("./pages/Product"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Success = React.lazy(() => import("./pages/Success"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
// const SingleInvoice =  React.lazy(() => import("./pages/SingleInvoice"));
const Invoices = React.lazy(() => import('./pages/Invoices'))
function App() {
  return (
    <>
      <GlobalState>
        <ProductState>
          <CartState>
            <ToastContainer autoClose={1000} />
            <LoadingBar />
            <Router>
              <Navbar />
              <div className="container">
                <Hero />
                <Suspense fallback={<LoadingBar />}>
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/product">
                      <Route path=":id" element={<Product />} />
                    </Route>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/checkout">
                      <Route path="" element={<Checkout />} />
                      <Route
                        path=":id"
                        element={<Checkout buyNow={true} />}
                      />

                    </Route>
                    <Route path="/invoices">
                      <Route path="" element={<Invoices />} />
                      <Route
                        path=":id"
                        element={<SingleInvoice buyNow={true} />}
                      />
                      
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>     
                </Suspense>
              </div>
              <BottomNavbar />
              <Footer />
            </Router>
          </CartState>
        </ProductState>
      </GlobalState>
    </>
  );
}

export default App;
