import { api } from 'boot/axios'

export const intervencoesEquipamentosService = {
    async getAll() {
        const response = await api.get('equipamentos_intervencao/api/')
        return response.data
    },

    async getById(id) {
        const response = await api.get(`equipamentos_intervencao/api/${id}/`)
        return response.data
    },

    async create(payload) {
        const response = await api.post('equipamentos_intervencao/api/', payload)
        return response.data
    },

    async update(id, payload) {
        const response = await api.put(`equipamentos_intervencao/api/${id}/`, payload)
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`equipamentos_intervencao/api/${id}/`)
        return response.data
    }
}