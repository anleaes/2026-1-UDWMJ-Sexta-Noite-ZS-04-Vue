import { api } from 'boot/axios'

export const intervencoesService = { 
    async getAll() {
        const response = await api.get('intervencoes/api/') 
        return response.data
    },

    async getById(id) {
        const response = await api.get(`intervencoes/api/${id}/`) 
        return response.data
    },

    async create(payload) {
        const response = await api.post('intervencoes/api/', payload) 
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`intervencoes/api/${id}/`, payload) 
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`intervencoes/api/${id}/`) 
        return response.data
    }
}