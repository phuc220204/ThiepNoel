/**
 * =============================================================
 * CẤU HÌNH THIỆP NOEL 3D
 * =============================================================
 * Chỉnh sửa các giá trị bên dưới để tùy chỉnh nội dung thiệp
 * =============================================================
 */

const CONFIG = {
  // =========================================================
  // NỘI DUNG THƯ TRONG QUYỂN SÁCH
  // Mỗi dòng sẽ được hiển thị với hiệu ứng typing
  // =========================================================
  letterContent: `Merry Christmas
Nay là 25/12 là ngày Lễ Noel
Mong rằng những ánh sáng lung linh của Noel sẽ mang đến cho bạn sự bình an, hạnh phúc và thật nhiều may mắn.
Chúc mọi điều tốt đẹp nhất sẽ đến với bạn trong mùa lễ này và suốt cả năm mới!
Giáng Sinh vui vẻ nhé!`,

  // =========================================================
  // LỜI CHÚC - HIỆU ỨNG MƯA CHỮ 3D
  // Các câu chúc sẽ rơi xuống như tuyết
  // =========================================================
  messages: ["Giáng sinh an lành ", "Giáng sinh vui vẻ ", "Merry Christmas "],

  // =========================================================
  // HÌNH ẢNH - HIỆU ỨNG MƯA ẢNH 3D
  // Thay link ảnh của bạn vào đây
  // Có thể dùng link online hoặc file local trong thư mục images/
  // =========================================================
  images: [
    "images/12619234550307780922.jpg",
    "images/14441325489624558513.jpg",
    "images/26154621826596937695.jpg",
    "images/26274903874060617791.jpg",
    "images/26968158656240653794.jpg",
  ],

  // =========================================================
  // NHẠC NỀN
  // Đặt file nhạc vào thư mục music/ và ghi tên file vào đây
  // Hoặc dùng link online
  // =========================================================
  song: "music/hoanhipgiangsinh.mp3",

  // =========================================================
  // HIỆU ỨNG CHỮ TRÊN NỀN
  // Các từ cách nhau bởi dấu |
  // =========================================================
  textEffectSeq: "Merry|Christmas",
};

// Gán vào window để các file JS khác có thể truy cập
window.CONFIG = CONFIG;
