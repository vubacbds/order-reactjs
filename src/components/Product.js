//redux
import { useDispatch, useSelector } from "react-redux";
import { update_product } from "../action/product";
import { add_bill, update_bill } from "../action/bill";
//antd
import { Col, Row, InputNumber, Form, Input, Button } from "antd";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import {
  MinusCircleOutlined,
  MinusSquareOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useFetcher } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.product.data);
  const dataBill = useSelector((state) => state.bill.data);

  //Khi chạy tạo bill rỗng
  useEffect(() => {
    dispatch(
      add_bill({
        table: "",
        note: "",
        detail: [],
        price: 0,
        status: false,
      })
    );
  }, []);

  return (
    <div>
      <Row>
        <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {dataProduct?.map((item, index) => {
            return (
              <Row
                key={item._id}
                style={{ margin: "8px 8px" }}
                className="product-hover"
              >
                <Col span={6}>
                  <Carousel slide={false}>
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
                <Col span={8}>
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                </Col>
                <Col span={10}>
                  <div style={{ display: "flex" }}>
                    <Button
                      type="link"
                      onClick={() => {
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
                                });
                              } else return i;
                            });

                            dispatch(
                              update_bill({
                                table: "Bàn 1",
                                note: "Nhanh nhé!",
                                detail: updateDetail,
                                price: 0,
                                status: false,
                              })
                            );
                          }
                        }
                      }}
                    >
                      <MinusCircleOutlined
                        style={{
                          fontSize: "20px",
                          color: "gray",
                          flexGrow: 1,
                        }}
                      />
                    </Button>

                    <Input value={item.amount} style={{ flexGrow: 2 }} />

                    <Button
                      type="link"
                      onClick={() => {
                        //Tăng số lượng trên giao diện khi chọn
                        dispatch(
                          update_product(item._id, {
                            amount: item.amount + 1,
                          })
                        );

                        //Kiểm tra sản phẩm đã có trong bill chưa
                        const isHave =
                          dataBill?.detail.length > 0
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
                          };
                          dispatch(
                            update_bill({
                              table: "Bàn 1",
                              note: "Nhanh nhé!",
                              detail: [...dataBill.detail, createDetail],
                              price: 0,
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
                              });
                            } else return i;
                          });

                          dispatch(
                            update_bill({
                              table: "Bàn 1",
                              note: "Nhanh nhé!",
                              detail: updateDetail,
                              price: 0,
                              status: false,
                            })
                          );
                        }
                      }}
                      key={index}
                    >
                      <PlusCircleOutlined
                        style={{
                          fontSize: "20px",
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
    </div>
  );
};

export default Product;
