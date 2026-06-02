<template>
  <a :href="`/players/${player.idPlayer}`"
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
      {{ player.strPosition || 'Unknown position' }}
    </p>

    <p class="text-xs text-gray-500">
      {{ player.strNationality || 'Unknown position' }}
    </p>
  </a>
</template>

<script setup>
defineProps({
  player: {
    type: Object,
    required: true
  }
});
</script>