import logo from "./logo.svg";
import "./App.css";
//react
import React, { useEffect } from "react";
//route
import { Routes, Route, Navigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import get_product from "./action/product";
import get_bill from "./action/bill";
//Thông báo toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//icon antd
import { UpCircleOutlined } from "@ant-design/icons";
//antd
import { BackTop, Spin } from "antd";
//component
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  const Product = React.lazy(() => import("./components/product"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_product());
    dispatch(get_bill());
  }, []);

  return (
    <>
      <div className="App" id="app">
        <Header />
        <Routes>
          <Route
            path="/:ban"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Spin /> Đang tải ...
                  </div>
                }
              >
                <Product />
              </React.Suspense>
            }
          />

          <Route path="/" element={<Navigate to="/1" replace />} />
          <Route path="*" element={<h2> Not found</h2>} />
        </Routes>

        <ToastContainer />
        <BackTop>
          <div className="back-top">
            <UpCircleOutlined />
          </div>
        </BackTop>
        <Footer />
      </div>
    </>
  );
}

export default App;
