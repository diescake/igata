export default {
  login: {
    title: 'Login',
    login: 'login',
    id: 'User ID:',
    idPlaceholder: 'ID',
    idErrorEmpty: 'Required',
    idErrorInvalid: 'Invalid email address',
    password: 'Password:',
    passwordPlaceholder: 'Password',
    passwordErrorEmpty: 'Required',
  },
  todoApp: {
    title: 'TODO Application',
    name: 'TOP',
    newTodo: 'Add TODO',
    addTodo: 'Add',
    placeholder: 'Enter your TODO',
    fetchTodos: 'Fetch TODOs',
    logout: 'Logout',
    loginMessage: (userId: string) => `Login user: ${userId}`,
    dateMessage: 'Date',
  },
  footer: {
    twitter: {
      label: 'Twitter',
      url: 'https://twitter.com/diescake',
    },
    github: {
      label: 'GitHub',
      url: 'https://github.com/diescake/igata',
    },
  },
} as const
