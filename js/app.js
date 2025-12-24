/**
 * =============================================================
 * THIỆP NOEL 3D - Main Application
 * =============================================================
 */

// Khai báo isMobile global
if (typeof window.isMobile === "undefined") {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
  const isMobileDevice =
    /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  window.isMobile = isMobileDevice || isTablet || window.innerWidth <= 1024;
}

// Global variables - sử dụng CONFIG thay vì API
// Dùng window.apiData để tương thích với các file JS khác (book.js, text-effect.js)
window.apiData = window.CONFIG || null;

// Function để khởi tạo - không cần fetch API nữa
async function initializeData() {
  // Sử dụng CONFIG trực tiếp
  if (window.CONFIG) {
    window.apiData = window.CONFIG;
    console.log("Đã tải dữ liệu từ config.js:", window.CONFIG);
    // Hiển thị button ngay
    const startButtonContainer = document.getElementById(
      "startButtonContainer"
    );
    if (startButtonContainer) {
      startButtonContainer.style.display = "block";
    }
    return true;
  } else {
    console.warn("Không tìm thấy CONFIG, vui lòng kiểm tra file config.js");
    return false;
  }
}

// Function để cập nhật URL ngay lập tức
function updateURLImmediately() {
  const currentUrl = window.location.href;
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute("content", currentUrl);
    console.log("Đã cập nhật og:url thành:", currentUrl);
  }
}

// Function để cập nhật meta tags cho chia sẻ mạng xã hội
function updateSocialMetaTags() {
  // Cập nhật URL ngay lập tức (không cần đợi API)
  updateURLImmediately();

  if (apiData) {
    // Cập nhật title và description dựa trên dữ liệu API
    let customTitle = "Merry Christmas - Chúc mừng Giáng Sinh";
    let customDescription =
      "Bạn thật may mắn khi nhận được món quà này. Chúc bạn và gia đình luôn luôn hạnh phúc 🎄✨";

    // Nếu có tên người gửi, thêm vào title
    if (apiData.senderName) {
      customTitle = `Merry Christmas - Từ ${apiData.senderName}`;
      customDescription = `${apiData.senderName} gửi lời chúc: Bạn thật may mắn khi nhận được món quà này. Chúc bạn và gia đình luôn luôn hạnh phúc 🎄✨`;
    }

    // Cập nhật title của trang
    document.title = customTitle;

    // Cập nhật meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", customDescription);
    }

    // Cập nhật Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", customTitle);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", customDescription);
    }

    // Cập nhật Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", customTitle);
    }

    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute("content", customDescription);
    }

    // Sử dụng ảnh tĩnh og-image.png với URL đầy đủ
    const ogImagePath = "https://trung-thu-two.vercel.app/image/og-image.png";
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute("content", ogImagePath);
    }

    const twitterImageMeta = document.querySelector(
      'meta[name="twitter:image"]'
    );
    if (twitterImageMeta) {
      twitterImageMeta.setAttribute("content", ogImagePath);
    }

    console.log(
      "Đã cập nhật meta tags cho chia sẻ mạng xã hội với ảnh og-image.png"
    );
  }
}

// Các hàm loading/error không cần thiết nữa vì không còn fetch API

