<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Eye, EyeOff } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  type?: string
  class?: string
  role?: string
}

const { name, class: className, role } = defineProps<Props>()
const showPassword = ref(false)
</script>

<template>
  <FormField :name="name" v-slot="{ componentField }">
    <FormItem :class="cn(className, `relative`)" :role="role">
      <FormControl>
        <Input :type="showPassword ? 'text' : 'password'" v-bind="componentField" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          @click="showPassword = !showPassword"
          class="absolute right-0 top-0 !m-0 text-gray-500 hover:text-gray-700"
        >
          <Eye v-if="showPassword" class="h-5 w-5" />
          <EyeOff v-else class="h-5 w-5" />
        </Button>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
