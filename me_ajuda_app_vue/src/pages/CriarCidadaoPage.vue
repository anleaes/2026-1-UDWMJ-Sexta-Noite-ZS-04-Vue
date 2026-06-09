<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">
      Novo Cidadão
    </div>

    <q-form @submit="handleSave" class="q-gutter-md">
      
      <div class="text-h6 text-weight-bold q-mt-lg q-mb-sm q-pb-xs" style="color: #4B7BE5; border-bottom: 1px solid #eee;">
        Dados Básicos
      </div>

      <q-input
        outlined
        v-model="form.nome"
        label="Nome *"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o nome']"
      />

      <q-input
        outlined
        v-model="form.sobrenome"
        label="Sobrenome *"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o sobrenome']"
      />

      <q-input
        outlined
        v-model="form.cpf"
        label="CPF *"
        type="number"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o CPF']"
      />

      <q-input
        outlined
        v-model="form.email"
        label="E-mail *"
        type="email"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o e-mail']"
      />

      <q-input
        outlined
        v-model="form.userId"
        label="ID do User *"
        type="number"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o ID do usuário']"
      />


      <div class="text-h6 text-weight-bold q-mt-lg q-mb-sm q-pb-xs" style="color: #4B7BE5; border-bottom: 1px solid #eee;">
        Dados do Cidadão
      </div>

      <q-input
        outlined
        v-model="form.fone"
        label="Telefone *"
        type="tel"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o telefone']"
      />

      <q-input
        outlined
        v-model="form.endereco"
        label="Endereço *"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o endereço']"
      />

      <q-input
        outlined
        v-model="form.cep"
        label="CEP *"
        type="number"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o CEP']"
      />

      <q-input
        outlined
        v-model="form.bairro"
        label="Bairro *"
        lazy-rules
        :rules="[val => !!val || 'Por favor, preencha o bairro']"
      />

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
      
      <div style="height: 40px;"></div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

// Agrupamos todos os campos em um único objeto form
const form = ref({
  nome: '',
  sobrenome: '',
  cpf: '',
  email: '',
  fone: '',
  endereco: '',
  cep: '',
  bairro: '',
  userId: ''
});

const saving = ref(false);

// Substitui o useFocusEffect: Zera o formulário sempre que a tela é montada
onMounted(() => {
  form.value = {
    nome: '',
    sobrenome: '',
    cpf: '',
    email: '',
    fone: '',
    endereco: '',
    cep: '',
    bairro: '',
    userId: ''
  };
});

const handleSave = async () => {
  saving.value = true;

  try {
    const res = await fetch('http://localhost:8000/cidadaos/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.value.nome,
        sobrenome: form.value.sobrenome,
        cpf: form.value.cpf,
        email: form.value.email,
        user: parseInt(form.value.userId), // Converte para int conforme original
        fone: form.value.fone,
        endereco: form.value.endereco,
        cep: form.value.cep,
        bairro: form.value.bairro
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
      message: 'Cidadão salvo com sucesso!'
    });

    // Navega de volta para a lista
    router.push({ name: 'Cidadaos' });
    
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro de conexão com a API.'
    });
  } finally {
    saving.value = false;
  }
};

const voltar = () => {
  router.push({ name: 'Cidadaos' });
};
</script>