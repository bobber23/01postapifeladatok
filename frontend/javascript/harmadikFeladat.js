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
        const nev = document.getElementById('name').value;

        if (nev !== '') {
            const response = await postMethodFetch('/api/names' , {
                name: nev
            });
            const select = document.getElementById('names');
            const option = document.createElement('option');
            option.innerHTML = nev;
            select.appendChild(option);
        }
        const input = document.getElementById('name');
        input.value = "";
    } catch (error) {
        console.error('Hiba: ' +error);
    }
};