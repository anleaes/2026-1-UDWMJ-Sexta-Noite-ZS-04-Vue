<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-md text-grey-9">Serviços</div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="q-pb-xl">
      <q-card
        v-for="item in servicos"
        :key="item.id"
        class="q-mb-md shadow-2"
        style="background-color: #f0f4ff; border-radius: 10px"
      >
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="text-h6 text-weight-bold text-grey-10 col">
              {{ item.nome }}
            </div>
            <q-badge
              color="warning"
              text-color="brown-10"
              class="text-weight-bold q-px-sm q-py-xs"
              style="border-radius: 12px; font-size: 12px"
            >
              Prioridade: {{ item.nivel_prioridade }}
            </q-badge>
          </div>

          <div class="text-subtitle2 text-weight-medium text-grey-8 q-mt-xs">ID: {{ item.id }}</div>
          <div class="text-body2 text-grey-7 q-mt-sm q-mb-sm">
            {{ item.descricao }}
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pt-none">
          <q-btn
            unelevated
            style="background-color: #4b7be5; color: white"
            class="q-mr-sm"
            label="Editar"
            @click="irParaEdicao(item)"
          />
          <q-btn
            unelevated
            style="background-color: #e54848; color: white"
            label="Excluir"
            @click="handleDelete(item.id)"
          />
        </q-card-actions>
      </q-card>
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
