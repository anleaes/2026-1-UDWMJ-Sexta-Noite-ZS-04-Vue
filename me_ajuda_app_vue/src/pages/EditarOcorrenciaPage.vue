<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Ocorrência</div>

    <div v-if="loadingData" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <OcorrenciaForm
      is-edit
      :dados-iniciais="dadosOcorrencia"
      :loading="saving"
      @salvar="handleSave"
      @voltar="voltar"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { ocorrenciasService } from 'src/services/ocorrenciasService'
import OcorrenciaForm from 'src/components/OcorrenciaForm.vue'

const router = useRouter()
const route = useRoute()

const dadosOcorrencia = ref({})
const ocorrenciaId = route.params.id

const loadingData = ref(true)
const saving = ref(false)

onMounted(async () => {
  try {
    const data = await ocorrenciasService.getById(ocorrenciaId)

    dadosOcorrencia.value = {
      titulo: data.titulo || '',
      endereco: data.endereco || '',
      numero: data.numero || '',
      complemento: data.complemento || '',
      descricao: data.descricao || '',
      status: data.status || 'ABE',
      cidadaoId: data.cidadao ? String(data.cidadao) : '',
      servicoId: data.servico ? String(data.servico) : '',
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    alert('Erro ao carregar a ocorrência.')
    router.push({ name: 'Ocorrencias' })
  } finally {
    loadingData.value = false
  }
})

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    const payload = {
      titulo: dadosForm.titulo,
      endereco: dadosForm.endereco,
      numero: dadosForm.numero || null,
      complemento: dadosForm.complemento || null,
      descricao: dadosForm.descricao,
      status: dadosForm.status,
      cidadao: parseInt(dadosForm.cidadaoId),
      servico: parseInt(dadosForm.servicoId),
    }

    if (dadosForm.status === 'FEC') {
      payload.fechado_em = new Date().toISOString()
    } else {
      payload.fechado_em = null
    }

    await ocorrenciasService.update(ocorrenciaId, payload)

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
