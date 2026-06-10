<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Novo Equipamento</div>

    <EquipamentoForm :loading="saving" @salvar="handleSave" @voltar="voltar" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import EquipamentoForm from 'src/components/EquipamentoForm.vue'
import { equipamentosService } from 'src/services/equipamentosService'

const router = useRouter()

const saving = ref(false)

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    await equipamentosService.create({
      nome: dadosForm.nome,
      descricao: dadosForm.descricao,
      preco: parseFloat(dadosForm.preco),
      disponivel: dadosForm.disponivel,
    })

    router.push({ name: 'Equipamentos' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Equipamentos' })
}
</script>
