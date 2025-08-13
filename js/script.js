document.addEventListener('DOMContentLoaded', function () {
    mdc.autoInit();

    // Анимация для кнопки в hero-секции
    const ctaButton = document.getElementById('cta-button');
    setTimeout(() => {
        ctaButton.style.opacity = '0';
        ctaButton.style.transform = 'translateY(30px)';
        ctaButton.style.animation = 'fadeInUp 0.8s ease-out 0.7s forwards';
    }, 100);

    // Модальные окна
    const privacyModal = document.getElementById('privacy-modal');
    const offerModal = document.getElementById('offer-modal');
    const termsModal = document.getElementById('terms-modal');

    document.querySelectorAll('.privacy-link').forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
        });
    });

    document.querySelectorAll('.offer-link').forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            offerModal.style.display = 'block';
        });
    });

    document.querySelectorAll('.terms-link').forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            termsModal.style.display = 'block';
        });
    });

    document.querySelectorAll('.close-modal').forEach((closeBtn) => {
        closeBtn.addEventListener('click', function () {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Прокрутка к форме при нажатии на кнопку
    document
        .getElementById('cta-button')
        .addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('cta-section').scrollIntoView({
                behavior: 'smooth',
            });
        });

    // Отправка формы через Formspree
    const form = document.getElementById('lead-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitButton = document.getElementById('submit-button');
        const originalText =
            submitButton.querySelector('.mdc-button__label').textContent;

        // Показываем загрузку
        submitButton.querySelector('.mdc-button__label').textContent =
            'Отправка...';
        submitButton.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Показать сообщение об успехе
                    alert('Спасибо! Мы скоро свяжемся с вами.');
                    form.reset();
                } else {
                    throw new Error('Ошибка отправки формы');
                }
            })
            .catch((error) => {
                alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
                console.error('Form submission error:', error);
            })
            .finally(() => {
                // Восстанавливаем кнопку
                submitButton.querySelector('.mdc-button__label').textContent =
                    originalText;
                submitButton.disabled = false;
            });
    });

    // Инициализация карты
    function initMap() {
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(function () {
                const map = new ymaps.Map('map', {
                    center: [55.796127, 49.106414], // Координаты Казани
                    zoom: 15,
                    controls: ['zoomControl'],
                });

                // Добавление метки
                const placemark = new ymaps.Placemark(
                    [55.796127, 49.106414],
                    {
                        hintContent: 'Наш офис',
                        balloonContent: 'ул. Товарищеская, 30',
                    },
                    {
                        iconLayout: 'default#image',
                        iconImageHref:
                            'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                        iconImageSize: [40, 40],
                        iconImageOffset: [-20, -40],
                    }
                );

                map.geoObjects.add(placemark);
                map.behaviors.disable('scrollZoom');
            });
        }
    }

    // Загрузка API Яндекс.Карт
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.onload = initMap;
    document.body.appendChild(script);

    // Проверка видимости элементов
    function checkVisibility() {
        const cards = document.querySelectorAll(
            '.problem-card, .solution-card, .crm-card'
        );
        const windowHeight = window.innerHeight;

        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const isVisible =
                rect.top <= windowHeight * 0.8 &&
                rect.bottom >= windowHeight * 0.2;

            if (isVisible) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Анимация кнопки
        const ctaRect = document
            .getElementById('cta-section')
            .getBoundingClientRect();
        const ctaVisible =
            ctaRect.top <= windowHeight * 0.8 &&
            ctaRect.bottom >= windowHeight * 0.2;

        if (ctaVisible) {
            document
                .getElementById('submit-button')
                .classList.add('pulse-animation');
        } else {
            document
                .getElementById('submit-button')
                .classList.remove('pulse-animation');
        }
    }

    // Проверяем видимость при загрузке и при скролле
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
});
