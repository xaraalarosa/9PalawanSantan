//Sidebar Menu
function toggleMenu() {
    var sidebar = document.querySelector('.sidebar');
    var menuIcon = document.querySelector('.menu-icon');
    sidebar.classList.toggle('active');
    menuIcon.classList.toggle('open');
}

//Gallery
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('pictureGallery');

    function loadImages() {
        fetch('/images') // Endpoint to fetch the list of images
            .then(response => response.json())
            .then(images => {
                gallery.innerHTML = ''; // Clear existing images
                images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = `/resources/gallery_images/${image}`; // Actual path to your images
                    img.alt = 'Gallery Image';
                    gallery.appendChild(img);
                });
            })
            .catch(error => console.error('Error loading images:', error));
    }

    loadImages(); // Load images on page load
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

    // Get user inputs
    const quizGrade = parseFloat(document.getElementById('quizGrade').value);
    const maxQuizGrade = parseFloat(document.getElementById('maxQuizGrade').value);
    const taskGrade = parseFloat(document.getElementById('taskGrade').value);
    const maxTaskGrade = parseFloat(document.getElementById('maxTaskGrade').value);
    const assessmentGrade = parseFloat(document.getElementById('assessmentGrade').value);
    const maxAssessmentGrade = parseFloat(document.getElementById('maxAssessmentGrade').value);

    // Calculate percentage grades
    const quizPercentage = (quizGrade / maxQuizGrade) * 100;
    const taskPercentage = (taskGrade / maxTaskGrade) * 100;
    const assessmentPercentage = (assessmentGrade / maxAssessmentGrade) * 100;

    // Calculate final grade
    const finalGrade = (quizPercentage * 0.30) + (taskPercentage * 0.40) + (assessmentPercentage * 0.30);
    
    // Display final grade
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
