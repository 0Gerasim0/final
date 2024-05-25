// Обновленный JavaScript код

// Часы
setInterval(() => {
    const d = new Date();
    const hr = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    const hr_rotation = 30 * hr + min / 2;
    const min_rotation = 6 * min;
    const sec_rotation = 6 * sec;

    document.getElementById('hour').style.transform = `rotate(${hr_rotation}deg)`;
    document.getElementById('minute').style.transform = `rotate(${min_rotation}deg)`;
    document.getElementById('second').style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);

// Добавление товара в корзину
const cartButton = document.getElementById('cartButton');
const cartDropdown = document.getElementById('cartDropdown');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

cartButton.addEventListener('click', function() {
    cartDropdown.classList.toggle('hidden');
});

document.addEventListener("DOMContentLoaded", function() {
    const imageContainer = document.querySelector('.image-container');
    const contactText = document.getElementById('contact-text');
    const originalText = 'Все вопросы к этому молодому (сомнительно) человеку (не менее сомнительно)';
    const newText = 'Слышь, часы купи';
    
    let typingTimer;
    let lineIndex = 0;
    let charIndex = 0;

    function clearText() {
        clearTimeout(typingTimer);
        contactText.innerHTML = '';
        lineIndex = 0;
        charIndex = 0;
    }

    function typeWriter(text, element) {
        const lines = text.split('. '); // Разбиваем текст на предложения
        function typing() {
            if (lineIndex < lines.length) {
                let line = lines[lineIndex] + (lineIndex < lines.length - 1 ? '. ' : '.'); // Добавляем точку, если это не последняя строка
                if (charIndex < line.length) {
                    element.innerHTML += line.charAt(charIndex);
                    charIndex++;
                    typingTimer = setTimeout(typing, 50); // скорость печатания символов
                } else {
                    element.innerHTML += '<br>'; // добавляем перенос строки после полной строки
                    charIndex = 0; // сбрасываем индекс символа
                    lineIndex++;
                    typingTimer = setTimeout(typing, 500); // задержка перед печатанием следующей строки
                }
            }
        }
        typing();
    }

    imageContainer.addEventListener('mouseover', function() {
        clearText();
        typeWriter(newText, contactText);
    });

    imageContainer.addEventListener('mouseout', function() {
        clearText();
        typeWriter(originalText, contactText);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");
    const modalImage = document.getElementById("modalImage");
    const closeButton = document.querySelector(".close-button");
    const buyButton = document.querySelector(".modalbut");

    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    function updateCartTotal() {
        let total = 0;
        let itemCount = 0;
        document.querySelectorAll('#cartItems .cart-item').forEach(item => {
            const price = parseFloat(item.getAttribute('data-price'));
            const quantity = parseInt(item.querySelector('.quantity-display').innerText);
            total += price * quantity;
            itemCount += quantity;
        });
        cartTotal.innerText = `Общая сумма: ${total.toFixed(2)} ₽`;
        cartCount.innerText = itemCount;

        // Показать или скрыть счетчик в зависимости от количества товаров
        if (itemCount > 0) {
            cartCount.style.display = 'block';
        } else {
            cartCount.style.display = 'none';
        }
    }

    buyButton.addEventListener('click', function() {
        const itemName = modalTitle.innerText;
        const itemPrice = modalPrice.innerText.replace('Цена: ', '').replace(' ₽', '');
        const itemImage = modalImage.src;

        const existingItem = [...document.querySelectorAll('#cartItems .cart-item')].find(item => item.getAttribute('data-name') === itemName);
        if (existingItem) {
            const quantityDisplay = existingItem.querySelector('.quantity-display');
            quantityDisplay.innerText = parseInt(quantityDisplay.innerText) + 1;
        } else {
            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.setAttribute('data-name', itemName);
            cartItem.setAttribute('data-price', itemPrice);
            cartItem.innerHTML = `
                <img src="${itemImage}" class="cart-item-image">
                <div class="cart-item-details">
                    <span class="cart-item-name">${itemName}</span>
                    <span class="cart-item-price">${itemPrice} ₽</span>
                    <div class="cart-item-quantity">
                        <button class="quantity-button minus-button">-</button>
                        <span class="quantity-display">1</span>
                        <button class="quantity-button plus-button">+</button>
                    </div>
                </div>
                <button class="remove-button">Удалить</button>
            `;
            cartItems.appendChild(cartItem);
        }
        updateCartTotal();
        modal.style.display = 'none';
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            modalTitle.innerText = card.getAttribute('data-name');
            modalDescription.innerText = card.getAttribute('data-description');
            modalPrice.innerText = "Цена: " + card.getAttribute('data-price') + " ₽";
            modalImage.src = card.getAttribute('data-image');
            modal.style.display = "block";
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('quantity-button')) {
            const button = event.target;
            const quantityDisplay = button.parentNode.querySelector('.quantity-display');
            let quantity = parseInt(quantityDisplay.innerText);
            if (button.classList.contains('plus-button')) {
                quantity++;
            } else if (button.classList.contains('minus-button')) {
                if (quantity > 1) {
                    quantity--;
                }
            }
            quantityDisplay.innerText = quantity;
            updateCartTotal();
        }

        if (event.target.classList.contains('remove-button')) {
            const cartItem = event.target.parentNode;
            cartItem.remove();
            updateCartTotal();
            event.stopPropagation(); // Предотвращение закрытия корзины при удалении товара
        }
    });
});


$(document).ready(function() {
    $('.cards').each(function() {
        var $this = $(this);
        var cardCount = $this.find('.card').length;
        var currentSlide = 0;
        var cardsPerSlide = 4; 

        function showNextSlide() {
            currentSlide = (currentSlide + cardsPerSlide) % cardCount;
            updateSlider();
        }

        function showPrevSlide() {
            currentSlide = (currentSlide - cardsPerSlide + cardCount) % cardCount;
            updateSlider();
        }

        function updateSlider() {
            $this.find('.card').hide();
            for (var i = 0; i < cardsPerSlide; i++) {
                $this.find('.card').eq((currentSlide + i) % cardCount).fadeIn();
            }
        }

        $this.parent().find('.prev').on('click', function() {
            showPrevSlide();
        });

        $this.parent().find('.next').on('click', function() {
            showNextSlide();
        });

        updateSlider();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slider-background .slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    showSlide(currentIndex);
    setInterval(nextSlide, 5000);
});

document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById('submitButton');
    const submitModal = document.getElementById('submitModal');
    const closeButton = document.querySelector('.close-button');
    
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // предотвращаем отправку формы
        
        // Очищаем поля ввода
        document.getElementById('imya').value = '';
        document.getElementById('familiya').value = '';
        document.getElementById('milo').value = '';
        document.getElementById('text').value = '';
        
        // Показываем модальное окно
        submitModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        submitModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == submitModal) {
            submitModal.style.display = 'none';
        }
    });
});