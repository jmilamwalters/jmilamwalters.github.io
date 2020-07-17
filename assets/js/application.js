jQuery(document).ready(function ($) {
  // Cache selectors
  var lastId,
    topMenu = $('#top-menu'),
    topMenuHeight = topMenu.outerHeight() + 0, //+15,
    // All list items
    menuItems = topMenu.find('a'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr('href'))
      if (item.length) {
        return item
      }
    })

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    var href = $(this).attr('href'),
      offsetTop = href === '#' ? 0 : $(href).offset().top - topMenuHeight + 1
    $('html, body').stop().animate(
      {
        scrollTop: offsetTop,
      },
      300
    )
    e.preventDefault()
  })

  // Initialize accordion
  $('.ui.accordion').accordion()
  $('.special.cards .image').dimmer({
    on: 'hover',
  })
})
