<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-grey-8 q-py-sm">
      <q-toolbar>
        <q-btn flat dense round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-avatar>
          <img src="statics/keep_logo.png">
        </q-avatar>

        <q-toolbar-title>
          Codifiq Keep
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list class="q-mt-sm">
        <q-item clickable tag="a" href="#" class="menu-item active">
          <q-item-section avatar>
            <q-icon name="lightbulb_outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Notas</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="sass" scoped>
.menu-item
  border-top-right-radius: 25px
  border-bottom-right-radius: 25px

  font-weight: 500

  &.active
    background-color: $primary
</style>

<!-- <style lang="scss" scoped>
.menu-item {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;

  font-weight: 500;

  &.active {
    background-color: $primary;
  }
}
</style> -->

<!-- <style scoped>
.menu-item {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;

  font-weight: 500;
}

.menu-item.active {
  background-color: #feefc3;
}
</style> -->

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
    }
  }
}
</script>
