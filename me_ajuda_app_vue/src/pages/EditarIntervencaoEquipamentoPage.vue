<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">
      Editar Alocação de Equipamento
    </div>

    <div v-if="loadingData" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <EditarIntervencaoEquipamentoForm
      :dados-iniciais="dadosAlocacao"
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
import EditarIntervencaoEquipamentoForm from 'src/components/EditarIntervencaoEquipamentoForm.vue'
import { intervencoesEquipamentosService } from 'src/services/intervencoesequipamentosService'

const router = useRouter()
const route = useRoute()

const alocacaoId = route.params.id
const dadosAlocacao = ref({})

const loadingData = ref(true)
const saving = ref(false)

onMounted(async () => {
  try {
    const data = await intervencoesEquipamentosService.getById(alocacaoId)

    dadosAlocacao.value = {
      intervencaoId: data.intervencao ? String(data.intervencao) : '',
      equipamentoId: data.equipamento ? String(data.equipamento) : '',
      horasUsado: data.horas_usado ? String(data.horas_usado) : '',
      custoTotal: data.custo_total ? String(data.custo_total) : '',
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    alert('Erro ao carregar a alocação.')
    router.push({ name: 'IntervencoesEquipamentos' })
  } finally {
    loadingData.value = false
  }
})

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    const payload = {
      intervencao: parseInt(dadosForm.intervencaoId),
      equipamento: parseInt(dadosForm.equipamentoId),
      horas_usado: parseInt(dadosForm.horasUsado),
      custo_total: parseFloat(String(dadosForm.custoTotal).replace(',', '.')),
    }

    await intervencoesEquipamentosService.update(alocacaoId, payload)

    router.push({ name: 'IntervencoesEquipamentos' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'IntervencoesEquipamentos' })
}
</script>
