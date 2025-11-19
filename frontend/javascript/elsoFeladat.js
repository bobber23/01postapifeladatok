document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendMsg').addEventListener('click', sendMsg);
});

const postMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) //szöveggé alakítja a JSON objektumot
        });
        if (!response.ok) {
            throw new Error('GET hiba: ' + response.status + ' ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw new Error('Hiba történt: ' + error.message);
    }
};

const sendMsg = async () => {
    try {
        const sender = document.getElementById('sender').value;
        const message = document.getElementById('message').value;

        if (sender !== '' || message !== '') {
            const response = await postMethodFetch('/api/sendMessage' , {
                sender: sender,
                message: message
            });

            document.getElementById('answer').innerText = response.message;
        }
    } catch (error) {
        console.error('Hiba: ' +error);
    }
};