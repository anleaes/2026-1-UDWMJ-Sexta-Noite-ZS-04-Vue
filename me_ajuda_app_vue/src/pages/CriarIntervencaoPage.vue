<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Nova Intervenção</div>

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
          v-model="form.dataExec"
          label="Data de Execução *"
          mask="##/##/####"
          placeholder="DD/MM/AAAA"
          class="col-12 col-sm-6"
          :rules="[
            (val) => !!val || 'Campo obrigatório',
            (val) => val.length === 10 || 'Data inválida',
          ]"
        />
        <q-input
          outlined
          v-model="form.custoTrab"
          label="Custo do Trabalho *"
          type="number"
          prefix="R$"
          step="0.01"
          class="col-12 col-sm"
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </div>

      <div class="row q-gutter-sm">
        <q-input
          outlined
          v-model="form.ocorrenciaId"
          label="ID da Ocorrência *"
          type="number"
          class="col"
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
        <q-input
          outlined
          v-model="form.funcionarioId"
          label="ID do Funcionário *"
          type="number"
          class="col"
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </div>

      <q-input
        outlined
        v-model="form.relato"
        label="Relato *"
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
  dataExec: '',
  relato: '',
  custoTrab: '',
  ocorrenciaId: '',
  funcionarioId: '',
})

const handleSave = async () => {
  saving.value = true

  try {
    const payload = {
      titulo: form.value.titulo,
      data_exec: form.value.dataExec.split('/').reverse().join('-'),
      relato: form.value.relato,
      custo_trab: parseFloat(form.value.custoTrab),
      ocorrencia: parseInt(form.value.ocorrenciaId),
      funcionario: parseInt(form.value.funcionarioId),
    }

    await api.post('intervencoes/api/', payload)

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
