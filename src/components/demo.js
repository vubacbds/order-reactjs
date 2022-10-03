//Demo chụp màn hình
import React, { createRef, useState } from "react";
import { useScreenshot } from "use-react-screenshot";
import { saveAs } from "file-saver"; //Lưu vào máy
import { Button } from "antd";

const Demo = () => {
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  //Lưu
  const downloadImage = () => {
    saveAs(image, "anh"); // Put your image url here.
  };

  return (
    <div>
      <div>
        <button style={{ marginBottom: "10px" }} onClick={getImage}>
          Take screenshot
        </button>
      </div>
      <img src={image} alt={"Screenshot"} />
      <div ref={ref}>
        <h1>use-react-screenshot</h1>
        <p>
          <strong>hook by @vre2h which allows to create screenshots</strong>
        </p>
      </div>
      <Button onClick={downloadImage}>Download!</Button>
    </div>
  );
};

export default Demo;

//Demo In
// import { Button } from "antd";
// import React, { useRef } from "react";
// import ReactToPrint from "react-to-print";
// import { useReactToPrint } from "react-to-print";

// const Demo = () => {
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   return (
//     <>
//       {/* <ReactToPrint
//         trigger={() => <button>In hóa đơn!</button>}
//         content={() => componentRef.current}
//       /> */}
//       <div ref={componentRef}>
//         <h1>Đã in ra PDF</h1>
//       </div>
//       <Button onClick={handlePrint}>In ra</Button>
//     </>
//   );
// };

// export default Demo;
