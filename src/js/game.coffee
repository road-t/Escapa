class Game
  cfg = {}

  _cycleTO = null # timeout ID to prevent double-calls on mobile devices
  _pa = 0 # post animation step
  animations = []

  html_escape_logo = null

  lang = navigator.language

  logo = null
  bgr = null

  _tkn = null
  rating = { data: null, ts: 0 }

  renderer = null
  loader = null

  collision = null
  level = {}
  current_level = 0
  difficulty = -1
  player = { id: null, name: 'чувак', rank: 0, record: 0 }
  _score = []
  total_time = 0
  total_bonus = 0

  constructor: (config) ->
    cfg = config
    renderer = new Render(cfg.debug)
    loader = new Resource(cfg.folders, start_screen, _loading)
    animations = cfg.animations if cfg.animations?
    logo = cfg.logo if cfg.logo?
    bgr = cfg.bgr if cfg.bgr?

    html_escape_logo = $('#escapelogo')
    $('#gotvglogo,#razerlogo').click (e) -> e.stopPropagation()
    $('#version').text('v' + cfg.version)
    $('#cpr_notice').text(getString(main.copyright) + '.')
    $('#click_notice').text(getString(main.continue))
    $('#click').text(getString(main.click))
    $('#options > #title').text(getString(main.difficulty))
    $('#easy').text(getString(main.easy))
    $('#normal').text(getString(main.normal))
    $('#hard').text(getString(main.hardcore))
    $('#insane').text(getString(main.insane))

    # TODO: crash on bogus config


    $(document).keyup (e) =>
      switch e.keyCode
        when 70 then $('#fps').toggle()     # F
        when 86 then $('#version').toggle() # V
        when 82 then showTop()              # R
        when 68 then $('#dbg').toggle()     # D

    #  console.log e.keyCode
    getTop()
    load()

  reset = ->
    _score = []
    total_time = 0
    total_bonus = 0
    current_level = 0

  load = =>
    showMessage getString(main.loading) + " 0%"

    collision = null

    # load level data
    level = $.extend true, {}, cfg.levels[current_level]
    level.speed -= difficulty * 0.15
    level.stop -= difficulty * 2000
    level.minimal -= difficulty * 2000
    level.time = 0
    level.started = 0
    level.score = 0
    level.last_ts = 0 # last timestamp

    # get resources
    loader.startQueue()

    unless current_level
      logo = loader.getResource(cfg.logo.name, 'misc').image if cfg.logo?
      bgr = loader.getResource(cfg.bgr.name, 'misc').image if cfg.bgr?
    else
      updateHUD()

    if level.background? and level.background.name
      level.background.image = loader.getResource(level.background.name, 'bgr').image

    # load player data
    if level.player? and level.player.sprite?
      level.player.sprite.image = loader.getResource(level.player.sprite.name, 'player').image
      level.player.sprite.x = 0 unless level.player.sprite.x
      level.player.sprite.y = 0 unless level.player.sprite.y
      #level.player.sprite.width = 0 unless level.player.image.width
      #level.player.sprite.height = 0 unless level.player.image.width
      level.player.sprite.frames = 1 unless level.player.sprite.frames
      level.player.sprite.fpf = 1000 unless level.player.sprite.fpf
      level.player.sprite.fsps = 0

    if level.player and level.player.radius
      level.player.width = level.player.height = level.player.radius * 2

    # load enemies data
    if level.enemies?
      for enemy in level.enemies
        if enemy.sprite?
          enemy.sprite.image = loader.getResource(enemy.sprite.name, 'mob').image
          enemy.sprite.x = 0 unless enemy.sprite.x
          enemy.sprite.y = 0 unless enemy.sprite.y
          #enemy.sprite.width = 0 unless enemy.image.width
          #enemy.sprite.height = 0 unless enemy.image.width
          enemy.sprite.frames = 1 unless enemy.sprite.frames
          enemy.sprite.fpf = 1000 unless enemy.sprite.fpf
          enemy.sprite.fsps = 0

        if enemy.em.auto
          enemy.em.x *= if random() then 1 else -1
          enemy.em.y *= if random() then 1 else -1

        #enemy.em.i = 0 unless enemy.em.i?
        enemy.em.m = 0 unless enemy.em.m?

        if enemy.radius?
          # TODO: raise error on wrong config
          enemy.width = enemy.height = enemy.radius * 2

        if enemy.projectiles?
          for projectile in enemy.projectiles
            if projectile.sprite?
              projectile.sprite.image = loader.getResource(projectile.sprite.name, 'projectiles').image
              projectile.sprite.x = 0 unless projectile.sprite.x
              projectile.sprite.y = 0 unless projectile.sprite.y
              #projectile.sprite.width = 0 unless projectile.image.width
              #projectile.sprite.height = 0 unless projectile.image.width
              projectile.sprite.frames = 1 unless projectile.sprite.frames
              projectile.sprite.fpf = 1000 unless projectile.sprite.fpf
              projectile.sprite.fsps = 0

            # put projectile to an initial position
            projectile.top = -100
            projectile.left = -100
            projectile.hide = true
            projectile.last_time = 0

            if projectile.radius?
            # TODO: raise error on wrong config
              projectile.width = projectile.height = projectile.radius * 2

            #projectile.em.i = 0 unless projectile.em.i?
            projectile.em.m = 0 unless projectile.em.m?

    animation.image = loader.getResource(animation.name, 'animation').image for animation in animations

    loader.closeQueue() # wait for progress


  _loading = (progress) =>
    showMessage getString(main.loading) + ' ' + progress + '%'

  kill = =>
    reset()
    load()

  start_screen = =>
    if current_level
      #if current_level is 1 and not player.id and not player.record
      #  return showMessage '#f00|Внимание!\n#fff|Чтобы участвовать в <a href="http://got.vg/article/razer-escape/" target="_blank">конкурсе</a>\nи рейтинге, необходимо\nавторизоваться на <a href="http://got.vg/" target="_blank">got.VG</a>\nи перезагрузить страницу', true, wait
      #else
      return wait()

    renderer.clear() # clear everything that could possibly stay
    $('#cover').hide()
    $('#hud').hide()

    $('#start').show().one 'click', ->
      $('#start').hide()
      options()

    demo = =>
      distance = 8

      renderer.draw level
      level.time++
      moveEnemies()

      if level.time < 500
        if _pa < Math.PI*2 then _pa += cfg.logo.buoyancy else _pa = 0
        $(html_escape_logo).css { top: Math.sin(_pa) * distance + cfg.logo.y}
      else
        if level.time == 500
          showTop()
        else if level.time == 1000
          hideTop()
          level.time = 0

      _cycleTO = requestAnimationFrame demo

    demo()

  wait = =>
    $('#cover').one 'click', start
    renderer.clear() # clear everything that could possibly stay
    updateHUD()
    renderer.draw level
    showMessage "#fff|Уровень #{current_level}: #{getString(level.name)}\n#0e0|#{getString(level.hello)}" + if level.minimal then "\n#0cf|Продержись #{level.minimal/1000} секунд" else ''

  options = =>
    cancelAnimationFrame _cycleTO
    $('#cover').css 'display', 'flex'
    $('#message').hide()
    $('#options').show()
    $('#easy').one 'click', => _selectDifficulty 1
    $('#normal').one 'click', => _selectDifficulty 0
    $('#hard').one 'click', => _selectDifficulty -1
    $('#insane').one 'click', => _selectDifficulty -2

  _selectDifficulty = (difficultyLevel) =>
    difficulty = difficultyLevel unless current_level
    $('#options').fadeOut 100
    cancelAnimationFrame _cycleTO
    current_level = 1
    load()

  start = =>
    $('#cover').hide()
    $('#overlay').on 'mousemove touchmove', movePlayer

    level.started = new Date().getTime()

    renderer.resetFPS()
    @stop = false
    play()

  play = =>
    return if @stop

    now = new Date().getTime()

    if current_level and level.last_ts and now - level.last_ts > 300 # cheater or device is too slow
      showMessage '#f00|' + getString(main.error) + '!\nПохоже, что твой\nдевайс работает\nслишком медленно.\nНам очень жаль.', true, kill
      return cancelAnimationFrame _cycleTO

    if level.started
      level.time = now - level.started

    done = false

    if level.stop and level.time + 30 >= level.stop
      done = true

    renderer.draw level

    moveEnemies()

    level.time = level.stop if done

    level.score = level.time - level.minimal if level.time > level.minimal

    updateHUD()

    if collision or done # game over
      cancelAnimationFrame _cycleTO

      $('#overlay').off 'mousemove touchmove'

      if collision and collision.killer?.contact?
        _pa = 0
        switch collision.killer.contact[0]
          when 'disappear' then disappear()
          when 'blowup' then blowup()
          when 'crash' then crash()
          else knockout()
      else
        gameover()
    else
      _cycleTO = requestAnimationFrame play

  gameover = =>
    @stop = true

    multiplier = 1 # bonus multiplier

    if level.minimal <= level.time
      if level.stop and level.time >= (level.stop - 30)
        level.time = level.stop
        multiplier = 2 # double bonus!

      total_bonus += level.score * multiplier
      total_time += level.time

    unless level.score # lose
      if total_bonus
        if total_bonus > player.record
          player.record = total_bonus
          message = "#f00|Game over, #{player.name}!\n#9f0|Новый личный рекорд: #{simplePluralize(total_bonus, ['очко', 'очка', 'очков'])}"
        else
          message = "#f00|Game over, #{player.name}!\n#9f0|Бонус: #{total_bonus}"

        vk_desc = 'Я набрал ' + simplePluralize(player.record, ['очко', 'очка', 'очков']) + ' в Escape!\nУчаствуй в конкурсе на gotVG и выиграй игровую мышь Razer Mamba Tournament Edition!'
        # TODO: display ranking

        message += "\n\n<a href=\"http://vk.com/share.php?url=#{encodeURI('http://got.vg/article/razer-escape/')}&title=#{encodeURI('Мой рекорд в gotVG Escape')}&noparse=true&description=#{encodeURI(vk_desc)}&image=http://escape.got.vg/assets/images/misc/escape.png\" target=\"_blank\">Поделиться ВКонтакте</a>"


        hiscores(message, true)
      else
        message = '#f00|Game over без бонуса!'
        hiscores(message)

      reset()
    else # win
      _score[current_level] = level.score

      if ++current_level < cfg.levels.length # advance level
        message = '#0f0|Уровень пройден!'
        message += '\n#0df|' + level.over + '\n' if level.over
        message += if multiplier < 2 then '\n#f99|Бонус: ' + level.score else "\n#9f0|Бонус #f00|x 2 #ff0|: #{level.score * multiplier}"

        showMessage message, true, load
      else # beaten
        total_bonus *= 2
        message = "#0f0|Игра пройдена, #{player.name}!\n#9f0|Бонус #f00|x 2 #ff0|: #{total_bonus}"

        vk_desc = 'Я прошел Escape! Мой рекорд: ' + simplePluralize(player.record, ['очко', 'очка', 'очков']) + '!\nУчаствуй в конкурсе на gotVG и выиграй игровую мышь Razer Mamba Tournament Edition!'
        # TODO: display ranking

        message += "\n\n<a href=\"http://vk.com/share.php?url=#{encodeURI('http://got.vg/article/razer-escape/')}&title=#{encodeURI('Я прошёл gotVG Escape!')}&noparse=true&description=#{encodeURI(vk_desc)}&image=http://escape.got.vg/assets/images/misc/escape.png\" target=\"_blank\">Поделиться ВКонтакте</a>"

        player.record = total_bonus if total_bonus > player.record

        hiscores(message, true)
        reset()


  _getSpeed = ->
    if level.time
      if level.speed then Math.pow((level.time * level.speed)/10000, 4) + level.speed else 1
      #if level.speed then ((level.time * level.speed)/7500) + level.speed else 1
    else
      return 0

  getTop = ->
    $.get('http://escape.got.vg/record.php', null, (result) =>
      unless result.error
        if result.player?
          player = result.player

        _tkn = result.csrf

        rating.data = result.data
        rating.ts = result.ts

        records = '' # populating rankings table
        i = 0
        for row in rating.data
          records += "<tr><td>#{++i}.</td><td>#{name}</td><td>#{score}</td></tr>" for name, score of row

        $('#records').html(records)
      #else
      #  showMessage '#f00|Беда!\nНевозможно\nсоединиться\nс сервером!', true, kill

    , 'json')
    .fail =>
      showMessage '#f00|' + getString(main.error) + '!\n' + getString(main.connectionIssue), true, hideTop

  hiscores = (msg = '', send = false) ->
    showMessage 'Загрузка рейтинга...', true

    if send and player.id
      data =  {key: _prepare(btoa _score.toString() + '=' + total_time + '|' + total_bonus), score: total_bonus, player: player.id, data: _tkn, version: cfg.version}
    else
      data = null

    $.get('http://escape.got.vg/record.php', data, (result) =>
      unless result.error
        rating.data = result.data
        rating.ts = result.ts

        records = ''

        i = 0
        for row in rating.data
          records += "<tr><td>#{++i}.</td><td>#{name}</td><td>#{score}</td></tr>" for name, score of row

        $('#records').html(records)
        $('#rating').show()
      else
        msg += '\n#f99|Ошибка загрузки рейтинга'

      showMessage msg, true, =>
        $('#rating').hide()
        hideMessage()
        load()

    , 'json')
    .fail =>
        showMessage '#f00|Беда!\nНевозможно\nсоединиться\nс сервером!', true, kill

  showTop = =>
    now = new Date().getTime()
    getTop() if (now/1000 - rating.ts) > 10

    $(html_escape_logo).hide()
    $('#click').hide()

    if rating.data.length
      $('#rating').show()
      showMessage null, true, hideTop

  hideTop = =>
    $('#rating').hide()
    hideMessage()
    $(html_escape_logo).show()
    $('#click').show()

  _prepare = (data) ->
    r = ''
    for i in [0...data.length]
        r += String.fromCharCode(data.charCodeAt(i) ^ 0x64)

    return btoa(r) + '°€§√яZ'

  movePlayer = (e) =>
    return unless level.player?

    # handle touch crap
    e.preventDefault()

    screen = renderer.getScreen()
    _player = level.player

    if e.type is 'touchmove'
      move = e.originalEvent.changedTouches[0]
      curX = move.pageX - screen.left
      curY = move.pageY - screen.top
    else
      curX = e.offsetX
      curY = e.offsetY


    dx = curX - _player.left
    dy = curY - _player.top

    if Math.abs(dx) > _player.width*2
      if curX > _player.left
        curX = _player.left + _player.width
      else
        curX = _player.left - _player.width/4

    if Math.abs(dy) > _player.height*2
      if curY > _player.top
        curY = _player.top + _player.height
      else
       curY = _player.top - _player.height/4


    if _player.height/2 + 50 < curY < (screen.height - _player.height/2) # Y-axis is ok
      _player.top = curY - _player.height/2
    else
      if curY <= _player.height/2 + 50
        _player.top = 50 # too high
      else
        _player.top = screen.height - _player.height # too low

    if _player.width/2 < curX < (screen.width - _player.width/2) # X-axis is ok
      _player.left = curX - _player.width/2
    else
      if curX >= screen.width - _player.width
        _player.left = screen.width - _player.width # too right
      else
        _player.left = 0 # too left

  #_player.em = { x: _player.left - oldCoords.x, y: _player.top - oldCoords.y }

  moveEnemies = ->
    return unless level.enemies?

    screen = renderer.getScreen()
    now = new Date().getTime()
    dt = if level.last_ts > 0 then (now - level.last_ts)/10 else 0

    for enemy in level.enemies
      # move enemies
      if not enemy.safe and not collision and level.player? and point = exactCollision level.player, enemy
        collision = { killer: enemy, point: point, ts: now }
        break

      unless collision
        if enemy.em?
          enemy.top += (enemy.em.y * _getSpeed() * dt) >> 0 if enemy.em.y != 0
          enemy.left += (enemy.em.x * _getSpeed() * dt) >> 0 if enemy.em.x != 0

        for en, num in level.enemies when en isnt enemy # look for collisions
          detectCollision en, enemy, true

        unless enemy.free
          # prevent stucking in walls
          if enemy.em.x and enemy.left > screen.width - enemy.width
            enemy.left = screen.width - enemy.width
            enemy.em.x *= -1

          if enemy.em.x and enemy.left < 0
            enemy.left = 0
            enemy.em.x *= -1

          if enemy.em.y and enemy.top > screen.height - enemy.height
            enemy.top = screen.height - enemy.height
            enemy.em.y *= -1

          if enemy.em.y and enemy.top < 0
            enemy.top = 0
            enemy.em.y *= -1

        #enemy.em.i = Math.sqrt(Math.pow(enemy.em.x, 2) + Math.pow(enemy.em.y, 2)) * enemy.em.m

      if enemy.projectiles # shoot
        for projectile in enemy.projectiles
          if not collision and level.player? and point = exactCollision level.player, projectile, 1
            collision = { killer: projectile, point: point, ts: now }
            break

          unless projectile.hide #move projectile
            #TODO: check full object dimensions
            if projectile.sprite
              sprite_offset_y = projectile.sprite.image.height - projectile.sprite.y
              sprite_offset_x = projectile.sprite.image.width - projectile.sprite.x
            else
              sprite_offset_x = 0
              sprite_offset_y = 0

            if (projectile.top + projectile.height + sprite_offset_y) < 0 or projectile.top > screen.height or (projectile.left + projectile.width + sprite_offset_x) < 0 or projectile.left > screen.width # out of screen - hide
              projectile.hide = true
            else
              projectile.top += (projectile.em.y * _getSpeed() * dt) >> 0
              projectile.left += (projectile.em.x * _getSpeed() * dt) >> 0
          else
            if not collision and projectile.last_time + projectile.frequency < level.time # shoot again

              # reset projectile state
              #projectile = $.extend true, {}, cfg.levels[current_level].enemies[]
              if projectile.em.auto
                projectile.em = { x: randomFloat(-1.5, 1.5), y: randomFloat(1.5, 3), m: projectile.radius/30 * randomFloat(1, 2)}

              if projectile.em.sauto
                projectile.em.x *= randomFloat(0.7, 1.3)
                projectile.em.y *= randomFloat(0.7, 1.3)

              #projectile.em.i = Math.sqrt(Math.pow(projectile.em.x, 2) + Math.pow(projectile.em.y, 2)) * projectile.em.m

              projectile.top = enemy.top + projectile.y
              projectile.left = enemy.left + projectile.x
              projectile.last_time = level.time

              projectile.hide = false

          for en in level.enemies
            if en.projectiles?
              for p in en.projectiles when p isnt projectile
                detectCollision p, projectile, true # push away projectiles from each other

    level.last_ts = now

  disappear = =>
    if _pa <= level.player.width
      renderer.animate(level.player, _pa)
      _cycleTO = requestAnimationFrame disappear
      _pa += 12
    else
      cancelAnimationFrame _cycleTO
      _pa = 0
      gameover()

  blowup = =>
    if _pa < animations[1].fpf * animations[1].frames + animations[1].fpf

      level.player.top += (collision.killer.em.y/2 + 1) >> 0
      level.player.left += (collision.killer.em.x/2 + 1) >> 0

      renderer.draw level
      renderer.animation level.player.left, level.player.top, animations[1], _pa
      moveEnemies()
      _cycleTO = requestAnimationFrame blowup
      _pa++
    else
      cancelAnimationFrame _cycleTO
      _pa = 0
      gameover()

  crash = ->
    level.player.rotation = { auto: true }
    collide(level.player, collision.killer)

    animate = =>
      screen = renderer.getScreen()
      _player = level.player
      killer = collision.killer

      renderer.draw level

      # animate dust
      if _pa++ < animations[0].fpf * animations[0].frames
        x = collision.point.x - animations[0].width/2 + killer.left
        y = collision.point.y - animations[0].height/2 + killer.top

        renderer.animation x, y, animations[0], _pa, _player

      now = new Date()

      # move objects
      if now.getTime() - collision.ts < 2400 and (_player.top < screen.height and (_player.top + _player.height) > 0 and _player.left < screen.width and (_player.left + _player.width) > 0)
        _player.top += (_player.em.y * 1.6 * _getSpeed()) >> 0
        _player.left += (_player.em.x * 1.6 * _getSpeed()) >> 0

        moveEnemies()

        _cycleTO = requestAnimationFrame animate
      else
        cancelAnimationFrame _cycleTO
        _pa = 0
        gameover()

    animate()

  exactCollision = (o1, o2, type = 0) ->
    if o1.top + o1.height < o2.top or o2.top + o2.height < o1.top or o1.left + o1.width < o2.left or o2.left + o2.width < o1.left
      return false

    if o1.left < o2.left
      x = o2.left
      width  = (o1.left + o1.width - o2.left)
    else
      x = o1.left
      width  = (o2.left + o2.width - o1.left)

    if o1.top < o2.top
      y = o2.top
      height = (o1.top + o1.height - o2.top)
    else
      y = o1.top
      height = (o2.top + o2.height - o1.top)

    intersection = { left: x, top: y, width: width, height: height }

    renderer.checkCollision(intersection, type)

  showMessage = (text, active = false, callback = null) ->
    $('#cover').css 'display', 'flex'

    if text and text.length
      text = text.replace /(#[a-f0-9]{3,6})\|([^#]+)/gmi, '<span style="color: $1">$2</span>'
      text = text.replace /^(.+)$/gm, '<p>$1</p>'

    $('#box').html(text)
    msg = $('#message')
    left = ($(msg).parent().width() - $(msg).width()) / 2
    top = ($(msg).parent().height() - $(msg).height()) / 2
    $(msg).css({left: left + 'px', top: top + 'px'})

    if active
      if callback and isFunction(callback)
        $('#cover').unbind('click')
        $('#cover').one 'click', callback
        $('a').click (e) -> e.stopPropagation()

      $('#click_notice').delay(1500).slideDown 650
      $(msg).fadeIn 300
    else
      $('#click_notice').hide()
      $(msg).show()

  hideMessage = ->
    $('#cover').fadeOut 100, -> $('#message').hide()

  updateHUD = ->
    $('#hud').css { display: 'table' }
    $('#time').text(formatTime(level.time))
    $('#bonus').text(total_bonus + level.score)
    $('#hiscore').text(player.record)