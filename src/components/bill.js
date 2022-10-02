import { Col, Popconfirm, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"; //Định dạng thời gian

import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import UserAPI from "../services/userAPI";
import { update_bill_all } from "../action/bill";
import BillAPI from "../services/billAPI";
import { Button } from "antd";

const Bill = () => {
  const dispatch = useDispatch();
  const dataBillALL = useSelector((state) => state.bill.dataAll);
  const dataBill = dataBillALL?.filter((item) => !item.status);
  const navigate = useNavigate();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIdBill(),
    documentTitle: `phieu_tt_${Math.floor(Math.random() * 1000)}`,
  });

  //Lấy bill theo id
  const getBill = (id) => {
    return dataBill.find((item) => item._id == id);
  };

  //Khi click vào bàn
  const [idBill, setIdBill] = useState();

  //Khi click vào bàn thì bàn thay đổi và khi đó gọi hàm in luôn
  useEffect(() => {
    idBill && handlePrint();
  }, [idBill]);

  //Khi xóa (thanh toán xong) thì đổi trạng thái từ false sang true
  const handlePaid = (id) => {
    BillAPI.update_bill(id, { status: true }).then(() => {
      dispatch(update_bill_all(id, { status: true }));
    });
  };

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
        <Row>
          {dataBill?.map((item) => {
            return (
              <Col span={6} key={item?._id} style={{ padding: 8 }}>
                <a
                  onClick={() => {
                    setIdBill(item._id);
                  }}
                >
                  <div style={{ background: "green", color: "white" }}>
                    <b>{item?.table}</b>
                    <p>
                      {item?.total_price?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </a>
                <Popconfirm
                  title={`Bạn chắc chắn xóa "${item.table}"?`}
                  onConfirm={() => handlePaid(item._id)}
                >
                  <Button>Xóa</Button>
                </Popconfirm>
              </Col>
            );
          })}
        </Row>
        <div style={{ display: "none" }}>
          {idBill && (
            <div ref={componentRef} style={{ padding: 24 }}>
              <h1>{getBill(idBill).table}</h1>
              <table className="table-print">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>SL</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {getBill(idBill).detail.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>
                          {item.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p style={{ fontSize: 30, marginTop: 48 }}>
                - Tổng giá:{" "}
                {getBill(idBill)?.total_price?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p style={{ fontSize: 30 }}>
                - Thời gian:{" "}
                {moment(getBill(idBill).createdAt).format(
                  "DD/MM/yyyy hh:mm:ss  A"
                )}
              </p>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default Bill;

/* {idBill && (
          <div ref={componentRef}>
            <p>{getBill(idBill).table}</p>
          </div>
        )} */
