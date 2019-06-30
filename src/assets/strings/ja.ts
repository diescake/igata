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
