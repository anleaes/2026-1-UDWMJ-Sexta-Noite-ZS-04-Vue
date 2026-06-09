<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Editar Cidadão</div>

    <q-form @submit="handleSave" class="q-gutter-md">
      <div
        class="text-h6 text-weight-bold q-mt-lg q-mb-sm q-pb-xs"
        style="color: #4b7be5; border-bottom: 1px solid #eee"
      >
        Dados Básicos
      </div>

      <q-input
        outlined
        v-model="form.nome"
        label="Nome *"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha o nome']"
      />

      <q-input
        outlined
        v-model="form.sobrenome"
        label="Sobrenome *"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha o sobrenome']"
      />

      <q-input
        outlined
        v-model="form.cpf"
        label="CPF *"
        type="number"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha o CPF']"
      />

      <q-input
        outlined
        v-model="form.email"
        label="E-mail *"
        type="email"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha o e-mail']"
      />

      <q-input
        outlined
        v-model="form.userId"
        label="ID do User *"
        type="number"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha o ID do usuário']"
      />

      <div
        class="text-h6 text-weight-bold q-mt-lg q-mb-sm q-pb-xs"
        style="color: #4b7be5; border-bottom: 1px solid #eee"
      >
        Dados do Cidadão
      </div>

      <q-input outlined v-model="form.fone" label="Telefone" type="tel" />

      <q-input outlined v-model="form.endereco" label="Endereço" />

      <q-input outlined v-model="form.cep" label="CEP" type="number" />

      <q-input outlined v-model="form.bairro" label="Bairro" />

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

      <div style="height: 40px"></div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const cidadaoId = ref(null)

const form = ref({
  nome: '',
  sobrenome: '',
  cpf: '',
  email: '',
  fone: '',
  endereco: '',
  cep: '',
  bairro: '',
  userId: '',
})

const saving = ref(false)

onMounted(() => {
  const stateCidadao = history.state.cidadao

  if (stateCidadao) {
    const cidadao = JSON.parse(stateCidadao)
    cidadaoId.value = cidadao.id
    form.value.nome = cidadao.nome || ''
    form.value.sobrenome = cidadao.sobrenome || ''
    form.value.cpf = cidadao.cpf || ''
    form.value.email = cidadao.email || ''
    form.value.fone = cidadao.fone || ''
    form.value.endereco = cidadao.endereco || ''
    form.value.cep = cidadao.cep || ''
    form.value.bairro = cidadao.bairro || ''
    form.value.userId = cidadao.user ? String(cidadao.user) : ''
  } else {
    $q.notify({
      type: 'warning',
      message: 'Nenhum dado encontrado para edição. Retornando...',
    })
    router.push({ name: 'Cidadaos' })
  }
})

const handleSave = async () => {
  saving.value = true

  try {
    const res = await fetch(`http://localhost:8000/cidadaos/api/${cidadaoId.value}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.value.nome,
        sobrenome: form.value.sobrenome,
        cpf: form.value.cpf,
        email: form.value.email,
        user: parseInt(form.value.userId),
        fone: form.value.fone,
        endereco: form.value.endereco,
        cep: form.value.cep,
        bairro: form.value.bairro,
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
      message: 'Cidadão atualizado com sucesso!',
    })

    router.push({ name: 'Cidadaos' })
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
  router.push({ name: 'Cidadaos' })
}
</script>
