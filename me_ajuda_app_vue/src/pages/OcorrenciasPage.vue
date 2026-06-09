<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold text-center text-grey-9 q-mb-md">Ocorrências</div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else>
      <InfoCard
        v-for="item in ocorrencias"
        :key="item.id"
        :id="item.id"
        :nome="item.titulo"
        :dados="{
          ID: item.id,
          'Criada em': formatarData(item.criado_em),
          ...(item.fechado_em ? { 'Fechada em': formatarData(item.fechado_em) } : {}),
          Endereço: `${item.endereco}, ${item.numero}`,
          Descrição: item.descricao,
        }"
        @editar="irParaEdicao(item.id)"
        @excluir="excluirOcorrencia(item.id)"
      >
        <template #badge>
          <q-badge :color="corDoStatus(item.status)" class="text-weight-bold q-pa-sm">
            {{ formatarStatus(item.status) }}
          </q-badge>
        </template>

        <template #acoes-extras>
          <q-btn
            color="positive"
            label="Visualizar Protocolo"
            size="sm"
            @click="visualizarProtocolo(item.id)"
          />
        </template>
      </InfoCard>
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
const ocorrencias = ref([])
const loading = ref(true)

const fetchOcorrencias = async () => {
  loading.value = true
  try {
    const response = await api.get('ocorrencias/api/')
    ocorrencias.value = response.data
  } catch (error) {
    console.error('Erro ao buscar ocorrências:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOcorrencias()
})

const excluirOcorrencia = async (id) => {
  try {
    await api.delete(`ocorrencias/api/${id}/`)
    ocorrencias.value = ocorrencias.value.filter((o) => o.id !== id)
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  }
}

const visualizarProtocolo = async (ocorrenciaId) => {
  try {
    const response = await api.get(`protocolos/api/?ocorrencia=${ocorrenciaId}`)
    const data = response.data

    if (data && data.length > 0) {
      const protocolo = data[0]
      router.push({ name: 'VerProtocolo', params: { id: protocolo.id } })
    } else {
      alert('Nenhum protocolo encontrado para esta ocorrência.')
    }
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  }
}

const irParaEdicao = (id) => {
  router.push({ name: 'EditarOcorrencia', params: { id } })
}

const irParaCriacao = () => {
  router.push({ name: 'CriarOcorrencia' })
}

const formatarStatus = (status) => {
  switch (status) {
    case 'ABE':
      return 'Aberta'
    case 'AND':
      return 'Em Andamento'
    case 'FEC':
      return 'Fechada'
    default:
      return status
  }
}

const corDoStatus = (status) => {
  switch (status) {
    case 'ABE':
      return 'negative'
    case 'AND':
      return 'warning'
    case 'FEC':
      return 'positive'
    default:
      return 'grey'
  }
}

const formatarData = (dataIso) => {
  if (!dataIso) return ''
  return dataIso.split('T')[0].split('-').reverse().join('/')
}
</script>
