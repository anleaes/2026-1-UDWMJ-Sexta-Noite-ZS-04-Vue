<template>
  <q-card class="q-mb-md bg-blue-1 shadow-2" bordered>
    <q-card-section>
      <div class="text-h6 text-weight-bold text-grey-9">
        {{ nome }}
      </div>

      <div v-if="subtitulo" class="text-subtitle2 text-primary text-weight-medium q-mt-xs">
        {{ subtitulo }}
      </div>

      <div class="q-mt-md">
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
      <q-btn color="primary" label="Editar" size="sm" @click="$emit('editar', id)" />
      <q-btn color="negative" label="Excluir" size="sm" @click="$emit('excluir', id)" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  id: { type: [Number, String], required: true },
  nome: { type: String, required: true },
  subtitulo: { type: String, default: '' },
  dados: { type: Object, required: true },
})

defineEmits(['editar', 'excluir'])
</script>
