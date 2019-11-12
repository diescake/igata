export default {
  header: {
    title: 'StackoverFlowClone',
    login: 'login',
    logout: 'Logout',
  },
  top: {
    title: 'See questions',
    question: 'question',
  },
  question: {
    additional: (additional: string) => `Posted at ${additional} by `,
  },
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
    passwordErrorInvalid: 'Invalid password',
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
  questionCreate: {
    title: 'Question',
    create: 'Submit',
    notLogin: 'Please login to contribute a question.',
  },
} as const
