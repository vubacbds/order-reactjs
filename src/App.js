// import logo from "./logo.svg";
import "./App.css";
//react
import React, { useEffect } from "react";
//route
import { Routes, Route, Navigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import get_product from "./action/product";
import get_bill from "./action/bill";
import get_bill_all from "./action/bill";
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
import AdminHome from "./components/adminhome";
import Login from "./components/login";
import ProductList from "./components/productlist";
import Demo from "./components/demo";
import Bill from "./components/bill";
//meta head
import MetaTags from "react-meta-tags";

function App() {
  const Product = React.lazy(() => import("./components/products"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_product());
    dispatch(get_bill());

    dispatch(get_bill_all());
  }, []);

  return (
    <>
      <MetaTags>
        <title>Page 1</title>
        {/* <meta name="description" content="Some description." /> */}
        <meta property="og:title" content="MyApp" />
        {/* <meta property="og:image" content="path/to/image.jpg" /> */}
      </MetaTags>
      <div className="App" id="app">
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

          <Route path="/demo" element={<Demo />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/product-list" element={<ProductList />} />
          <Route path="/admin/bill" element={<Bill />} />

          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/" element={<Navigate to="/1" replace />} />
          <Route path="*" element={<h2> Not found</h2>} />
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
