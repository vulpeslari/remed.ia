const API_URL = "http://127.0.0.1:8000"; 

export const ask = async (userQuery) => {
    const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: userQuery }) 
    });

    const data = await response.json();
    return data.resposta; 
}

