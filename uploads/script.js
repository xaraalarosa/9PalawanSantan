// Handle picture uploads
document.getElementById('pictureForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('picture', document.getElementById('pictureInput').files[0]);

    fetch('/upload-picture', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        document.getElementById('uploadedPicture').src = URL.createObjectURL(document.getElementById('pictureInput').files[0]);
        document.getElementById('uploadedPicture').style.display = 'block';
    });
});

// Post confessions
document.getElementById('confessionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const confessionText = document.getElementById('confessionText').value;

    fetch('/confession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: confessionText })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        loadConfessions();
    });
});

// Load confessions
function loadConfessions() {
    fetch('/confessions')
        .then(response => response.json())
        .then(confessions => {
            const confessionList = document.getElementById('confessionList');
            confessionList.innerHTML = confessions.map(confession => `<p>${confession.text}</p>`).join('');
        });
}

// Load confessions on page load
loadConfessions();

// Handle grade calculator
document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const quizGrade = parseFloat(document.getElementById('quizGrade').value);
    const taskGrade = parseFloat(document.getElementById('taskGrade').value);
    const assessmentGrade = parseFloat(document.getElementById('assessmentGrade').value);

    // Calculate the final grade using the weights
    const finalGrade = (quizGrade * 0.30) + (taskGrade * 0.40) + (assessmentGrade * 0.30);

    // Display the final grade
    document.getElementById('finalGrade').textContent = `Your Final Grade is: ${finalGrade.toFixed(2)}`;
});

// Load lessons
const lessons = [
    { title: "Lesson 1: Introduction to Algebra", description: "This lesson covers the basics of algebra including variables, expressions, and equations." },
    { title: "Lesson 2: Geometry Basics", description: "Understand the core concepts of geometry, including points, lines, angles, and shapes." },
    { title: "Lesson 3: Advanced Calculus", description: "Dive deep into calculus topics such as differentiation and integration." },
    // Add more lessons as needed
];

// Dynamically load lessons into the container
const lessonsContainer = document.getElementById('lessonsContainer');
lessons.forEach(lesson => {
    const lessonCard = document.createElement('div');
    lessonCard.classList.add('lesson-card');
    
    lessonCard.innerHTML = `
        <h3>${lesson.title}</h3>
        <p>${lesson.description}</p>
    `;
    
    lessonsContainer.appendChild(lessonCard);
});
