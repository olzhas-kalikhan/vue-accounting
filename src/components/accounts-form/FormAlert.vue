<script setup lang="ts">
import { CircleHelp } from 'lucide-vue-next'
import { Alert, AlertDescription } from '../ui/alert'
</script>

<template>
  <Alert class="my-1">
    <AlertDescription class="flex items-center">
      <CircleHelp class="h-4 w-4" />
      <span class="ml-2">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </span>
    </AlertDescription>
  </Alert>
</template>
