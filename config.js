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
  letterContent: `Gửi người yêu bé nhỏ của anh,
Giáng sinh này, anh chẳng mong gì hơn ngoài việc được nhìn thấy em cười mỗi ngày.
Cảm ơn em đã đến và sưởi ấm trái tim anh trong mùa đông giá lạnh này.
Chúc em yêu một mùa Noel thật ấm áp, rạng rỡ và mãi là công chúa của riêng anh.
Yêu em rất nhiều! ❤️`,

  // =========================================================
  // LỜI CHÚC - HIỆU ỨNG MƯA CHỮ 3D
  // Các câu chúc sẽ rơi xuống như tuyết
  // =========================================================
  messages: [
    "Yêu em rất nhiều ❤️",
    "Mãi bên nhau nhé",
    "Giáng sinh ấm áp",
    "Merry Christmas My Love",
  ],

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
