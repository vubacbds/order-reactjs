import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import get_bill_all, {
  add_bill_all,
  update_bill,
  update_bill_all,
} from "../action/bill";
import get_product, { update_product } from "../action/product";
import BillAPI from "../services/billAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, createRef, useEffect } from "react";
import { useScreenshot } from "use-react-screenshot"; //Chụp hình ảnh
import { saveAs } from "file-saver"; //Lưu vào máy
import moment from "moment"; //Định dạng thời gian
import { Modal } from "antd";

const Footer = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.product.data);
  const dataBill = useSelector((state) => state.bill.data);
  const dataBillTable = dataBill.detail?.filter((item) => item.amount > 0);
  const dataBillALL = useSelector((state) => state.bill.dataAll);

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
    //Kiểm tra bàn đặt đã thanh toán chưa
    const isPay = dataBillALL.find((item) => {
      return item.table == dataBill.table && !item.status;
    });

    if (isPay) {
      //Trường hợp bàn vẫn còn, chưa thành toán và gọi thêm thì thêm vào DB
      const newDetail = [
        { name: "------------------------" },
        ...dataBill.detail,
      ];
      const newData = {
        ...isPay,
        total_price: isPay.total_price + total_price,
        detail: [...isPay.detail, ...newDetail],
        detailTemp: [...dataBill.detail],
      };
      BillAPI.update_bill(isPay._id, newData).then(() => {
        dispatch(update_bill_all(isPay._id, newData));
        BillAddSuccess();
        alert(
          "Cảm ơn Quý khách đã đặt nước thành công. Ít phút nữa nhân viên đưa tới bàn nhé!"
        );
        document.getElementById("app")?.classList.add("app-disabled");
        setIsDat(true);
      });
    } else {
      //Trường hợp bàn mới thì tạo mới DB
      BillAPI.add_bill({
        ...dataBill,
        total_price,
      })
        .then((doc) => {
          dispatch(add_bill_all(doc));
          BillAddSuccess();
          alert(
            "Cảm ơn Quý khách đã đặt nước thành công. Ít phút nữa nhân viên đưa tới bàn nhé!"
          );
          document.getElementById("app")?.classList.add("app-disabled");
          setIsDat(true);
        })
        .catch((err) => {
          BillAddFail(err.response.data.message);
        });
    }

    //Chụp hình ảnh
    getImage();

    //ĐÓng modal
    setVisibleOrder(false);
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
            title={`Bạn chắc chắn xóa "${record.name}"?`}
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

    //gọi lại tất cả bill
    dispatch(get_bill_all());

    //không chụp
    setIsScreenShot(false);
  };

  //Số 0
  let number0 = 0;

  //Hiện model order
  const [visibleOrder, setVisibleOrder] = useState(false);

  //Chụp hình ảnh
  const refImage = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const [isScreenshot, setIsScreenShot] = useState(false); //Nhận biết mỗi lần chụp màn hình

  const getImage = () => {
    setIsScreenShot(true);
    takeScreenshot(refImage.current);
  };

  //Lưu ảnh vào máy
  const downloadImage = () => {
    saveAs(image, `img_order_${Math.floor(Math.random() * 1000)}`); // Put your image url here.
  };
  useEffect(() => {
    if (image && isScreenshot) downloadImage();
  }, [image]);

  return (
    <div className="footer scroll-footer-order">
      <Row>
        <Col span={24}>
          <button
            className="button-order"
            type="primary"
            onClick={() => setVisibleOrder(true)}
            disabled={total_price < 1}
          >
            Đặt
          </button>
          <p style={{ float: "right", marginRight: 10 }}>
            Tổng:{" "}
            {total_price > 0
              ? total_price?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : number0.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
          </p>
          {isDat && (
            <Button
              className="app-enabled "
              type="primary"
              ghost
              onClick={() => handleReset()}
              style={{ float: "right", marginRight: 10 }}
            >
              Đặt tiếp tại đây!
            </Button>
          )}
          <Table
            columns={columns}
            dataSource={dataBillTable}
            rowKey={(record) => record.id}
            locale={{ emptyText: "Chưa có sản phẩm nào được thêm vào" }}
            pagination={false}
            rowClassName="css-table-antd"
            scroll={{ x: true }}
          />
        </Col>
      </Row>

      <ModalOrder
        visible={visibleOrder}
        setVisible={setVisibleOrder}
        dataBill={dataBill}
        refImage={refImage}
        handleDat={handleDat}
        total_price={total_price}
      />

      <div style={{ display: "none" }}></div>
    </div>
  );
};

//Modal Order
const ModalOrder = ({
  dataBill,
  visible,
  setVisible,
  refImage,
  handleDat,
  total_price,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Xác nhận "
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Row>
            <Col span={24}>
              <div ref={refImage} className="table-image-order">
                <h5 style={{ padding: 10 }}>{dataBill.table}</h5>
                <table>
                  <thead>
                    <tr>
                      <th>Tên</th>
                      <th>SL</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBill?.detail?.map((item, index) => {
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
                <p style={{ marginTop: 48, paddingLeft: 10 }}>
                  - Tổng giá:{" "}
                  {total_price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p style={{ paddingLeft: 10 }}>
                  - Thời gian:{" "}
                  {moment(dataBill.createdAt).format("DD/MM/yyyy hh:mm:ss  A")}
                </p>
              </div>
            </Col>
          </Row>
          <Button onClick={() => handleDat()} type="primary">
            Xác nhận đặt
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
