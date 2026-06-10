import { api } from 'boot/axios'

export const servicosService = {
    async getAll() {
        const response = await api.get('servicos/api/')
        return response.data
    },

    async getById(id) {
        const response = await api.get(`servicos/api/${id}/`)
        return response.data
    },

    async create(payload) {
        const response = await api.post('servicos/api/', payload)
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`servicos/api/${id}/`, payload)
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`servicos/api/${id}/`)
        return response.data
    }
}