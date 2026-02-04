<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Dashboard</RouterLink>
    |
    <RouterLink to="/accounts">Accounts</RouterLink>
  </nav>

  <RouterView />
</template>
