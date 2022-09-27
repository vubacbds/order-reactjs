import logo from "./logo.svg";
import "./App.css";
//react
import React, { useEffect } from "react";
//route
import { Routes, Route, Navigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import get_product from "./action/product";
//Thông báo toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//icon antd
import { UpCircleOutlined } from "@ant-design/icons";
//antd
import { BackTop, Spin } from "antd";

function App() {
  const Product = React.lazy(() => import("./components/Product"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_product());
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
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
          {/* <Route path="/user/verify/:userid" element={<VerifyEmail />} />
          <Route path="/demo" element={<Demo />} /> */}

          {/* Để cuối */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer />
        <BackTop>
          <div className="back-top">
            <UpCircleOutlined />
          </div>
        </BackTop>
      </div>
    </>
  );
}

export default App;
