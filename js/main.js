onload = () => {
  // Phát nhạc khi trang được tải
  const audio = document.getElementById("bg-music");
  
  // Kiểm tra xem có tham số autoplay=true trong URL không
  const urlParams = new URLSearchParams(window.location.search);
  const autoplay = urlParams.get('autoplay');
  
  function playMusic() {
    audio.volume = 0.5; // Điều chỉnh âm lượng
    audio.play().catch(error => {
      console.log("Autoplay failed:", error);
      // Hiển thị thông báo nếu phát nhạc thất bại
      showPlayButton();
    });
    document.removeEventListener("click", playMusic);
    
    // Ẩn nút phát nhạc nếu đã hiển thị
    const playButton = document.getElementById('play-music-button');
    if (playButton) {
      playButton.style.display = 'none';
    }
  }
  
  // Tạo nút phát nhạc
  function showPlayButton() {
    // Kiểm tra xem nút đã tồn tại chưa
    if (!document.getElementById('play-music-button')) {
      const playButton = document.createElement('button');
      playButton.id = 'play-music-button';
      playButton.innerHTML = '🎵 Click to chill';
      playButton.style.position = 'fixed';
      playButton.style.top = '20px';
      playButton.style.right = '20px';
      playButton.style.zIndex = '1000';
      playButton.style.padding = '10px 15px';
      playButton.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      playButton.style.border = 'none';
      playButton.style.borderRadius = '5px';
      playButton.style.cursor = 'pointer';
      playButton.style.fontWeight = 'bold';
      playButton.onclick = playMusic;
      document.body.appendChild(playButton);
    }
  }
  
  // Nếu có tham số autoplay=true, phát nhạc ngay lập tức
  if (autoplay === 'true') {
    playMusic();
  } else {
    // Nếu không có tham số autoplay=true, thử phát nhạc tự động
    audio.play().catch(() => {
      console.log("Autoplay blocked, waiting for user interaction...");
      document.addEventListener("click", playMusic);
      // Hiển thị nút phát nhạc
      showPlayButton();
    });
  }

  // Thêm sự kiện click toàn trang để phát nhạc
  document.addEventListener("click", playMusic, { once: true });

  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('Happy International Women\'s Day').split('');
    const titleElement = document.getElementById('title');
    let index = 0;

    // Kiểm tra kích thước màn hình và thay đổi kích thước font
    let titleFontSize = window.innerWidth <= 768 ? "30px" : "60px"; // Màn hình nhỏ thì font nhỏ hơn
    titleElement.style.fontSize = titleFontSize;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 300); // 1000ms delay
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};
