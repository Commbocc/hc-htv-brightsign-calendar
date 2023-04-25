<script setup lang="ts">
const { baseURL } = useNuxtApp().$config.app

const { setItems, activeItem, beginCycle, backgroundImage } = useItems()

const url = 'https://www.hillsboroughcounty.org/apis/v1/rss/calendar'
const { data, pending } = await useFetch<string>(url)
if (data.value) setItems(data.value)
beginCycle()
</script>

<template>
  <Html data-theme="light">
    <!-- refresh every 6 hours -->
    <Meta http-equiv="refresh" content="21600" />

    <div v-if="pending">
      <img :src="`${baseURL}/images/HTV-BB-BG.jpg`" alt="" />
    </div>

    <div v-else-if="activeItem" id="container">
      <img :src="`${baseURL}/images/${backgroundImage}`" alt="" />

      <div id="item">
        <hgroup>
          <h1 :style="{ '--color': '#104273', lineHeight: '1.2em' }">
            {{ activeItem.title }}
          </h1>
          <h4>
            {{
              activeItem.pubdate.toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'medium',
              })
            }}
          </h4>
        </hgroup>

        <div class="grid" style="">
          <div :style="{ alignSelf: 'end' }">
            {{ activeItem.location }}
          </div>
          <div v-html="activeItem.description"></div>
        </div>
      </div>
    </div>
  </Html>
</template>
