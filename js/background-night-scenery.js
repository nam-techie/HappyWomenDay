window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var starDensity = 0.216;
var speedCoeff = 0.05;
var width;
var height;
var starCount;
var circleRadius;
var circleCenter;
var first = true;
var giantColor = "180,184,240";
var starColor = "226,225,142";
var cometColor = "226,225,224";
var canva = document.getElementById("universe");
var stars = [];

// Mảng các văn bản sẽ hiển thị
var texts = [
  "Hiluuuu!",
  "Hôm nay là ngày của cậu",
  "Chúc 8/3 vui vẻ nha",
  "Hạnh phúc nhé ",
  "Luôn được yêu thương",
  "Ngưng khóc nhee",
  "Hãy cười nhiều lên",
  "Tỏa sáng rực rỡ!",
  "Gặp nhiều may mắn",
  "Luôn xinh đẹp nhé!",
  "Hết rồi!",
  "Không còn gì nữa",
  "Waittttt!",
  "Đùa đấyyyyy",
  "Còn một bất ngờ nữa...",
];
var currentTextIndex = 0;
var textDisplay;

windowResizeHandler();
window.addEventListener("resize", windowResizeHandler, false);

createUniverse();

function createUniverse() {
  universe = canva.getContext("2d");

  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
    stars[i].reset();
  }

  draw();
  
  // Khởi tạo hiển thị văn bản
  initTextDisplay();
}

// Hàm khởi tạo hiển thị văn bản
function initTextDisplay() {
  textDisplay = document.getElementById("text-display");
  
  // Thiết lập văn bản đầu tiên
  updateTextDisplay(texts[currentTextIndex]);
  
  // Thêm sự kiện click để chuyển đổi văn bản
  document.addEventListener("click", handleTextChange);
  
  // Thêm animation nhấp nháy cho văn bản
  textDisplay.style.animation = "glow 3s infinite";
}

// Xử lý sự kiện khi người dùng nhấp vào để thay đổi văn bản
function handleTextChange() {
  // Phát âm thanh khi người dùng nhấp vào
  var mp3 = document.getElementById("myAudio");
  if (mp3) {
    mp3.muted = false;
    mp3.play().catch(error => console.log("Play error:", error));
  }
  
  // Chuyển đến văn bản tiếp theo
  currentTextIndex++;
  
  if (currentTextIndex >= texts.length) {
    currentTextIndex = texts.length - 1; // Dừng lại ở dòng cuối cùng
    
    // Hiển thị dòng "Còn một bất ngờ nữa..."
    updateTextDisplay("Còn một bất ngờ nữa...");
    
    setTimeout(function() {
      // Đếm ngược từ 3, 2, 1
      let countdown = ["3", "2", "1"];
      let countIndex = 0;
      
      let countdownInterval = setInterval(function() {
        if (countIndex < countdown.length) {
          updateTextDisplay(countdown[countIndex]); // Hiển thị số đếm ngược
          countIndex++;
        } else {
          clearInterval(countdownInterval); // Dừng đếm ngược
          // Lưu trạng thái đã tương tác vào sessionStorage
          sessionStorage.setItem('userInteracted', 'true');
          window.location.href = "imposter.html"; // Chuyển trang ngay khi số 1 xuất hiện
        }
      }, 1000); // Hiển thị mỗi số trong 1 giây
    }, 1000); // Chờ 1 giây sau khi dòng "Còn một bất ngờ nữa..." xuất hiện
    
    return;
  }
  
  // Cập nhật văn bản hiển thị
  updateTextDisplay(texts[currentTextIndex]);
}

// Hàm cập nhật văn bản hiển thị với hiệu ứng
function updateTextDisplay(text) {
  // Đặt lại opacity để tạo hiệu ứng fade in
  textDisplay.style.opacity = 0;
  
  // Cập nhật kích thước chữ dựa trên độ dài văn bản và kích thước màn hình
  var fontSize = calculateFontSize(text);
  textDisplay.style.fontSize = fontSize + "px";
  
  // Cập nhật nội dung văn bản
  setTimeout(function() {
    textDisplay.textContent = text;
    // Hiển thị văn bản với hiệu ứng fade in
    textDisplay.style.opacity = 1;
  }, 300);
}

