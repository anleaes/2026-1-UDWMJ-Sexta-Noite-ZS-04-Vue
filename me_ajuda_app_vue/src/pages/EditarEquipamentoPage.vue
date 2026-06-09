<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Equipamento</div>

    <q-form @submit="handleSave" class="q-gutter-md">
      <q-input
        outlined
        v-model="form.nome"
        label="Nome *"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha o nome']"
      />

      <q-input
        outlined
        v-model="form.descricao"
        label="Descrição *"
        type="textarea"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha a descrição']"
      />

      <q-input
        outlined
        v-model="form.preco"
        label="Preço (R$) *"
        type="number"
        step="0.01"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha o preço']"
      />

      <div class="row items-center justify-between q-mt-lg q-mb-md q-px-sm">
        <span class="text-subtitle1 text-weight-bold text-grey-9"> Disponível para uso? </span>
        <q-toggle v-model="form.disponivel" color="primary" size="lg" />
      </div>

      <div class="column q-mt-xl q-gutter-y-sm">
        <q-btn
          label="Salvar"
          style="background-color: #4b7be5 !important; color: white"
          type="submit"
          :loading="saving"
        />
        <q-btn
          label="Voltar"
          style="background-color: #6c757d !important; color: white"
          unelevated
          @click="voltar"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const equipamentoId = ref(null)

const form = ref({
  nome: '',
  descricao: '',
  preco: '',
  disponivel: true,
})

const saving = ref(false)

onMounted(() => {
  const stateEquipamento = history.state.equipamento

  if (stateEquipamento) {
    const equipamento = JSON.parse(stateEquipamento)
    equipamentoId.value = equipamento.id
    form.value.nome = equipamento.nome || ''
    form.value.descricao = equipamento.descricao || ''
    form.value.preco = equipamento.preco !== undefined ? String(equipamento.preco) : ''
    form.value.disponivel = equipamento.disponivel ?? true
  } else {
    $q.notify({
      type: 'warning',
      message: 'Nenhum dado encontrado para edição. Retornando...',
    })
    router.push({ name: 'Equipamentos' })
  }
})

const handleSave = async () => {
  saving.value = true

  try {
    const res = await fetch(`http://localhost:8000/equipamentos/api/${equipamentoId.value}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.value.nome,
        descricao: form.value.descricao,
        preco: parseFloat(form.value.preco),
        disponivel: form.value.disponivel,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      $q.notify({
        type: 'negative',
        message: 'Erro de API: ' + JSON.stringify(errorData),
      })
      saving.value = false
      return
    }

    $q.notify({
      type: 'positive',
      message: 'Equipamento atualizado com sucesso!',
    })

    router.push({ name: 'Equipamentos' })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro de conexão com a API.',
    })
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Equipamentos' })
}
</script>
