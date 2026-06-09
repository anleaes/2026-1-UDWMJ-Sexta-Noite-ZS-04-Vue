<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold text-center text-grey-9 q-mb-md">
      Ocorrências
    </div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else>
      <q-card
        v-for="item in ocorrencias"
        :key="item.id"
        class="q-mb-md bg-blue-1 shadow-2"
        bordered
      >
        <q-card-section>
          <div class="row justify-between items-center q-mb-sm">
            <div class="text-h6 text-weight-bold text-indigo-10" style="flex: 1;">
              {{ item.titulo }}
            </div>
            <q-badge :color="corDoStatus(item.status)" class="text-weight-bold q-pa-sm">
              {{ formatarStatus(item.status) }}
            </q-badge>
          </div>

          <div class="text-subtitle2 text-grey-8">
            <span class="text-weight-bold">Criada em:</span> {{ formatarData(item.criado_em) }}
          </div>
          <div v-if="item.fechado_em" class="text-subtitle2 text-grey-8">
            <span class="text-weight-bold">Fechada em:</span> {{ formatarData(item.fechado_em) }}
          </div>
          <div class="text-subtitle2 text-grey-8">
            <span class="text-weight-bold">ID:</span> {{ item.id }}
          </div>
          <div class="text-subtitle2 text-grey-8">
            <span class="text-weight-bold">Endereço:</span> {{ item.endereco }}, {{ item.numero || 'S/N' }}
          </div>
          
          <div class="text-body2 text-grey-7 q-mt-sm ellipsis-2-lines">
            {{ item.descricao }}
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pt-none q-gutter-sm">
          <q-btn
            color="info"
            label="Editar"
            size="sm"
            @click="irParaEdicao(item.id)"
          />
          <q-btn
            color="negative"
            label="Excluir"
            size="sm"
            @click="excluirOcorrencia(item.id)"
          />
          <q-btn
            color="positive"
            label="Visualizar Protocolo"
            size="sm"
            @click="visualizarProtocolo(item.id)"
          />
        </q-card-actions>
      </q-card>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="indigo-9"
        @click="irParaCriacao"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'

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
    ocorrencias.value = ocorrencias.value.filter(o => o.id !== id)
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
    case 'ABE': return 'Aberta'
    case 'AND': return 'Em Andamento'
    case 'FEC': return 'Fechada'
    default: return status
  }
}

const corDoStatus = (status) => {
  switch (status) {
    case 'ABE': return 'negative' // Vermelho
    case 'AND': return 'warning'  // Laranja/Amarelo
    case 'FEC': return 'positive' // Verde
    default: return 'grey'
  }
}

const formatarData = (dataIso) => {
  if (!dataIso) return ''
  return dataIso.split('T')[0].split('-').reverse().join('/')
}
</script>