document.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('registrationModal').style.display = 'block';
    });
});

window.onclick = function(event) {
    if (event.target === document.body) {
        document.getElementById('registrationModal').style.display = 'none';
    }
}

// Обработка формы
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        nickname: this.elements[0].value,
        email: this.elements[1].value,
        game: this.elements[2].value
    };
    alert(`Регистрация успешна!\nНик: ${formData.nickname}\nИгра: ${formData.game}`);
    document.getElementById('registrationModal').style.display = 'none';
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация карточек
document.querySelectorAll('.bracket-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2) / 10}deg)
            rotateY(${-(x - rect.width/2) / 10}deg)
            translateY(-10px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});




document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        nickname: this.elements[0].value,
        email: this.elements[1].value,
        game: this.elements[2].value,
        date: new Date().toLocaleDateString(),
        tournament: document.querySelector(`[data-game="${this.elements[2].value}"]`).closest('.bracket-card').querySelector('h3').textContent
    };

    // Сохраняем в LocalStorage
    let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations.push(formData);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Показываем секцию с регистрациями
    document.getElementById('myRegistrations').style.display = 'block';
    updateRegistrationsDisplay();
    
    document.getElementById('registrationModal').style.display = 'none';
    this.reset();
});

// Функция для отображения регистраций
function updateRegistrationsDisplay() {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const container = document.getElementById('registrationsList');
    container.innerHTML = '';

    registrations.forEach(reg => {
        const card = document.createElement('div');
        card.className = 'registration-card';
        card.innerHTML = `
            <img src="${getGameImage(reg.game)}" class="game-image">
            <div>
                <h3>${reg.tournament}</h3>
                <p>Никнейм: ${reg.nickname}</p>
                <p>Дата регистрации: ${reg.date}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Функция для получения изображения игры
function getGameImage(game) {
    const images = {
        'csgo': 'https://coop-land.ru/uploads/posts/2023-10/1697170617_m.jpg',
        'dota2': 'https://business-portal-bucket.s3.amazonaws.com/media/images/41e172c318357d632f53b92d8cb38661_large_cover.original.jpg',
        'valorant': 'https://assets.xboxservices.com/assets/36/b5/36b52fa8-e71b-4435-888a-cecb98d3876a.jpg?n=153142244433_GLP-Page-Hero-0_1083x1222_02.jpg'
    };
    return images[game];
}

// Показываем существующие регистрации при загрузке
window.addEventListener('load', () => {
    if(localStorage.getItem('registrations')) {
        document.getElementById('myRegistrations').style.display = 'block';
        updateRegistrationsDisplay();
    }
});






document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(), // Добавляем уникальный ID
        nickname: this.elements[0].value,
        email: this.elements[1].value,
        game: this.elements[2].value,
        date: new Date().toLocaleDateString(),
        tournament: document.querySelector(`[data-game="${this.elements[2].value}"]`)
                  .closest('.bracket-card').querySelector('h3').textContent
    };

    let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations.push(formData);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    document.getElementById('myRegistrations').style.display = 'block';
    updateRegistrationsDisplay();
    document.getElementById('registrationModal').style.display = 'none';
    this.reset();
});


// Функция для удаления регистрации
function deleteRegistration(id) {
    let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations = registrations.filter(reg => reg.id !== id);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    if(registrations.length === 0) {
        document.getElementById('myRegistrations').style.display = 'none';
    }
    
    updateRegistrationsDisplay();
}

// Обновленная функция отображения регистраций
function updateRegistrationsDisplay() {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const container = document.getElementById('registrationsList');
    container.innerHTML = '';

    registrations.forEach(reg => {
        const card = document.createElement('div');
        card.className = 'registration-card';
        card.innerHTML = `
            <div class="registration-info">
                <img src="${getGameImage(reg.game)}" class="game-image">
                <div>
                    <h3>${reg.tournament}</h3>
                    <p>Никнейм: ${reg.nickname}</p>
                    <p>Дата регистрации: ${reg.date}</p>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteRegistration(${reg.id})">Удалить</button>
        `;
        container.appendChild(card);
    });
}