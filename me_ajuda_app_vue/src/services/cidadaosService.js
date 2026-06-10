import { api } from 'boot/axios'

export const cidadaosService = { //trocar de acordo com o app
    async getAll() {
        const response = await api.get('cidadaos/api/') //trocar de acordo com o app
        return response.data
    },

    async getById(id) {
        const response = await api.get(`cidadaos/api/${id}/`) //trocar de acordo com o app
        return response.data
    },

    async create(payload) {
        const response = await api.post('cidadaos/api/', payload) //trocar de acordo com o app
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`cidadaos/api/${id}/`, payload) //trocar de acordo com o app
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`cidadaos/api/${id}/`) //trocar de acordo com o app
        return response.data
    }
}