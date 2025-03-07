// Handle "No" button moving away
function moveButton() {
    let button = document.getElementById("noButton");
    let container = document.querySelector(".container");

    let containerRect = container.getBoundingClientRect();
    let buttonRect = button.getBoundingClientRect();

    let maxX = containerRect.width - buttonRect.width - 10;
    let maxY = containerRect.height - buttonRect.height - 10;

    if (window.innerWidth <= 600) {
        maxX = window.innerWidth - buttonRect.width - 20;
        maxY = window.innerHeight - buttonRect.height - 20;
    }

    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    button.style.position = "absolute";
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
}

// Handle image change for different buttons
function showHappyCats() {
    document.querySelector(".gif_container").innerHTML = `
        <img src="images/happy-cat.gif" alt="Happy Cat" />
        <img src="images/happy-cat-2.gif" alt="Happy Cat" />
        <img src="images/happy-cat-3.gif" alt="Happy Cat" />
    `;
}

function showSadCats() {
    document.querySelector(".gif_container").innerHTML = `
        <img src="images/sad-cat.gif" alt="Sad Cat" />
        <img src="images/sad-cat-2.gif" alt="Sad Cat" />
        <img src="images/sat-cat-3.gif" alt="Sad Cat" />
    `;
}

// Handle countdown and page redirection
function nextPage() {
    let header = document.querySelector(".header_text");
    let gifContainer = document.querySelector(".gif_container");
    let buttonsContainer = document.querySelector(".buttons");

    // Hide buttons
    buttonsContainer.style.display = "none";

    // Replace images with loading GIFs
    gifContainer.innerHTML = `
        <img src="images/loading-cat.gif" alt="Loading Cat" />
        <img src="images/loading-cat-2.gif" alt="Loading Cat" />
        <img src="images/loading-cat-3.gif" alt="Loading Cat" />
    `;

    // Play the waiting sound
    const waitSound = new Audio("wait-a-minutes.mp3");
    waitSound.play().catch(error => console.log("Không thể phát âm thanh chờ đợi:", error));

    // Gradual countdown (total duration: 9s)
    let countdownTimes = [3, 2.5, 2, 1.8, 1.6, 1.4, 1.2, 1, 0.8, 0.6, 0.4, 0.2];
    countdownTimes.forEach((num, index) => {
        setTimeout(() => {
            header.innerText = num.toFixed(1); // Keep one decimal place
        }, index * 750); // Adjust timing to stretch over 9s
    });

    // Show "Startttt!" instead of 0
    setTimeout(() => {
        header.innerText = "Startttt!";
    }, 9000);

    // Redirect after countdown
    setTimeout(() => {
        window.location.href = "background-night-scenery.html"; // Change this if needed
    }, 10500); // Added a 1.5s delay for "Startttt!" effect
}

// Tạo sẵn đối tượng Audio để tránh vấn đề với autoplay
const yesSound = new Audio("yes-button.mp3");
const noSound = new Audio("no-button.mp3");

// Kiểm tra xem âm thanh đã được tải chưa
yesSound.addEventListener('canplaythrough', () => {
    console.log("Âm thanh Yes đã sẵn sàng");
});

noSound.addEventListener('canplaythrough', () => {
    console.log("Âm thanh No đã sẵn sàng");
});

// Xử lý lỗi nếu không tải được âm thanh
yesSound.addEventListener('error', () => {
    console.error("Không thể tải âm thanh Yes");
});

noSound.addEventListener('error', () => {
    console.error("Không thể tải âm thanh No");
});

function playYesSound() {
    console.log("Đang phát âm thanh Yes");
    yesSound.currentTime = 0;
    yesSound.play().catch(error => {
        console.error("Không thể phát âm thanh Yes:", error);
        // Thử phát lại sau khi người dùng tương tác
        document.addEventListener('click', function playOnClick() {
            yesSound.play();
            document.removeEventListener('click', playOnClick);
        }, { once: true });
    });
}

function playNoSound() {
    console.log("Đang phát âm thanh No");
    noSound.currentTime = 0;
    noSound.play().catch(error => {
        console.error("Không thể phát âm thanh No:", error);
        // Thử phát lại sau khi người dùng tương tác
        document.addEventListener('click', function playOnClick() {
            noSound.play();
            document.removeEventListener('click', playOnClick);
        }, { once: true });
    });
}

function changeQuestionToNo() {
    document.querySelector(".header_text").innerText = "Why hesitate? This could be amazing!!!!";
}

function changeQuestionToYes() {
    document.querySelector(".header_text").innerText = "Do you want to open the secret box?";
}

// Kiểm tra xem người dùng đang sử dụng thiết bị di động hay không
function isMobileDevice() {
    return (window.innerWidth <= 600) || 
           ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

// Thiết lập các sự kiện dựa trên loại thiết bị
function setupEventListeners() {
    // Thiết lập nội dung nút
    document.getElementById("yesButton").innerText = "Of course! I love surprises!";
    document.getElementById("noButton").innerText = "Nope! I'm too scared! 😱";
    
    const noButton = document.getElementById("noButton");
    const yesButton = document.getElementById("yesButton");
    
    // Xóa tất cả event listeners hiện tại (để tránh trùng lặp khi gọi lại hàm này)
    noButton.replaceWith(noButton.cloneNode(true));
    yesButton.replaceWith(yesButton.cloneNode(true));
    
    // Lấy lại reference sau khi clone
    const newNoButton = document.getElementById("noButton");
    const newYesButton = document.getElementById("yesButton");
    
    // Cả thiết bị di động và máy tính: Nút No chỉ phản ứng khi click
    newNoButton.addEventListener("click", function() {
        console.log("Nút No được nhấn");
        moveButton();
        showSadCats();
        changeQuestionToNo();
        playNoSound();
    });
    
    if (isMobileDevice()) {
        // Thiết bị di động: Nút Yes chỉ phản ứng khi click
        newYesButton.addEventListener("click", function() {
            console.log("Nút Yes được nhấn (mobile)");
            showHappyCats();
            changeQuestionToYes();
            playYesSound();
            nextPage();
        });
    } else {
        // Máy tính: Nút Yes phản ứng khi click và mouseover
        newYesButton.addEventListener("click", function() {
            console.log("Nút Yes được nhấn (desktop)");
            showHappyCats();
            changeQuestionToYes();
            playYesSound();
            nextPage();
        });
        
        // Thêm hiệu ứng hover cho nút Yes trên máy tính
        newYesButton.addEventListener("mouseover", function() {
            console.log("Hover trên nút Yes");
            showHappyCats();
            changeQuestionToYes();
            playYesSound();
        });
    }
    
    // Thêm sự kiện click vào document để cho phép phát âm thanh
    // (Nhiều trình duyệt yêu cầu tương tác người dùng trước khi cho phép phát âm thanh)
    document.addEventListener('click', function initAudio() {
        // Tạo âm thanh tạm thời và phát nó (âm lượng = 0)
        const tempSound = new Audio();
        tempSound.volume = 0;
        tempSound.play().then(() => {
            console.log("Âm thanh đã được kích hoạt");
        }).catch(error => {
            console.log("Vẫn chưa thể phát âm thanh:", error);
        });
        
        // Chỉ thực hiện một lần
        document.removeEventListener('click', initAudio);
    });
}

// Thiết lập event listeners khi trang được tải
window.addEventListener("load", setupEventListeners);

// Thiết lập lại event listeners khi kích thước màn hình thay đổi
window.addEventListener("resize", setupEventListeners);

