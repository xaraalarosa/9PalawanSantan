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
    .then(message => alert(message));
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
    .then(message => alert(message));
});

// Load confessions
fetch('/confessions')
    .then(response => response.json())
    .then(confessions => {
        const confessionList = document.getElementById('confessionList');
        confessionList.innerHTML = confessions.map(confession => `<p>${confession.text}</p>`).join('');
    });
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
    .then(message => alert(message));
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
    .then(message => alert(message));
});

// Load confessions
fetch('/confessions')
    .then(response => response.json())
    .then(confessions => {
        const confessionList = document.getElementById('confessionList');
        confessionList.innerHTML = confessions.map(confession => `<p>${confession.text}</p>`).join('');
    });
