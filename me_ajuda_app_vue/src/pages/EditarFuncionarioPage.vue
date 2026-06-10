<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Funcionário</div>

    <div v-if="loadingData" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <FuncionarioForm
      :dados-iniciais="dadosFuncionario"
      :loading="saving"
      :funcoes-options="funcoesOptions"
      @salvar="handleSave"
      @voltar="voltar"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { funcionariosService } from 'src/services/funcionariosService'
import FuncionarioForm from 'src/components/FuncionarioForm.vue'

const router = useRouter()
const route = useRoute()

const dadosFuncionario = ref({})

const funcionarioId = route.params.id

const loadingData = ref(true)
const saving = ref(false)

const funcoesOptions = ref([
  { label: 'Técnico', value: 'TEC' },
  { label: 'Gestor', value: 'GES' },
])

onMounted(async () => {
  try {
    const data = await funcionariosService.getById(funcionarioId)

    dadosFuncionario.value = {
      nome: data.nome || '',
      sobrenome: data.sobrenome || '',
      cpf: data.cpf || '',
      email: data.email || '',
      userId: data.user ? String(data.user) : '',
      registro: data.registro || '',
      funcao: data.funcao || 'TEC',
      ativo: data.ativo !== undefined ? data.ativo : true,
      secretarias: data.secretarias ? data.secretarias.join(', ') : '',
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    alert('Erro ao carregar o funcionário.')
    voltar()
  } finally {
    loadingData.value = false
  }
})

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    const payload = {
      nome: dadosForm.nome,
      sobrenome: dadosForm.sobrenome,
      cpf: dadosForm.cpf,
      email: dadosForm.email,
      user: parseInt(dadosForm.userId),
      registro: dadosForm.registro,
      funcao: dadosForm.funcao,
      ativo: dadosForm.ativo,
      secretarias: dadosForm.secretarias
        .split(',')
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n)),
    }

    await funcionariosService.update(funcionarioId, payload)

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
