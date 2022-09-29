import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { update_bill } from "../action/bill";
import get_product, { update_product } from "../action/product";
import BillAPI from "../services/billAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.product.data);
  const dataBill = useSelector((state) => state.bill.data);
  const dataBillTable = dataBill.detail?.filter((item) => item.amount > 0);
  const navigate = useNavigate();

  const total_price = dataBill.detail?.reduce((total, currentValue) => {
    return total + currentValue.price;
  }, 0);

  //Xóa bill
  const deleteBill = (id) => {
    const updateDetail = dataBill?.detail?.filter((i) => {
      return i.id != id;
    });

    dispatch(
      update_bill({
        table: "Bàn 1",
        note: "Nhanh nhé!",
        detail: updateDetail,
        total_price: 0,
        status: false,
      })
    );

    //Sản phẩm về 0 luôn
    dispatch(
      update_product(id, {
        amount: 0,
      })
    );
  };

  //Thông báo
  const BillAddSuccess = () => {
    toast.success("Đã đặt thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const BillAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Xử lý đặt
  const handleDat = () => {
    BillAPI.add_bill({
      ...dataBill,
      total_price,
    })
      .then(() => {
        BillAddSuccess();
        alert(
          "Quý khách đã đặt hàng thành công! Vui lòng chờ để nhân viên giao nhé"
        );
        document.getElementById("app")?.classList.add("app-disabled");
        setIsDat(true);
      })
      .catch((err) => {
        BillAddFail(err.response.data.message);
      });
  };

  //Cột table
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SL",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Thành tiền",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        return (
          <p>
            {record.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}{" "}
          </p>
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Bạn chắc chắn xóa?"
            onConfirm={() => deleteBill(record.id)}
          >
            <Button type="link">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  const [isDat, setIsDat] = useState(false);
  const handleReset = () => {
    //Ẩn button thông báo thành công và tắt ẩn cả app
    document.getElementById("app")?.classList.remove("app-disabled");
    setIsDat(false);

    //Reset lại bill
    dispatch(
      update_bill({
        table: "",
        note: "",
        detail: [],
        total_price: 0,
        status: false,
      })
    );

    //Reset lại số lượng sp về ko
    dispatch(get_product());
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <div className=" footer">
            {/* Món đã chọn:{" "}
        <div>
          {dataBill?.detail?.map((item) => {
            return (
              <div>
                <p>Tên món: {item?.name}</p>
                <p>Số lượng: {item?.amount}</p>
              </div>
            );
          })}
        </div> */}

            {isDat && (
              <Button className="app-enabled " onClick={() => handleReset()}>
                Đặt tiếp tại đây!
              </Button>
            )}

            <Popconfirm
              title="Bạn chắc chắn đặt không?"
              onConfirm={() => handleDat()}
              disabled={total_price == 0}
            >
              <Button className="button-order" type="primary">
                Đặt
              </Button>
            </Popconfirm>
            <p style={{ float: "right", marginRight: 10 }}>
              Tổng:{" "}
              {total_price?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <Table
              columns={columns}
              dataSource={dataBillTable}
              rowKey={(record) => record.id}
              locale={{ emptyText: "Chưa có sản phẩm nào được thêm vào" }}
              pagination={false}
              rowClassName="css-table-antd"
              scroll={{ x: true }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
