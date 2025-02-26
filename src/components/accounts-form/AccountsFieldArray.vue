<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
import FormSelect from '../form/FormSelect.vue'
import FormText from '../form/FormText.vue'
import { Button } from '../ui/button'
import type { AccountSchema } from './validation-schema'
import type { FieldEntry } from 'vee-validate'
import FormSecret from '../form/FormSecret.vue'

interface Props {
  accounts: FieldEntry<AccountSchema>[]
  onRemoveClick: (idx: number) => () => void
  onTypeChange: () => void
}

const { accounts, onRemoveClick, onTypeChange } = defineProps<Props>()
const isLocal = (type: AccountSchema['type']) => type === 'local'
</script>

<template>
  <div class="my-4 grid grid-cols-12 gap-4">
    <div role="row" class="contents text-sm text-muted-foreground">
      <div role="columnheader" class="col-span-3">Метки</div>
      <div role="columnheader" class="col-span-2">Тип записи</div>
      <div role="columnheader" class="col-span-3">Логин</div>
      <div role="columnheader" class="col-span-3">Пароль</div>
      <div role="columnheader" class="col-span-1"></div>
    </div>
    <div role="row" class="contents" v-for="(account, idx) in accounts" :key="account.key">
      <FormText :name="`accounts[${idx}].tags`" class="col-span-3" role="cell" />
      <FormSelect
        :name="`accounts[${idx}].type`"
        :options="['LDAP', 'local']"
        class="col-span-2"
        role="cell"
        @change="onTypeChange"
      />
      <FormText
        :name="`accounts[${idx}].login`"
        :class="isLocal(account.value.type) ? `col-span-3` : `col-span-6`"
        role="cell"
      />
      <FormSecret
        v-if="isLocal(account.value.type)"
        :name="`accounts[${idx}].password`"
        class="col-span-3"
        role="cell"
      />
      <Button
        type="button"
        @click="onRemoveClick(idx)"
        variant="ghost"
        size="icon"
        class="col-span-1"
        role="cell"
      >
        <Trash2 />
      </Button>
    </div>
  </div>
</template>
