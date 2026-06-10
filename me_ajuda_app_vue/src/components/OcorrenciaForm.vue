<template>
  <q-form @submit.prevent="handleSave" class="q-gutter-md">
    <q-input
      outlined
      v-model="form.titulo"
      label="Título *"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <div class="row q-gutter-sm">
      <q-input
        outlined
        v-model="form.endereco"
        label="Endereço *"
        class="col-12 col-sm-8"
        :rules="[(val) => !!val || 'Obrigatório']"
      />
      <q-input outlined v-model="form.numero" label="Número" type="number" class="col-12 col-sm" />
    </div>

    <q-input outlined v-model="form.complemento" label="Complemento" />

    <div class="row q-gutter-sm">
      <q-input
        outlined
        v-model="form.cidadaoId"
        label="ID do Cidadão *"
        type="number"
        class="col"
        :rules="[(val) => !!val || 'Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.servicoId"
        label="ID do Serviço *"
        type="number"
        class="col"
        :rules="[(val) => !!val || 'Obrigatório']"
      />
    </div>

    <q-select
      v-if="isEdit"
      outlined
      v-model="form.status"
      :options="statusOptions"
      label="Status *"
      emit-value
      map-options
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.descricao"
      label="Descrição *"
      type="textarea"
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
  </q-form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  dadosIniciais: {
    type: Object,
    default: () => ({
      titulo: '',
      endereco: '',
      numero: '',
      complemento: '',
      cidadaoId: '',
      servicoId: '',
      status: 'ABE',
      descricao: '',
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  statusOptions: {
    type: Array,
    default: () => [
      { label: 'Aberta', value: 'ABE' },
      { label: 'Em Andamento', value: 'AND' },
      { label: 'Fechada', value: 'FEC' },
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
