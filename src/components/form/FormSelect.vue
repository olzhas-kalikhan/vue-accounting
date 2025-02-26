<script setup lang="ts">
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '../ui/select'
import { FormField, FormItem, FormControl, FormMessage } from '../ui/form'
interface Props {
  name: string
  options: string[]
  class?: string
  role?: string
}
const emit = defineEmits(['change'])

const { options, name, class: className } = defineProps<Props>()

const handleChange = (...args: unknown[]) => {
  emit('change', ...args)
}
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name" @update:model-value="handleChange">
    <FormItem :class="className" :role="role">
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="option in options" :key="option" :value="option">
              {{ option }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
