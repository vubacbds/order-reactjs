import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../services/userAPI";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Thông báo
  const loginSuccess = () => {
    toast.success("Đăng nhập thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const loginFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    UserAPI.login(values)
      .then(function (response) {
        loginSuccess();
        localStorage.setItem("accessToken", response.token);
        navigate("/admin/product-list");
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        loginFail(error.response.data.message);
      });
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          xs: 8,
          md: 8,
        }}
        wrapperCol={{
          xs: 12,
          md: 12,
        }}
        initialValues={{}}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="username"
          name="username"
          rules={[
            {
              required: true,
              message: "Chưa có tên đăng nhập!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
