<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">
      Detalhes do Protocolo
    </div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="q-gutter-md">
      <q-input
        outlined
        v-model="protocolo.protocolo_numero"
        label="Número do Protocolo"
        readonly
        class="bg-grey-2"
      />

      <q-input
        outlined
        v-model="protocolo.gerado_em"
        label="Data de Geração"
        readonly
        class="bg-grey-2"
      />

      <q-input
        outlined
        v-model="protocolo.prazo"
        label="Prazo Estimado"
        readonly
        class="bg-grey-2"
      />

      <q-input
        outlined
        v-model="protocolo.ocorrencia"
        label="ID da Ocorrência"
        readonly
        class="bg-grey-2"
      />

      <div class="row q-mt-xl">
        <q-btn color="grey-7" label="Voltar" @click="voltar" class="full-width" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from 'boot/axios'

const router = useRouter()
const route = useRoute()

const protocoloId = route.params.id
const loading = ref(true)

const protocolo = ref({
  protocolo_numero: '',
  gerado_em: '',
  prazo: '',
  ocorrencia: '',
})

onMounted(async () => {
  try {
    const response = await api.get(`protocolos/api/${protocoloId}/`)
    const data = response.data

    protocolo.value.protocolo_numero = data.protocolo_numero || ''
    protocolo.value.gerado_em = data.gerado_em
      ? data.gerado_em.split('T')[0].split('-').reverse().join('/')
      : ''
    protocolo.value.prazo = data.prazo ? data.prazo.split('-').reverse().join('/') : ''
    protocolo.value.ocorrencia = data.ocorrencia ? String(data.ocorrencia) : ''
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    alert('Erro ao carregar os detalhes do protocolo.')
    voltar()
  } finally {
    loading.value = false
  }
})

const voltar = () => {
  router.push({ name: 'Ocorrencias' })
}
</script>
