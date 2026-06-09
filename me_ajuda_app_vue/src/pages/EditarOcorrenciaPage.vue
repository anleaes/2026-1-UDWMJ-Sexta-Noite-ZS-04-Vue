<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Ocorrência</div>

    <div v-if="loadingData" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <q-form v-else @submit.prevent="handleSave" class="q-gutter-md">
      <q-input
        outlined
        v-model="form.titulo"
        label="Título *"
        :rules="[(val) => !!val || 'Obrigatório']"
      />

      <div class="row q-gutter-sm">
        <q-input
          outlined
          v-model="form.endereco"
          label="Endereço *"
          class="col-12 col-sm-8"
          :rules="[(val) => !!val || 'Obrigatório']"
        />
        <q-input
          outlined
          v-model="form.numero"
          label="Número"
          type="number"
          class="col-12 col-sm"
        />
      </div>

      <q-input outlined v-model="form.complemento" label="Complemento" />

      <div class="row q-gutter-sm">
        <q-input
          outlined
          v-model="form.cidadaoId"
          label="ID do Cidadão *"
          type="number"
          class="col"
          :rules="[(val) => !!val || 'Obrigatório']"
        />
        <q-input
          outlined
          v-model="form.servicoId"
          label="ID do Serviço *"
          type="number"
          class="col"
          :rules="[(val) => !!val || 'Obrigatório']"
        />
      </div>

      <q-select
        outlined
        v-model="form.status"
        :options="statusOptions"
        label="Status *"
        emit-value
        map-options
        :rules="[(val) => !!val || 'Obrigatório']"
      />

      <q-input
        outlined
        v-model="form.descricao"
        label="Descrição *"
        type="textarea"
        :rules="[(val) => !!val || 'Obrigatório']"
      />

      <div class="row q-gutter-sm q-mt-xl">
        <q-btn
          type="submit"
          color="primary"
          label="Salvar Alterações"
          :loading="saving"
          class="col"
        />
        <q-btn color="grey-7" label="Voltar" @click="voltar" :disable="saving" class="col" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from 'boot/axios'

const router = useRouter()
const route = useRoute()

const ocorrenciaId = route.params.id

const loadingData = ref(true)
const saving = ref(false)

const form = ref({
  titulo: '',
  endereco: '',
  numero: '',
  complemento: '',
  descricao: '',
  status: 'ABE',
  cidadaoId: '',
  servicoId: '',
})

const statusOptions = [
  { label: 'Aberta', value: 'ABE' },
  { label: 'Em Andamento', value: 'AND' },
  { label: 'Fechada', value: 'FEC' },
]

onMounted(async () => {
  try {
    const response = await api.get(`ocorrencias/api/${ocorrenciaId}/`)
    const data = response.data

    form.value.titulo = data.titulo || ''
    form.value.endereco = data.endereco || ''
    form.value.numero = data.numero || ''
    form.value.complemento = data.complemento || ''
    form.value.descricao = data.descricao || ''
    form.value.status = data.status || 'ABE'
    form.value.cidadaoId = data.cidadao ? String(data.cidadao) : ''
    form.value.servicoId = data.servico ? String(data.servico) : ''
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    alert('Erro ao carregar a ocorrência.')
    voltar()
  } finally {
    loadingData.value = false
  }
})

const handleSave = async () => {
  saving.value = true

  try {
    const payload = {
      titulo: form.value.titulo,
      endereco: form.value.endereco,
      numero: form.value.numero || null,
      complemento: form.value.complemento || null,
      descricao: form.value.descricao,
      status: form.value.status,
      cidadao: parseInt(form.value.cidadaoId),
      servico: parseInt(form.value.servicoId),
    }

    if (form.value.status === 'FEC') {
      payload.fechado_em = new Date().toISOString()
    } else {
      payload.fechado_em = null
    }

    await api.put(`ocorrencias/api/${ocorrenciaId}/`, payload)

    router.push({ name: 'Ocorrencias' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Ocorrencias' })
}
</script>
