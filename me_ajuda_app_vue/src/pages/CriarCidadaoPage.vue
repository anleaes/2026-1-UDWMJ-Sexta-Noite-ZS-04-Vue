<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Novo Cidadão</div>

    <CidadaoForm :loading="saving" @salvar="handleSave" @voltar="voltar" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CidadaoForm from 'src/components/CidadaoForm.vue'
import { cidadaosService } from 'src/services/cidadaosService'

const router = useRouter()

const saving = ref(false)

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    await cidadaosService.create({
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
