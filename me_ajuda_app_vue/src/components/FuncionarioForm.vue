<template>
  <q-form @submit.prevent="handleSave" class="q-gutter-md">
    <div class="text-h6 text-primary q-mt-lg q-pb-xs" style="border-bottom: 1px solid #eee">
      Dados Básicos
    </div>

    <q-input
      outlined
      v-model="form.nome"
      label="Nome *"
      :rules="[(val) => !!val || 'Campo obrigatório']"
    />

    <q-input
      outlined
      v-model="form.sobrenome"
      label="Sobrenome *"
      :rules="[(val) => !!val || 'Campo obrigatório']"
    />

    <q-input
      outlined
      v-model="form.cpf"
      label="CPF *"
      mask="###.###.###-##"
      unmasked-value
      :rules="[(val) => !!val || 'Campo obrigatório']"
    />

    <q-input
      outlined
      v-model="form.email"
      label="E-mail *"
      type="email"
      :rules="[(val) => !!val || 'Campo obrigatório']"
    />

    <q-input
      outlined
      v-model="form.userId"
      label="ID do User *"
      type="number"
      :rules="[(val) => !!val || 'Campo obrigatório']"
    />

    <div class="text-h6 text-primary q-mt-lg q-pb-xs" style="border-bottom: 1px solid #eee">
      Dados do Funcionário
    </div>

    <q-input
      outlined
      v-model="form.secretarias"
      label="Secretarias (IDs, separados por vírgula) *"
      placeholder="Ex: 1, 2, 3"
      :rules="[(val) => !!val || 'Campo obrigatório']"
    />

    <q-input
      outlined
      v-model="form.registro"
      label="Registro (Matrícula) *"
      :rules="[(val) => !!val || 'Campo obrigatório']"
    />

    <q-select
      outlined
      v-model="form.funcao"
      :options="funcoesOptions"
      label="Função"
      emit-value
      map-options
      :rules="[(val) => !!val || 'Campo obrigatório']"
    />

    <q-toggle v-model="form.ativo" label="Funcionário Ativo?" color="primary" class="q-mt-md" />

    <div class="row q-gutter-sm q-mt-xl">
      <q-btn type="submit" color="primary" label="Salvar" :loading="loading" class="col" />
      <q-btn
        color="grey-7"
        label="Voltar"
        @click="$emit('voltar')"
        :disable="loading"
        class="col"
      />
    </div>
  </q-form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  dadosIniciais: {
    type: Object,
    default: () => ({
      nome: '',
      sobrenome: '',
      cpf: '',
      email: '',
      userId: '',
      secretarias: '',
      registro: '',
      funcao: '',
      ativo: true,
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  funcoesOptions: {
    type: Array,
    default: () => [
      { label: 'Técnico', value: 'TEC' },
      { label: 'Gestor', value: 'GES' },
    ],
  },
})

const emit = defineEmits(['salvar', 'voltar'])

const form = ref({ ...props.dadosIniciais })

watch(
  () => props.dadosIniciais,
  (novosDados) => {
    form.value = { ...novosDados }
  },
  { deep: true, immediate: true },
)

const handleSave = () => {
  emit('salvar', form.value)
}
</script>
