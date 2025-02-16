document.addEventListener("DOMContentLoaded", function() {
    const productSlider = document.querySelector('.product-slider');

    // Add smooth scroll functionality for the product slider
    productSlider.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            productSlider.scrollBy(300, 0);  // Scroll to the right
        } else {
            productSlider.scrollBy(-300, 0); // Scroll to the left
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.product-slider');
    const products = document.querySelectorAll('.product-card');
    let currentIndex = 0;

    function showProduct(index) {
        slider.scrollTo({
            left: products[index].offsetLeft,
            behavior: 'smooth'
        });
    }

    // شما می‌توانید اینجا دکمه‌های بعدی و قبلی را اضافه کنید
});
