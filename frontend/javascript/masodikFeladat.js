document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendName').addEventListener('click', sendName);
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

const sendName = async () => {
    try {
        const value = document.getElementById('name').value;

        if (value !== '') {
            const response = await postMethodFetch('/api/saveData' , {
                key: value
            });

            const success = document.getElementById('success');
            success.innerHTML = "Sikeres mentés";
            setTimeout(() => {
                success.innerHTML = '';
                document.getElementById('name').value = '';
            }, 2000);

        }
    } catch (error) {
        console.error('Hiba: ' +error);
    }
};