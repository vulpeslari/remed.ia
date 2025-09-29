const API_URL = 'http://127.0.0.1:5000'; 

export async function ask(token, question) {
    const res = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, question })
    });
    return await res.json();
}

export async function createPatient(patientData) {
    const res = await fetch(`${API_URL}/create_pacient`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
    });
    return await res.json();
}

export async function getPatients() {
    const res = await fetch(`${API_URL}/get_pacients`);
    return await res.json();
}

export async function getPatient(id) {
    const res = await fetch(`${API_URL}/get_pacient/${id}`);
    return await res.json();
}

export async function createAppointment(data) {
    const res = await fetch(`${API_URL}/create_appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function getAppointments() {
    const res = await fetch(`${API_URL}/get_appointments`);
    return await res.json();
}

export async function getAppointment(idPaciente) {
    const res = await fetch(`${API_URL}/get_appointment/${idPaciente}`);
    return await res.json();
}

export async function createHospitalization(data) {
    const res = await fetch(`${API_URL}/create_hospitalization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function getHospitalizationsByPatient(idPaciente) {
    const res = await fetch(`${API_URL}/get_hospitalization/${idPaciente}`);
    return await res.json();
}
