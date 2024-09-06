// Picture Posting
document.getElementById('pictureForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('pictureInput');
    const gallery = document.getElementById('pictureGallery');
    const file = fileInput.files[0];

    if (file) {
        // Upload picture to server
        const formData = new FormData();
        formData.append('picture', file);

        fetch('/upload-picture', {
            method: 'POST',
            body: formData
        }).then(response => response.text())
          .then(message => {
              alert(message);
              const img = document.createElement('img');
              img.src = URL.createObjectURL(file);
              gallery.appendChild(img);
              fileInput.value = ''; // Clear input
          })
          .catch(error => console.error('Error:', error));
    }
});

// Load Confessions
function loadConfessions() {
    fetch('/confessions')
        .then(response => response.json())
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

// Anonymous Confession Space
document.getElementById('confessionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const confessionText = document.getElementById('confessionText').value;

    fetch('/confession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: confessionText })
    }).then(response => response.text())
      .then(message => {
          alert(message);
          loadConfessions(); // Reload confessions
      })
      .catch(error => console.error('Error:', error));
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

// Toggle Lessons
function toggleLessons(subjectId) {
    document.querySelectorAll('.lessons-content').forEach(el => {
        if (el.id === subjectId) {
            el.style.display = el.style.display === 'block' ? 'none' : 'block';
        } else {
            el.style.display = 'none';
        }
    });
}
