<script setup lang="ts">
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface Props {
  name: string
  type?: string
  class?: string
  role?: string
}

const { name, type = 'text', class: className } = defineProps<Props>()
</script>

<template>
  <FormField :name="name" v-slot="{ componentField }">
    <FormItem :class="className" :role="role">
      <FormControl>
        <Input :type="type" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
