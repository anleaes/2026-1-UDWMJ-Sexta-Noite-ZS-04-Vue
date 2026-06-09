const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Telas do Menu
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: 'servicos', name: 'Servicos', component: () => import('pages/ServicosPage.vue') },
      { path: 'funcionarios', name: 'Funcionarios', component: () => import('pages/FuncionariosPage.vue') },

      // Telas "Ocultas" (Exemplo de Criar e Editar)
      {path:'servicos/criar', name: 'CriarServico', component: () => import('pages/CriarServicoPage.vue') },
      // { path: 'cidadaos/editar/:id', name: 'EditarCidadao', component: () => import('pages/EditarCidadaoScreen.vue') },

      // ... Adicione as demais rotas seguindo esta lógica
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes