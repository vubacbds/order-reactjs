import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductAPI from "../services/productAPI";
import { update_product } from "../action/product";

const ProductUpdate = ({ productUpdate }) => {
  //Chuyển trang
  const navigate = useNavigate();

  //Dispatch action
  const dispatch = useDispatch();

  //Thông báo
  const ProductUpdateSuccess = () => {
    toast.success("Sửa thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const ProductAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    ProductAPI.update_product(productUpdate._id, values)
      .then(function (response) {
        ProductUpdateSuccess();
        dispatch(update_product(productUpdate._id, values));
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        ProductAddFail(error.response.data.message);
      });
  };

  //Định dạng giá bán
  const { Option } = Select;
  const prefixSelectorPrice = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 30 }} defaultValue={"vnd"}>
        <Option value="vnd">đ</Option>
      </Select>
    </Form.Item>
  );

  //Xử lý lấy dữ liệu cũ điền vào form
  const [form] = Form.useForm();
  useEffect(() => {
    //Khi chọn vào ID product thay đổi thì UseEffect chạy reset lại form
    form.resetFields();
  }, [productUpdate._id]);

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          xs: 6,
          md: 6,
        }}
        wrapperCol={{
          xs: 18,
          md: 18,
        }}
        initialValues={{
          name: productUpdate.name,
          price: productUpdate.price,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tên!",
            },
          ]}
        >
          <Input showCount maxLength={50} />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập giá bán!",
            },
          ]}
        >
          <InputNumber
            addonAfter={prefixSelectorPrice}
            min={0}
            style={{ width: "50%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sửa
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={() => form.resetFields()}>Reset</Button>
    </>
  );
};

export default ProductUpdate;
