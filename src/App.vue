<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import AccountsForm from './components/accounts-form/AccountsForm.vue'
</script>

<template>
  <main class="w-3xl container mx-auto p-2">
    <AccountsForm />
  </main>
  <Toaster />
</template>
