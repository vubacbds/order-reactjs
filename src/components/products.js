//redux
import { useDispatch, useSelector } from "react-redux";
import { update_product } from "../action/product";
import { add_bill, update_bill } from "../action/bill";
//antd
import { Col, Row, InputNumber, Form, Input, Button } from "antd";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
//react-dom
import { useParams } from "react-router-dom";
import {
  MinusCircleOutlined,
  MinusSquareOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useFetcher } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Product = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.product.data);
  const dataBill = useSelector((state) => state.bill.data);
  const params = useParams();

  //Khi chạy tạo bill rỗng
  useEffect(() => {
    dispatch(
      add_bill({
        table: "",
        note: "",
        detail: [],
        total_price: 0,
        status: false,
      })
    );
  }, []);

  //Hàm xử lý tăng
  const handleTang = (item) => {
    //Tăng số lượng trên giao diện khi chọn
    dispatch(
      update_product(item._id, {
        amount: item.amount + 1,
      })
    );

    //Kiểm tra sản phẩm đã có trong bill chưa
    const isHave =
      dataBill?.detail?.length > 0
        ? dataBill?.detail?.find((i) => {
            return i?.id == item._id;
          })
        : false;

    //Nếu chưa có thì thêm vào, có thì sửa số lượng
    if (!isHave) {
      const createDetail = {
        id: item._id,
        name: item.name,
        amount: 1,
        price: item.price,
      };

      let newArray = [];
      if (dataBill?.detail?.length == 0) {
        newArray = [createDetail];
      } else {
        newArray = [createDetail, ...dataBill?.detail];
      }

      dispatch(
        update_bill({
          table: `Bàn ${params.ban}`,
          note: "Nhanh nhé!",
          detail: newArray,
          total_price: 0,
          status: false,
        })
      );
    } else {
      const updateDetail = dataBill?.detail?.map((i) => {
        if (i.id == item._id) {
          return (i = {
            id: item._id,
            name: item.name,
            amount: i.amount + 1,
            price: (i.amount + 1) * item.price,
          });
        } else return i;
      });

      dispatch(
        update_bill({
          table: `Bàn ${params.ban}`,
          note: "Nhanh nhé!",
          detail: updateDetail,
          total_price: 0,
          status: false,
        })
      );
    }
  };

  //Hàm xử lý giảm
  const handleGiam = (item) => {
    //Giảm số lượng trên giao diện khi chọn và amout ko được âm
    item.amount > 0 &&
      dispatch(
        update_product(item._id, {
          amount: item.amount - 1,
        })
      );

    //Kiểm tra sản phẩm đã có trong bill chưa
    const isHave =
      dataBill?.detail.length > 0
        ? dataBill?.detail?.find((i) => {
            return i?.id == item._id;
          })
        : false;

    //Nếu chưa có thì ko làm gì, có thì sửa số lụợng
    if (!isHave) {
      return;
    } else {
      if (item.amount > 0) {
        const updateDetail = dataBill?.detail?.map((i) => {
          if (i.id == item._id) {
            return (i = {
              id: item._id,
              name: item.name,
              amount: i.amount - 1,
              price: (i.amount - 1) * item.price,
            });
          } else return i;
        });

        dispatch(
          update_bill({
            table: `Bàn ${params.ban}`,
            note: "Nhanh nhé!",
            detail: updateDetail,
            total_price: 0,
            status: false,
          })
        );
      }
    }
  };

  return (
    <div>
      <Header />
      <Row>
        <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          className="scroll-product-order"
        >
          {dataProduct?.map((item, index) => {
            return (
              <Row
                key={item._id}
                style={{ margin: "8px 8px" }}
                className="product-hover"
              >
                <Col span={6} className="app-enabled">
                  <Carousel slide={false} interval={12000}>
                    {item.images.map((i, index) => {
                      return (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            src={i}
                            alt="First slide"
                            style={{ height: 100, width: 100 }}
                          />
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </Col>
                <Col span={10}>
                  <b>{item.name}</b>
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </Col>
                <Col span={8} style={{ borderLeft: "1px solid gray" }}>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 30,
                    }}
                  >
                    <Button type="link" onClick={() => handleGiam(item)}>
                      <MinusCircleOutlined
                        style={{
                          fontSize: "24px",
                          color: "gray",
                          flexGrow: 1,
                        }}
                      />
                    </Button>

                    <Button
                      style={{
                        flexGrow: 2,
                        fontStyle: "bold",
                        textAlign: "center",
                      }}
                    >
                      {item.amount}
                    </Button>

                    <Button
                      type="link"
                      onClick={() => handleTang(item)}
                      key={index}
                    >
                      <PlusCircleOutlined
                        style={{
                          fontSize: "24px",
                          color: "gray",
                          flexGrow: 1,
                        }}
                      />
                    </Button>
                  </div>
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Product;
