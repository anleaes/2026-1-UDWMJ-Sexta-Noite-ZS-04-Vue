<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Serviço</div>

    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        outlined
        v-model="form.nome"
        label="Nome do Serviço *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Por favor, digite o nome do serviço']"
      />

      <q-input outlined v-model="form.descricao" label="Descrição" type="textarea" />

      <q-input
        outlined
        v-model.number="form.nivel_prioridade"
        label="Nível de Prioridade *"
        type="number"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Por favor, informe a prioridade']"
      />

      <q-input
        outlined
        v-model.number="form.secretaria"
        label="ID da Secretaria *"
        type="number"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Por favor, informe o ID da secretaria']"
      />

      <div class="row justify-end q-mt-xl">
        <q-btn label="Voltar" color="grey-7" flat class="q-mr-sm" @click="voltar" />
        <q-btn label="Atualizar" color="primary" type="submit" :loading="loading" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const servicoId = ref(null)

const form = ref({
  nome: '',
  descricao: '',
  nivel_prioridade: null,
  secretaria: null,
})

const loading = ref(false)

onMounted(() => {
  const stateServico = history.state.servico

  if (stateServico) {
    const servico = JSON.parse(stateServico)
    servicoId.value = servico.id
    form.value.nome = servico.nome
    form.value.descricao = servico.descricao
    form.value.nivel_prioridade = servico.nivel_prioridade
    form.value.secretaria = servico.secretaria
  } else {
    $q.notify({
      type: 'warning',
      message: 'Nenhum dado encontrado para edição. Retornando...',
    })
    router.back()
  }
})

const onSubmit = async () => {
  loading.value = true
  try {
    const response = await fetch(`http://localhost:8000/servicos/api/${servicoId.value}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    $q.notify({
      type: 'positive',
      message: 'Serviço atualizado com sucesso!',
    })

    router.back()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao atualizar o serviço: ' + error.message,
    })
  } finally {
    loading.value = false
  }
}

const voltar = () => {
  router.back()
}
</script>
