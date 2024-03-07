document.getElementById('submit').addEventListener('click', async function() {
    // Disable the submit button to prevent multiple requests
    document.getElementById('submit').disabled = true;

    var prompt = document.getElementById('prompt').value;

    // Send the prompt to your server
    try {
        const response = await fetch('http://localhost:3000/getResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from the server');
        }

        const data = await response.json();

        // Display the response on the website
        document.getElementById('response').textContent = data.response;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Re-enable the submit button after receiving the response
        document.getElementById('submit').disabled = false;
    }
});