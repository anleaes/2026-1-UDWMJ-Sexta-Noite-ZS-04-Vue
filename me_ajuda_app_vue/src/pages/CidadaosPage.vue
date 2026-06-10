<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-md text-grey-9">Cidadãos</div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else>
      <InfoCard
        v-for="item in cidadaos"
        :key="item.id"
        :id="item.id"
        :nome="`${item.nome} ${item.sobrenome}`"
        :dados="{
          'ID Cidadão': item.id,
          'ID User': item.user,
          'E-mail': item.email,
          CPF: item.cpf,
          Telefone: item.fone,
        }"
        @editar="irParaEdicao(item)"
        @excluir="handleDelete(item.id)"
      />

      <div v-if="cidadaos.length === 0" class="text-center text-grey-6 q-mt-xl">
        Nenhum cidadão encontrado.
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn fab icon="add" color="indigo-9" @click="irParaCriacao" />
    </q-page-sticky>

    <div style="height: 80px"></div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import InfoCard from 'components/InfoCard.vue'

const router = useRouter()
const $q = useQuasar()

const cidadaos = ref([])
const loading = ref(true)

const fetchCidadaos = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:8000/cidadaos/api/')
    const data = await response.json()
    cidadaos.value = data
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao conectar com a API de cidadãos.',
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCidadaos()
})

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/cidadaos/api/${id}/`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const errorData = await res.json()
      $q.notify({
        type: 'negative',
        message: 'Erro de API: ' + JSON.stringify(errorData),
      })
      return
    }

    cidadaos.value = cidadaos.value.filter((u) => u.id !== id)

    $q.notify({
      type: 'positive',
      message: 'Cidadão excluído com sucesso!',
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao excluir o cidadão.',
    })
  }
}

const irParaCriacao = () => {
  router.push({ name: 'CriarCidadao' })
}

const irParaEdicao = (cidadao) => {
  router.push({
    name: 'EditarCidadao',
    state: { cidadao: JSON.stringify(cidadao) },
  })
}
</script>
