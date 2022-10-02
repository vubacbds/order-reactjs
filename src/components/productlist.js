import { Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductAdd from "./productadd";
import ProductUpdate from "./productupdate";
import UserAPI from "../services/userAPI";

import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { delete_product } from "../action/product";
import ProductAPI from "../services/productAPI";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dataProduct = useSelector((state) => state.product.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Hiện model add product
  const [visibleProductAdd, setVisibleProductAdd] = useState(false);

  //Hiện model update product
  const [visibleProductUpdate, setVisibleProductUpdate] = useState(false);
  const [productUpdate, setProductUpdate] = useState();

  //Thông báo
  const ProductDeleteSuccess = () => {
    toast.success("Xóa thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Hàm xóa một sản phẩm trong Category list
  const deleteProductList = (id) => {
    ProductAPI.delete_product(id).then(() => {
      dispatch(delete_product(id));
      ProductDeleteSuccess();
    });
  };

  //Định nghĩa các cột trong table
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              title="Bạn chắc chắn xóa?"
              onConfirm={() => deleteProductList(record._id)}
            >
              <Button type="link">
                <DeleteOutlined />
              </Button>
            </Popconfirm>{" "}
            &nbsp; &nbsp;
            <Button
              onClick={() => {
                // dispatch(getcategory_id(record._id));
                setVisibleProductUpdate(true);
                setProductUpdate(record);
              }}
              type="link"
            >
              <FormOutlined />
            </Button>
          </>
        );
      },
    },
  ];

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
      <div
        style={{
          flexDirection: "row",
          display: "inline",
        }}
      >
        <Button
          onClick={() => {
            setVisibleProductAdd(true);
          }}
          style={{ margin: "10px 20px", fontWeight: "bold", float: "right" }}
          type="primary"
        >
          + Thêm sản phẩm
        </Button>
        <Table
          scroll={{ x: true }}
          columns={columns}
          rowKey={(record) => record._id}
          dataSource={dataProduct}
          style={{ margin: "0px 20px" }}
        />

        <ModalProductAdd
          visible={visibleProductAdd}
          setVisible={setVisibleProductAdd}
        />
        <ModalProductUpdate
          visible={visibleProductUpdate}
          setVisible={setVisibleProductUpdate}
          productUpdate={productUpdate}
        />
      </div>
    )
  );
};

//Modal Product Add
const ModalProductAdd = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        title="Thêm sản phẩm"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <ProductAdd />
      </Modal>
    </>
  );
};

//Modal Product Update
const ModalProductUpdate = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        title="Sửa danh mục"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <ProductUpdate productUpdate={props.productUpdate} />
      </Modal>
    </>
  );
};

export default ProductList;
