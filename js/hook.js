// Hook vào book.js để detect khi typing hoàn thành
// Đợi book.js load xong
window.addEventListener("load", function () {
  setTimeout(function () {
    // Override startTypingEffect để monitor completion
    if (typeof startTypingEffect === "function") {
      const originalStartTypingEffect = startTypingEffect;
      window.startTypingEffect = function () {
        originalStartTypingEffect();

        // Monitor typing completion mỗi 500ms
        const checkInterval = setInterval(function () {
          if (
            typeof typingState !== "undefined" &&
            typingState.timelines &&
            typingState.timelines.length > 0
          ) {
            const allComplete = typingState.timelines.every(function (
              tl
            ) {
              return tl && tl.progress() === 1;
            });

            if (
              allComplete &&
              typingState.currentLine >= typingState.pElements.length
            ) {
              clearInterval(checkInterval);
              // Đợi 2 giây để user đọc xong
              setTimeout(function () {
                const guideInfo = document.getElementById("guideInfo");
                if (guideInfo && guideInfo.classList.contains("show")) {
                  // Kiểm tra messages từ API - nếu rỗng hoặc không có thì không chạy hiệu ứng mưa chữ
                  let shouldStartSnowEffects = false;
                  try {
                    if (
                      window.apiData &&
                      window.apiData.hasOwnProperty("messages")
                    ) {
                      if (typeof window.apiData.messages === "string") {
                        const messages = window.apiData.messages.trim();
                        if (messages !== "") {
                          shouldStartSnowEffects = true;
                        } else {
                          console.log(
                            "messages rỗng, bỏ qua hiệu ứng mưa chữ"
                          );
                        }
                      } else if (
                        Array.isArray(window.apiData.messages) &&
                        window.apiData.messages.length > 0
                      ) {
                        shouldStartSnowEffects = true;
                      } else {
                        console.log(
                          "messages rỗng hoặc không hợp lệ, bỏ qua hiệu ứng mưa chữ"
                        );
                      }
                    } else {
                      console.log(
                        "Không có trường messages trong apiData, bỏ qua hiệu ứng mưa chữ"
                      );
                    }
                  } catch (e) {
                    console.warn("Không kiểm tra được messages:", e);
                  }

                  if (shouldStartSnowEffects) {
                    // Ẩn book rồi chạy mưa chữ
                    guideInfo.classList.remove("show");
                    setTimeout(function () {
                      guideInfo.classList.add("hidden");
                      if (typeof startSnowEffects === "function") {
                        startSnowEffects();
                        // Đợi một chút để đảm bảo snowEffectsStarted được set
                        setTimeout(function () {
                          // Hiện Three.js renderer và bắt đầu animate
                          if (renderer && renderer.domElement) {
                            renderer.domElement.style.display = "block";
                            renderer.domElement.style.pointerEvents =
                              "auto";
                          }
                          if (typeof startAnimate === "function") {
                            startAnimate();
                          }
                        }, 100);
                      }
                    }, 500);
                  } else {
                    // Không có messages => giữ book mở, không ẩn
                    console.log(
                      "Chỉ có sách, giữ sách hiển thị sau khi đọc xong"
                    );
                  }
                }
              }, 2000);
            }
          }
        }, 500);
      };
    }
  }, 100);
});
