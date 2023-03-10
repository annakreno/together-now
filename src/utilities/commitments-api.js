import sendRequest from "./send-request";

const BASE_URL = '/api/commitments';

export function getAll() {
    return sendRequest(BASE_URL);
}

export function createCommitment(formData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', formData)
}

export function updateCommitment(formData) {
    return sendRequest(`${BASE_URL}/${formData._id}/edit`, 'POST', formData)
}

// export function getById(id) {
//     return sendRequest(`${BASE_URL}/${id}`);
// }