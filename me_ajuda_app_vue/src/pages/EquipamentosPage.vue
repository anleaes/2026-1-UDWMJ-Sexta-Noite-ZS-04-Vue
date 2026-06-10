<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-md text-grey-9">Equipamentos</div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="q-pb-xl">
      <InfoCard
        v-for="item in equipamentos"
        :key="item.id"
        :id="item.id"
        :nome="item.nome"
        :dados="{
          ID: item.id,
          Descrição: item.descricao,
          'Preço/Hora': `R$ ${Number(item.preco).toFixed(2).replace('.', ',')}`,
        }"
        @editar="irParaEdicao(item)"
        @excluir="handleDelete(item.id)"
      >
        <template #badge>
          <q-badge
            :style="{ backgroundColor: item.disponivel ? '#28a745' : '#6c757d' }"
            text-color="white"
            class="text-weight-bold q-px-sm q-py-xs q-ml-sm"
            style="border-radius: 12px; font-size: 12px"
          >
            {{ item.disponivel ? 'Disponível' : 'Indisponível' }}
          </q-badge>
        </template>
      </InfoCard>

      <div v-if="equipamentos.length === 0" class="text-center text-grey-6 q-mt-xl">
        Nenhum equipamento encontrado.
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

const equipamentos = ref([])
const loading = ref(true)

const fetchEquipamentos = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:8000/equipamentos/api/')
    const data = await response.json()
    equipamentos.value = data
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao conectar com a API de equipamentos.',
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEquipamentos()
})

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/equipamentos/api/${id}/`, {
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

    equipamentos.value = equipamentos.value.filter((e) => e.id !== id)

    $q.notify({
      type: 'positive',
      message: 'Equipamento excluído com sucesso!',
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao excluir o equipamento.',
    })
  }
}

const irParaCriacao = () => {
  router.push({ name: 'CriarEquipamento' })
}

const irParaEdicao = (equipamento) => {
  router.push({
    name: 'EditarEquipamento',
    state: { equipamento: JSON.stringify(equipamento) },
  })
}
</script>
