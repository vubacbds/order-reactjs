import { useSelector } from "react-redux";
import { Button, Table } from "antd";

const Footer = () => {
  const dataBill = useSelector((state) => state.bill.data);
  const dataBillTable = dataBill.detail?.filter((item) => item.amount > 0);
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return (
    <>
      <div
        style={{
          height: 120,
          background: "#F7FEFF",
          textAlign: "left",
        }}
        className="navbar-fixed-bottom sticky-bottom"
      >
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
        <Table
          columns={columns}
          dataSource={dataBillTable}
          rowKey={(record) => record.id}
        />
      </div>
    </>
  );
};

export default Footer;
