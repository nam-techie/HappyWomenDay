function nextPage() {
    window.location.href = "imposter.html"; // Điều hướng đến trang Yes
}

function moveButton() {
    let button = document.getElementById("noButton");
    let container = document.querySelector(".container");

    // Lấy kích thước màn hình và container
    let containerRect = container.getBoundingClientRect();
    let buttonRect = button.getBoundingClientRect();

    // Định giới hạn di chuyển để không bị tràn khỏi container
    let maxX = containerRect.width - buttonRect.width - 10; // -10 để tránh tràn mép
    let maxY = containerRect.height - buttonRect.height - 10;

    // Xử lý trên điện thoại (cảm ứng)
    if (window.innerWidth <= 600) {
        maxX = window.innerWidth - buttonRect.width - 20;
        maxY = window.innerHeight - buttonRect.height - 20;
    }

    // Tạo vị trí ngẫu nhiên nhưng vẫn trong giới hạn
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    // Áp dụng vị trí mới cho nút
    button.style.position = "absolute"; 
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
}

// Hỗ trợ di chuyển nút "No" khi nhấn trên màn hình cảm ứng
document.getElementById("noButton").addEventListener("touchstart", moveButton);
