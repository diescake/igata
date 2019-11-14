export default {
  // 共通
  common: {
    additional: (additional: string) => `Posted at ${additional}  `,
    by: 'by ',
  },
  header: {
    title: 'StackoverFlowClone',
    login: 'login',
    logout: 'Logout',
  },
  top: {
    title: 'See questions',
    question: 'question',
  },
  user: {
    title: 'User details',
    questionList: 'Question list',
    answerList: 'Answer list',
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
  question: {
    answer: '回答する',
    answerNumber: (number: number) => `${number}件の回答`,
    loginToComment: 'コメントするにはログインしてください。',
    loginToAnswer: '回答するにはログインしてください。',
  },
} as const