// Function để hiển thị thông báo lỗi
function showErrorMessage(message) {
  // Tạo thông báo tạm thời
  const errorDiv = document.createElement("div");
  errorDiv.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(255, 0, 0, 0.8);
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          z-index: 10000;
          font-size: 14px;
          max-width: 300px;
      `;
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);

  // Tự động ẩn sau 5 giây
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 5000);
}

// Tạo bông tuyết emoji bằng CSS (ít lag hơn)
function createEmojiSnowflakes() {
  const container = document.getElementById("snowflakesContainer");
  const count = 20; // Số lượng bông tuyết emoji

  for (let i = 0; i < count; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake-emoji";
    snowflake.textContent = "❄️";

    // Vị trí ngẫu nhiên theo chiều ngang, bắt đầu từ trên cùng
    snowflake.style.left = Math.random() * 100 + "%";
    snowflake.style.top = "0"; // Bắt đầu từ trên màn hình

    // Thời gian animation ngẫu nhiên (từ 8s đến 15s)
    const duration = Math.random() * 7 + 8;
    snowflake.style.animationDuration = duration + "s";

    // Delay ngẫu nhiên để không rơi cùng lúc
    snowflake.style.animationDelay = Math.random() * 5 + "s";

    // Sway (độ lệch ngang) ngẫu nhiên
    const sway = (Math.random() - 0.5) * 200;
    snowflake.style.setProperty("--sway", sway + "px");

    // Kích thước ngẫu nhiên
    const size = Math.random() * 0.8 + 0.7;
    snowflake.style.fontSize = size + "em";

    // Opacity ngẫu nhiên
    snowflake.style.opacity = Math.random() * 0.4 + 0.6;

    container.appendChild(snowflake);
  }
}

// Tạo bông tuyết tròn bằng canvas
function createCanvasSnowflakes() {
  const canvas = document.getElementById("snowCanvas");
  const ctx = canvas.getContext("2d");

  // Thiết lập kích thước canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Mảng lưu các bông tuyết
  const snowflakes = [];
  const simpleSnowflakeCount = 80; // Bông tuyết đơn giản (chấm tròn)

  // Bông tuyết đơn giản (chấm tròn nhỏ)
  class SimpleSnowflake {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.5;
      this.wind = Math.random() * 0.5 - 0.25;
    }

    update() {
      this.y += this.speed;
      this.x += this.wind + Math.sin(this.y * 0.01) * 0.5;

      if (this.y > canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
      }

      if (this.x > canvas.width) {
        this.x = 0;
      } else if (this.x < 0) {
        this.x = canvas.width;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
    }
  }

  // Khởi tạo các bông tuyết đơn giản
  for (let i = 0; i < simpleSnowflakeCount; i++) {
    snowflakes.push(new SimpleSnowflake());
  }

  // Hàm vẽ animation
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
      snowflake.update();
      snowflake.draw();
    });

    requestAnimationFrame(animate);
  }

  // Bắt đầu animation
  animate();
}

// Flag để kiểm tra khi nào bắt đầu hiệu ứng tuyết/chữ
let snowEffectsStarted = false;

// Function để bắt đầu hiệu ứng tuyết và chữ
function startSnowEffects() {
  if (snowEffectsStarted) return;
  snowEffectsStarted = true;

  // Hiện canvas và container tuyết
  const snowCanvas = document.getElementById("snowCanvas");
  const snowflakesContainer = document.getElementById("snowflakesContainer");
  if (snowCanvas) snowCanvas.style.display = "block";
  if (snowflakesContainer) snowflakesContainer.style.display = "block";

  // Bắt đầu tạo tuyết
  createEmojiSnowflakes();
  createCanvasSnowflakes();

  // Hiện Three.js renderer nếu đã được tạo
  const threeRenderer =
    document.querySelector("canvas[data-engine]") ||
    document.body.querySelector("canvas:not(#snowCanvas)");
  if (threeRenderer) {
    threeRenderer.style.display = "block";
    threeRenderer.style.pointerEvents = "auto";
  }
}

// Add click event để cập nhật URL khi DOM ready
document.addEventListener("DOMContentLoaded", function () {
  // Cập nhật URL ngay khi DOM ready để Messenger có thể đọc
  updateURLImmediately();
});
// Sử dụng biến global isMobile đã được khai báo ở trên
const isMobile = window.isMobile;

// scene + camera + renderer - Ẩn ban đầu
const scene = new THREE.Scene();
scene.background = null; // Để hiển thị gradient nền của body
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.display = "none"; // Ẩn ban đầu
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "5"; // Dưới decor (z-index: 6) nhưng vẫn có thể tương tác vì decor có pointer-events: none
renderer.domElement.style.pointerEvents = "auto";
document.body.appendChild(renderer.domElement);

// orbit controls (xoay quanh controls.target)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
// Cho phép xoay trên mobile, nhưng điều chỉnh để tránh xung đột
controls.enableRotate = true;
controls.enablePan = true;
// Trên mobile, chỉ cho phép xoay bằng 1 ngón tay, pan bằng 2 ngón
if (isMobile) {
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
  };
}

// lights
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(10, 20, 10);
scene.add(dir);

// group chứa text (dễ set target)
const textGroup = new THREE.Group();
scene.add(textGroup);

// Function để lấy danh sách câu chúc từ CONFIG
function getTexts() {
  // apiData đã được gán từ CONFIG
  if (apiData && apiData.messages) {
    // Nếu là string, split theo dòng
    if (typeof apiData.messages === "string") {
      const trimmed = apiData.messages.trim();
      if (trimmed === "") {
        return [];
      }
      return trimmed
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    }
    // Nếu là array, trả về trực tiếp
    if (Array.isArray(apiData.messages)) {
      return apiData.messages;
    }
  }
  // Fallback: dữ liệu mặc định
  return ["Giáng sinh an lành", "Merry Christmas", "Giáng sinh vui vẻ"];
}

let objects = []; // chứa mesh + speed
let imageObjects = []; // chứa ảnh bay lên hoặc trái tim sau khi biến đổi
const textureCache = {}; // cache texture ảnh để không load lại nhiều lần

// Function để lấy danh sách ảnh từ CONFIG
function getImagePaths() {
  // Lấy ảnh từ config, không cần ảnh default nữa
  const configImages =
    apiData && Array.isArray(apiData.images) ? apiData.images : [];
  return configImages;
}

function updateImageGeometry(texture, mesh) {
  if (!texture || !texture.image) return;
  const aspectRatio = texture.image.width / texture.image.height;
  const isMobileDevice = window.isMobile || window.innerWidth <= 768;
  const baseSize = isMobileDevice ? 15 : 22; // Tăng kích thước ảnh to hơn để nhìn "đã" hơn
  let width, height;

  if (aspectRatio > 1) {
    width = baseSize;
    height = baseSize / aspectRatio;
  } else {
    width = baseSize * aspectRatio;
    height = baseSize;
  }

  const geometry = new THREE.PlaneGeometry(width, height);
  mesh.geometry.dispose();
  mesh.geometry = geometry;
}

// hàm tạo mesh ảnh 3D - bypass CORS cho file:// protocol
function makeImageMesh(imagePath) {
  const isMobileDevice = window.isMobile || window.innerWidth <= 768;
  const cached = textureCache[imagePath];

  const geometry = new THREE.PlaneGeometry(
    isMobileDevice ? 15 : 20,
    isMobileDevice ? 15 : 20
  );
  const material = new THREE.MeshBasicMaterial({
    map: cached || null,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);

  if (cached && cached.image) {
    updateImageGeometry(cached, mesh);
  } else {
    // Sử dụng Image element để bypass CORS
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      const texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      textureCache[imagePath] = texture;
      material.map = texture;
      material.needsUpdate = true;
      updateImageGeometry(texture, mesh);
    };
    img.onerror = function () {
      console.warn("Không thể load ảnh:", imagePath);
    };
    img.src = imagePath;
  }

  // thêm thuộc tính để điều khiển quỹ đạo bay
  mesh.userData = {
    originalY: mesh.position.y,
    originalX: mesh.position.x,
    originalZ: mesh.position.z,
    pattern: Math.floor(Math.random() * 3),
  };

  return mesh;
}

// Đợi Google Fonts load xong trước khi tạo text
document.fonts.ready.then(function () {
  console.log("Fonts loaded successfully");
});

// Function để test Messenger preview
function testMessengerPreview() {
  console.log("=== MESSENGER PREVIEW TEST ===");
  console.log(
    "Title:",
    document.querySelector('meta[property="og:title"]')?.getAttribute("content")
  );
  console.log(
    "Description:",
    document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content")
  );
  console.log(
    "Image:",
    document.querySelector('meta[property="og:image"]')?.getAttribute("content")
  );
  console.log(
    "URL:",
    document.querySelector('meta[property="og:url"]')?.getAttribute("content")
  );
  console.log("==============================");
}

// Khởi tạo dữ liệu khi trang load
window.addEventListener("load", async function () {
  // Cập nhật URL ngay lập tức để Messenger có thể đọc đúng
  updateSocialMetaTags();

  // Test Messenger preview
  testMessengerPreview();

  const success = await initializeData();
  // Chỉ tạo text và ảnh khi có dữ liệu thành công (nhưng chưa hiển thị)
  if (success) {
    createTextAndImages();
  }
});

// Function để phát nhạc từ dữ liệu API
function playMusic() {
  // Kiểm tra cả music và song (backend có thể dùng một trong hai)
  const musicUrl =
    (window.apiData && window.apiData.music) ||
    (window.apiData && window.apiData.song);

  if (!musicUrl) {
    console.log("Không có nhạc trong dữ liệu API");
    return;
  }
  console.log("🎵 Phát nhạc:", musicUrl);

  // Tạo audio element nếu chưa có
  let audio = document.getElementById("backgroundMusic");
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "backgroundMusic";
    audio.loop = true; // Lặp lại nhạc
    audio.volume = 0.7; // Âm lượng 70%
    document.body.appendChild(audio);
  }

  // Xử lý URL: dùng trực tiếp vì config đã có đường dẫn đầy đủ
  let finalUrl = musicUrl;

  audio.src = finalUrl;

  // Phát nhạc
  audio
    .play()
    .then(() => {
      console.log("✅ Đã bắt đầu phát nhạc:", finalUrl);
    })
    .catch((error) => {
      console.error("❌ Lỗi khi phát nhạc:", error);
      // Thử lại với URL gốc nếu lỗi
      if (finalUrl !== musicUrl) {
        audio.src = musicUrl;
        audio.play().catch((err) => {
          console.error("❌ Lỗi khi phát nhạc với URL gốc:", err);
        });
      }
    });
}

// Event listener cho button start
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  if (startButton) {
    startButton.addEventListener("click", function () {
      // Bắt đầu phát nhạc ngay
      playMusic();

      // Trên mobile: delay để hiệu ứng button chạy xong rồi mới ẩn và bắt đầu cây thông
      // Desktop: chạy ngay
      if (window.isMobile) {
        // Đợi hiệu ứng button chạy xong (khoảng 800-1000ms)
        setTimeout(function () {
          // Ẩn button sau khi hiệu ứng chạy xong
          const startButtonContainer = document.getElementById(
            "startButtonContainer"
          );
          if (startButtonContainer) {
            startButtonContainer.style.display = "none";
          }
          // Hiện SVG cây thông
          const mainSVG = document.querySelector(".mainSVG");
          if (mainSVG) {
            mainSVG.style.display = "block";
          }
          // Bắt đầu animation cây thông
          if (typeof window.startTreeAnimation === "function") {
            window.startTreeAnimation();
          }
        }, 1000); // Delay 1 giây để hiệu ứng button chạy xong
      } else {
        // Desktop: chạy ngay
        // Ẩn button
        const startButtonContainer = document.getElementById(
          "startButtonContainer"
        );
        if (startButtonContainer) {
          startButtonContainer.style.display = "none";
        }
        // Hiện SVG cây thông
        const mainSVG = document.querySelector(".mainSVG");
        if (mainSVG) {
          mainSVG.style.display = "block";
        }
        // Bắt đầu animation cây thông
        if (typeof window.startTreeAnimation === "function") {
          window.startTreeAnimation();
        }
      }
    });
  }
});

// Function để tạo text và ảnh sau khi có dữ liệu
function createTextAndImages() {
  // load font rồi tạo text 3D
  const fontLoader = new THREE.FontLoader();
  fontLoader.load(
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      // hàm tạo mesh text 3D
      function makeTextMesh(message) {
        const isMobile = window.innerWidth <= 768;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Tự động tính kích thước canvas dựa trên độ dài chữ
        // Mobile: chữ nhỏ hơn; Desktop: chữ to như hiện tại
        const baseFontSize = isMobile ? 64 : 96;
        const baseTextHeight = isMobile ? 90 : 120;
        const paddingW = isMobile ? 40 : 60;
        const paddingH = isMobile ? 24 : 40;

        context.font = `700 ${baseFontSize}px 'Dancing Script', cursive, 'Arial', sans-serif`;
        const textMetrics = context.measureText(message);
        const textWidth = textMetrics.width;
        const textHeight = baseTextHeight; // chiều cao cố định

        // Đặt kích thước canvas với padding
        canvas.width = Math.max(textWidth + paddingW, isMobile ? 220 : 260);
        canvas.height = textHeight + paddingH;

        context.font = `700 ${baseFontSize}px 'Dancing Script', cursive, 'Arial', sans-serif`;
        context.fillStyle = "#ffffff";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(message, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        // Tối ưu texture settings để giảm lag
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false; // Tắt mipmaps để tiết kiệm bộ nhớ

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide, // để nhìn được cả mặt trước & sau
          depthWrite: false, // Tối ưu rendering cho transparent objects
        });

        // Tự động tính kích thước geometry dựa trên canvas
        // Mobile: scale nhỏ hơn một chút để đỡ choáng màn hình
        const widthScale = isMobile ? 12 : 18;
        const heightScale = isMobile ? 6 : 9;
        const geometryWidth = (canvas.width / 512) * widthScale;
        const geometryHeight = (canvas.height / 256) * heightScale;
        const geometry = new THREE.PlaneGeometry(geometryWidth, geometryHeight);
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
      }

      // tạo nhiều text 3D - bắt đầu từ trên màn hình và rơi xuống
      const texts = getTexts(); // Lấy dữ liệu động
      // Chỉ tạo text objects nếu có messages (texts không rỗng)
      if (texts && texts.length > 0) {
        // Tăng số lượng text cho mobile để mưa chữ dày hơn
        const textCount = window.isMobile ? 75 : 50;
        for (let i = 0; i < textCount; i++) {
          let text = texts[Math.floor(Math.random() * texts.length)];
          let mesh = makeTextMesh(text);
          // Bắt đầu từ trên màn hình và phân bố đều để rơi từ từ
          // Giảm khoảng cách trên mobile để mưa chữ dày hơn
          const spacing = window.isMobile ? 1.2 : 1.5;
          mesh.position.set(
            (Math.random() - 0.5) * (window.isMobile ? 35 : 80),
            30 + i * spacing, // Giảm khoảng cách trên mobile
            (Math.random() - 0.5) * (window.isMobile ? 35 : 80)
          );
          scene.add(mesh);
          objects.push(mesh);
        }
        console.log("Đã tạo " + objects.length + " text objects");
      } else {
        console.log("Không có messages, bỏ qua tạo text objects");
      }

      // tạo ảnh rơi xuống - bắt đầu từ trên màn hình và rơi xuống
      const imagePaths = getImagePaths(); // Lấy dữ liệu động
      if (imagePaths.length > 0) {
        // Giảm số lượng ảnh để tối ưu performance
        const imageCount = window.isMobile ? 6 : 8;

        // Shuffle một lần để phân bổ đều, tránh lặp lại quá nhiều một ảnh
        // và đảm bảo nếu có N ảnh thì tối thiểu cũng sẽ thấy đủ cả N ảnh.
        const shuffledImagePaths = imagePaths
          .slice()
          .sort(() => Math.random() - 0.5);

        for (let i = 0; i < imageCount; i++) {
          const imagePath = shuffledImagePaths[i % shuffledImagePaths.length];
          let imageMesh = makeImageMesh(imagePath);

          // Bắt đầu từ trên màn hình và phân bố đều để rơi từ từ, thu hẹp phạm vi trên mobile
          const range = window.isMobile ? 35 : 80;
          imageMesh.position.set(
            (Math.random() - 0.5) * range,
            40 + i * 5, // Tăng khoảng cách để giảm overlap
            (Math.random() - 0.5) * range
          );

          scene.add(imageMesh);
          imageObjects.push(imageMesh);
        }
        console.log("Đã tạo " + imageObjects.length + " image objects");
      } else {
        console.log("Không có ảnh từ API, bỏ qua tạo ảnh rơi xuống");
      }

      // đặt camera và controls target để xoay quanh group (khoảng giữa)
      camera.position.set(0, 12, 60);
      controls.target.set(0, 10, 0);
      controls.update();
      console.log("createTextAndImages hoàn thành");
    }
  );
}

// Chỉ animate khi đã bắt đầu hiệu ứng
let animationRunning = false;
function startAnimate() {
  console.log(
    "startAnimate được gọi, snowEffectsStarted:",
    snowEffectsStarted,
    "objects:",
    objects.length,
    "imageObjects:",
    imageObjects.length
  );
  if (!snowEffectsStarted || animationRunning) {
    console.log(
      "Không thể start animate:",
      "snowEffectsStarted:",
      snowEffectsStarted,
      "animationRunning:",
      animationRunning
    );
    return;
  }
  animationRunning = true;

  // Đảm bảo objects đã được tạo
  if (objects.length === 0 && imageObjects.length === 0) {
    console.log("Objects chưa được tạo, đang đợi...");
    setTimeout(function () {
      if (objects.length > 0 || imageObjects.length > 0) {
        startAnimate();
      } else {
        console.log("Vẫn chưa có objects sau khi đợi");
      }
    }, 500);
    animationRunning = false;
    return;
  }

  // Hiện renderer
  if (renderer && renderer.domElement) {
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "auto";
    console.log("Renderer đã được hiển thị");
  } else {
    console.log("Renderer không tồn tại!");
  }

  // Tối ưu: Sử dụng frustum culling và batch update
  const frustum = new THREE.Frustum();
  const cameraMatrix = new THREE.Matrix4();

  function animate() {
    if (!snowEffectsStarted) return;
    requestAnimationFrame(animate);

    // Cập nhật frustum để culling
    cameraMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(cameraMatrix);

    // Animation cho text - tối ưu với batch update
    if (objects.length > 0) {
      const speed = 0.12;
      const resetY = 30;
      const resetRange = 30;
      const minY = -50;

      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        // Chỉ update nếu object trong view hoặc gần view
        if (frustum.containsPoint(obj.position) || obj.position.y > -20) {
          obj.position.y -= speed;
          if (obj.position.y < minY) {
            // Reset lên trên màn hình để tiếp tục rơi
            obj.position.y = resetY + Math.random() * resetRange;
            obj.position.x = (Math.random() - 0.5) * 80;
            obj.position.z = (Math.random() - 0.5) * 80;
          }
        } else {
          // Object ngoài view, reset ngay để tiết kiệm
          obj.position.y = resetY + Math.random() * resetRange;
          obj.position.x = (Math.random() - 0.5) * 80;
          obj.position.z = (Math.random() - 0.5) * 80;
        }
      }
    }

    // Animation cho ảnh với các quỹ đạo rơi khác nhau - tối ưu
    if (imageObjects.length > 0) {
      const speed = 0.1;
      const resetY = 40;
      const resetRange = 30;
      const minY = -70;
      const range = window.isMobile ? 15 : 80;

      for (let i = 0; i < imageObjects.length; i++) {
        const imgObj = imageObjects[i];
        const pattern = imgObj.userData.pattern;

        // Chỉ update nếu object trong view hoặc gần view
        if (frustum.containsPoint(imgObj.position) || imgObj.position.y > -20) {
          // Rơi xuống
          imgObj.position.y -= speed;

          // Quỹ đạo rơi khác nhau - chỉ thay đổi hướng rơi
          if (pattern === 1) {
            // Rơi chéo sang trái
            imgObj.position.x -= 0.03;
          } else if (pattern === 2) {
            // Rơi chéo sang phải
            imgObj.position.x += 0.03;
          }

          // Reset khi rơi quá thấp
          if (imgObj.position.y < minY) {
            imgObj.position.y = resetY + Math.random() * resetRange;
            imgObj.position.x = (Math.random() - 0.5) * range;
            imgObj.position.z = (Math.random() - 0.5) * range;
            // Random lại pattern
            imgObj.userData.pattern = Math.floor(Math.random() * 3);
          }
        } else {
          // Object ngoài view, reset ngay
          imgObj.position.y = resetY + Math.random() * resetRange;
          imgObj.position.x = (Math.random() - 0.5) * range;
          imgObj.position.z = (Math.random() - 0.5) * range;
          imgObj.userData.pattern = Math.floor(Math.random() * 3);
        }
      }
    }

    // Chỉ update controls mỗi frame (cần thiết cho damping)
    controls.update();

    // Render scene
    renderer.render(scene, camera);
  }

  animate();
}

// Bắt đầu animate khi hiệu ứng được kích hoạt
window.startAnimate = startAnimate;

// handle resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
