import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductAPI from "../services/productAPI";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { add_product } from "../action/product";

const ProductAdd = (props) => {
  //Set state sản phẩm mới
  const [newProduct, setNewProduct] = useState({});

  //Chuyển trang
  const navigate = useNavigate();

  //Dispatch action
  const dispatch = useDispatch();

  //Thông báo
  const ProductAddSuccess = () => {
    toast.success("Thêm sản phẩm thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const ProductAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Reset Form
  const [form] = Form.useForm();

  //Loading khi submit
  const [submitting, setSubmitting] = useState(false);

  //Xử lý upload ảnh
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [url, setUrl] = useState([1]);

  //Sửa lỗi Xem trước phóng to
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => setPreviewVisible(false);

  const handleChange = (e) => {
    //Xử lý file quá 6 ảnh
    if (e.fileList.length > 6) {
      alert("Chỉ được đăng 6 ảnh!");
      e.preventDefault();
    }

    //Xử lý lỗi trùng ảnh
    const nameImage = e.fileList[e.fileList.length - 1]?.name;
    const fileListLength = e.fileList.filter((item) => {
      return item.name == nameImage;
    }).length;

    if (fileListLength == 1 || fileListLength == 0) setFileList(e.fileList);
    else {
      alert("Lỗi trùng ảnh");
      e.preventDefault();
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(() => file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      () => file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleUpload = () => {
    fileList.forEach((e) => {
      const uploadTask = storage
        .ref(`images/${e.originFileObj.name}`)
        .put(e.originFileObj);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(e.originFileObj.name)
            .getDownloadURL()
            .then((url) => {
              // posdocument({...newDocument, "nameUrl": urlimg})
              // setUrl(pre => [...pre, urlimg])
              setUrl((old) => {
                if (old[0] == 1) {
                  old.shift();
                  return [...old, url];
                }
                return [...old, url];
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      );
    });
  };
  //Đóng xử lý upload ảnh

  //Khi submit Form
  const onFinish = (values) => {
    setSubmitting(true);
    setNewProduct(values);
    handleUpload(); //upload ảnh lên firebase trước
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

  //Khi số lượng url bằng số lượng ảnh upload lên thì sẽ chạy API - AddProduct

  useEffect(() => {
    if (url.length === fileList.length) {
      newProduct.images = url;
      // newProduct.image = url[0];
      ProductAPI.add_product(newProduct)
        .then(function (response) {
          ProductAddSuccess();
          dispatch(add_product(response));
          setFileList([]);
          setUrl([1]);
          setProgress(0);
          form.resetFields();
          setSubmitting(false);
        })
        .catch(function (error) {
          console.log("Error on Authentication", error);
          ProductAddFail(error.response.data.message);
        });
    }
  }, [url]);

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
        initialValues={{}}
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
          label="Chọn ảnh"
          name="images"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn ảnh!",
            },
          ]}
        >
          <div>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              accept=".jpg, .png, .jpeg"
              multiple={true}
              beforeUpload={() => {
                return false;
              }}
            >
              {fileList.length >= 6 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>

            <br />
            <progress value={progress} max="100" style={{ width: 104 }} />
            <br />
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={submitting}>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductAdd;
