import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

type AccountBase = { login: string; tags: { text: string }[] }
type TypeBasedAccount =
  | {
      type: 'LDAP'
      password: null
    }
  | {
      type: 'local'
      password: string
    }
type Account = AccountBase & TypeBasedAccount

export const useAccountsStore = defineStore('accounts', {
  state: () =>
    useLocalStorage('accounts', {
      accounts: [{ login: '', password: '', tags: [], type: 'local' }] as Account[],
    }),

  actions: {
    setAccounts(newAccounts: Account[]) {
      this.accounts = newAccounts
    },
  },
})
