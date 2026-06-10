<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Novo Funcionário</div>

    <FuncionarioForm
      :loading="saving"
      :funcoes-options="funcoesOptions"
      @salvar="handleSave"
      @voltar="voltar"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { funcionariosService } from 'src/services/funcionariosService'
import FuncionarioForm from 'src/components/FuncionarioForm.vue'

const router = useRouter()
const saving = ref(false)

const funcoesOptions = ref([
  { label: 'Técnico', value: 'TEC' },
  { label: 'Gestor', value: 'GES' },
])

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

    await funcionariosService.create(payload)

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
