<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">
      Nova Alocação de Equipamentos
    </div>

    <CriarIntervencaoEquipamentoForm :loading="saving" @salvar="handleSave" @voltar="voltar" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import CriarIntervencaoEquipamentoForm from 'src/components/CriarIntervencaoEquipamentoForm.vue'
import { intervencoesEquipamentosService } from 'src/services/intervencoesequipamentosService'

const router = useRouter()
const saving = ref(false)

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    for (const item of dadosForm.alocacao) {
      const payload = {
        intervencao: parseInt(dadosForm.intervencaoId),
        equipamento: parseInt(item.equipamento),
        horas_usado: parseInt(item.horas_usado),
        custo_total: parseFloat(item.custo_total),
      }

      await intervencoesEquipamentosService.create(payload)
    }

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
