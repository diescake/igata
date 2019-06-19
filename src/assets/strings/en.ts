export default {
  login: {
    title: 'Login',
    login: 'login',
    idPlaceholder: 'ID',
    passwordPlaceholder: 'Password',
  },
  todoApp: {
    title: 'Todo Application',
    name: 'TOP',
    newTodo: 'Add TODO',
    addTodo: '⇧',
    placeholder: 'Enter your todo',
    fetchTodos: 'Fetch Todos',
    login: 'login',
    logout: 'Logout',
    loginMessage: (userId: string) => `Login user: ${userId}`,
    dateMessage: 'Date',
  },
  sfc: {
    name: 'sfc',
    hello: 'Hello from TypeScript and framework!!!',
  },
  footer: {
    author: 'author',
    twitterBaseUrl: 'https://twitter.com',
    followMe: (account: string) => `Please follow ${account} on Twitter !!`,
  },
} as const
