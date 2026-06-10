<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Novo Serviço</div>

    <ServicoForm :loading="saving" @salvar="handleSave" @voltar="voltar" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import ServicoForm from 'src/components/ServicoForm.vue'
import { servicosService } from 'src/services/servicosService'

const router = useRouter()

const saving = ref(false)

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    await servicosService.create({
      nome: dadosForm.nome,
      descricao: dadosForm.descricao,
      nivel_prioridade: dadosForm.nivel_prioridade,
      secretaria: dadosForm.secretaria,
    })

    router.push({ name: 'Servicos' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Servicos' })
}
</script>
