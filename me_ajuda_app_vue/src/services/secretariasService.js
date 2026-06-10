import { api } from 'boot/axios'

export const secretariasService = { //trocar de acordo com o app
    async getAll() {
        const response = await api.get('secretarias/api/') 
        return response.data
    },

    async getById(id) {
        const response = await api.get(`secretarias/api/${id}/`) 
        return response.data
    },

    async create(payload) {
        const response = await api.post('secretarias/api/', payload) 
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`secretarias/api/${id}/`, payload) 
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`secretarias/api/${id}/`) 
        return response.data
    }
}