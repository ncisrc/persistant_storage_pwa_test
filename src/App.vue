<template>

<div class="h-full w-full">
  <!-- CONNECTION ICON -->
  <div>
    Connectivity Status : {{ online }}<br />
    Persistent Storage Status : {{ persisted }}
  </div>

  <!-- UPDATE NOTIFICATION BUTTON -->
  <div style="position:fixed; top:20px; left:0px; background-color: black;"
    v-show="needRefresh"
    @click="updatePanelVisible=true">
    <Icon
      class="m-4"
      color="#fff"
      size="32">
      UPDATE
    </Icon>
  </div>

  <!-- UPDATE PANEL -->
  <div v-show="showUpdatePanel">
    <div>
      !! UPDATE AVAILABLE !!
    </div>

    <div class="text-center mb-8">
      <Button
        class="mr-4"
        @click="updatePanelVisible = false">
        LATER
      </Button>
      <Button
        @click="updateApplication">
        UPDATE NOW
      </Button>
    </div>
  </div>
</div>

</template>

<script setup>
import { useRegisterSW } from "virtual:pwa-register/vue"
import { ref, computed, onMounted } from "vue"
import { askStoragePersistance, tryPersistWithoutPromtingUser } from './persistent-storage'

// Online status
import { useOnline } from "@vueuse/core"
const online = useOnline()

// Service worker
const { needRefresh, updateServiceWorker } = useRegisterSW()
const updatePanelVisible = ref(true)
const showUpdatePanel = computed(() => (needRefresh.value == true && updatePanelVisible.value == true))
function updateApplication() { updateServiceWorker(true) }

const persisted = ref(false)

onMounted(async () => {
  console.log("Persisting Storage")
  await initStoragePersistence()
  persisted.value = await navigator.storage.persisted();
  console.log("Persisted Storage : ", persisted.value)
})

async function initStoragePersistence() {
  const persist = await tryPersistWithoutPromtingUser();
  switch (persist) {
    case "never":
      console.log("Not possible to persist storage");
      break;
    case "persisted":
      console.log("Successfully persisted storage silently");
      break;
    case "prompt":
      console.log("Not persisted, but we will prompt user.");
      await askStoragePersistance()
      break;
  }
}


setInterval(async () => {
  persisted.value = await navigator.storage.persisted();
}, 2000)
</script>
