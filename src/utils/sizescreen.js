import React from "react";

//CostumHook kiểm tra kích thước màn hình để hiển thị cho đúng reponsive
const UseViewport = () => {
  const [height, setHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    const handleWindowResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { height };
};

export { UseViewport };
