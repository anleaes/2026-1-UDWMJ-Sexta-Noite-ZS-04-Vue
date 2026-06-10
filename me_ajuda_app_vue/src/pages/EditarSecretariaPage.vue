<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Secretaria</div>

    <SecretariaForm
      :dados-iniciais="dadosSecretaria"
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
import SecretariaForm from 'src/components/SecretariaForm.vue'
import { secretariasService } from 'src/services/secretariasService'

const router = useRouter()

const dadosSecretaria = ref({})
const secretariaId = ref(null)

const saving = ref(false)

onMounted(() => {
  const stateSecretaria = history.state.secretaria

  if (stateSecretaria) {
    const secretaria = JSON.parse(stateSecretaria)
    secretariaId.value = secretaria.id

    dadosSecretaria.value = {
      nome: secretaria.nome,
      sigla: secretaria.sigla,
      site: secretaria.site,
      descricao: secretaria.descricao,
    }
  } else {
    alert('Nenhum dado encontrado para edição.')
    router.push({ name: 'Secretarias' })
  }
})

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    await secretariasService.update(secretariaId.value, {
      nome: dadosForm.nome,
      sigla: dadosForm.sigla,
      site: dadosForm.site,
      descricao: dadosForm.descricao,
    })

    router.push({ name: 'Secretarias' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Secretarias' })
}
</script>
