import { api } from 'boot/axios'

export const funcionariosService = {
    async getAll() {
        const response = await api.get('funcionarios/api/')
        return response.data
    },

    async getById(id) {
        const response = await api.get(`funcionarios/api/${id}/`)
        return response.data
    },

    async create(payload) {
        const response = await api.post('funcionarios/api/', payload)
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`funcionarios/api/${id}/`, payload)
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`funcionarios/api/${id}/`)
        return response.data
    }
}