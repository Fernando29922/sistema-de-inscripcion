document.addEventListener('DOMContentLoaded', (event) => {
    const subjectsContainer = document.getElementById('subjects-container');
    const acceptButton = document.getElementById('accept-button');
    const backLink = document.getElementById('back-link');

    const subjects = {
        software: [
            { name: 'Fundamento de Programación', schedules: ['Lu 18:00 - 20:00', 'Ma 18:00 - 20:00, Sa 9:00 - 12:00', 'Mi 18:00 - 22:00'] },
            { name: 'Programación 1', schedules: ['Lu 18:00 - 20:00', 'Ma 18:00 - 20:00', 'Mi 18:00 - 22:00'] }
        ],
        multimedia: [
            { name: 'Diseño Gráfico', schedules: ['Lu 18:00 - 20:00', 'Ma 18:00 - 20:00, Sa 9:00 - 12:00', 'Mi 18:00 - 22:00'] },
            { name: 'Animación 3D', schedules: ['Lu 18:00 - 20:00', 'Ma 18:00 - 20:00', 'Mi 18:00 - 22:00'] }
        ],
        mecatronica: [
            { name: 'Electrónica Básica', schedules: ['Lu 18:00 - 20:00', 'Ma 18:00 - 20:00, Sa 9:00 - 12:00', 'Mi 18:00 - 22:00'] },
            { name: 'Robótica', schedules: ['Lu 18:00 - 20:00', 'Ma 18:00 - 20:00', 'Mi 18:00 - 22:00'] }
        ],
        redes: [
            { name: 'Redes 1', schedules: ['Lu 18:00 - 20:00', 'Ma 18:00 - 20:00, Sa 9:00 - 12:00', 'Mi 18:00 - 22:00'] },
            { name: 'Redes 2', schedules: ['Lu 18:00 - 20:00', 'Ma 18:00 - 20:00', 'Mi 18:00 - 22:00'] }
        ]
    };

    // Load subjects based on selected career
    loadSubjects();

    backLink.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    acceptButton.addEventListener('click', () => {
        saveSelectedSubjects();
        window.location.href = 'confirmation.html';
    });

    function loadSubjects() {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const data = JSON.parse(savedData);
            const selectedCareer = data['carrera'];
            const selectedSubjects = subjects[selectedCareer];

            selectedSubjects.forEach(subject => {
                const subjectDiv = document.createElement('div');
                subjectDiv.className = 'card mb-3';

                const subjectHeader = document.createElement('div');
                subjectHeader.className = 'card-header';
                subjectHeader.innerText = subject.name;
                subjectDiv.appendChild(subjectHeader);

                const subjectBody = document.createElement('div');
                subjectBody.className = 'card-body';
                subject.schedules.forEach(schedule => {
                    const scheduleOption = document.createElement('div');
                    scheduleOption.className = 'form-check';
                    const scheduleInput = document.createElement('input');
                    scheduleInput.className = 'form-check-input';
                    scheduleInput.type = 'radio';
                    scheduleInput.name = subject.name;
                    scheduleInput.value = schedule;
                    scheduleOption.appendChild(scheduleInput);
                    const scheduleLabel = document.createElement('label');
                    scheduleLabel.className = 'form-check-label';
                    scheduleLabel.innerText = schedule;
                    scheduleOption.appendChild(scheduleLabel);
                    subjectBody.appendChild(scheduleOption);
                });
                subjectDiv.appendChild(subjectBody);
                subjectsContainer.appendChild(subjectDiv);
            });
        }
    }

    function saveSelectedSubjects() {
        const selectedSubjects = [];
        const subjectCards = subjectsContainer.querySelectorAll('.card');
        subjectCards.forEach(card => {
            const subjectName = card.querySelector('.card-header').innerText;
            const selectedSchedule = card.querySelector('input[type="radio"]:checked');
            if (selectedSchedule) {
                selectedSubjects.push({ subject: subjectName, schedule: selectedSchedule.value });
            }
        });
        localStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));
    }
});