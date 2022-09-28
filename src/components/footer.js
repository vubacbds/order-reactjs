import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { update_bill } from "../action/bill";
import { update_product } from "../action/product";

const Footer = () => {
  const dispatch = useDispatch();
  const dataBill = useSelector((state) => state.bill.data);
  const dataBillTable = dataBill.detail?.filter((item) => item.amount > 0);

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

  return (
    <>
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

        <button className="button-order" disabled={total_price == 0}>
          Đặt
        </button>
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
        />
      </div>
    </>
  );
};

export default Footer;