// Hàm tính toán kích thước chữ dựa trên độ dài văn bản và kích thước màn hình
function calculateFontSize(text) {
  var screenWidth = window.innerWidth;
  var textLength = text.length;
  
  if (screenWidth <= 480) {
    // Điện thoại
    return Math.min(30, 400 / (textLength * 0.8));
  } else if (screenWidth <= 768) {
    // Tablet nhỏ
    return Math.min(40, 600 / (textLength * 0.8));
  } else if (screenWidth <= 1024) {
    // Tablet lớn
    return Math.min(50, 800 / (textLength * 0.7));
  } else {
    // Laptop và màn hình lớn
    return Math.min(60, screenWidth / (textLength * 0.7));
  }
}

function draw() {
  universe.clearRect(0, 0, width, height);

  var starsLength = stars.length;

  for (var i = 0; i < starsLength; i++) {
    var star = stars[i];
    star.move();
    star.fadeIn();
    star.fadeOut();
    star.draw();
  }

  window.requestAnimationFrame(draw);
}

function Star() {
  this.reset = function () {
    this.giant = getProbability(3);
    this.comet = this.giant || first ? false : getProbability(10);
    this.x = getRandInterval(0, width - 10);
    this.y = getRandInterval(0, height);
    this.r = getRandInterval(1.1, 2.6);
    this.dx =
      getRandInterval(speedCoeff, 6 * speedCoeff) +
      (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) +
      speedCoeff * 2;
    this.dy =
      -getRandInterval(speedCoeff, 6 * speedCoeff) -
      (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120);
    this.fadingOut = null;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = getRandInterval(0.2, 1 - (this.comet + 1 - 1) * 0.4);
    this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * 0.001;
  };

  this.fadeIn = function () {
    if (this.fadingIn) {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      this.opacity += this.do;
    }
  };

  this.fadeOut = function () {
    if (this.fadingOut) {
      this.fadingOut = this.opacity < 0 ? false : true;
      this.opacity -= this.do / 2;
      if (this.x > width || this.y < 0) {
        this.fadingOut = false;
        this.reset();
      }
    }
  };

  this.draw = function () {
    universe.beginPath();

    if (this.giant) {
      universe.fillStyle = "rgba(" + giantColor + "," + this.opacity + ")";
      universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
      universe.fillStyle = "rgba(" + cometColor + "," + this.opacity + ")";
      universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

      //comet tail
      for (var i = 0; i < 30; i++) {
        universe.fillStyle =
          "rgba(" +
          cometColor +
          "," +
          (this.opacity - (this.opacity / 20) * i) +
          ")";
        universe.rect(
          this.x - (this.dx / 4) * i,
          this.y - (this.dy / 4) * i - 2,
          2,
          2
        );
        universe.fill();
      }
    } else {
      universe.fillStyle = "rgba(" + starColor + "," + this.opacity + ")";
      universe.rect(this.x, this.y, this.r, this.r);
    }

    universe.closePath();
    universe.fill();
  };

  this.move = function () {
    this.x += this.dx;
    this.y += this.dy;
    if (this.fadingOut === false) {
      this.reset();
    }
    if (this.x > width - width / 4 || this.y < 0) {
      this.fadingOut = true;
    }
  };

  (function () {
    setTimeout(function () {
      first = false;
    }, 50);
  })();
}

function getProbability(percents) {
  return Math.floor(Math.random() * 1000) + 1 < percents * 10;
}

function getRandInterval(min, max) {
  return Math.random() * (max - min) + min;
}

function windowResizeHandler() {
  width = window.innerWidth;
  height = window.innerHeight;
  starCount = width * starDensity;
  circleRadius = width > height ? height / 2 : width / 2;
  circleCenter = {
    x: width / 2,
    y: height / 2,
  };

  canva.setAttribute("width", width);
  canva.setAttribute("height", height);
  
  // Cập nhật kích thước chữ nếu textDisplay đã được khởi tạo
  if (textDisplay) {
    var currentText = textDisplay.textContent || texts[currentTextIndex];
    var fontSize = calculateFontSize(currentText);
    textDisplay.style.fontSize = fontSize + "px";
  }
}
