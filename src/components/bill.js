import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"; //Định dạng thời gian

import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";

const Bill = () => {
  const dataBillALL = useSelector((state) => state.bill.dataAll);
  const dataBill = dataBillALL?.filter((item) => !item.status);

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

  useEffect(() => {
    idBill && handlePrint();
  }, [idBill]);

  return (
    <>
      <Row>
        {dataBill?.map((item) => {
          return (
            <Col
              span={6}
              key={item?._id}
              style={{ padding: 8 }}
              onClick={() => {
                setIdBill(item._id);
              }}
            >
              <a>
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
  );
};

export default Bill;

/* {idBill && (
          <div ref={componentRef}>
            <p>{getBill(idBill).table}</p>
          </div>
        )} */
