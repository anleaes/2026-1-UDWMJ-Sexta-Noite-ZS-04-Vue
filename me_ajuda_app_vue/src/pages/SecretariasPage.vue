<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-md text-grey-9">Secretarias</div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="q-pb-xl">
      <InfoCard
        v-for="item in secretarias"
        :key="item.id"
        :id="item.id"
        :nome="`${item.nome} (${item.sigla})`"
        :dados="{
          ID: item.id,
          Descrição: item.descricao,
        }"
        @editar="irParaEdicao(item)"
        @excluir="handleDelete(item.id)"
      />

      <div v-if="secretarias.length === 0" class="text-center text-grey-6 q-mt-xl">
        Nenhuma secretaria encontrada.
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn
        fab
        icon="add"
        style="background-color: #0d47a1; color: white"
        @click="irParaCriacao"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import InfoCard from 'components/InfoCard.vue'

const router = useRouter()
const $q = useQuasar()

const secretarias = ref([])
const loading = ref(true)

const fetchSecretarias = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:8000/secretarias/api/')
    const data = await response.json()
    secretarias.value = data
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao conectar com a API de secretarias.',
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSecretarias()
})

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/secretarias/api/${id}/`, {
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

    secretarias.value = secretarias.value.filter((o) => o.id !== id)

    $q.notify({
      type: 'positive',
      message: 'Secretaria excluída com sucesso!',
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao excluir a secretaria.',
    })
  }
}

const irParaCriacao = () => {
  router.push({ name: 'CriarSecretaria' })
}

const irParaEdicao = (secretaria) => {
  router.push({
    name: 'EditarSecretaria',
    state: { secretaria: JSON.stringify(secretaria) },
  })
}
</script>
