import { useState } from "react";
const Header = () => {
  const imageGif = [
    "https://rphangx.com/data/avatars/o/236/236476.jpg?1629703720",
    "https://i.pinimg.com/originals/17/69/88/17698871346f15469f16fb4c8a3221b6.gif",

    "https://upanh123.com/wp-content/uploads/2021/05/hinh-anh-dong-hoat-hinh1.gif",
    "https://cdn.lazi.vn/storage/uploads/users/cover/1594433325_468e0db97938a47f71ce06550f6b37cc.gif",
    "https://i.pinimg.com/originals/a0/ac/9d/a0ac9d84b88212ffbb019e1add0b09ef.gif",
    "https://i.pinimg.com/originals/1a/80/8b/1a808bed5f87024c78d3685445462438.gif",
    "https://i.pinimg.com/originals/d5/98/c9/d598c9e70ca6d800f55d6059dd642262.gif",
    "https://i.pinimg.com/originals/e5/d5/d8/e5d5d89e83d9ce3e94fa9327f2c9d993.gif",
    "https://i.pinimg.com/originals/28/83/ea/2883eadd770d8876b3145a65ba31dd28.gif",
    "https://i.pinimg.com/originals/13/10/8a/13108af1ad32faabae3553734152d2e1.gif",
    "https://i.pinimg.com/originals/d4/f3/8d/d4f38d71c7e8257f884f2bfa9dfff338.gif",
    "https://i.pinimg.com/originals/88/29/fc/8829fc18825b5be22b395a42310d52c3.gif",
  ];
  const [imgRan, setImgRan] = useState(0);
  return (
    <>
      <div
        style={{ height: 40, background: "#7D0786", padding: 0 }}
        className="navbar-fixed-top sticky-top"
      >
        <span style={{ color: "#EFD555" }}>
          *Hướng dẫn: chọn tăng số lượng rồi đặt nhé
        </span>
        <span>
          <img
            src={imageGif[imgRan]}
            style={{ width: 50, height: 50 }}
            onClick={() => {
              const ran = Math.floor(Math.random() * 12);
              setImgRan(ran);
            }}
            className="app-enabled "
          />
        </span>
      </div>
    </>
  );
};

export default Header;
