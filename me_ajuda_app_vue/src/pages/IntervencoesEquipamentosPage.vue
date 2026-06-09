<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold text-center text-grey-9 q-mb-md">
      Alocações de Equipamentos
    </div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else>
      <InfoCard
        v-for="item in intervencoesEquipamentos"
        :key="item.id"
        :id="item.id"
        :nome="`Alocação #${item.id}`"
        :subtitulo="`Intervenção: ${item.intervencao} | Equipamento: ${item.equipamento}`"
        :dados="{
          'Horas de Uso': item.horas_usado,
          'Custo Total': `R$ ${Number(item.custo_total).toFixed(2)}`,
        }"
        @editar="irParaEdicao"
        @excluir="excluirAlocacao"
      />
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="indigo-9" @click="irParaCriacao" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import InfoCard from 'components/InfoCard.vue'

const router = useRouter()
const intervencoesEquipamentos = ref([])
const loading = ref(true)

const fetchIntervencoesEquipamentos = async () => {
  loading.value = true
  try {
    const response = await api.get('equipamentos_intervencao/api/')
    intervencoesEquipamentos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar alocações:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchIntervencoesEquipamentos()
})

const excluirAlocacao = async (id) => {
  try {
    await api.delete(`equipamentos_intervencao/api/${id}/`)
    intervencoesEquipamentos.value = intervencoesEquipamentos.value.filter((i) => i.id !== id)
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  }
}

const irParaEdicao = (id) => {
  router.push({ name: 'EditarIntervencaoEquipamento', params: { id } })
}

const irParaCriacao = () => {
  router.push({ name: 'CriarIntervencaoEquipamento' })
}
</script>
