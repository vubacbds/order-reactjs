import { Button } from "antd";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";

const Demo = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {/* <ReactToPrint
        trigger={() => <button>In hóa đơn!</button>}
        content={() => componentRef.current}
      /> */}
      <div ref={componentRef}>
        <h1>Đã in ra PDF</h1>
      </div>
      <Button onClick={handlePrint}>In ra</Button>
    </>
  );
};

export default Demo;
