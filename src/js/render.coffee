
class Render

  constructor: (@debug) ->
    @screen_container = $('#screen')
    screen_offset = $(@screen_container).offset()
    @screen =
    {
      width: 700,
      height: 700,
      top: screen_offset.top,
      left: screen_offset.left
    }

    @bgr = @_createLayer()
    @mobs = @_createLayer()
    @projectiles = @_createLayer()
    @player = @_createLayer 'player'
    @overlay = @_createLayer 'overlay'
    @dbg = @_createLayer 'dbg'
    @fps = @_createLayer 'fps', 40, 40

    @resetFPS()

  _createLayer: (container_id = null, height = null, width = null) ->
    width = @screen.width unless width
    height = @screen.height unless height

    div = document.createElement 'div'
    div.setAttribute('id', container_id) if container_id
    $(@screen_container).append(div)

    canvas = document.createElement('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    div.appendChild(canvas).getContext('2d')


  draw: (level) ->
    @_drawBackground level.background, level.time if level.background?
    @_drawPlayer level.player if level.player?
    @_drawOverlay level.enemies if level.enemies?

    # draw blinking overlay if needed
    @_drawFilter level.filter if level.filter?

    # debug data
    wf_objects = []

    if level.enemies?
      for object in level.enemies
        wf_objects.push(object)

        if object.projectiles?
          for projectile in object.projectiles
            wf_objects.push(projectile)

    if level.player?
      wf_objects.push(level.player)

    @_drawWireframe wf_objects
    @_showFPS()


  clear: ->
    @_clearCanvas context for context in [@bgr, @player, @mobs, @overlay, @top, @dbg, @fps] when context?


  _clearCanvas: (context) ->
    context.clearRect 0,0, context.canvas.width, context.canvas.height

  _drawBackground: (bgr, time) ->
    @bgr.fillStyle = bgr.color
    @bgr.fillRect 0, 0, @bgr.width, @bgr.height

    # render background
    if bgr.image?
      origin_x = 0
      origin_y = 0

      if scroll = bgr.scroll # depending on direction gotta position image correctly
        if scroll.x != 0
          origin_x = if scroll.x > 0 then (bgr.image.width - @bgr.canvas.width - time/scroll.x) else - (time/scroll.x)

        if scroll.y != 0
          origin_y = if scroll.y > 0 then  (bgr.image.height - @bgr.canvas.height - time/scroll.y) else - (time/scroll.y)

        @bgr.drawImage bgr.image, origin_x, origin_y, @bgr.canvas.width, @bgr.canvas.height, 0, 0, @bgr.canvas.width, @bgr.canvas.height
      else
        if bgr.zoom != 0
          bgr.ratio ?= (if bgr.image.width < bgr.image.height then @bgr.canvas.width / bgr.image.width else @bgr.canvas.height / bgr.image.height) * Math.SQRT2 # sec45° = √2 which is a ratio of rotated by 45° to outer square

          @bgr.save()
          zoom = bgr.zoom * (time + 1)/1000 + bgr.ratio # initial zoom should be 1

          @bgr.translate @bgr.canvas.width/2, @bgr.canvas.height/2

          if bgr.rotate != 0
            @bgr.rotate bgr.rotate * time/1000

          @bgr.scale zoom, zoom

          @bgr.drawImage bgr.image, -(bgr.image.width)/2, -(bgr.image.height)/2 # no-clipping performance?..
          @bgr.restore()
        else
          @bgr.drawImage bgr.image, 0, 0


  _drawFilter: (filter) ->
    @_clearCanvas @overlay
    if filter.duration * @_fps > @frames % (filter.threshold * @_fps) > 1 or not filter.threshold
      @overlay.fillStyle = filter.color
      @overlay.fillRect 0, 0, @overlay.canvas.width, @overlay.canvas.height

  _drawPlayer: (player) ->
    @_clearCanvas @player
    @_drawObject player, @player


  _drawOverlay: (objects) ->
    @_clearCanvas @mobs
    @_clearCanvas @projectiles
    for object in objects
      @_drawObject object, @mobs
      # projectiles
      @_drawObject projectile, @projectiles for projectile in object.projectiles if object.projectiles?


  _drawObject: (object, context) ->
    #if 0 <= object.top + object.height + object.sprite.y + object.sprite.image.height and object.top < context.canvas.height and 0 <= object.left + object.width + object.sprite.x + object.sprite.image.width and object.left < context.canvas.width
    if object.width and object.height and not object.hide # don't render zero-sized objects
      if object.sprite? # don't render object's outside the vieport

        object.cur_sprite = 0 unless object.cur_sprite?
        object.sprite.width ?= object.sprite.image.width
        object.sprite.height ?= object.sprite.width

        if ++object.sprite.fsps == object.sprite.fpf # fsps = frames spend per sprite
          object.sprite.fsps = 0
          object.cur_sprite = 0 if object.cur_sprite++ == object.sprite.frames - 1

        if object.rotation?
          object.rotation.angle = 0 unless object.rotation.angle?

          if object.rotation.auto and not object.rotation.angle and object.em? # don't calculate everytime
            object.rotation.angle = -(Math.atan(object.em.x / object.em.y)*180/Math.PI)/2

          context.save()

          context.translate object.left + (object.width)/2, object.top + (object.height)/2
          context.rotate object.rotation.angle * Math.PI/180
          object.rotation.angle += object.rotation.speed

          context.drawImage object.sprite.image, 0, object.cur_sprite * object.sprite.height, object.sprite.width, object.sprite.height, -(object.width)/2 + object.sprite.x, -(object.height)/2 + object.sprite.y, object.sprite.width, object.sprite.height

          context.restore()
        else # no rotation
          context.drawImage object.sprite.image, 0, object.cur_sprite * object.sprite.height, object.sprite.width, object.sprite.height, object.left + object.sprite.x, object.top + object.sprite.y, object.sprite.width, object.sprite.height

          # save last position
          object.last = { top: object.top + object.sprite.y, left: object.left + object.sprite.x, width: object.sprite.image.width, height: object.sprite.image.height }
      else
        context.fillStyle = object.color #draw stub rectangle if no sprite is presented

        if object.radius?
          context.save()
          context.translate object.left + object.width/2, object.top + object.height/2

          context.beginPath()
          context.arc 0, 0, object.radius, 0, Math.PI*2
          context.closePath()
          context.fill()

          context.restore()
        else
          context.fillRect object.left, object.top, object.width, object.height

        object.last = { top: object.top, left: object.left, width: object.width, height: object.height }


  _drawWireframe: (objects) -> #fix this
    @_clearCanvas @dbg
    @dbg.lineWidth = 2

    for object in objects
      @dbg.strokeStyle = if object.color? then object.color else '#0f0'

      @dbg.save()
      @dbg.translate object.left, object.top

      if object.radius?
        @dbg.beginPath()
        @dbg.arc object.width/2, object.height/2, object.radius, 0, Math.PI*2
        @dbg.stroke()
      else
        @dbg.strokeRect 0, 0, object.width, object.height

      if object.em? and object.em.i?
        @dbg.strokeStyle = '#0fc'
        @_drawLine [object.width/2, object.height/2], [object.width/2 + object.em.x * object.em.m * 20, object.height/2 + object.em.y * object.em.m * 20] # draw direction vector
  #      @dbg.strokeStyle = '#0ff'
  #      @_drawLine [object.width/2, object.height/2], [object.width/2 - object.em.x * object.em.m * 150, object.height/2 - object.em.y * object.em.m * 150] # draw trace
        theta = Math.atan(object.em.x / object.em.y)*180/Math.PI

        @dbg.font = '14px Arial'
        @dbg.fillStyle = '#ff0'
        hint = "θ = #{theta.toFixed(2)}°"
        hint += ' m = ' + (object.em.m).toFixed(2) + ' p = ' + (object.em.i).toFixed(3) if object.em.m
        @dbg.fillText hint, object.width/2, object.height/2 - 20

        @dbg.fillStyle = '#f00'
        @dbg.fillText 'i = ' + pythagoras(object.em.x, object.em.y).toFixed(2), object.width/2 + object.em.x * object.em.m * 20, object.height/2 + object.em.y * object.em.m * 20

      @dbg.restore()

  _showFPS: ->
    @_clearCanvas @fps
    now = new Date()
    @time = now.getTime() - @start_time
    @frames++
    @_fps = @frames / (@time / 1000) >> 0

    @fps.font = '30px Arial'
    @fps.textAlign = 'start'
    @fps.fillStyle = '#ff0'
    @fps.fillText @_fps, 0, 30
    @_fps


  _drawPolygon: (start, vertex...) ->
    @dbg.lineWidth = 2
    @dbg.strokeStyle = "#f00"
    @dbg.beginPath()
    @dbg.moveTo start[0], start[1]

    for v in vertex
      @dbg.lineTo v[0], v[1]

    @dbg.closePath()
    @dbg.stroke()

  _drawLine: (p1, p2) ->
    @dbg.lineWidth = 1

    @dbg.beginPath()
    @dbg.moveTo p1[0], p1[1]
    @dbg.lineTo p2[0], p2[1]
    @dbg.stroke()

  getScreen: ->
    @screen

  resetFPS: ->
    now = new Date()
    @start_time = now.getTime()
    @time = 0
    @frames = 0
    @_fps = 0

  checkCollision: (rect, type, tolerance = 10) ->
    if rect.left >= 0 and rect.top >= 0 and rect.width and rect.height
      second_layer = if type is 0 then @mobs else @projectiles

      data1 = @player.getImageData(rect.left, rect.top, rect.width, rect.height)
      data2 = second_layer.getImageData(rect.left, rect.top, rect.width, rect.height)

      contact = 0

      for i  in [3...data1.data.length] by 4 # rgba
        if data1.data[i] != 0 and data2.data[i] != 0 # if it's not transparent
          x = i % rect.width
          y = Math.floor(i / rect.height)
          return { x: x, y: y } if ++contact >= tolerance

      return false

  animate: (o, step) ->
    @_clearCanvas @player
    @player.drawImage o.sprite.image, 0, 0, o.sprite.width - step, o.sprite.height, o.left + o.sprite.x, o.top + o.sprite.y, o.sprite.width - step, o.sprite.height

  animation: (x, y, animation, step, player = null) ->
    top = animation.height * Math.floor(step / animation.fpf)

    #x = @screen.width - animation.width if x > @screen.width
    #y = @screen.height - animation.height if y > @screen.height

    @player.clearRect 0, 0, @player.canvas.width, @player.canvas.height
    @_drawObject player, @player if player?
    @player.drawImage animation.image, 0, top, animation.width, animation.height, x, y, animation.width, animation.height