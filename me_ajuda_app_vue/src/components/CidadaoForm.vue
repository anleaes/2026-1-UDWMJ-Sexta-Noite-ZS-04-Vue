<template>
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
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.sobrenome"
      label="Sobrenome *"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.cpf"
      label="CPF *"
      mask="###.###.###-##"
      unmasked-value
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.email"
      label="E-mail *"
      type="email"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.userId"
      label="ID do User *"
      type="number"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <div
      class="text-h6 text-weight-bold q-mt-lg q-mb-sm q-pb-xs"
      style="color: #4b7be5; border-bottom: 1px solid #eee"
    >
      Dados do Cidadão
    </div>

    <q-input
      outlined
      v-model="form.fone"
      label="Telefone *"
      type="tel"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.endereco"
      label="Endereço *"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.cep"
      label="CEP *"
      mask="#####-###"
      unmasked-value
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.bairro"
      label="Bairro *"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

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

    <div style="height: 40px"></div>
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
      fone: '',
      endereco: '',
      cep: '',
      bairro: '',
    }),
  },
  loading: {
    type: Boolean,
    default: false,
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
