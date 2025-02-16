document.addEventListener("contextmenu", event => event.preventDefault()); // غیرفعال کردن راست کلیک
document.addEventListener("keydown", event => {
    if (event.ctrlKey && ["u", "s", "j"].includes(event.key.toLowerCase())) {
        event.preventDefault();
    }
    if (event.keyCode === 123) { // کلید F12
        event.preventDefault();
    }
});

const texts = [
    "هک یعنی یافتن راه‌های غیرمنتظره برای حل مشکلات",
    "برنامه نویسی هنر حل مسئله با منطق و خلاقیت است",
    "مهندسی معکوس یکی از روش‌های کشف آسیب‌پذیری‌هاست",
    "هیچ سیستمی 100 درصد امن نیست، امنیت یک روند است",
    "یک هکر واقعی به امنیت احترام می‌گذارد و آن را بهبود می‌بخشد",
    "هوش مصنوعی آینده برنامه نویسی را متحول خواهد کرد",
    "حملات فیشینگ یکی از روش‌های سرقت اطلاعات کاربران است",
    "سریع‌ترین راه یادگیری کدنویسی، نوشتن پروژه‌های واقعی است"
];

let currentText = "";
let startTime;
const textElement = document.getElementById("text-to-type");
const inputElement = document.getElementById("user-input");
const timeElement = document.getElementById("time");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart");

// تابع برای تمیز کردن و اصلاح متن ورودی
function cleanText(text) {
    return text
        .replace(/[.,،]/g, '') // حذف نقطه و ویرگول
        .replace(/\s+/g, ' ') // تبدیل چندین فاصله به یک فاصله
        .replace(/‌/g, ' ') // تبدیل نیم‌فاصله به فاصله
        .replace(/\bان\b/g, 'آن') // اصلاح "ان" به "آن"
        .replace(/\bمی\s/g, 'می') // حذف فاصله بین "می" و فعل
        .trim(); // حذف فاصله‌های اول و آخر
}

// نمایش متن تصادفی
function loadText() {
    currentText = texts[Math.floor(Math.random() * texts.length)];
    textElement.textContent = currentText;
    inputElement.value = "";
    resultElement.textContent = "";
    startTime = null;
    timeElement.textContent = "0";
}

// شروع تایمر
inputElement.addEventListener("input", () => {
    if (!startTime) {
        startTime = new Date();
        updateTimer();
    }
    checkInput();
});

// بررسی تایپ کاربر
function checkInput() {
    let userText = cleanText(inputElement.value);
    let correctText = cleanText(currentText);

    if (userText === correctText) {
        let timeTaken = ((new Date() - startTime) / 1000).toFixed(2);
        let coinsEarned = calculateCoins(timeTaken);

        resultElement.innerHTML = `🎉 تبریک! شما در <b>${timeTaken}</b> ثانیه تایپ کردید و <b>${coinsEarned}</b> سکه گرفتید!`;
        addCoins(coinsEarned);
        inputElement.disabled = true;
    } else {
        // نمایش اشتباهات
        highlightErrors(userText, correctText);
    }
}

// تابع برای برجسته کردن اشتباهات
function highlightErrors(userText, correctText) {
    let errors = [];
    let userWords = userText.split(' ');
    let correctWords = correctText.split(' ');

    // مقایسه هر کلمه و پیدا کردن کلماتی که اشتباه تایپ شده‌اند
    for (let i = 0; i < userWords.length; i++) {
        if (userWords[i] !== correctWords[i]) {
            errors.push({
                word: userWords[i],
                index: i
            });
        }
    }

    // نمایش اشتباهات به صورت برجسته
    let highlightedText = correctText.split(' ').map((word, index) => {
        let error = errors.find(e => e.index === index);
        if (error) {
            return `<span style="color: red; text-decoration: underline;">${error.word}</span>`;
        }
        return word;
    }).join(' ');

    // نمایش اشتباهات در نمایشگر
    resultElement.innerHTML = `✏️ اشتباهات شما: <br> ${highlightedText}`;
}

// محاسبه سکه بر اساس زمان
function calculateCoins(time) {
    if (time <= 5) return 20;
    if (time <= 10) return 10;
    return 5;
}

// بروزرسانی تایمر
function updateTimer() {
    if (!startTime) return;
    timeElement.textContent = ((new Date() - startTime) / 1000).toFixed(1);
    setTimeout(updateTimer, 100);
}

// دکمه شروع دوباره
restartButton.addEventListener("click", () => {
    inputElement.disabled = false;
    loadText();
});

// اضافه کردن سکه به کیف پول
function addCoins(amount) {
    let coins = parseInt(localStorage.getItem("coins")) || 0;
    coins += amount;
    localStorage.setItem("coins", coins);
}

// شروع بازی
loadText();
