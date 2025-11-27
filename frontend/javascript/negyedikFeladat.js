document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('option1voteBtn').addEventListener('click', vote1);
    document.getElementById('option2voteBtn').addEventListener('click', vote2);
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


const vote1 = async () => {
    try {
        const response = await postMethodFetch('/api/vote' , {
            option1: ,
            option2: 
        });
        console.log(response);
    } catch (error) {
        console.error('Hiba: ' +error);
    }
};

const vote2 = async () => {
    try {

    } catch (error) {
        console.error('Hiba: ' +error);
    }
};