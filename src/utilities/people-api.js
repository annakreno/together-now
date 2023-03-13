import sendRequest from "./send-request";

const BASE_URL = '/api/people';


export function createPerson(formData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', formData)
}

export function updatePerson(formData) {
    return sendRequest(`${BASE_URL}/${formData._id}/edit`, 'PUT', formData)
}

export function deletePerson(id) {
    return sendRequest(`${BASE_URL}/${id}/delete`, 'DELETE')
}