class Mover
  constructor: (screen) ->
    @screen = screen

  movePlayer: (e) =>
# handle touch crap
    e.preventDefault()

    if e.type is 'touchmove'
      move = e.originalEvent.changedTouches[0]
      offset =  $('#screen').offset()
      curX = move.pageX - offset.left
      curY = move.pageY - offset.top
    else
      curX = e.offsetX
      curY = e.offsetY

    player = @level.player
    screen = @renderer.getScreen()

    if @status
      if screen.top + player.height/2 < curY < (screen.height - player.height/2)
        player.top = curY - player.height/2
      else
        if curY < screen.top + player.height/2
          player.top = screen.top
        else
          player.top = screen.height - player.height

      #  @collided = true

      if screen.left + player.width/2 < curX < (screen.left + screen.width - player.width/2)
        player.left = curX - player.width/2
      else
        if curX > screen.width - player.width
          player.left = screen.left + screen.width - player.width
        else
          player.left = screen.left

#  @collided = true

  moveEnemies: (enemies) ->
    for enemy in @level.enemies
      if enemy.left > @screen.left + screen.width - enemy.width or enemy.left < @screen.left
        enemy.dir.x *= -1

      if enemy.top > @screen.aTop + screen.height - enemy.height or enemy.top < @screen.top
        enemy.dir.y *= -1

      for en, num in @level.enemies when en isnt enemy
        if en.jc? isnt num and @_detectCollision en, enemy # push collided objects away, but let them move once after collision
          en.dir.x *= -1
          enemy.dir.x *= -1
          en.dir.y *= -1
          enemy.dir.y *= -1
          en.jc = num # collided with
        else
          en.jc = -1

      enemy.top += enemy.em.y * enemy.dir.y * @time / @level.speed
      enemy.left += enemy.em.x * enemy.dir.x * @time / @level.speed

      if @_detectCollision @level.player, enemy
        @collided = true


  _detectCollision: (object1, object2) ->
    difX = object1.left - object2.left
    difY = object1.top - object2.top

    -object1.width < difX < object2.width and -object1.height < difY < object2.height