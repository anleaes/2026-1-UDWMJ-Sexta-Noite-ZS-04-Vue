<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Nova Intervenção</div>

    <IntervencaoForm :loading="saving" @salvar="handleSave" @voltar="voltar" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import IntervencaoForm from 'src/components/IntervencaoForm.vue'
import { intervencoesService } from 'src/services/intervencoesService'

const router = useRouter()
const saving = ref(false)

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

    await intervencoesService.create(payload)

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
