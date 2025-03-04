const petalContainer = document.getElementById('petal-container');

function createFlower() {
  const container = document.createElement('div');
  container.className = 'flower-container';
  container.style.left = Math.random() * 100 + 'vw';
  
  // Thời gian bay ngẫu nhiên
  const duration = Math.random() * 4 + 8;
  container.style.animationDuration = duration + 's';
  
  // Tạo trái tim
  const heart = document.createElement('div');
  heart.className = 'heart';
  container.appendChild(heart);
  
  // Tạo hoa tulip (ẩn ban đầu)
  const tulip = document.createElement('div');
  tulip.className = 'tulip';
  
  // Tạo thân hoa
  const stem = document.createElement('div');
  stem.className = 'tulip__stem';
  tulip.appendChild(stem);
  
  // Tạo lá
  const leaf = document.createElement('div');
  leaf.className = 'tulip__leaf';
  tulip.appendChild(leaf);
  
  // Tạo hoa
  const flower = document.createElement('div');
  flower.className = 'tulip__flower';
  tulip.appendChild(flower);
  
  container.appendChild(tulip);
  petalContainer.appendChild(container);
  
  // Theo dõi vị trí và biến đổi khi đến giữa màn hình
  const checkPosition = () => {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Khi đến khoảng giữa màn hình
    if (rect.top < windowHeight * 0.6 && rect.top > windowHeight * 0.4) {
      container.classList.add('blooming');
      // Dừng kiểm tra vị trí sau khi biến đổi
      clearInterval(positionInterval);
    }
  };
  
  const positionInterval = setInterval(checkPosition, 100);

  // Xóa hoa và interval sau khi animation kết thúc
  container.addEventListener('animationend', () => {
    clearInterval(positionInterval);
    container.remove();
  });
}

// Tạo hoa mỗi 500ms
setInterval(createFlower, 500); 