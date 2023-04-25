export const useItems = () => {
  const items = ref<CalendarItem[]>([])

  const filteredItems = computed(() =>
    items.value.filter(
      (x) =>
        Math.round(
          (x.pubdate.valueOf() - new Date().valueOf()) / (1000 * 60 * 60 * 24)
        ) <= 90
    )
  )

  const setItems = (xml: string) => {
    const parser = new DOMParser()

    const _items = parser
      .parseFromString(xml, 'application/xml')
      .getElementsByTagName('item')

    for (const item of _items) {
      items.value.push({
        title: item.getElementsByTagName('title')[0].childNodes[0].nodeValue!,
        pubdate: new Date(
          item.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue!
        ),
        calendar:
          item.getElementsByTagName('calendar')[0].childNodes[0].nodeValue!,
        location:
          item.getElementsByTagName('location')[0].childNodes[0].nodeValue!,
        description:
          item.getElementsByTagName('description')[0].childNodes[0].nodeValue!,
      })
    }
  }

  const activeIndex = ref(0)

  const activeIndexModulo = computed(
    () => activeIndex.value % filteredItems.value.length
  )

  const activeItem = computed(
    () => filteredItems.value[activeIndexModulo.value]
  )

  const beginCycle = () => {
    setInterval(() => activeIndex.value++, 10000)
  }

  const backgroundImage = computed(() => {
    switch (activeItem.value.calendar) {
      case '{7EC79ED6-598E-4E99-8A0E-267AE3516F37}':
        return 'parks-recs-bg.jpg'

      case '{595E6336-FDDE-4697-BD2F-A89F6C238427}':
        return 'commission-meetings-bg.jpg'

      case '{026F5CA7-685F-48CF-86CD-2C23521B6385}':
        return 'public-meetings-bg.jpg'

      case '{E2DBCF3A-1E74-4809-B3BB-1E30AB91E878}':
        return 'business-events-bg.jpg'

      case '{BFD8E5EE-B8EC-4308-90B0-B2DA8C960EB8}':
        return 'public-events-bg.jpg'

      case '{3C69420B-EBE2-4D8B-8C04-A12CAF68D01C}':
        return 'public-engagement-bg.jpg'
    }
  })

  return { setItems, activeItem, beginCycle, backgroundImage }
}
