const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Telas do Menu
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: 'servicos', name: 'Servicos', component: () => import('pages/ServicosPage.vue') },
      { path: 'secretarias', name: 'Secretarias', component: () => import('pages/SecretariasPage.vue') },
      {path: 'cidadaos', name: 'Cidadaos', component: () => import('pages/CidadaosPage.vue') },
      { path: 'funcionarios', name: 'Funcionarios', component: () => import('pages/FuncionariosPage.vue') },
      // Telas "Ocultas" (Exemplo de Criar e Editar)
      { path: 'servicos/criar', name: 'CriarServico', component: () => import('pages/CriarServicoPage.vue') },
      { path: 'servicos/editar', name: 'EditarServico', component: () => import('pages/EditarServicoPage.vue') },
      { path: 'secretarias/criar', name: 'CriarSecretaria', component: () => import('pages/CriarSecretariaPage.vue') },
      { path: 'funcionarios/criar', name: 'CriarFuncionario', component: () => import('pages/CriarFuncionarioPage.vue') },

      { path: 'secretarias/editar', name: 'EditarSecretaria', component: () => import('pages/EditarSecretariaPage.vue') },
      { path: 'cidadaos/criar', name: 'CriarCidadao', component: () => import('pages/CriarCidadaopage.vue') },
      // ... Adicione as demais rotas seguindo esta lógica
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes