document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // جلوگیری از ارسال فرم به صورت پیش‌فرض

    // حذف پیغام‌های خطا
    clearErrorMessages();

    // گرفتن مقادیر فرم
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // اعتبارسنجی
    let isValid = true;

    if (name === "") {
        showError("nameError", "لطفاً نام خود را وارد کنید.");
        isValid = false;
    }

    if (email === "") {
        showError("emailError", "لطفاً ایمیل خود را وارد کنید.");
        isValid = false;
    } else if (!validateEmail(email)) {
        showError("emailError", "لطفاً یک ایمیل معتبر وارد کنید.");
        isValid = false;
    }

    if (message === "") {
        showError("messageError", "لطفاً پیام خود را وارد کنید.");
        isValid = false;
    }

    // اگر فرم معتبر بود
    if (isValid) {
        sendFormData(name, email, message);
    }
});

// نمایش پیغام خطا
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// حذف پیغام‌های خطا
function clearErrorMessages() {
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (element) {
        element.textContent = "";
    });
}

// اعتبارسنجی ایمیل
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

// ارسال داده‌ها
function sendFormData(name, email, message) {
    // در اینجا می‌توان از AJAX یا Fetch برای ارسال داده‌ها به سرور استفاده کرد.
    // برای مثال، فرض کنید سرور داده‌ها را از طریق یک API دریافت می‌کند.

    const formData = {
        name: name,
        email: email,
        message: message,
    };

    // ارسال به API (در اینجا فقط نمایش پیغام برای مثال)
    setTimeout(function () {
        // نمایش پیغام تایید
        document.getElementById("responseMessage").style.display = "block";
        document.getElementById("contactForm").reset();
    }, 1000); // شبیه‌سازی زمان ارسال داده
}
