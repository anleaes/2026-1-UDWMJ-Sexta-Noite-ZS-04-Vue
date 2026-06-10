<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Cidadão</div>

    <CidadaoForm
      :dados-iniciais="dadosCidadao"
      :loading="saving"
      @salvar="handleSave"
      @voltar="voltar"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import CidadaoForm from 'src/components/CidadaoForm.vue'
import { cidadaosService } from 'src/services/cidadaosService'

const router = useRouter()

const dadosCidadao = ref({})
const cidadaoId = ref(null)

const saving = ref(false)

onMounted(() => {
  const stateCidadao = history.state.cidadao

  if (stateCidadao) {
    const cidadao = JSON.parse(stateCidadao)
    cidadaoId.value = cidadao.id

    dadosCidadao.value = {
      nome: cidadao.nome || '',
      sobrenome: cidadao.sobrenome || '',
      cpf: cidadao.cpf || '',
      email: cidadao.email || '',
      fone: cidadao.fone || '',
      endereco: cidadao.endereco || '',
      cep: cidadao.cep || '',
      bairro: cidadao.bairro || '',
      userId: cidadao.user ? String(cidadao.user) : '',
    }
  } else {
    alert('Nenhum dado encontrado para edição.')
    router.push({ name: 'Cidadaos' })
  }
})

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    await cidadaosService.update(cidadaoId.value, {
      nome: dadosForm.nome,
      sobrenome: dadosForm.sobrenome,
      cpf: dadosForm.cpf,
      email: dadosForm.email,
      user: parseInt(dadosForm.userId),
      fone: dadosForm.fone,
      endereco: dadosForm.endereco,
      cep: dadosForm.cep,
      bairro: dadosForm.bairro,
    })
    router.push({ name: 'Cidadaos' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Cidadaos' })
}
</script>
