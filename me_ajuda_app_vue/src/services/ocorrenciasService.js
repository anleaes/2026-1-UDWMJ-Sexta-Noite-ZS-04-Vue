import { api } from 'boot/axios'

export const ocorrenciasService = { 
    async getAll() {
        const response = await api.get('ocorrencias/api/') 
        return response.data
    },

    async getById(id) {
        const response = await api.get(`ocorrencias/api/${id}/`) 
        return response.data
    },

    async create(payload) {
        const response = await api.post('ocorrencias/api/', payload) 
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`ocorrencias/api/${id}/`, payload) 
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`ocorrencias/api/${id}/`) 
        return response.data
    }
}