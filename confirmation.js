document.addEventListener('DOMContentLoaded', (event) => {
    const finalizeButton = document.getElementById('finalize-button');
    loadBasicData();
    loadSubjects();

    finalizeButton.addEventListener('click', () => {
        alert('Datos confirmados exitosamente.');
        localStorage.clear();
    });

    function loadBasicData() {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const data = JSON.parse(savedData);
            document.getElementById('nombre').innerText = `Nombre: ${data.nombre}`;
            document.getElementById('provincia').innerText = `Provincia: ${data.provincia}`;
            document.getElementById('ciudad').innerText = `Ciudad: ${data.ciudad}`;
            document.getElementById('sector').innerText = `Sector: ${data.sector}`;
            document.getElementById('calle').innerText = `Calle: ${data.calle}`;
            document.getElementById('carrera').innerText = `Carrera: ${data.carrera}`;
        }
    }

    function loadSubjects() {
        const savedSubjects = localStorage.getItem('selectedSubjects');
        if (savedSubjects) {
            const subjects = JSON.parse(savedSubjects);
            const tableBody = document.getElementById('subjects-table-body');
            subjects.forEach(subject => {
                const row = document.createElement('tr');
                const subjectCell = document.createElement('td');
                subjectCell.innerText = subject.subject;
                row.appendChild(subjectCell);

                const scheduleCells = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(day => {
                    const cell = document.createElement('td');
                    if (subject.schedule.includes(day)) {
                        cell.innerText = subject.schedule.split(' ').slice(1).join(' ');
                    }
                    return cell;
                });

                scheduleCells.forEach(cell => row.appendChild(cell));
                tableBody.appendChild(row);
            });
        }
    }
});
