<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Intervenção</div>

    <div v-if="loadingData" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <IntervencaoForm
      :dados-iniciais="dadosIntervencao"
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
import IntervencaoForm from 'src/components/IntervencaoForm.vue'
import { intervencoesService } from 'src/services/intervencoesService'

const router = useRouter()
const route = useRoute()

const dadosIntervencao = ref({})

const intervencaoId = route.params.id

const loadingData = ref(true)
const saving = ref(false)

onMounted(async () => {
  try {
    const data = await intervencoesService.getById(intervencaoId)

    dadosIntervencao.value = {
      titulo: data.titulo || '',
      dataExec: data.data_exec ? data.data_exec.split('-').reverse().join('/') : '',
      relato: data.relato || '',
      custoTrab: data.custo_trab ? String(data.custo_trab) : '',
      ocorrenciaId: data.ocorrencia ? String(data.ocorrencia) : '',
      funcionarioId: data.funcionario ? String(data.funcionario) : '',
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    alert('Erro ao carregar a intervenção.')
    voltar()
  } finally {
    loadingData.value = false
  }
})

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    const payload = {
      titulo: dadosForm.titulo,
      data_exec: dadosForm.dataExec.split('/').reverse().join('-'),
      relato: dadosForm.relato,
      custo_trab: parseFloat(dadosForm.custoTrab),
      ocorrencia: parseInt(dadosForm.ocorrenciaId),
      funcionario: parseInt(dadosForm.funcionarioId),
    }

    await intervencoesService.update(intervencaoId, payload)

    router.push({ name: 'Intervencoes' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Intervencoes' })
}
</script>
