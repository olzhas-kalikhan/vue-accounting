<script setup lang="ts">
import { useFieldArray, useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { h } from 'vue'
import FormAlert from './FormAlert.vue'
import { formValidationSchema, type AccountSchema } from './validation-schema'
import AccountsFieldArray from './AccountsFieldArray.vue'
import { Plus } from 'lucide-vue-next'
import { useAccountsStore } from '@/stores/accounts'
import { toast } from '../ui/toast'

const toFormTags = (tags: { text: string }[]) => tags.map(({ text }) => text).join(';')
const toStoreTags = (tags: string) => tags.split(';').map((text) => ({ text }))

const getDefaultAccount = () => ({ tags: '', type: 'local' as const, login: '', password: '' })
const { accounts: storeAccounts, setAccounts } = useAccountsStore()

const { handleSubmit } = useForm({
  validationSchema: formValidationSchema,
  initialValues: {
    accounts: storeAccounts.map((account) => ({
      ...account,
      tags: toFormTags(account.tags),
    })),
  },
})

const {
  remove: removeAccount,
  fields: accounts,
  push: pushAccount,
  update: updateAccount,
} = useFieldArray<AccountSchema>('accounts')

const onAddClick = () => {
  pushAccount(getDefaultAccount())
}

const getAlertDescription = (data: unknown) =>
  h(
    'pre',
    { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4 whitespace-pre-wrap break-words' },
    h('code', { class: 'text-white' }, JSON.stringify(data, null, 2)),
  )

const onSubmit = handleSubmit(
  (values) => {
    const newAccounts = values.accounts.map((account) => {
      const newAccount = { ...account, tags: toStoreTags(account.tags) }
      if (newAccount.type === 'LDAP') return Object.assign(newAccount, { password: null })
      return newAccount
    })
    setAccounts(newAccounts)
    toast({
      title: 'Значения:',
      description: getAlertDescription(newAccounts),
    })
  },
  (error) => {
    toast({
      title: 'Ошибка:',
      variant: 'destructive',
      description: getAlertDescription(error.errors),
    })
  },
)
const handleRemoveClick = (idx: number) => {
  if (accounts.value.length > 1) {
    removeAccount(idx)
  } else {
    updateAccount(idx, getDefaultAccount())
  }
}
</script>

<template>
  <div class="flex items-center py-2">
    <h1 class="text-lg font-semibold">Учетные записи</h1>
    <Button class="ml-2" variant="outline" @click="onAddClick"><Plus /></Button>
  </div>
  <FormAlert />
  <form class="space-y-6" @blur.capture="onSubmit">
    <AccountsFieldArray
      :accounts="accounts"
      v-on:remove-click="handleRemoveClick"
      v-on:type-change="onSubmit"
    />
  </form>
</template>
