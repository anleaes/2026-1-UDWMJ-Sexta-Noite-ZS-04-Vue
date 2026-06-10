<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold text-center text-grey-9 q-mb-md">Intervenções</div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else>
      <InfoCard
        v-for="item in intervencoes"
        :key="item.id"
        :id="item.id"
        :nome="item.titulo"
        :dados="{
          ID: item.id,
          'Data da Execução': formatarData(item.data_exec),
          Custo: `R$ ${Number(item.custo_trab).toFixed(2).replace('.', ',')}`,
          Relato: limitarTexto(item.relato, 100),
        }"
        @editar="irParaEdicao"
        @excluir="excluirIntervencao"
      />
    </div>

    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn fab icon="add" color="indigo-9" @click="irParaCriacao" />
    </q-page-sticky>

    <div style="height: 80px"></div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import InfoCard from 'components/InfoCard.vue'

const router = useRouter()
const intervencoes = ref([])
const loading = ref(true)

const fetchIntervencoes = async () => {
  loading.value = true
  try {
    const response = await api.get('intervencoes/api/')
    intervencoes.value = response.data
  } catch (error) {
    console.error('Erro ao buscar intervenções:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchIntervencoes()
})

const excluirIntervencao = async (id) => {
  try {
    await api.delete(`intervencoes/api/${id}/`)
    intervencoes.value = intervencoes.value.filter((i) => i.id !== id)
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  }
}

const irParaEdicao = (id) => {
  router.push({ name: 'EditarIntervencao', params: { id } })
}

const irParaCriacao = () => {
  router.push({ name: 'CriarIntervencao' })
}

const formatarData = (dataOriginal) => {
  if (!dataOriginal) return ''
  return dataOriginal.split('-').reverse().join('/')
}

const limitarTexto = (texto, limite) => {
  if (!texto) return ''
  if (texto.length <= limite) return texto
  return texto.substring(0, limite) + '...'
}
</script>
