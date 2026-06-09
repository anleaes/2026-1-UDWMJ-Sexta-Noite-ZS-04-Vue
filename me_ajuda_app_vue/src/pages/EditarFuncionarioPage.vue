<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Funcionário</div>

    <div v-if="loadingData" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <q-form v-else @submit.prevent="handleSave" class="q-gutter-md">
      <div class="text-h6 text-primary q-mt-lg q-pb-xs" style="border-bottom: 1px solid #eee">
        Dados Básicos
      </div>

      <q-input
        outlined
        v-model="form.nome"
        label="Nome *"
        :rules="[(val) => !!val || 'Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.sobrenome"
        label="Sobrenome *"
        :rules="[(val) => !!val || 'Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.cpf"
        label="CPF *"
        mask="###.###.###-##"
        unmasked-value
        :rules="[(val) => !!val || 'Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.email"
        label="E-mail *"
        type="email"
        :rules="[(val) => !!val || 'Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.userId"
        label="ID do User *"
        type="number"
        :rules="[(val) => !!val || 'Obrigatório']"
      />

      <div class="text-h6 text-primary q-mt-lg q-pb-xs" style="border-bottom: 1px solid #eee">
        Dados do Funcionário
      </div>

      <q-input
        outlined
        v-model="form.secretarias"
        label="Secretarias (IDs, separados por vírgula) *"
        placeholder="Ex: 1, 2, 3"
        :rules="[(val) => !!val || 'Obrigatório']"
      />

      <q-input
        outlined
        v-model="form.registro"
        label="Registro (Matrícula) *"
        :rules="[(val) => !!val || 'Obrigatório']"
      />

      <q-select
        outlined
        v-model="form.funcao"
        :options="funcoesOptions"
        label="Função"
        emit-value
        map-options
      />

      <q-toggle v-model="form.ativo" label="Funcionário Ativo?" color="primary" class="q-mt-md" />

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

const funcionarioId = route.params.id

const loadingData = ref(true)
const saving = ref(false)

const form = ref({
  nome: '',
  sobrenome: '',
  cpf: '',
  email: '',
  userId: '',
  secretarias: '',
  registro: '',
  funcao: 'TEC',
  ativo: true,
})

const funcoesOptions = [
  { label: 'Técnico (TEC)', value: 'TEC' },
  { label: 'Gestor (GES)', value: 'GES' },
]

onMounted(async () => {
  try {
    const response = await api.get(`funcionarios/api/${funcionarioId}/`)
    const data = response.data

    form.value.nome = data.nome || ''
    form.value.sobrenome = data.sobrenome || ''
    form.value.cpf = data.cpf || ''
    form.value.email = data.email || ''
    form.value.userId = data.user ? String(data.user) : ''
    form.value.registro = data.registro || ''
    form.value.funcao = data.funcao || 'TEC'
    form.value.ativo = data.ativo !== undefined ? data.ativo : true
    form.value.secretarias = data.secretarias ? data.secretarias.join(', ') : ''
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    alert('Erro ao carregar o funcionário.')
    voltar()
  } finally {
    loadingData.value = false
  }
})

const handleSave = async () => {
  saving.value = true

  try {
    const payload = {
      nome: form.value.nome,
      sobrenome: form.value.sobrenome,
      cpf: form.value.cpf,
      email: form.value.email,
      user: parseInt(form.value.userId),
      registro: form.value.registro,
      funcao: form.value.funcao,
      ativo: form.value.ativo,
      secretarias: form.value.secretarias
        .split(',')
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n)),
    }

    await api.put(`funcionarios/api/${funcionarioId}/`, payload)

    router.push({ name: 'Funcionarios' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Funcionarios' })
}
</script>
