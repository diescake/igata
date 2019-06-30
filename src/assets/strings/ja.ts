export default {
  login: {
    title: 'ログイン',
    login: 'ログイン',
    idPlaceholder: 'ID',
    passwordPlaceholder: 'パスワード',
  },
  todoApp: {
    title: 'TODO アプリ',
    name: 'TOP',
    newTodo: 'TODO を追加',
    addTodo: '⇧',
    placeholder: 'TODO を入力してください',
    fetchTodos: 'TODO を取得',
    login: 'ログイン',
    logout: 'ログアウト',
    loginMessage: (userId: string) => `ログインユーザ: ${userId}`,
    dateMessage: '時刻',
  },
  footer: {
    author: '作者',
    twitterBaseUrl: 'https://twitter.com',
    followMe: (account: string) => `フォロー歓迎！ Twitter: ${account}`,
  },
} as const
