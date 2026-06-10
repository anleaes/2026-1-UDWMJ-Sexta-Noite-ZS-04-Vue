import { api } from 'boot/axios'

export const equipamentosService = { 
    async getAll() {
        const response = await api.get('equipamentos/api/') 
        return response.data
    },

    async getById(id) {
        const response = await api.get(`equipamentos/api/${id}/`) 
        return response.data
    },

    async create(payload) {
        const response = await api.post('equipamentos/api/', payload) 
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`equipamentos/api/${id}/`, payload) 
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`equipamentos/api/${id}/`) 
        return response.data
    }
}