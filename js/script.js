// ایجاد یک آرایه برای ذخیره محصولات در سبد خرید
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// تابع اضافه کردن محصول به سبد خرید
function addToCart(productName, productId) {
    const product = { id: productId, name: productName };
    
    // اضافه کردن محصول به سبد خرید
    cart.push(product);

    // ذخیره کردن سبد خرید در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // نمایش پیامی که محصول به سبد خرید اضافه شده است
    alert(`${productName} به سبد خرید اضافه شد!`);
}

// تابع برای نمایش سبد خرید
function viewCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = cartItems.map(item => item.name).join(', ');
    alert('سبد خرید شما شامل: ' + cartList);
}
// دریافت تعداد سکه‌ها از localStorage
function getCoins() {
    return parseInt(localStorage.getItem("coins")) || 0;
}

// بروزرسانی نمایش کیف پول
function updateWalletDisplay() {
    document.getElementById("wallet-coins").textContent = getCoins();
}

// اضافه کردن سکه‌ها
function addCoins(amount) {
    let coins = getCoins();
    coins += amount;
    localStorage.setItem("coins", coins);
    updateWalletDisplay();
}

// کم کردن سکه‌ها هنگام خرید
function spendCoins(amount) {
    let coins = getCoins();
    if (coins >= amount) {
        coins -= amount;
        localStorage.setItem("coins", coins);
        updateWalletDisplay();
        return true; // خرید موفق بود
    } else {
        alert("سکه کافی ندارید!");
        return false; // خرید ناموفق بود
    }
}

// وقتی صفحه لود شد، سکه‌ها رو نمایش بده
document.addEventListener("DOMContentLoaded", updateWalletDisplay);
// خرید محصول با استفاده از سکه‌ها
function addToCart(productName, productPrice) {
    let currentCoins = parseInt(localStorage.getItem("coins")) || 0;
    
    // اگر سکه کافی وجود داشته باشد، محصول را خریداری می‌کنیم
    if (currentCoins >= productPrice) {
        // کاهش سکه‌ها
        currentCoins -= productPrice;
        localStorage.setItem("coins", currentCoins);
        alert(`تبریک! شما محصول "${productName}" را خریداری کردید.`);
        updateWalletDisplay(); // به‌روزرسانی نمایش سکه‌ها
    } else {
        alert("متاسفانه سکه کافی برای خرید این محصول ندارید.");
    }
}
// مقدار اولیه سکه‌ها را در localStorage تنظیم می‌کنیم (اگر قبلاً تنظیم نشده باشد)
if (localStorage.getItem("coins") === null) {
    localStorage.setItem("coins", 1000); // مقدار اولیه سکه‌ها را 1000 قرار می‌دهیم
}

// تابع برای خرید با سکه
function buyWithCoins(productName, productPriceInCoins) {
    let currentCoins = parseInt(localStorage.getItem("coins")) || 0;

    if (currentCoins >= productPriceInCoins) {
        // کاهش سکه‌ها
        currentCoins -= productPriceInCoins;
        localStorage.setItem("coins", currentCoins);
        alert(`تبریک! شما محصول "${productName}" را با سکه خریداری کردید.`);
        updateWalletDisplay(); // به‌روزرسانی نمایش سکه‌ها
    } else {
        alert("متاسفانه سکه کافی برای خرید این محصول ندارید.");
    }
}

// تابع برای خرید از درگاه پرداخت (به صورت فرضی)
function buyWithCard(productName, productPriceInToman) {
    // در اینجا می‌توانید فرایند پرداخت آنلاین را شروع کنید
    alert(`شما در حال خرید محصول "${productName}" به مبلغ ${productPriceInToman} تومان هستید.`);
}

// به‌روزرسانی نمایش سکه‌ها در هدر
function updateWalletDisplay() {
    const walletCoinsElement = document.getElementById("wallet-coins");
    const currentCoins = parseInt(localStorage.getItem("coins")) || 0;
    walletCoinsElement.textContent = currentCoins;
}

// وقتی که صفحه بارگذاری می‌شود، تعداد سکه‌ها را نمایش می‌دهیم.
document.addEventListener("DOMContentLoaded", function () {
    updateWalletDisplay(); // به‌روزرسانی نمایش سکه‌ها هنگام بارگذاری صفحه
});
