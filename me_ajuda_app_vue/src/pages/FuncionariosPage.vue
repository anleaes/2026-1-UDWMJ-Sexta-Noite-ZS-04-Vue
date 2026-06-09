<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold text-center text-grey-9 q-mb-md">Funcionários</div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else>
      <InfoCard
        v-for="item in funcionarios"
        :key="item.id"
        :id="item.id"
        :nome="`${item.nome} ${item.sobrenome}`"
        :subtitulo="item.funcao"
        :dados="{
          'ID Funcionário': item.id,
          'ID User': item.user,
          'E-mail': item.email,
          CPF: item.cpf,
          Registro: item.registro,
        }"
        @editar="irParaEdicao"
        @excluir="excluirFuncionario"
      />
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="indigo-9" @click="irParaCriacao" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import InfoCard from 'components/InfoCard.vue'
import { funcionariosService } from 'src/services/funcionariosService'

const router = useRouter()
const funcionarios = ref([])
const loading = ref(true)

const fetchFuncionarios = async () => {
  loading.value = true
  try {
    funcionarios.value = await funcionariosService.getAll()
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchFuncionarios()
})

const excluirFuncionario = async (id) => {
  try {
    await funcionariosService.delete(id)
    funcionarios.value = funcionarios.value.filter((f) => f.id !== id)
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  }
}

const irParaEdicao = (id) => {
  router.push({ name: 'EditarFuncionario', params: { id } })
}

const irParaCriacao = () => {
  router.push({ name: 'CriarFuncionario' })
}
</script>
