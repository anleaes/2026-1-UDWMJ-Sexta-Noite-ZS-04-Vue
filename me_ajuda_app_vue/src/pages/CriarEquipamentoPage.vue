<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">
      Novo Equipamento
    </div>

    <q-form @submit="handleSave" class="q-gutter-md">
      
      <q-input
        outlined
        v-model="form.nome"
        label="Nome *"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o nome']"
      />

      <q-input
        outlined
        v-model="form.descricao"
        label="Descrição *"
        type="textarea"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha a descrição']"
      />

      <q-input
        outlined
        v-model="form.preco"
        label="Preço (R$) *"
        type="number"
        step="0.01"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o preço']"
      />

      <div class="row items-center justify-between q-mt-lg q-mb-md q-px-sm">
        <span class="text-subtitle1 text-weight-medium text-grey-9">
          Disponível para uso?
        </span>
        <q-toggle 
          v-model="form.disponivel" 
          color="primary" 
          size="lg"
        />
      </div>

      <div class="column q-mt-xl q-gutter-y-sm">
        <q-btn 
          label="Salvar" 
          style="background-color: #4B7BE5 !important; color: white;"
          type="submit" 
          :loading="saving" 
        />
        <q-btn 
          label="Voltar" 
          style="background-color: #6c757d !important; color: white;" 
          unelevated
          @click="voltar" 
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

// Agrupamos os campos em um objeto reativo
const form = ref({
  nome: '',
  descricao: '',
  preco: '',
  disponivel: true
});

const saving = ref(false);

// Zera o formulário sempre que a tela é montada (substitui o useFocusEffect)
onMounted(() => {
  form.value = {
    nome: '',
    descricao: '',
    preco: '',
    disponivel: true
  };
});

// Função para salvar os dados
const handleSave = async () => {
  saving.value = true;

  try {
    const res = await fetch('http://localhost:8000/equipamentos/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.value.nome,
        descricao: form.value.descricao,
        preco: parseFloat(form.value.preco), // Garante que o preço seja enviado como número/float
        disponivel: form.value.disponivel
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      $q.notify({
        type: 'negative',
        message: 'Erro de API: ' + JSON.stringify(errorData),
      });
      saving.value = false;
      return;
    }
    
    $q.notify({
      type: 'positive',
      message: 'Equipamento salvo com sucesso!'
    });

    // Volta para a lista de equipamentos
    router.push({ name: 'Equipamentos' });
    
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro de conexão com a API.'
    });
  } finally {
    saving.value = false;
  }
};

// Função de voltar
const voltar = () => {
  router.push({ name: 'Equipamentos' });
};
</script>