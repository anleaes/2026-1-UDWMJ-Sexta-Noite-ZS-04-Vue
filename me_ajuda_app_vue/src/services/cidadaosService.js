import { api } from 'boot/axios'

export const cidadaosService = { 
    async getAll() {
        const response = await api.get('cidadaos/api/') 
        return response.data
    },

    async getById(id) {
        const response = await api.get(`cidadaos/api/${id}/`) 
        return response.data
    },

    async create(payload) {
        const response = await api.post('cidadaos/api/', payload) 
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`cidadaos/api/${id}/`, payload) 
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`cidadaos/api/${id}/`) 
        return response.data
    }
}