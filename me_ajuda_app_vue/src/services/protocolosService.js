import { api } from 'boot/axios'

export const protocolosService = {
    async getById(id) {
        const response = await api.get(`protocolos/api/${id}/`)
        return response.data
    },

    async create(payload) {
        const response = await api.post('protocolos/api/', payload)
        return response.data
    }
}