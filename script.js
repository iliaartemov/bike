document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.getElementById('order-button');
    const contactForm = document.getElementById('contactForm');
    const container = document.querySelector('.acception-container');
    const telephoneInput = document.getElementById('telephone');
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    const telephoneError = document.getElementById('telephoneError');

    if (orderButton) {
        orderButton.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = orderButton.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            let isValid = true;
            // Проверка имени
            if (nameInput && nameInput.value.trim() === '') {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }

            // Проверка телефона
            if (telephoneInput && telephoneInput.value.trim() === '') {
                telephoneError.style.display = 'block';
                isValid = false;
            } else {
                telephoneError.style.display = 'none';
            }

            // Предотвращаем отправку формы, если данные некорректны
            if (!isValid) {
                event.preventDefault();
            }
        });
    }

    if (container) {
        container.addEventListener('mousedown', () => {
            container.classList.add('pressed');
        });

        document.addEventListener('mouseup', () => {
            container.classList.remove('pressed');
        });

        container.addEventListener('mouseleave', () => {
            container.classList.remove('pressed');
        });
    }

    if (telephoneInput) {
        telephoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Убираем все нецифровые символы
            if (!value.startsWith('7')) {
                value = '7' + value; // Добавляем префикс 7, если его нет
            }
            // Форматируем значение
            let formattedValue = '+7 ';
            if (value.length > 1) {
                formattedValue += value.substring(1, 4); // Код города
            }
            if (value.length >= 4) {
                formattedValue += '-' + value.substring(4, 7); // Первая часть номера
            }
            if (value.length >= 7) {
                formattedValue += '-' + value.substring(7, 9); // Вторая часть номера
            }
            if (value.length >= 9) {
                formattedValue += '-' + value.substring(9, 11); // Последняя часть номера
            }
            // Устанавливаем отформатированное значение
            e.target.value = formattedValue;
        });

        telephoneInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                e.target.dataset.deleting = true; // Флаг для обработки удаления
            } else {
                e.target.dataset.deleting = false;
            }
        });
    }

    // Обработчик отправки формы
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем стандартную отправку формы
            const name = nameInput.value.trim();
            const telephone = telephoneInput.value.trim();
            if (name && telephone) {
                container.classList.add('accepted');
                contactForm.reset(); // Сбрасываем форму
            } else {
                alert('Пожалуйста, заполните все поля.');
            }
        });
    }
});

