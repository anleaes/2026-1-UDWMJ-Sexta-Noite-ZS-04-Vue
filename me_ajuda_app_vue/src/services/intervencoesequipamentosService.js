import { api } from 'boot/axios'

export const intervencoesequipamentosService = { 
    async getAll() {
        const response = await api.get('intervencoesequipamentos/api/') 
        return response.data
    },

    async getById(id) {
        const response = await api.get(`intervencoesequipamentos/api/${id}/`) 
        return response.data
    },

    async create(payload) {
        const response = await api.post('intervencoesequipamentos/api/', payload) 
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`intervencoesequipamentos/api/${id}/`, payload) 
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`intervencoesequipamentos/api/${id}/`) 
        return response.data
    }
}