import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <h3 style={{ marginTop: 50 }}>Đăng nhập thành công</h3>
      <Button onClick={() => navigate("/admin/product-list")}>
        Tới quản lý sản phẩm
      </Button>
      <Button onClick={() => navigate("/admin/bill-list")}>
        Tới quản lý đơn đặt
      </Button>
    </>
  );
};

export default AdminHome;
