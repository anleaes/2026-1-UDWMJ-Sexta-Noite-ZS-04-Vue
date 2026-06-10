<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Serviço</div>

    <ServicoForm
      :loading="saving"
      :dados-iniciais="dadosServico"
      @salvar="handleSave"
      @voltar="voltar"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import ServicoForm from 'src/components/ServicoForm.vue'
import { servicosService } from 'src/services/servicosService'

const router = useRouter()

const dadosServico = ref({})
const servicoId = ref(null)

const saving = ref(false)

onMounted(() => {
  const stateServico = history.state.servico

  if (stateServico) {
    const servico = JSON.parse(stateServico)
    servicoId.value = servico.id
    dadosServico.value = {
      nome: servico.nome,
      descricao: servico.descricao,
      nivel_prioridade: servico.nivel_prioridade,
      secretaria: servico.secretaria,
    }
  } else {
    alert('Nenhum dado encontrado para edição.')
    router.push({ name: 'Servicos' })
  }
})

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    await servicosService.update(servicoId.value, {
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
