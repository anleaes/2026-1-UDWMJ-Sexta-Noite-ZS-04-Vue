<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Nova Secretaria</div>

    <SecretariaForm :loading="saving" @salvar="handleSave" @voltar="voltar" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import SecretariaForm from 'src/components/SecretariaForm.vue'
import { secretariasService } from 'src/services/secretariasService'

const router = useRouter()

const saving = ref(false)

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    await secretariasService.create({
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
