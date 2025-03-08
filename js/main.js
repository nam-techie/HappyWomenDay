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

  // Thêm hiệu ứng pháo hoa khi click
  document.addEventListener("click", createFirework);

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
  
  // Hàm tạo pháo hoa
  function createFirework(e) {
    // Bỏ qua nếu click vào nút phát nhạc
    if (e.target.id === 'play-music-button') return;
    
    // Tạo container cho pháo hoa
    const firework = document.createElement('div');
    firework.className = 'firework';
    document.body.appendChild(firework);
    
    // Đặt vị trí pháo hoa tại vị trí click
    firework.style.left = e.clientX + 'px';
    firework.style.top = e.clientY + 'px';
    
    // Tạo hiệu ứng nổ ban đầu
    const initialBurst = document.createElement('div');
    initialBurst.className = 'initial-burst';
    firework.appendChild(initialBurst);
    
    // Animation cho hiệu ứng nổ ban đầu
    initialBurst.animate([
      { transform: 'scale(0) translateZ(0)', opacity: 1 },
      { transform: 'scale(1.5) translateZ(100px)', opacity: 0.8 },
      { transform: 'scale(2) translateZ(0)', opacity: 0 }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)'
    });
    
    // Tạo các tia pháo hoa
    const particleCount = 100; // Tăng số lượng hạt
    
    // Tạo bảng màu đẹp hơn
    const colorSchemes = [
      // Màu vàng-đỏ
      ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffcc00', '#ffff00'],
      // Màu xanh lá-xanh dương
      ['#00ff00', '#00ff33', '#00ff66', '#00ff99', '#00ffff', '#00ccff', '#0066ff', '#0000ff'],
      // Màu tím-hồng
      ['#6600ff', '#9900ff', '#cc00ff', '#ff00ff', '#ff00cc', '#ff0066'],
      // Màu cầu vồng
      ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff']
    ];
    
    // Chọn ngẫu nhiên một bảng màu
    const selectedColorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    
    // Tạo hiệu ứng pháo hoa 3D
    const fireworkType = Math.floor(Math.random() * 4); // 4 loại pháo hoa khác nhau
    
    // Tạo các hạt pháo hoa với hiệu ứng 3D
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Chọn màu từ bảng màu đã chọn
      const color = selectedColorScheme[Math.floor(Math.random() * selectedColorScheme.length)];
      particle.style.backgroundColor = color;
      particle.style.color = color; // Cho ::before và ::after
      
      // Thêm particle vào firework
      firework.appendChild(particle);
      
      // Tạo hiệu ứng bay ra 3D
      let angle, distance, delay, duration, size;
      
      // Tạo các hình dạng khác nhau dựa trên loại pháo hoa
      switch(fireworkType) {
        case 0: // Hình cầu 3D
          angle = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          distance = 30 + Math.random() * 100;
          delay = Math.random() * 300;
          duration = 1000 + Math.random() * 1000;
          size = 3 + Math.random() * 5;
          
          // Tọa độ 3D
          const x = distance * Math.sin(phi) * Math.cos(angle);
          const y = distance * Math.sin(phi) * Math.sin(angle);
          const z = distance * Math.cos(phi);
          
          particle.style.width = size + 'px';
          particle.style.height = size + 'px';
          
          // Tạo hiệu ứng 3D
          particle.animate([
            { 
              transform: 'translate3d(0, 0, 0) scale(1)',
              opacity: 1 
            },
            { 
              transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${Math.random() > 0.5 ? 0 : 0.5})`,
              opacity: 0 
            }
          ], {
            duration: duration,
            delay: delay,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
            fill: 'forwards'
          });
          break;
          
        case 1: // Hình xoắn ốc 3D
          const turns = 2 + Math.random() * 3;
          const spiralRadius = 20 + Math.random() * 80;
          delay = Math.random() * 500;
          duration = 1200 + Math.random() * 800;
          size = 3 + Math.random() * 4;
          
          particle.style.width = size + 'px';
          particle.style.height = size + 'px';
          
          // Tạo đường xoắn ốc
          const steps = 20;
          const keyframes = [];
          
          for (let step = 0; step <= steps; step++) {
            const progress = step / steps;
            const angle = progress * Math.PI * 2 * turns;
            const radius = progress * spiralRadius;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const z = progress * 100;
            
            keyframes.push({
              transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${1 - progress})`,
              opacity: 1 - progress
            });
          }
          
          particle.animate(keyframes, {
            duration: duration,
            delay: delay,
            easing: 'linear',
            fill: 'forwards'
          });
          break;
          
        case 2: // Hình trái tim
          angle = Math.random() * Math.PI * 2;
          distance = 30 + Math.random() * 70;
          delay = Math.random() * 400;
          duration = 1100 + Math.random() * 900;
          size = 3 + Math.random() * 4;
          
          // Tạo hình trái tim
          if (Math.random() > 0.7) {
            particle.style.borderRadius = '50% 50% 50% 0';
            particle.style.transform = 'translate(-50%, -50%) rotate(45deg)';
          }
          
          particle.style.width = size + 'px';
          particle.style.height = size + 'px';
          
          // Tính toán vị trí trên hình trái tim
          const heartX = Math.sin(angle) * distance;
          const heartY = -(Math.cos(angle) * distance) - Math.abs(heartX) * 0.5;
          const heartZ = Math.random() * 50;
          
          particle.animate([
            { 
              transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
              opacity: 1 
            },
            { 
              transform: `translate3d(${heartX}px, ${heartY}px, ${heartZ}px) scale(${Math.random() > 0.5 ? 0 : 0.5}) rotate(${Math.random() * 360}deg)`,
              opacity: 0 
            }
          ], {
            duration: duration,
            delay: delay,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
            fill: 'forwards'
          });
          break;
          
        case 3: // Hình sao 3D
          // Tạo hình sao
          if (Math.random() > 0.5) {
            particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
          }
          
          angle = Math.random() * Math.PI * 2;
          distance = 30 + Math.random() * 80;
          delay = Math.random() * 300;
          duration = 1300 + Math.random() * 700;
          size = 4 + Math.random() * 6;
          
          particle.style.width = size + 'px';
          particle.style.height = size + 'px';
          
          const starX = Math.cos(angle) * distance;
          const starY = Math.sin(angle) * distance;
          const starZ = Math.random() * 100 - 50;
          
          particle.animate([
            { 
              transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
              opacity: 1 
            },
            { 
              transform: `translate3d(${starX}px, ${starY}px, ${starZ}px) scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 720 - 360}deg)`,
              opacity: 0 
            }
          ], {
            duration: duration,
            delay: delay,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
            fill: 'forwards'
          });
          break;
      }
      
      // Thêm hiệu ứng lấp lánh 3D cho một số hạt
      if (Math.random() > 0.3) {
        particle.animate([
          { filter: 'brightness(1) blur(0px)' },
          { filter: 'brightness(1.5) blur(1px)' },
          { filter: 'brightness(1) blur(0px)' }
        ], {
          duration: 300 + Math.random() * 400,
          iterations: Infinity
        });
      }
      
      // Thêm hiệu ứng phản chiếu cho một số hạt
      if (Math.random() > 0.8 && e.clientY < window.innerHeight - 100) {
        const reflection = document.createElement('div');
        reflection.className = 'particle reflection';
        reflection.style.backgroundColor = color;
        reflection.style.width = size + 'px';
        reflection.style.height = size + 'px';
        firework.appendChild(reflection);
        
        // Tính toán vị trí phản chiếu
        const reflectionY = window.innerHeight - e.clientY;
        const reflectionX = e.clientX;
        
        // Animation cho phản chiếu
        reflection.animate([
          { 
            transform: `translate3d(${reflectionX}px, ${reflectionY}px, 0) scale(1) scaleY(0.2)`,
            opacity: 0.3
          },
          { 
            transform: `translate3d(${reflectionX + (Math.random() * 20 - 10)}px, ${reflectionY + 20}px, 0) scale(0.5) scaleY(0.1)`,
            opacity: 0
          }
        ], {
          duration: duration * 0.7,
          delay: delay,
          easing: 'ease-out',
          fill: 'forwards'
        });
      }
    }
    
    // Tạo hiệu ứng ánh sáng 3D
    const light = document.createElement('div');
    light.className = 'firework-light';
    light.style.position = 'absolute';
    light.style.width = '200px';
    light.style.height = '200px';
    light.style.borderRadius = '50%';
    light.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
    light.style.transform = 'translate(-50%, -50%)';
    light.style.opacity = '0.7';
    light.style.filter = 'blur(10px)';
    firework.appendChild(light);
    
    // Animation cho ánh sáng
    light.animate([
      { transform: 'translate(-50%, -50%) scale(0)', opacity: 0.7 },
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 }
    ], {
      duration: 1000,
      easing: 'ease-out'
    });
    
    // Tạo âm thanh pháo hoa 3D
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Âm thanh nổ ban đầu
      const initialOscillator = audioContext.createOscillator();
      initialOscillator.type = 'sine';
      initialOscillator.frequency.value = 350 + Math.random() * 150;
      
      const initialGain = audioContext.createGain();
      initialGain.gain.setValueAtTime(0.05, audioContext.currentTime);
      initialGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      initialOscillator.connect(initialGain);
      initialGain.connect(audioContext.destination);
      
      initialOscillator.start();
      initialOscillator.stop(audioContext.currentTime + 0.2);
      
      // Âm thanh pháo hoa nổ
      setTimeout(() => {
        const explosionOscillator = audioContext.createOscillator();
        explosionOscillator.type = fireworkType === 3 ? 'sawtooth' : (fireworkType === 2 ? 'triangle' : 'sine');
        explosionOscillator.frequency.value = 150 + Math.random() * 100;
        
        const explosionGain = audioContext.createGain();
        explosionGain.gain.setValueAtTime(0.1, audioContext.currentTime);
        explosionGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        explosionOscillator.connect(explosionGain);
        explosionGain.connect(audioContext.destination);
        
        explosionOscillator.start();
        explosionOscillator.stop(audioContext.currentTime + 0.3);
      }, 100);
      
    } catch (e) {
      console.log('Web Audio API không được hỗ trợ hoặc bị chặn');
    }
    
    // Xóa pháo hoa sau khi animation kết thúc
    setTimeout(() => {
      if (document.body.contains(firework)) {
        document.body.removeChild(firework);
      }
    }, 2500);
  }
};
