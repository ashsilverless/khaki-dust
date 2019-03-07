/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

(function() {
  var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in defaults) {
        value = defaults[key];
        if (custom[key] == null) {
          custom[key] = value;
        }
      }
      return custom;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    Util.prototype.createEvent = function(event, bubble, cancel, detail) {
      var customEvent;
      if (bubble == null) {
        bubble = false;
      }
      if (cancel == null) {
        cancel = false;
      }
      if (detail == null) {
        detail = null;
      }
      if (document.createEvent != null) {
        customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(event, bubble, cancel, detail);
      } else if (document.createEventObject != null) {
        customEvent = document.createEventObject();
        customEvent.eventType = event;
      } else {
        customEvent.eventName = event;
      }
      return customEvent;
    };

    Util.prototype.emitEvent = function(elem, event) {
      if (elem.dispatchEvent != null) {
        return elem.dispatchEvent(event);
      } else if (event in (elem != null)) {
        return elem[event]();
      } else if (("on" + event) in (elem != null)) {
        return elem["on" + event]();
      }
    };

    Util.prototype.addEvent = function(elem, event, fn) {
      if (elem.addEventListener != null) {
        return elem.addEventListener(event, fn, false);
      } else if (elem.attachEvent != null) {
        return elem.attachEvent("on" + event, fn);
      } else {
        return elem[event] = fn;
      }
    };

    Util.prototype.removeEvent = function(elem, event, fn) {
      if (elem.removeEventListener != null) {
        return elem.removeEventListener(event, fn, false);
      } else if (elem.detachEvent != null) {
        return elem.detachEvent("on" + event, fn);
      } else {
        return delete elem[event];
      }
    };

    Util.prototype.innerHeight = function() {
      if ('innerHeight' in window) {
        return window.innerHeight;
      } else {
        return document.documentElement.clientHeight;
      }
    };

    return Util;

  })();

  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
    function WeakMap() {
      this.keys = [];
      this.values = [];
    }

    WeakMap.prototype.get = function(key) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          return this.values[i];
        }
      }
    };

    WeakMap.prototype.set = function(key, value) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          this.values[i] = value;
          return;
        }
      }
      this.keys.push(key);
      return this.values.push(value);
    };

    return WeakMap;

  })());

  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
    function MutationObserver() {
      if (typeof console !== "undefined" && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
      }
      if (typeof console !== "undefined" && console !== null) {
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    MutationObserver.notSupported = true;

    MutationObserver.prototype.observe = function() {};

    return MutationObserver;

  })());

  getComputedStyle = this.getComputedStyle || function(el, pseudo) {
    this.getPropertyValue = function(prop) {
      var ref;
      if (prop === 'float') {
        prop = 'styleFloat';
      }
      if (getComputedStyleRX.test(prop)) {
        prop.replace(getComputedStyleRX, function(_, _char) {
          return _char.toUpperCase();
        });
      }
      return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
    };
    return this;
  };

  getComputedStyleRX = /(\-([a-z]){1})/g;

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
      callback: null
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = bind(this.scrollCallback, this);
      this.scrollHandler = bind(this.scrollHandler, this);
      this.resetAnimation = bind(this.resetAnimation, this);
      this.start = bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
      this.animationNameCache = new WeakMap();
      this.wowEvent = this.util().createEvent(this.config.boxClass);
    }

    WOW.prototype.init = function() {
      var ref;
      this.element = window.document.documentElement;
      if ((ref = document.readyState) === "interactive" || ref === "complete") {
        this.start();
      } else {
        this.util().addEvent(document, 'DOMContentLoaded', this.start);
      }
      return this.finished = [];
    };

    WOW.prototype.start = function() {
      var box, j, len, ref;
      this.stopped = false;
      this.boxes = (function() {
        var j, len, ref, results;
        ref = this.element.querySelectorAll("." + this.config.boxClass);
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      this.all = (function() {
        var j, len, ref, results;
        ref = this.boxes;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      if (this.boxes.length) {
        if (this.disabled()) {
          this.resetStyle();
        } else {
          ref = this.boxes;
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            this.applyStyle(box, true);
          }
        }
      }
      if (!this.disabled()) {
        this.util().addEvent(window, 'scroll', this.scrollHandler);
        this.util().addEvent(window, 'resize', this.scrollHandler);
        this.interval = setInterval(this.scrollCallback, 50);
      }
      if (this.config.live) {
        return new MutationObserver((function(_this) {
          return function(records) {
            var k, len1, node, record, results;
            results = [];
            for (k = 0, len1 = records.length; k < len1; k++) {
              record = records[k];
              results.push((function() {
                var l, len2, ref1, results1;
                ref1 = record.addedNodes || [];
                results1 = [];
                for (l = 0, len2 = ref1.length; l < len2; l++) {
                  node = ref1[l];
                  results1.push(this.doSync(node));
                }
                return results1;
              }).call(_this));
            }
            return results;
          };
        })(this)).observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };

    WOW.prototype.stop = function() {
      this.stopped = true;
      this.util().removeEvent(window, 'scroll', this.scrollHandler);
      this.util().removeEvent(window, 'resize', this.scrollHandler);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.sync = function(element) {
      if (MutationObserver.notSupported) {
        return this.doSync(this.element);
      }
    };

    WOW.prototype.doSync = function(element) {
      var box, j, len, ref, results;
      if (element == null) {
        element = this.element;
      }
      if (element.nodeType !== 1) {
        return;
      }
      element = element.parentNode || element;
      ref = element.querySelectorAll("." + this.config.boxClass);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        if (indexOf.call(this.all, box) < 0) {
          this.boxes.push(box);
          this.all.push(box);
          if (this.stopped || this.disabled()) {
            this.resetStyle();
          } else {
            this.applyStyle(box, true);
          }
          results.push(this.scrolled = true);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      box.className = box.className + " " + this.config.animateClass;
      if (this.config.callback != null) {
        this.config.callback(box);
      }
      this.util().emitEvent(box, this.wowEvent);
      this.util().addEvent(box, 'animationend', this.resetAnimation);
      this.util().addEvent(box, 'oanimationend', this.resetAnimation);
      this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
      this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
      return box;
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return this.animate((function(_this) {
        return function() {
          return _this.customStyle(box, hidden, duration, delay, iteration);
        };
      })(this));
    };

    WOW.prototype.animate = (function() {
      if ('requestAnimationFrame' in window) {
        return function(callback) {
          return window.requestAnimationFrame(callback);
        };
      } else {
        return function(callback) {
          return callback();
        };
      }
    })();

    WOW.prototype.resetStyle = function() {
      var box, j, len, ref, results;
      ref = this.boxes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        results.push(box.style.visibility = 'visible');
      }
      return results;
    };

    WOW.prototype.resetAnimation = function(event) {
      var target;
      if (event.type.toLowerCase().indexOf('animationend') >= 0) {
        target = event.target || event.srcElement;
        return target.className = target.className.replace(this.config.animateClass, '').trim();
      }
    };

    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
      if (hidden) {
        this.cacheAnimationName(box);
      }
      box.style.visibility = hidden ? 'hidden' : 'visible';
      if (duration) {
        this.vendorSet(box.style, {
          animationDuration: duration
        });
      }
      if (delay) {
        this.vendorSet(box.style, {
          animationDelay: delay
        });
      }
      if (iteration) {
        this.vendorSet(box.style, {
          animationIterationCount: iteration
        });
      }
      this.vendorSet(box.style, {
        animationName: hidden ? 'none' : this.cachedAnimationName(box)
      });
      return box;
    };

    WOW.prototype.vendors = ["moz", "webkit"];

    WOW.prototype.vendorSet = function(elem, properties) {
      var name, results, value, vendor;
      results = [];
      for (name in properties) {
        value = properties[name];
        elem["" + name] = value;
        results.push((function() {
          var j, len, ref, results1;
          ref = this.vendors;
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            vendor = ref[j];
            results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    WOW.prototype.vendorCSS = function(elem, property) {
      var j, len, ref, result, style, vendor;
      style = getComputedStyle(elem);
      result = style.getPropertyCSSValue(property);
      ref = this.vendors;
      for (j = 0, len = ref.length; j < len; j++) {
        vendor = ref[j];
        result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
      }
      return result;
    };

    WOW.prototype.animationName = function(box) {
      var animationName;
      try {
        animationName = this.vendorCSS(box, 'animation-name').cssText;
      } catch (_error) {
        animationName = getComputedStyle(box).getPropertyValue('animation-name');
      }
      if (animationName === 'none') {
        return '';
      } else {
        return animationName;
      }
    };

    WOW.prototype.cacheAnimationName = function(box) {
      return this.animationNameCache.set(box, this.animationName(box));
    };

    WOW.prototype.cachedAnimationName = function(box) {
      return this.animationNameCache.get(box);
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var j, len, ref, results;
          ref = this.boxes;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            results.push(box);
          }
          return results;
        }).call(this);
        if (!(this.boxes.length || this.config.live)) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      while (element.offsetTop === void 0) {
        element = element.parentNode;
      }
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util != null ? this._util : this._util = new Util();
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/**!
 * MixItUp v2.1.11
 *
 * @copyright Copyright 2015 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://mixitup.kunkalabs.com
 *
 * @license   Commercial use requires a commercial license.
 *            https://mixitup.kunkalabs.com/licenses/
 *
 *            Non-commercial use permitted under terms of CC-BY-NC license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */

(function($, undf){
	'use strict';

	/**
	 * MixItUp Constructor Function
	 * @constructor
	 * @extends jQuery
	 */

	$.MixItUp = function(){
		var self = this;

		self._execAction('_constructor', 0);

		$.extend(self, {

			/* Public Properties
			---------------------------------------------------------------------- */

			selectors: {
				target: '.mix',
				filter: '.filter',
				sort: '.sort'
			},

			animation: {
				enable: true,
				effects: 'fade scale',
				duration: 600,
				easing: 'ease',
				perspectiveDistance: '3000',
				perspectiveOrigin: '50% 50%',
				queue: true,
				queueLimit: 1,
				animateChangeLayout: false,
				animateResizeContainer: true,
				animateResizeTargets: false,
				staggerSequence: false,
				reverseOut: false
			},

			callbacks: {
				onMixLoad: false,
				onMixStart: false,
				onMixBusy: false,
				onMixEnd: false,
				onMixFail: false,
				_user: false
			},

			controls: {
				enable: true,
				live: false,
				toggleFilterButtons: false,
				toggleLogic: 'or',
				activeClass: 'active'
			},

			layout: {
				display: 'inline-block',
				containerClass: '',
				containerClassFail: 'fail'
			},

			load: {
				filter: 'all',
				sort: false
			},

			/* Private Properties
			---------------------------------------------------------------------- */

			_$body: null,
			_$container: null,
			_$targets: null,
			_$parent: null,
			_$sortButtons: null,
			_$filterButtons: null,

			_suckMode: false,
			_mixing: false,
			_sorting: false,
			_clicking: false,
			_loading: true,
			_changingLayout: false,
			_changingClass: false,
			_changingDisplay: false,

			_origOrder: [],
			_startOrder: [],
			_newOrder: [],
			_activeFilter: null,
			_toggleArray: [],
			_toggleString: '',
			_activeSort: 'default:asc',
			_newSort: null,
			_startHeight: null,
			_newHeight: null,
			_incPadding: true,
			_newDisplay: null,
			_newClass: null,
			_targetsBound: 0,
			_targetsDone: 0,
			_queue: [],

			_$show: $(),
			_$hide: $()
		});

		self._execAction('_constructor', 1);
	};

	/**
	 * MixItUp Prototype
	 * @override
	 */

	$.MixItUp.prototype = {
		constructor: $.MixItUp,

		/* Static Properties
		---------------------------------------------------------------------- */

		_instances: {},
		_handled: {
			_filter: {},
			_sort: {}
		},
		_bound: {
			_filter: {},
			_sort: {}
		},
		_actions: {},
		_filters: {},

		/* Static Methods
		---------------------------------------------------------------------- */

		/**
		 * Extend
		 * @since 2.1.0
		 * @param {object} new properties/methods
		 * @extends {object} prototype
		 */

		extend: function(extension){
			for(var key in extension){
				$.MixItUp.prototype[key] = extension[key];
			}
		},

		/**
		 * Add Action
		 * @since 2.1.0
		 * @param {string} hook name
		 * @param {string} namespace
		 * @param {function} function to execute
		 * @param {number} priority
		 * @extends {object} $.MixItUp.prototype._actions
		 */

		addAction: function(hook, name, func, priority){
			$.MixItUp.prototype._addHook('_actions', hook, name, func, priority);
		},

		/**
		 * Add Filter
		 * @since 2.1.0
		 * @param {string} hook name
		 * @param {string} namespace
		 * @param {function} function to execute
		 * @param {number} priority
		 * @extends {object} $.MixItUp.prototype._filters
		 */

		addFilter: function(hook, name, func, priority){
			$.MixItUp.prototype._addHook('_filters', hook, name, func, priority);
		},

		/**
		 * Add Hook
		 * @since 2.1.0
		 * @param {string} type of hook
		 * @param {string} hook name
		 * @param {function} function to execute
		 * @param {number} priority
		 * @extends {object} $.MixItUp.prototype._filters
		 */

		_addHook: function(type, hook, name, func, priority){
			var collection = $.MixItUp.prototype[type],
				obj = {};

			priority = (priority === 1 || priority === 'post') ? 'post' : 'pre';

			obj[hook] = {};
			obj[hook][priority] = {};
			obj[hook][priority][name] = func;

			$.extend(true, collection, obj);
		},


		/* Private Methods
		---------------------------------------------------------------------- */

		/**
		 * Initialise
		 * @since 2.0.0
		 * @param {object} domNode
		 * @param {object} config
		 */

		_init: function(domNode, config){
			var self = this;

			self._execAction('_init', 0, arguments);

			config && $.extend(true, self, config);

			self._$body = $('body');
			self._domNode = domNode;
			self._$container = $(domNode);
			self._$container.addClass(self.layout.containerClass);
			self._id = domNode.id;

			self._platformDetect();

			self._brake = self._getPrefixedCSS('transition', 'none');

			self._refresh(true);

			self._$parent = self._$targets.parent().length ? self._$targets.parent() : self._$container;

			if(self.load.sort){
				self._newSort = self._parseSort(self.load.sort);
				self._newSortString = self.load.sort;
				self._activeSort = self.load.sort;
				self._sort();
				self._printSort();
			}

			self._activeFilter = self.load.filter === 'all' ?
				self.selectors.target :
				self.load.filter === 'none' ?
					'' :
					self.load.filter;

			self.controls.enable && self._bindHandlers();

			if(self.controls.toggleFilterButtons){
				self._buildToggleArray();

				for(var i = 0; i < self._toggleArray.length; i++){
					self._updateControls({filter: self._toggleArray[i], sort: self._activeSort}, true);
				};
			} else if(self.controls.enable){
				self._updateControls({filter: self._activeFilter, sort: self._activeSort});
			}

			self._filter();

			self._init = true;

			self._$container.data('mixItUp',self);

			self._execAction('_init', 1, arguments);

			self._buildState();

			self._$targets.css(self._brake);

			self._goMix(self.animation.enable);
		},

		/**
		 * Platform Detect
		 * @since 2.0.0
		 */

		_platformDetect: function(){
			var self = this,
				vendorsTrans = ['Webkit', 'Moz', 'O', 'ms'],
				vendorsRAF = ['webkit', 'moz'],
				chrome = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || false,
				ff = typeof InstallTrigger !== 'undefined',
				prefix = function(el){
					for (var i = 0; i < vendorsTrans.length; i++){
						if (vendorsTrans[i] + 'Transition' in el.style){
							return {
								prefix: '-'+vendorsTrans[i].toLowerCase()+'-',
								vendor: vendorsTrans[i]
							};
						};
					};
					return 'transition' in el.style ? '' : false;
				},
				transPrefix = prefix(self._domNode);

			self._execAction('_platformDetect', 0);

			self._chrome = chrome ? parseInt(chrome[1], 10) : false;
			self._ff = ff ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]) : false;
			self._prefix = transPrefix.prefix;
			self._vendor = transPrefix.vendor;
			self._suckMode = window.atob && self._prefix ? false : true;

			self._suckMode && (self.animation.enable = false);
			(self._ff && self._ff <= 4) && (self.animation.enable = false);

			/* Polyfills
			---------------------------------------------------------------------- */

			/**
			 * window.requestAnimationFrame
			 */

			for(var x = 0; x < vendorsRAF.length && !window.requestAnimationFrame; x++){
				window.requestAnimationFrame = window[vendorsRAF[x]+'RequestAnimationFrame'];
			}

			/**
			 * Object.getPrototypeOf
			 */

			if(typeof Object.getPrototypeOf !== 'function'){
				if(typeof 'test'.__proto__ === 'object'){
					Object.getPrototypeOf = function(object){
						return object.__proto__;
					};
				} else {
					Object.getPrototypeOf = function(object){
						return object.constructor.prototype;
					};
				}
			}

			/**
			 * Element.nextElementSibling
			 */

			if(self._domNode.nextElementSibling === undf){
				Object.defineProperty(Element.prototype, 'nextElementSibling',{
					get: function(){
						var el = this.nextSibling;

						while(el){
							if(el.nodeType ===1){
								return el;
							}
							el = el.nextSibling;
						}
						return null;
					}
				});
			}

			self._execAction('_platformDetect', 1);
		},

		/**
		 * Refresh
		 * @since 2.0.0
		 * @param {boolean} init
		 * @param {boolean} force
		 */

		_refresh: function(init, force){
			var self = this;

			self._execAction('_refresh', 0, arguments);

			self._$targets = self._$container.find(self.selectors.target);

			for(var i = 0; i < self._$targets.length; i++){
				var target = self._$targets[i];

				if(target.dataset === undf || force){

					target.dataset = {};

					for(var j = 0; j < target.attributes.length; j++){

						var attr = target.attributes[j],
							name = attr.name,
							val = attr.value;

						if(name.indexOf('data-') > -1){
							var dataName = self._helpers._camelCase(name.substring(5,name.length));
							target.dataset[dataName] = val;
						}
					}
				}

				if(target.mixParent === undf){
					target.mixParent = self._id;
				}
			}

			if(
				(self._$targets.length && init) ||
				(!self._origOrder.length && self._$targets.length)
			){
				self._origOrder = [];

				for(var i = 0; i < self._$targets.length; i++){
					var target = self._$targets[i];

					self._origOrder.push(target);
				}
			}

			self._execAction('_refresh', 1, arguments);
		},

		/**
		 * Bind Handlers
		 * @since 2.0.0
		 */

		_bindHandlers: function(){
			var self = this,
				filters = $.MixItUp.prototype._bound._filter,
				sorts = $.MixItUp.prototype._bound._sort;

			self._execAction('_bindHandlers', 0);

			if(self.controls.live){
				self._$body
					.on('click.mixItUp.'+self._id, self.selectors.sort, function(){
						self._processClick($(this), 'sort');
					})
					.on('click.mixItUp.'+self._id, self.selectors.filter, function(){
						self._processClick($(this), 'filter');
					});
			} else {
				self._$sortButtons = $(self.selectors.sort);
				self._$filterButtons = $(self.selectors.filter);

				self._$sortButtons.on('click.mixItUp.'+self._id, function(){
					self._processClick($(this), 'sort');
				});

				self._$filterButtons.on('click.mixItUp.'+self._id, function(){
					self._processClick($(this), 'filter');
				});
			}

			filters[self.selectors.filter] = (filters[self.selectors.filter] === undf) ? 1 : filters[self.selectors.filter] + 1;
			sorts[self.selectors.sort] = (sorts[self.selectors.sort] === undf) ? 1 : sorts[self.selectors.sort] + 1;

			self._execAction('_bindHandlers', 1);
		},

		/**
		 * Process Click
		 * @since 2.0.0
		 * @param {object} $button
		 * @param {string} type
		 */

		_processClick: function($button, type){
			var self = this,
				trackClick = function($button, type, off){
					var proto = $.MixItUp.prototype;

					proto._handled['_'+type][self.selectors[type]] = (proto._handled['_'+type][self.selectors[type]] === undf) ?
						1 :
						proto._handled['_'+type][self.selectors[type]] + 1;

					if(proto._handled['_'+type][self.selectors[type]] === proto._bound['_'+type][self.selectors[type]]){
						$button[(off ? 'remove' : 'add')+'Class'](self.controls.activeClass);
						delete proto._handled['_'+type][self.selectors[type]];
					}
				};

			self._execAction('_processClick', 0, arguments);

			if(!self._mixing || (self.animation.queue && self._queue.length < self.animation.queueLimit)){
				self._clicking = true;

				if(type === 'sort'){
					var sort = $button.attr('data-sort');

					if(!$button.hasClass(self.controls.activeClass) || sort.indexOf('random') > -1){
						$(self.selectors.sort).removeClass(self.controls.activeClass);
						trackClick($button, type);
						self.sort(sort);
					}
				}

				if(type === 'filter') {
					var filter = $button.attr('data-filter'),
						ndx,
						seperator = self.controls.toggleLogic === 'or' ? ',' : '';

					if(!self.controls.toggleFilterButtons){
						if(!$button.hasClass(self.controls.activeClass)){
							$(self.selectors.filter).removeClass(self.controls.activeClass);
							trackClick($button, type);
							self.filter(filter);
						}
					} else {
						self._buildToggleArray();

						if(!$button.hasClass(self.controls.activeClass)){
							trackClick($button, type);

							self._toggleArray.push(filter);
						} else {
							trackClick($button, type, true);
							ndx = self._toggleArray.indexOf(filter);
							self._toggleArray.splice(ndx, 1);
						}

						self._toggleArray = $.grep(self._toggleArray,function(n){return(n);});

						self._toggleString = self._toggleArray.join(seperator);

						self.filter(self._toggleString);
					}
				}

				self._execAction('_processClick', 1, arguments);
			} else {
				if(typeof self.callbacks.onMixBusy === 'function'){
					self.callbacks.onMixBusy.call(self._domNode, self._state, self);
				}
				self._execAction('_processClickBusy', 1, arguments);
			}
		},

		/**
		 * Build Toggle Array
		 * @since 2.0.0
		 */

		_buildToggleArray: function(){
			var self = this,
				activeFilter = self._activeFilter.replace(/\s/g, '');

			self._execAction('_buildToggleArray', 0, arguments);

			if(self.controls.toggleLogic === 'or'){
				self._toggleArray = activeFilter.split(',');
			} else {
				self._toggleArray = activeFilter.split('.');

				!self._toggleArray[0] && self._toggleArray.shift();

				for(var i = 0, filter; filter = self._toggleArray[i]; i++){
					self._toggleArray[i] = '.'+filter;
				}
			}

			self._execAction('_buildToggleArray', 1, arguments);
		},

		/**
		 * Update Controls
		 * @since 2.0.0
		 * @param {object} command
		 * @param {boolean} multi
		 */

		_updateControls: function(command, multi){
			var self = this,
				output = {
					filter: command.filter,
					sort: command.sort
				},
				update = function($el, filter){
					try {
						(multi && type === 'filter' && !(output.filter === 'none' || output.filter === '')) ?
								$el.filter(filter).addClass(self.controls.activeClass) :
								$el.removeClass(self.controls.activeClass).filter(filter).addClass(self.controls.activeClass);
					} catch(e) {}
				},
				type = 'filter',
				$el = null;

			self._execAction('_updateControls', 0, arguments);

			(command.filter === undf) && (output.filter = self._activeFilter);
			(command.sort === undf) && (output.sort = self._activeSort);
			(output.filter === self.selectors.target) && (output.filter = 'all');

			for(var i = 0; i < 2; i++){
				$el = self.controls.live ? $(self.selectors[type]) : self['_$'+type+'Buttons'];
				$el && update($el, '[data-'+type+'="'+output[type]+'"]');
				type = 'sort';
			}

			self._execAction('_updateControls', 1, arguments);
		},

		/**
		 * Filter (private)
		 * @since 2.0.0
		 */

		_filter: function(){
			var self = this;

			self._execAction('_filter', 0);

			for(var i = 0; i < self._$targets.length; i++){
				var $target = $(self._$targets[i]);

				if($target.is(self._activeFilter)){
					self._$show = self._$show.add($target);
				} else {
					self._$hide = self._$hide.add($target);
				}
			}

			self._execAction('_filter', 1);
		},

		/**
		 * Sort (private)
		 * @since 2.0.0
		 */

		_sort: function(){
			var self = this,
				arrayShuffle = function(oldArray){
					var newArray = oldArray.slice(),
						len = newArray.length,
						i = len;

					while(i--){
						var p = parseInt(Math.random()*len);
						var t = newArray[i];
						newArray[i] = newArray[p];
						newArray[p] = t;
					};
					return newArray;
				};

			self._execAction('_sort', 0);

			self._startOrder = [];

			for(var i = 0; i < self._$targets.length; i++){
				var target = self._$targets[i];

				self._startOrder.push(target);
			}

			switch(self._newSort[0].sortBy){
				case 'default':
					self._newOrder = self._origOrder;
					break;
				case 'random':
					self._newOrder = arrayShuffle(self._startOrder);
					break;
				case 'custom':
					self._newOrder = self._newSort[0].order;
					break;
				default:
					self._newOrder = self._startOrder.concat().sort(function(a, b){
						return self._compare(a, b);
					});
			}

			self._execAction('_sort', 1);
		},

		/**
		 * Compare Algorithm
		 * @since 2.0.0
		 * @param {string|number} a
		 * @param {string|number} b
		 * @param {number} depth (recursion)
		 * @return {number}
		 */

		_compare: function(a, b, depth){
			depth = depth ? depth : 0;

			var self = this,
				order = self._newSort[depth].order,
				getData = function(el){
					return el.dataset[self._newSort[depth].sortBy] || 0;
				},
				attrA = isNaN(getData(a) * 1) ? getData(a).toLowerCase() : getData(a) * 1,
				attrB = isNaN(getData(b) * 1) ? getData(b).toLowerCase() : getData(b) * 1;

			if(attrA < attrB)
				return order === 'asc' ? -1 : 1;
			if(attrA > attrB)
				return order === 'asc' ? 1 : -1;
			if(attrA === attrB && self._newSort.length > depth+1)
				return self._compare(a, b, depth+1);

			return 0;
		},

		/**
		 * Print Sort
		 * @since 2.0.0
		 * @param {boolean} reset
		 */

		_printSort: function(reset){
			var self = this,
				order = reset ? self._startOrder : self._newOrder,
				targets = self._$parent[0].querySelectorAll(self.selectors.target),
				nextSibling = targets.length ? targets[targets.length -1].nextElementSibling : null,
				frag = document.createDocumentFragment();

			self._execAction('_printSort', 0, arguments);

			for(var i = 0; i < targets.length; i++){
				var target = targets[i],
					whiteSpace = target.nextSibling;

				if(target.style.position === 'absolute') continue;

				if(whiteSpace && whiteSpace.nodeName === '#text'){
					self._$parent[0].removeChild(whiteSpace);
				}

				self._$parent[0].removeChild(target);
			}

			for(var i = 0; i < order.length; i++){
				var el = order[i];

				if(self._newSort[0].sortBy === 'default' && self._newSort[0].order === 'desc' && !reset){
					var firstChild = frag.firstChild;
					frag.insertBefore(el, firstChild);
					frag.insertBefore(document.createTextNode(' '), el);
				} else {
					frag.appendChild(el);
					frag.appendChild(document.createTextNode(' '));
				}
			}

			nextSibling ?
				self._$parent[0].insertBefore(frag, nextSibling) :
				self._$parent[0].appendChild(frag);

			self._execAction('_printSort', 1, arguments);
		},

		/**
		 * Parse Sort
		 * @since 2.0.0
		 * @param {string} sortString
		 * @return {array} newSort
		 */

		_parseSort: function(sortString){
			var self = this,
				rules = typeof sortString === 'string' ? sortString.split(' ') : [sortString],
				newSort = [];

			for(var i = 0; i < rules.length; i++){
				var rule = typeof sortString === 'string' ? rules[i].split(':') : ['custom', rules[i]],
					ruleObj = {
						sortBy: self._helpers._camelCase(rule[0]),
						order: rule[1] || 'asc'
					};

				newSort.push(ruleObj);

				if(ruleObj.sortBy === 'default' || ruleObj.sortBy === 'random') break;
			}

			return self._execFilter('_parseSort', newSort, arguments);
		},

		/**
		 * Parse Effects
		 * @since 2.0.0
		 * @return {object} effects
		 */

		_parseEffects: function(){
			var self = this,
				effects = {
					opacity: '',
					transformIn: '',
					transformOut: '',
					filter: ''
				},
				parse = function(effect, extract, reverse){
					if(self.animation.effects.indexOf(effect) > -1){
						if(extract){
							var propIndex = self.animation.effects.indexOf(effect+'(');
							if(propIndex > -1){
								var str = self.animation.effects.substring(propIndex),
									match = /\(([^)]+)\)/.exec(str),
									val = match[1];

									return {val: val};
							}
						}
						return true;
					} else {
						return false;
					}
				},
				negate = function(value, invert){
					if(invert){
						return value.charAt(0) === '-' ? value.substr(1, value.length) : '-'+value;
					} else {
						return value;
					}
				},
				buildTransform = function(key, invert){
					var transforms = [
						['scale', '.01'],
						['translateX', '20px'],
						['translateY', '20px'],
						['translateZ', '20px'],
						['rotateX', '90deg'],
						['rotateY', '90deg'],
						['rotateZ', '180deg'],
					];

					for(var i = 0; i < transforms.length; i++){
						var prop = transforms[i][0],
							def = transforms[i][1],
							inverted = invert && prop !== 'scale';

						effects[key] += parse(prop) ? prop+'('+negate(parse(prop, true).val || def, inverted)+') ' : '';
					}
				};

			effects.opacity = parse('fade') ? parse('fade',true).val || '0' : '1';

			buildTransform('transformIn');

			self.animation.reverseOut ? buildTransform('transformOut', true) : (effects.transformOut = effects.transformIn);

			effects.transition = {};

			effects.transition = self._getPrefixedCSS('transition','all '+self.animation.duration+'ms '+self.animation.easing+', opacity '+self.animation.duration+'ms linear');

			self.animation.stagger = parse('stagger') ? true : false;
			self.animation.staggerDuration = parseInt(parse('stagger') ? (parse('stagger',true).val ? parse('stagger',true).val : 100) : 100);

			return self._execFilter('_parseEffects', effects);
		},

		/**
		 * Build State
		 * @since 2.0.0
		 * @param {boolean} future
		 * @return {object} futureState
		 */

		_buildState: function(future){
			var self = this,
				state = {};

			self._execAction('_buildState', 0);

			state = {
				activeFilter: self._activeFilter === '' ? 'none' : self._activeFilter,
				activeSort: future && self._newSortString ? self._newSortString : self._activeSort,
				fail: !self._$show.length && self._activeFilter !== '',
				$targets: self._$targets,
				$show: self._$show,
				$hide: self._$hide,
				totalTargets: self._$targets.length,
				totalShow: self._$show.length,
				totalHide: self._$hide.length,
				display: future && self._newDisplay ? self._newDisplay : self.layout.display
			};

			if(future){
				return self._execFilter('_buildState', state);
			} else {
				self._state = state;

				self._execAction('_buildState', 1);
			}
		},

		/**
		 * Go Mix
		 * @since 2.0.0
		 * @param {boolean} animate
		 */

		_goMix: function(animate){
			var self = this,
				phase1 = function(){
					if(self._chrome && (self._chrome === 31)){
						chromeFix(self._$parent[0]);
					}

					self._setInter();

					phase2();
				},
				phase2 = function(){
					var scrollTop = window.pageYOffset,
						scrollLeft = window.pageXOffset,
						docHeight = document.documentElement.scrollHeight;

					self._getInterMixData();

					self._setFinal();

					self._getFinalMixData();

					(window.pageYOffset !== scrollTop) && window.scrollTo(scrollLeft, scrollTop);

					self._prepTargets();

					if(window.requestAnimationFrame){
						requestAnimationFrame(phase3);
					} else {
						setTimeout(function(){
							phase3();
						},20);
					}
				},
				phase3 = function(){
					self._animateTargets();

					if(self._targetsBound === 0){
						self._cleanUp();
					}
				},
				chromeFix = function(grid){
					var parent = grid.parentElement,
						placeholder = document.createElement('div'),
						frag = document.createDocumentFragment();

					parent.insertBefore(placeholder, grid);
					frag.appendChild(grid);
					parent.replaceChild(grid, placeholder);
				},
				futureState = self._buildState(true);

			self._execAction('_goMix', 0, arguments);

			!self.animation.duration && (animate = false);

			self._mixing = true;

			self._$container.removeClass(self.layout.containerClassFail);

			if(typeof self.callbacks.onMixStart === 'function'){
				self.callbacks.onMixStart.call(self._domNode, self._state, futureState, self);
			}

			self._$container.trigger('mixStart', [self._state, futureState, self]);

			self._getOrigMixData();

			if(animate && !self._suckMode){

				window.requestAnimationFrame ?
					requestAnimationFrame(phase1) :
					phase1();

			} else {
				self._cleanUp();
			}

			self._execAction('_goMix', 1, arguments);
		},

		/**
		 * Get Target Data
		 * @since 2.0.0
		 */

		_getTargetData: function(el, stage){
			var self = this,
				elStyle;

			el.dataset[stage+'PosX'] = el.offsetLeft;
			el.dataset[stage+'PosY'] = el.offsetTop;

			if(self.animation.animateResizeTargets){
				elStyle = !self._suckMode ?
					window.getComputedStyle(el) :
					{
						marginBottom: '',
						marginRight: ''
					};

				el.dataset[stage+'MarginBottom'] = parseInt(elStyle.marginBottom);
				el.dataset[stage+'MarginRight'] = parseInt(elStyle.marginRight);
				el.dataset[stage+'Width'] = el.offsetWidth;
				el.dataset[stage+'Height'] = el.offsetHeight;
			}
		},

		/**
		 * Get Original Mix Data
		 * @since 2.0.0
		 */

		_getOrigMixData: function(){
			var self = this,
				parentStyle = !self._suckMode ? window.getComputedStyle(self._$parent[0]) : {boxSizing: ''},
				parentBS = parentStyle.boxSizing || parentStyle[self._vendor+'BoxSizing'];

			self._incPadding = (parentBS === 'border-box');

			self._execAction('_getOrigMixData', 0);

			!self._suckMode && (self.effects = self._parseEffects());

			self._$toHide = self._$hide.filter(':visible');
			self._$toShow = self._$show.filter(':hidden');
			self._$pre = self._$targets.filter(':visible');

			self._startHeight = self._incPadding ?
				self._$parent.outerHeight() :
				self._$parent.height();

			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i];

				self._getTargetData(el, 'orig');
			}

			self._execAction('_getOrigMixData', 1);
		},

		/**
		 * Set Intermediate Positions
		 * @since 2.0.0
		 */

		_setInter: function(){
			var self = this;

			self._execAction('_setInter', 0);

			if(self._changingLayout && self.animation.animateChangeLayout){
				self._$toShow.css('display',self._newDisplay);

				if(self._changingClass){
					self._$container
						.removeClass(self.layout.containerClass)
						.addClass(self._newClass);
				}
			} else {
				self._$toShow.css('display', self.layout.display);
			}

			self._execAction('_setInter', 1);
		},

		/**
		 * Get Intermediate Mix Data
		 * @since 2.0.0
		 */

		_getInterMixData: function(){
			var self = this;

			self._execAction('_getInterMixData', 0);

			for(var i = 0; i < self._$toShow.length; i++){
				var el = self._$toShow[i];

				self._getTargetData(el, 'inter');
			}

			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i];

				self._getTargetData(el, 'inter');
			}

			self._execAction('_getInterMixData', 1);
		},

		/**
		 * Set Final Positions
		 * @since 2.0.0
		 */

		_setFinal: function(){
			var self = this;

			self._execAction('_setFinal', 0);

			self._sorting && self._printSort();

			self._$toHide.removeStyle('display');

			if(self._changingLayout && self.animation.animateChangeLayout){
				self._$pre.css('display',self._newDisplay);
			}

			self._execAction('_setFinal', 1);
		},

		/**
		 * Get Final Mix Data
		 * @since 2.0.0
		 */

		_getFinalMixData: function(){
			var self = this;

			self._execAction('_getFinalMixData', 0);

			for(var i = 0; i < self._$toShow.length; i++){
				var el = self._$toShow[i];

				self._getTargetData(el, 'final');
			}

			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i];

				self._getTargetData(el, 'final');
			}

			self._newHeight = self._incPadding ?
				self._$parent.outerHeight() :
				self._$parent.height();

			self._sorting && self._printSort(true);

			self._$toShow.removeStyle('display');

			self._$pre.css('display',self.layout.display);

			if(self._changingClass && self.animation.animateChangeLayout){
				self._$container
					.removeClass(self._newClass)
					.addClass(self.layout.containerClass);
			}

			self._execAction('_getFinalMixData', 1);
		},

		/**
		 * Prepare Targets
		 * @since 2.0.0
		 */

		_prepTargets: function(){
			var self = this,
				transformCSS = {
					_in: self._getPrefixedCSS('transform', self.effects.transformIn),
					_out: self._getPrefixedCSS('transform', self.effects.transformOut)
				};

			self._execAction('_prepTargets', 0);

			if(self.animation.animateResizeContainer){
				self._$parent.css('height',self._startHeight+'px');
			}

			for(var i = 0; i < self._$toShow.length; i++){
				var el = self._$toShow[i],
					$el = $(el);

				el.style.opacity = self.effects.opacity;
				el.style.display = (self._changingLayout && self.animation.animateChangeLayout) ?
					self._newDisplay :
					self.layout.display;

				$el.css(transformCSS._in);

				if(self.animation.animateResizeTargets){
					el.style.width = el.dataset.finalWidth+'px';
					el.style.height = el.dataset.finalHeight+'px';
					el.style.marginRight = -(el.dataset.finalWidth - el.dataset.interWidth) + (el.dataset.finalMarginRight * 1)+'px';
					el.style.marginBottom = -(el.dataset.finalHeight - el.dataset.interHeight) + (el.dataset.finalMarginBottom * 1)+'px';
				}
			}

			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i],
					$el = $(el),
					translate = {
						x: el.dataset.origPosX - el.dataset.interPosX,
						y: el.dataset.origPosY - el.dataset.interPosY
					},
					transformCSS = self._getPrefixedCSS('transform','translate('+translate.x+'px,'+translate.y+'px)');

				$el.css(transformCSS);

				if(self.animation.animateResizeTargets){
					el.style.width = el.dataset.origWidth+'px';
					el.style.height = el.dataset.origHeight+'px';

					if(el.dataset.origWidth - el.dataset.finalWidth){
						el.style.marginRight = -(el.dataset.origWidth - el.dataset.interWidth) + (el.dataset.origMarginRight * 1)+'px';
					}

					if(el.dataset.origHeight - el.dataset.finalHeight){
						el.style.marginBottom = -(el.dataset.origHeight - el.dataset.interHeight) + (el.dataset.origMarginBottom * 1) +'px';
					}
				}
			}

			self._execAction('_prepTargets', 1);
		},

		/**
		 * Animate Targets
		 * @since 2.0.0
		 */

		_animateTargets: function(){
			var self = this;

			self._execAction('_animateTargets', 0);

			self._targetsDone = 0;
			self._targetsBound = 0;

			self._$parent
				.css(self._getPrefixedCSS('perspective', self.animation.perspectiveDistance+'px'))
				.css(self._getPrefixedCSS('perspective-origin', self.animation.perspectiveOrigin));

			if(self.animation.animateResizeContainer){
				self._$parent
					.css(self._getPrefixedCSS('transition','height '+self.animation.duration+'ms ease'))
					.css('height',self._newHeight+'px');
			}

			for(var i = 0; i < self._$toShow.length; i++){
				var el = self._$toShow[i],
					$el = $(el),
					translate = {
						x: el.dataset.finalPosX - el.dataset.interPosX,
						y: el.dataset.finalPosY - el.dataset.interPosY
					},
					delay = self._getDelay(i),
					toShowCSS = {};

				el.style.opacity = '';

				for(var j = 0; j < 2; j++){
					var a = j === 0 ? a = self._prefix : '';

					if(self._ff && self._ff <= 20){
						toShowCSS[a+'transition-property'] = 'all';
						toShowCSS[a+'transition-timing-function'] = self.animation.easing+'ms';
						toShowCSS[a+'transition-duration'] = self.animation.duration+'ms';
					}

					toShowCSS[a+'transition-delay'] = delay+'ms';
					toShowCSS[a+'transform'] = 'translate('+translate.x+'px,'+translate.y+'px)';
				}

				if(self.effects.transform || self.effects.opacity){
					self._bindTargetDone($el);
				}

				(self._ff && self._ff <= 20) ?
					$el.css(toShowCSS) :
					$el.css(self.effects.transition).css(toShowCSS);
			}

			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i],
					$el = $(el),
					translate = {
						x: el.dataset.finalPosX - el.dataset.interPosX,
						y: el.dataset.finalPosY - el.dataset.interPosY
					},
					delay = self._getDelay(i);

				if(!(
					el.dataset.finalPosX === el.dataset.origPosX &&
					el.dataset.finalPosY === el.dataset.origPosY
				)){
					self._bindTargetDone($el);
				}

				$el.css(self._getPrefixedCSS('transition', 'all '+self.animation.duration+'ms '+self.animation.easing+' '+delay+'ms'));
				$el.css(self._getPrefixedCSS('transform', 'translate('+translate.x+'px,'+translate.y+'px)'));

				if(self.animation.animateResizeTargets){
					if(el.dataset.origWidth - el.dataset.finalWidth && el.dataset.finalWidth * 1){
						el.style.width = el.dataset.finalWidth+'px';
						el.style.marginRight = -(el.dataset.finalWidth - el.dataset.interWidth)+(el.dataset.finalMarginRight * 1)+'px';
					}

					if(el.dataset.origHeight - el.dataset.finalHeight && el.dataset.finalHeight * 1){
						el.style.height = el.dataset.finalHeight+'px';
						el.style.marginBottom = -(el.dataset.finalHeight - el.dataset.interHeight)+(el.dataset.finalMarginBottom * 1) +'px';
					}
				}
			}

			if(self._changingClass){
				self._$container
					.removeClass(self.layout.containerClass)
					.addClass(self._newClass);
			}

			for(var i = 0; i < self._$toHide.length; i++){
				var el = self._$toHide[i],
					$el = $(el),
					delay = self._getDelay(i),
					toHideCSS = {};

				for(var j = 0; j<2; j++){
					var a = j === 0 ? a = self._prefix : '';

					toHideCSS[a+'transition-delay'] = delay+'ms';
					toHideCSS[a+'transform'] = self.effects.transformOut;
					toHideCSS.opacity = self.effects.opacity;
				}

				$el.css(self.effects.transition).css(toHideCSS);

				if(self.effects.transform || self.effects.opacity){
					self._bindTargetDone($el);
				};
			}

			self._execAction('_animateTargets', 1);

		},

		/**
		 * Bind Targets TransitionEnd
		 * @since 2.0.0
		 * @param {object} $el
		 */

		_bindTargetDone: function($el){
			var self = this,
				el = $el[0];

			self._execAction('_bindTargetDone', 0, arguments);

			if(!el.dataset.bound){

				el.dataset.bound = true;
				self._targetsBound++;

				$el.on('webkitTransitionEnd.mixItUp transitionend.mixItUp',function(e){
					if(
						(e.originalEvent.propertyName.indexOf('transform') > -1 ||
						e.originalEvent.propertyName.indexOf('opacity') > -1) &&
						$(e.originalEvent.target).is(self.selectors.target)
					){
						$el.off('.mixItUp');
						el.dataset.bound = '';
						self._targetDone();
					}
				});
			}

			self._execAction('_bindTargetDone', 1, arguments);
		},

		/**
		 * Target Done
		 * @since 2.0.0
		 */

		_targetDone: function(){
			var self = this;

			self._execAction('_targetDone', 0);

			self._targetsDone++;

			(self._targetsDone === self._targetsBound) && self._cleanUp();

			self._execAction('_targetDone', 1);
		},

		/**
		 * Clean Up
		 * @since 2.0.0
		 */

		_cleanUp: function(){
			var self = this,
				targetStyles = self.animation.animateResizeTargets ?
					'transform opacity width height margin-bottom margin-right' :
					'transform opacity',
				unBrake = function(){
					self._$targets.removeStyle('transition', self._prefix);
				};

			self._execAction('_cleanUp', 0);

			!self._changingLayout ?
				self._$show.css('display',self.layout.display) :
				self._$show.css('display',self._newDisplay);

			self._$targets.css(self._brake);

			self._$targets
				.removeStyle(targetStyles, self._prefix)
				.removeAttr('data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom');

			self._$hide.removeStyle('display');

			self._$parent.removeStyle('height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin', self._prefix);

			if(self._sorting){
				self._printSort();
				self._activeSort = self._newSortString;
				self._sorting = false;
			}

			if(self._changingLayout){
				if(self._changingDisplay){
					self.layout.display = self._newDisplay;
					self._changingDisplay = false;
				}

				if(self._changingClass){
					self._$parent.removeClass(self.layout.containerClass).addClass(self._newClass);
					self.layout.containerClass = self._newClass;
					self._changingClass = false;
				}

				self._changingLayout = false;
			}

			self._refresh();

			self._buildState();

			if(self._state.fail){
				self._$container.addClass(self.layout.containerClassFail);
			}

			self._$show = $();
			self._$hide = $();

			if(window.requestAnimationFrame){
				requestAnimationFrame(unBrake);
			}

			self._mixing = false;

			if(typeof self.callbacks._user === 'function'){
				self.callbacks._user.call(self._domNode, self._state, self);
			}

			if(typeof self.callbacks.onMixEnd === 'function'){
				self.callbacks.onMixEnd.call(self._domNode, self._state, self);
			}

			self._$container.trigger('mixEnd', [self._state, self]);

			if(self._state.fail){
				(typeof self.callbacks.onMixFail === 'function') && self.callbacks.onMixFail.call(self._domNode, self._state, self);
				self._$container.trigger('mixFail', [self._state, self]);
			}

			if(self._loading){
				(typeof self.callbacks.onMixLoad === 'function') && self.callbacks.onMixLoad.call(self._domNode, self._state, self);
				self._$container.trigger('mixLoad', [self._state, self]);
			}

			if(self._queue.length){
				self._execAction('_queue', 0);

				self.multiMix(self._queue[0][0],self._queue[0][1],self._queue[0][2]);
				self._queue.splice(0, 1);
			}

			self._execAction('_cleanUp', 1);

			self._loading = false;
		},

		/**
		 * Get Prefixed CSS
		 * @since 2.0.0
		 * @param {string} property
		 * @param {string} value
		 * @param {boolean} prefixValue
		 * @return {object} styles
		 */

		_getPrefixedCSS: function(property, value, prefixValue){
			var self = this,
				styles = {},
				prefix = '',
				i = -1;

			for(i = 0; i < 2; i++){
				prefix = i === 0 ? self._prefix : '';
				prefixValue ? styles[prefix+property] = prefix+value : styles[prefix+property] = value;
			}

			return self._execFilter('_getPrefixedCSS', styles, arguments);
		},

		/**
		 * Get Delay
		 * @since 2.0.0
		 * @param {number} i
		 * @return {number} delay
		 */

		_getDelay: function(i){
			var self = this,
				n = typeof self.animation.staggerSequence === 'function' ? self.animation.staggerSequence.call(self._domNode, i, self._state) : i,
				delay = self.animation.stagger ? n * self.animation.staggerDuration : 0;

			return self._execFilter('_getDelay', delay, arguments);
		},

		/**
		 * Parse MultiMix Arguments
		 * @since 2.0.0
		 * @param {array} args
		 * @return {object} output
		 */

		_parseMultiMixArgs: function(args){
			var self = this,
				output = {
					command: null,
					animate: self.animation.enable,
					callback: null
				};

			for(var i = 0; i < args.length; i++){
				var arg = args[i];

				if(arg !== null){
					if(typeof arg === 'object' || typeof arg === 'string'){
						output.command = arg;
					} else if(typeof arg === 'boolean'){
						output.animate = arg;
					} else if(typeof arg === 'function'){
						output.callback = arg;
					}
				}
			}

			return self._execFilter('_parseMultiMixArgs', output, arguments);
		},

		/**
		 * Parse Insert Arguments
		 * @since 2.0.0
		 * @param {array} args
		 * @return {object} output
		 */

		_parseInsertArgs: function(args){
			var self = this,
				output = {
					index: 0,
					$object: $(),
					multiMix: {filter: self._state.activeFilter},
					callback: null
				};

			for(var i = 0; i < args.length; i++){
				var arg = args[i];

				if(typeof arg === 'number'){
					output.index = arg;
				} else if(typeof arg === 'object' && arg instanceof $){
					output.$object = arg;
				} else if(typeof arg === 'object' && self._helpers._isElement(arg)){
					output.$object = $(arg);
				} else if(typeof arg === 'object' && arg !== null){
					output.multiMix = arg;
				} else if(typeof arg === 'boolean' && !arg){
					output.multiMix = false;
				} else if(typeof arg === 'function'){
					output.callback = arg;
				}
			}

			return self._execFilter('_parseInsertArgs', output, arguments);
		},

		/**
		 * Execute Action
		 * @since 2.0.0
		 * @param {string} methodName
		 * @param {boolean} isPost
		 * @param {array} args
		 */

		_execAction: function(methodName, isPost, args){
			var self = this,
				context = isPost ? 'post' : 'pre';

			if(!self._actions.isEmptyObject && self._actions.hasOwnProperty(methodName)){
				for(var key in self._actions[methodName][context]){
					self._actions[methodName][context][key].call(self, args);
				}
			}
		},

		/**
		 * Execute Filter
		 * @since 2.0.0
		 * @param {string} methodName
		 * @param {mixed} value
		 * @return {mixed} value
		 */

		_execFilter: function(methodName, value, args){
			var self = this;

			if(!self._filters.isEmptyObject && self._filters.hasOwnProperty(methodName)){
				for(var key in self._filters[methodName]){
					return self._filters[methodName][key].call(self, args);
				}
			} else {
				return value;
			}
		},

		/* Helpers
		---------------------------------------------------------------------- */

		_helpers: {

			/**
			 * CamelCase
			 * @since 2.0.0
			 * @param {string}
			 * @return {string}
			 */

			_camelCase: function(string){
				return string.replace(/-([a-z])/g, function(g){
						return g[1].toUpperCase();
				});
			},

			/**
			 * Is Element
			 * @since 2.1.3
			 * @param {object} element to test
			 * @return {boolean}
			 */

			_isElement: function(el){
				if(window.HTMLElement){
					return el instanceof HTMLElement;
				} else {
					return (
						el !== null &&
						el.nodeType === 1 &&
						el.nodeName === 'string'
					);
				}
			}
		},

		/* Public Methods
		---------------------------------------------------------------------- */

		/**
		 * Is Mixing
		 * @since 2.0.0
		 * @return {boolean}
		 */

		isMixing: function(){
			var self = this;

			return self._execFilter('isMixing', self._mixing);
		},

		/**
		 * Filter (public)
		 * @since 2.0.0
		 * @param {array} arguments
		 */

		filter: function(){
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self._clicking && (self._toggleString = '');

			self.multiMix({filter: args.command}, args.animate, args.callback);
		},

		/**
		 * Sort (public)
		 * @since 2.0.0
		 * @param {array} arguments
		 */

		sort: function(){
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self.multiMix({sort: args.command}, args.animate, args.callback);
		},

		/**
		 * Change Layout (public)
		 * @since 2.0.0
		 * @param {array} arguments
		 */

		changeLayout: function(){
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self.multiMix({changeLayout: args.command}, args.animate, args.callback);
		},

		/**
		 * MultiMix
		 * @since 2.0.0
		 * @param {array} arguments
		 */

		multiMix: function(){
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self._execAction('multiMix', 0, arguments);

			if(!self._mixing){
				if(self.controls.enable && !self._clicking){
					self.controls.toggleFilterButtons && self._buildToggleArray();
					self._updateControls(args.command, self.controls.toggleFilterButtons);
				}

				(self._queue.length < 2) && (self._clicking = false);

				delete self.callbacks._user;
				if(args.callback) self.callbacks._user = args.callback;

				var sort = args.command.sort,
					filter = args.command.filter,
					changeLayout = args.command.changeLayout;

				self._refresh();

				if(sort){
					self._newSort = self._parseSort(sort);
					self._newSortString = sort;

					self._sorting = true;
					self._sort();
				}

				if(filter !== undf){
					filter = (filter === 'all') ? self.selectors.target : filter;

					self._activeFilter = filter;
				}

				self._filter();

				if(changeLayout){
					self._newDisplay = (typeof changeLayout === 'string') ? changeLayout : changeLayout.display || self.layout.display;
					self._newClass = changeLayout.containerClass || '';

					if(
						self._newDisplay !== self.layout.display ||
						self._newClass !== self.layout.containerClass
					){
						self._changingLayout = true;

						self._changingClass = (self._newClass !== self.layout.containerClass);
						self._changingDisplay = (self._newDisplay !== self.layout.display);
					}
				}

				self._$targets.css(self._brake);

				self._goMix(args.animate ^ self.animation.enable ? args.animate : self.animation.enable);

				self._execAction('multiMix', 1, arguments);

			} else {
				if(self.animation.queue && self._queue.length < self.animation.queueLimit){
					self._queue.push(arguments);

					(self.controls.enable && !self._clicking) && self._updateControls(args.command);

					self._execAction('multiMixQueue', 1, arguments);

				} else {
					if(typeof self.callbacks.onMixBusy === 'function'){
						self.callbacks.onMixBusy.call(self._domNode, self._state, self);
					}
					self._$container.trigger('mixBusy', [self._state, self]);

					self._execAction('multiMixBusy', 1, arguments);
				}
			}
		},

		/**
		 * Insert
		 * @since 2.0.0
		 * @param {array} arguments
		 */

		insert: function(){
			var self = this,
				args = self._parseInsertArgs(arguments),
				callback = (typeof args.callback === 'function') ? args.callback : null,
				frag = document.createDocumentFragment(),
				target = (function(){
					self._refresh();

					if(self._$targets.length){
						return (args.index < self._$targets.length || !self._$targets.length) ?
							self._$targets[args.index] :
							self._$targets[self._$targets.length-1].nextElementSibling;
					} else {
						return self._$parent[0].children[0];
					}
				})();

			self._execAction('insert', 0, arguments);

			if(args.$object){
				for(var i = 0; i < args.$object.length; i++){
					var el = args.$object[i];

					frag.appendChild(el);
					frag.appendChild(document.createTextNode(' '));
				}

				self._$parent[0].insertBefore(frag, target);
			}

			self._execAction('insert', 1, arguments);

			if(typeof args.multiMix === 'object'){
				self.multiMix(args.multiMix, callback);
			}
		},

		/**
		 * Prepend
		 * @since 2.0.0
		 * @param {array} arguments
		 */

		prepend: function(){
			var self = this,
				args = self._parseInsertArgs(arguments);

			self.insert(0, args.$object, args.multiMix, args.callback);
		},

		/**
		 * Append
		 * @since 2.0.0
		 * @param {array} arguments
		 */

		append: function(){
			var self = this,
				args = self._parseInsertArgs(arguments);

			self.insert(self._state.totalTargets, args.$object, args.multiMix, args.callback);
		},

		/**
		 * Get Option
		 * @since 2.0.0
		 * @param {string} string
		 * @return {mixed} value
		 */

		getOption: function(string){
			var self = this,
				getProperty = function(obj, prop){
					var parts = prop.split('.'),
						last = parts.pop(),
						l = parts.length,
						i = 1,
						current = parts[0] || prop;

					while((obj = obj[current]) && i < l){
						current = parts[i];
						i++;
					}

					if(obj !== undf){
						return obj[last] !== undf ? obj[last] : obj;
					}
				};

			return string ? self._execFilter('getOption', getProperty(self, string), arguments) : self;
		},

		/**
		 * Set Options
		 * @since 2.0.0
		 * @param {object} config
		 */

		setOptions: function(config){
			var self = this;

			self._execAction('setOptions', 0, arguments);

			typeof config === 'object' && $.extend(true, self, config);

			self._execAction('setOptions', 1, arguments);
		},

		/**
		 * Get State
		 * @since 2.0.0
		 * @return {object} state
		 */

		getState: function(){
			var self = this;

			return self._execFilter('getState', self._state, self);
		},

		/**
		 * Force Refresh
		 * @since 2.1.2
		 */

		forceRefresh: function(){
			var self = this;

			self._refresh(false, true);
		},

		/**
		 * Destroy
		 * @since 2.0.0
		 * @param {boolean} hideAll
		 */

		destroy: function(hideAll){
			var self = this,
				filters = $.MixItUp.prototype._bound._filter,
				sorts = $.MixItUp.prototype._bound._sort;

			self._execAction('destroy', 0, arguments);

			self._$body
				.add($(self.selectors.sort))
				.add($(self.selectors.filter))
				.off('.mixItUp');

			for(var i = 0; i < self._$targets.length; i++){
				var target = self._$targets[i];

				hideAll && (target.style.display = '');

				delete target.mixParent;
			}

			self._execAction('destroy', 1, arguments);

			if(filters[self.selectors.filter] && filters[self.selectors.filter] > 1) {
				filters[self.selectors.filter]--;
			} else if(filters[self.selectors.filter] === 1) {
				delete filters[self.selectors.filter];
			}

			if(sorts[self.selectors.sort] && sorts[self.selectors.sort] > 1) {
				sorts[self.selectors.sort]--;
			} else if(sorts[self.selectors.sort] === 1) {
				delete sorts[self.selectors.sort];
			}

			delete $.MixItUp.prototype._instances[self._id];
		}

	};

	/* jQuery Methods
	---------------------------------------------------------------------- */

	/**
	 * jQuery .mixItUp() method
	 * @since 2.0.0
	 * @extends $.fn
	 */

	$.fn.mixItUp = function(){
		var args = arguments,
			dataReturn = [],
			eachReturn,
			_instantiate = function(domNode, settings){
				var instance = new $.MixItUp(),
					rand = function(){
						return ('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6).toUpperCase();
					};

				instance._execAction('_instantiate', 0, arguments);

				domNode.id = !domNode.id ? 'MixItUp'+rand() : domNode.id;

				if(!instance._instances[domNode.id]){
					instance._instances[domNode.id] = instance;
					instance._init(domNode, settings);
				}

				instance._execAction('_instantiate', 1, arguments);
			};

		eachReturn = this.each(function(){
			if(args && typeof args[0] === 'string'){
				var instance = $.MixItUp.prototype._instances[this.id];
				if(args[0] === 'isLoaded'){
					dataReturn.push(instance ? true : false);
				} else {
					var data = instance[args[0]](args[1], args[2], args[3]);
					if(data !== undf)dataReturn.push(data);
				}
			} else {
				_instantiate(this, args[0]);
			}
		});

		if(dataReturn.length){
			return dataReturn.length > 1 ? dataReturn : dataReturn[0];
		} else {
			return eachReturn;
		}
	};

	/**
	 * jQuery .removeStyle() method
	 * @since 2.0.0
	 * @extends $.fn
	 */

	$.fn.removeStyle = function(style, prefix){
		prefix = prefix ? prefix : '';

		return this.each(function(){
			var el = this,
				styles = style.split(' ');

			for(var i = 0; i < styles.length; i++){
				for(var j = 0; j < 4; j++){
					switch (j) {
						case 0:
							var prop = styles[i];
							break;
						case 1:
							var prop = $.MixItUp.prototype._helpers._camelCase(prop);
							break;
						case 2:
							var prop = prefix+styles[i];
							break;
						case 3:
							var prop = $.MixItUp.prototype._helpers._camelCase(prefix+styles[i]);
					}

					if(
						el.style[prop] !== undf &&
						typeof el.style[prop] !== 'unknown' &&
						el.style[prop].length > 0
					){
						el.style[prop] = '';
					}

					if(!prefix && j === 1)break;
				}
			}

			if(el.attributes && el.attributes.style && el.attributes.style !== undf && el.attributes.style.value === ''){
				el.attributes.removeNamedItem('style');
			}
		});
	};

})(jQuery);
/**
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function(factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = '0.7.2';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // use on or bind where supported
    var on = $.fn.on ? 'on' : 'bind';

    // update heights on load and resize events
    $(window)[on]('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window)[on]('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

});
