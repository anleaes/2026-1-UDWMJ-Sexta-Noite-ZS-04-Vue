<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Nova Ocorrência</div>

    <q-form @submit.prevent="handleSave" class="q-gutter-md">
      <q-input
        outlined
        v-model="form.titulo"
        label="Título *"
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />

      <div class="row q-gutter-sm">
        <q-input
          outlined
          v-model="form.endereco"
          label="Endereço *"
          class="col-12 col-sm-8"
          :rules="[(val) => !!val || 'Campo obrigatório']"
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
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
        <q-input
          outlined
          v-model="form.servicoId"
          label="ID do Serviço *"
          type="number"
          class="col"
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </div>

      <q-input
        outlined
        v-model="form.descricao"
        label="Descrição *"
        type="textarea"
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />

      <div class="row q-gutter-sm q-mt-xl">
        <q-btn type="submit" color="primary" label="Salvar" :loading="saving" class="col" />
        <q-btn color="grey-7" label="Voltar" @click="voltar" :disable="saving" class="col" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'

const router = useRouter()
const saving = ref(false)

const form = ref({
  titulo: '',
  endereco: '',
  numero: '',
  complemento: '',
  descricao: '',
  cidadaoId: '',
  servicoId: '',
})

const handleSave = async () => {
  saving.value = true

  try {
    const payloadOcorrencia = {
      titulo: form.value.titulo,
      endereco: form.value.endereco,
      numero: form.value.numero || null,
      complemento: form.value.complemento || null,
      descricao: form.value.descricao,
      cidadao: parseInt(form.value.cidadaoId),
      servico: parseInt(form.value.servicoId),
      status: 'ABE',
    }

    const resOcorrencia = await api.post('ocorrencias/api/', payloadOcorrencia)
    const ocorrenciaId = resOcorrencia.data.id

    const agora = new Date()
    const ano = agora.getFullYear()
    const mes = String(agora.getMonth() + 1).padStart(2, '0')
    const dia = String(agora.getDate()).padStart(2, '0')

    const numeroProtocolo = `${ano}${mes}${dia}-${String(ocorrenciaId).padStart(6, '0')}`

    const prazo = new Date(agora)
    prazo.setDate(prazo.getDate() + 15)
    const prazoFormatado = prazo.toISOString().split('T')[0]

    const payloadProtocolo = {
      ocorrencia: ocorrenciaId,
      protocolo_numero: numeroProtocolo,
      gerado_em: agora.toISOString(),
      prazo: prazoFormatado,
    }

    await api.post('protocolos/api/', payloadProtocolo)

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
