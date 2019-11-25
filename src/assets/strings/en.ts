export default {
  // 共通
  common: {
    additional: (additional: string) => `Posted at ${additional}  `,
    by: 'by ',
    save: 'save',
    update: 'update',
    cancel: 'cancel',
    textErrorEmpty: '入力してください。',
  },
  header: {
    title: 'StackOverflow Clone (React)',
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
  questionCreate: {
    title: 'Title',
    body: 'Body',
    create: 'Submit',
    postQuestion: 'Post a question',
    notLoginBody: 'Please login to contribute a question.',
  },
  question: {
    answer: '回答する',
    answerNumber: (number: number) => `${number}件の回答`,
    loginToComment: 'コメントするにはログインしてください。',
    loginToAnswer: '回答するにはログインしてください。',
    commentAdd: 'コメントを追加',
    post: 'post',
  },
} as const
