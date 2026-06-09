<template>
  <q-card class="q-mb-md shadow-2" style="background-color: #f0f4ff; border-radius: 10px" bordered>
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-h6 text-weight-bold text-grey-9 col">
          {{ nome }}
        </div>
        <slot name="badge"></slot>
      </div>

      <div v-if="subtitulo" class="text-subtitle2 text-primary text-weight-medium q-mt-xs">
        {{ subtitulo }}
      </div>

      <div class="q-mt-md" v-if="dados && Object.keys(dados).length > 0">
        <div
          v-for="(valor, label) in dados"
          :key="label"
          class="text-subtitle2 text-grey-8 q-mb-xs"
        >
          <span class="text-weight-bold text-grey-9">{{ label }}:</span> {{ valor }}
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right" class="q-pt-none">
      <slot name="acoes-extras"></slot>
      <q-btn
        unelevated
        style="background-color: #4b7be5; color: white"
        label="Editar"
        size="sm"
        @click="$emit('editar', id)"
      />
      <q-btn
        unelevated
        style="background-color: #e54848; color: white"
        label="Excluir"
        size="sm"
        @click="$emit('excluir', id)"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  id: { type: [Number, String], required: true },
  nome: { type: String, required: true },
  subtitulo: { type: String, default: '' },
  dados: { type: Object, default: () => ({}) },
})

defineEmits(['editar', 'excluir'])
</script>
