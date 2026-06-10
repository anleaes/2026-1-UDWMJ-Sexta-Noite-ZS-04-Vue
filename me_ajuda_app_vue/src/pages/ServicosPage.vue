<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-md text-grey-9">Serviços</div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="q-pb-xl">
      <InfoCard
        v-for="item in servicos"
        :key="item.id"
        :id="item.id"
        :nome="item.nome"
        :dados="{
          ID: item.id,
          Descrição: item.descricao,
        }"
        @editar="irParaEdicao(item)"
        @excluir="handleDelete(item.id)"
      >
        <template #badge>
          <q-badge
            color="warning"
            text-color="brown-10"
            class="text-weight-bold q-px-sm q-py-xs"
            style="border-radius: 12px; font-size: 12px"
          >
            Prioridade: {{ item.nivel_prioridade }}
          </q-badge>
        </template>
      </InfoCard>
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
import InfoCard from 'src/components/InfoCard.vue'

const router = useRouter()
const $q = useQuasar()

const servicos = ref([])
const loading = ref(true)

const fetchServicos = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:8000/servicos/api/')
    const data = await response.json()
    servicos.value = data
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao conectar com a API de serviços.',
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchServicos()
})

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/servicos/api/${id}/`, {
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

    servicos.value = servicos.value.filter((o) => o.id !== id)

    $q.notify({
      type: 'positive',
      message: 'Serviço excluído com sucesso!',
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao excluir o serviço.',
    })
  }
}

const irParaCriacao = () => {
  router.push({ name: 'CriarServico' })
}

const irParaEdicao = (servico) => {
  router.push({
    name: 'EditarServico',
    state: { servico: JSON.stringify(servico) },
  })
}
</script>
