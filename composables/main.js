export const useMain = () => {
  // Define the variables
  var xhr = new XMLHttpRequest()
  var feed = document.getElementById('feed')
  var items = []
  var currentItem = 0
  var intervalId

  // Define the callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Parse the XML response
      var parser = new DOMParser()
      var xml = parser.parseFromString(xhr.responseText, 'application/xml')

      // Extract the items from the XML
      items = xml.getElementsByTagName('item')

      // Show the first item
      showItem(currentItem)

      // Set the interval to switch to the next item
      intervalId = setInterval(function () {
        currentItem = (currentItem + 1) % items.length
        showItem(currentItem)
      }, 10000)
    }

    // Define the function to show an item
    function showItem(index) {
      var item = items[index]
      var title = item.getElementsByTagName('title')[0].childNodes[0].nodeValue
      var pubdate = new Date(
        item.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue
      )
      var calendar =
        item.getElementsByTagName('calendar')[0].childNodes[0].nodeValue
      var location =
        item.getElementsByTagName('location')[0].childNodes[0].nodeValue
      var description =
        item.getElementsByTagName('description')[0].childNodes[0].nodeValue

      // Calculate the difference between pubdate and the current date in days
      var daysDiff = Math.round((pubdate - new Date()) / (1000 * 60 * 60 * 24))

      // Check if the item is within 90 days from the current date
      if (daysDiff <= 90) {
        // Set the content of the div elements
        document.getElementById('title-box').innerHTML = title
        document.getElementById('pubDate-box').innerHTML = formatDate(pubdate)
        document.getElementById('location-box').innerHTML = location
        document.getElementById('description-box').innerHTML = description

        // Define the function to format the date
        function formatDate(date) {
          const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]

          const daySuffix = ['th', 'st', 'nd', 'rd']

          const hours = date.getHours()
          const minutes = date.getMinutes()
          const amPm = hours < 12 ? 'AM' : 'PM'
          const formattedHours = hours % 12 || 12
          const formattedMinutes = minutes < 10 ? '0' + minutes : minutes

          const day = date.getDate()
          const daySuffixIndex = day % 10 > 3 ? 0 : day % 10
          const formattedDay = day + daySuffix[daySuffixIndex]

          const monthIndex = date.getMonth()
          const formattedMonth = monthNames[monthIndex]

          const year = date.getFullYear()

          let formattedTime
          if (hours === 0 && minutes === 0) {
            formattedTime = 'All Day'
          } else {
            formattedTime = formattedHours + ':' + formattedMinutes + ' ' + amPm
          }

          return (
            formattedMonth +
            ' ' +
            formattedDay +
            ', ' +
            year +
            ' | ' +
            formattedTime
          )
        }

        // Set the background image based on the calendar value
        var backgroundImage = 'htv-BB-bg.jpg'
        switch (calendar) {
          case '{7EC79ED6-598E-4E99-8A0E-267AE3516F37}':
            backgroundImage = 'parks-recs-bg.jpg'
            break
          case '{595E6336-FDDE-4697-BD2F-A89F6C238427}':
            backgroundImage = 'commission-meetings-bg.jpg'
            break
          case '{026F5CA7-685F-48CF-86CD-2C23521B6385}':
            backgroundImage = 'public-meetings-bg.jpg'
            break
          case '{E2DBCF3A-1E74-4809-B3BB-1E30AB91E878}':
            backgroundImage = 'business-events-bg.jpg'
            break
          case '{BFD8E5EE-B8EC-4308-90B0-B2DA8C960EB8}':
            backgroundImage = 'public-events-bg.jpg'
            break
          case '{3C69420B-EBE2-4D8B-8C04-A12CAF68D01C}':
            backgroundImage = 'public-engagement-bg.jpg'
            break
        }
        document.body.style.backgroundImage =
          'url(images/' + backgroundImage + ')'
      }
    }
  }

  // Define the function to retrieve the feed data and show the first item
  function showFeedData() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest()

    // Set the URL of the XML feed
    xhr.open('GET', 'your-xml-feed-url')

    // Define the callback function to handle the response
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse the XML response
        var parser = new DOMParser()
        var xml = parser.parseFromString(xhr.responseText, 'application/xml')

        // Extract the items from the XML
        items = xml.getElementsByTagName('item')

        // Show the first item
        showItem(currentItem)

        // Set the interval to switch to the next item every 10 seconds
        intervalId = setInterval(function () {
          currentItem = (currentItem + 1) % items.length
          showItem(currentItem)
        }, 10000)
      }
    }

    // Send the request
    xhr.send()
  }

  // Call the function to retrieve the feed data and show the first item
  showFeedData()

  // Set the interval to refresh the feed data every 6 hours
  setInterval(function () {
    // Clear the current interval
    clearInterval(intervalId)

    // Call the function to retrieve the feed data and show the first item
    showFeedData()
  }, 6 * 60 * 60 * 1000)

  // Open the XML feed URL
  xhr.open(
    'GET',
    'https://www.hillsboroughcounty.org/apis/v1/rss/calendar',
    true
  )

  // Send the request
  xhr.send()
}
