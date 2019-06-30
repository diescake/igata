export default {
  login: {
    title: 'Login',
    login: 'login',
    idPlaceholder: 'ID',
    passwordPlaceholder: 'Password',
  },
  todoApp: {
    title: 'TODO Application',
    name: 'TOP',
    newTodo: 'Add TODO',
    addTodo: '⇧',
    placeholder: 'Enter your TODO',
    fetchTodos: 'Fetch TODOs',
    login: 'login',
    logout: 'Logout',
    loginMessage: (userId: string) => `Login user: ${userId}`,
    dateMessage: 'Date',
  },
  footer: {
    author: 'author',
    twitterBaseUrl: 'https://twitter.com',
    followMe: (account: string) => `Please follow ${account} on Twitter !!`,
  },
} as const
