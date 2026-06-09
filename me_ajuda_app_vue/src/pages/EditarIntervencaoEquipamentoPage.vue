<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">
      Editar Alocação de Equipamento
    </div>

    <div v-if="loadingData" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <q-form v-else @submit.prevent="handleSave" class="q-gutter-md">
      <q-input
        outlined
        v-model="form.intervencaoId"
        label="ID da Intervenção *"
        type="number"
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />

      <q-input
        outlined
        v-model="form.equipamentoId"
        label="ID do Equipamento *"
        type="number"
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />

      <div class="row q-gutter-sm">
        <q-input
          outlined
          v-model="form.horasUsado"
          label="Horas Usado *"
          type="number"
          class="col"
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
        <q-input
          outlined
          v-model="form.custoTotal"
          label="Custo Total (R$) *"
          type="number"
          step="0.01"
          class="col"
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </div>

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

const alocacaoId = route.params.id

const loadingData = ref(true)
const saving = ref(false)

const form = ref({
  intervencaoId: '',
  equipamentoId: '',
  horasUsado: '',
  custoTotal: '',
})

onMounted(async () => {
  try {
    const response = await api.get(`equipamentos_intervencao/api/${alocacaoId}/`)
    const data = response.data

    form.value.intervencaoId = data.intervencao ? String(data.intervencao) : ''
    form.value.equipamentoId = data.equipamento ? String(data.equipamento) : ''
    form.value.horasUsado = data.horas_usado ? String(data.horas_usado) : ''
    form.value.custoTotal = data.custo_total ? String(data.custo_total) : ''
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    alert('Erro ao carregar a alocação.')
    voltar()
  } finally {
    loadingData.value = false
  }
})

const handleSave = async () => {
  saving.value = true

  try {
    const payload = {
      intervencao: parseInt(form.value.intervencaoId),
      equipamento: parseInt(form.value.equipamentoId),
      horas_usado: parseInt(form.value.horasUsado),
      custo_total: parseFloat(String(form.value.custoTotal).replace(',', '.')),
    }

    await api.put(`equipamentos_intervencao/api/${alocacaoId}/`, payload)

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
