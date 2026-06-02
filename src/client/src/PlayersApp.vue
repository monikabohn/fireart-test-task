<template>
  <div class="max-w-6xl mx-auto py-8">
    <h2 class="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
      Players
    </h2>

    <div v-if="loading" class="text-gray-500">Loading players...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="players.length"
         class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <a v-for="player in players"
         :key="player.idPlayer"
         :href="`/players/${player.idPlayer}`"
         class="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center"
      >
        <img v-if="player.strThumb"
             :src="player.strThumb"
             alt="Player photo"
             class="w-20 h-20 rounded-full object-cover mb-3 border border-gray-200"
        />

        <h3 class="font-semibold text-gray-900 text-sm mb-2">
          {{ player.strPlayer }}
        </h3>

        <p class="text-xs text-gray-500">
          {{ player.strPosition }}
        </p>

        <p class="text-xs text-gray-500">
          {{ player.strNationality }}
        </p>
      </a>
    </div>

    <div v-else-if="!loading">No players found</div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  teamId: String,
  required: true
});

const players = ref([]);
const loading = ref(false);
const error = ref(null);

const loadPlayers = async () => {
  if (!props.teamId) return;

  loading.value = true;
  error.value = null;

  try {
    const res = await fetch(`/api/teams/${props.teamId}/players`);

    if (!res.ok) {
      throw new Error("API error");
    }

    const data = await res.json();
    players.value = data || [];
  } catch (err) {
    error.value = "Failed to load players";
  } finally {
    loading.value = false;
  }
};

watch(
    () => props.teamId,
    () => {
      loadPlayers();
    },
    { immediate: true }
);
</script>