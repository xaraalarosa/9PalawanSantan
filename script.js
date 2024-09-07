// Picture Posting
document.getElementById('pictureForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('pictureInput');
    const gallery = document.getElementById('pictureGallery');
    const file = fileInput.files[0];
    
    if (file) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        gallery.appendChild(img);
        fileInput.value = ''; // Clear input
    }
});

// Anonymous Confession Space
document.getElementById('confessionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const confessionText = document.getElementById('confessionText').value;
    const confessionList = document.getElementById('confessionList');
    
    const confession = document.createElement('p');
    confession.textContent = confessionText;
    confessionList.appendChild(confession);

    document.getElementById('confessionText').value = ''; // Clear text area
});

// Grade Calculator
document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const quizGrade = parseFloat(document.getElementById('quizGrade').value);
    const taskGrade = parseFloat(document.getElementById('taskGrade').value);
    const assessmentGrade = parseFloat(document.getElementById('assessmentGrade').value);

    const finalGrade = (quizGrade * 0.30) + (taskGrade * 0.40) + (assessmentGrade * 0.30);
    document.getElementById('finalGrade').textContent = 'Your Final Grade: ' + finalGrade.toFixed(2) + '%';
});


// Initial load of confessions
function loadConfessions() {
    fetch('/confessions')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(confessions => {
            const confessionList = document.getElementById('confessionList');
            confessionList.innerHTML = '';
            confessions.forEach(confession => {
                const confessionDiv = document.createElement('div');
                confessionDiv.className = 'confession';
                confessionDiv.innerHTML = `
                    <p>${confession.text}</p>
                    <p class="date">${new Date(confession.createdAt).toLocaleString()}</p>
                `;
                confessionList.appendChild(confessionDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

loadConfessions();
