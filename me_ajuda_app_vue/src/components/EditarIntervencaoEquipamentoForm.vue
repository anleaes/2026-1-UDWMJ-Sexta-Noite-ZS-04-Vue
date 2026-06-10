<template>
  <q-form @submit.prevent="handleSave" class="q-gutter-md">
    <q-input
      outlined
      v-model="form.intervencaoId"
      label="ID da Intervenção *"
      type="number"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.equipamentoId"
      label="ID do Equipamento *"
      type="number"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <div class="row q-gutter-sm">
      <q-input
        outlined
        v-model="form.horasUsado"
        label="Horas Usadas *"
        type="number"
        class="col"
        :rules="[(val) => !!val || 'Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.custoTotal"
        label="Custo Total (R$) *"
        type="number"
        step="0.01"
        class="col"
        :rules="[(val) => !!val || 'Obrigatório']"
      />
    </div>

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
      intervencaoId: '',
      equipamentoId: '',
      horasUsado: '',
      custoTotal: '',
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
