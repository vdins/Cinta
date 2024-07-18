const questions = [
    {
        question: "Apa yang paling Anda cintai?",
        options: ["Keluarga", "Pacar", "Anime", "Lainnya"]
    },
    {
        question: "Siapa yang paling Anda sayangi?",
        options: ["Orang Tua", "Pacar", "My BestFriendO", "Lainnya"]
    },
    {
        question: "Apa kenangan terindah Anda?",
        options: ["Bukber", "Pernikahan", "Bersama Pacar", "Lainnya"]
    },
    {
        question: "Apa yang membuat Anda bahagia?",
        options: ["Musik", "Olahraga", "Nonton Anime", "Lainnya"]
    },
    {
        question: "Apa impian terbesar Anda?",
        options: ["Karir", "Keluarga", "Kesehatan", "Lainnya"]
    },
    {
        question: "Siapakah orang yang Anda cinta?",
        options: ["Orang Tua", "Pasangan", "Bro/Sis", "Lainnya"]
    },
    {
        question: "Kapan tanggal lahir Anda?",
        options: []
    },
    {
        question: "Apa keluh kesah Anda?",
        options: ["Pekerjaan", "Kesehatan", "Keuangan", "Lainnya"]
    }
];

let currentQuestionIndex = 0;

document.getElementById('startButton').addEventListener('click', function() {
    var name = document.getElementById('nameInput').value;
    if (name) {
        document.getElementById('userName').textContent = name;
        document.getElementById('nameContainer').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'block';
    } else {
        alert('Silakan masukkan nama Anda.');
    }
});

document.getElementById('loveButton').addEventListener('click', function() {
    document.getElementById('message').textContent = '';
    var audio = document.getElementById('backsound');
    audio.play();
    document.getElementById('questionContainer').style.display = 'block';
    showQuestion();
});

document.getElementById('submitLove').addEventListener('click', function() {
    var loveValue = this.getAttribute('data-value') === 'lainnya' ? document.getElementById('loveInput').value : this.getAttribute('data-value');
    submitAnswer(loveValue);
});

document.getElementById('submitDate').addEventListener('click', function() {
    const year = document.getElementById('yearSelect').value;
    const month = document.getElementById('monthSelect').value;
    const day = document.getElementById('daySelect').value;
    const birthDate = new Date(year, month - 1, day);
    const age = calculateAge(birthDate);
    submitAnswer(`Tanggal lahir: ${year}-${month}-${day} (Umur: ${age} tahun)`);
});

document.getElementById('submitFeedback').addEventListener('click', function() {
    const feedback = document.getElementById('feedbackInput').value;
    if (feedback) {
        sendFeedbackToDiscord(feedback);
        document.getElementById('feedbackContainer').style.display = 'none';
        document.getElementById('message').textContent = 'Terima kasih atas masukkannya!';
    } else {
        alert('Silakan masukkan masukkan Anda.');
    }
});

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        document.getElementById('questionText').textContent = questionData.question;
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';

        if (questionData.question === "Kapan tanggal lahir Anda?") {
            document.getElementById('dateInputContainer').style.display = 'flex';
            document.getElementById('customInputContainer').style.display = 'none';
            document.getElementById('submitLove').style.display = 'none';
        } else {
            document.getElementById('dateInputContainer').style.display = 'none';
            questionData.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option';
                button.textContent = option;
                button.setAttribute('data-value', option.toLowerCase());
                button.addEventListener('click', function() {
                    if (option.toLowerCase() === 'lainnya') {
                        document.getElementById('customInputContainer').style.display = 'flex';
                        document.getElementById('submitLove').setAttribute('data-value', 'lainnya');
                    } else {
                        document.getElementById('customInputContainer').style.display = 'none';
                        document.getElementById('submitLove').style.display = 'block';
                        document.getElementById('submitLove').setAttribute('data-value', option);
                        submitAnswer(option);
                    }
                });
                optionsContainer.appendChild(button);
            });
        }
    } else {
        document.getElementById('questionContainer').style.display = 'none';
        const cakeContainer = document.getElementById('cakeContainer');
        if (cakeContainer) {
            cakeContainer.style.display = 'block';
        }
        document.getElementById('feedbackContainer').style.display = 'block';
    }
}

function submitAnswer(answer) {
    var userName = document.getElementById('userName').textContent;
    document.getElementById('message').textContent = userName + ', Anda sangat luar biasa karena mencintai ' + answer + '!';
    sendToDiscord(userName, answer);
    currentQuestionIndex++;
    showQuestion();
}

function sendToDiscord(userName, answer) {
    const webhookUrl = "https://discordapp.com/api/webhooks/1263478424572526673/k3RaZoh63Ce1eF7Mo32HpQiMbeK8WgN5zuppt28SZNLQJcBzecNf_KQSxozhoLnUWhU7";
    const payload = {
        content: `${userName} menjawab: ${answer}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (!response.ok) {
            console.error('Error sending message to Discord:', response.statusText);
        }
    }).catch(error => {
        console.error('Error sending message to Discord:', error);
    });
}

function sendFeedbackToDiscord(feedback) {
    const userName = document.getElementById('userName').textContent;
    const webhookUrl = "https://discordapp.com/api/webhooks/1263487788951802036/7r_libKd4b1Vi4xH4V1kLaZMJwf33UF7AFAuaG3v7eD99JpO9uGjfRWND3awZ1cEKe_W";
    const payload = {
        content: `Masukkan ${userName} : ${feedback}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (!response.ok) {
            console.error('Error sending feedback to Discord:', response.statusText);
        }
    }).catch(error => {
        console.error('Error sending feedback to Discord:', error);
    });
}

document.getElementById('yesButton').addEventListener('click', function() {
    window.location.href = 'https://wa.me/6283895152817?text=Halo%20Fahrie,%20saya%20ingin%20kue!';
});

document.getElementById('noButton').addEventListener('mouseover', function() {
    this.style.position = 'absolute';
    this.style.top = Math.random() * (window.innerHeight - this.offsetHeight) + 'px';
    this.style.left = Math.random() * (window.innerWidth - this.offsetWidth) + 'px';
});

function populateDateSelectors() {
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const daySelect = document.getElementById('daySelect');

    for (let year = 1900; year <= 2050; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    }

    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }
}

function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

populateDateSelectors();