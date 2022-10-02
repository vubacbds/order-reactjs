import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../services/userAPI";

const AdminHome = () => {
  const navigate = useNavigate();

  //Để kiểm tra khi admin đăng nhập mới được vào trang list product
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const dataUser = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    };
    UserAPI.verify(dataUser)
      .then((res) => {
        if (res.result) setIsAdmin(true);
        else navigate("/admin/login");
      })
      .catch(() => {
        navigate("/admin/login");
      });
  }, []);
  return (
    isAdmin && (
      <>
        <h3 style={{ marginTop: 50 }}>Đăng nhập thành công</h3>
        <Button onClick={() => navigate("/admin/product-list")}>
          Tới quản lý sản phẩm
        </Button>
        <Button onClick={() => navigate("/admin/bill")}>
          Tới quản lý đơn đặt
        </Button>
        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/admin/login");
          }}
        >
          Đăng xuất
        </Button>
      </>
    )
  );
};

export default AdminHome;
