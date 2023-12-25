document.addEventListener('DOMContentLoaded', () => {
    const shortenForm = document.getElementById('shortenForm');
    const shortenedLinkDiv = document.getElementById('shortenedLink');

    shortenForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const originalLink = document.getElementById('originalLink').value;

        try {
            const response = await fetch('/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalLink }),
            });

            const data = await response.json();
            shortenedLinkDiv.innerHTML = `<p>Shortened Link: <a href="${data.shortenedLink}" target="_blank">${data.shortenedLink}</a></p>`;
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

    