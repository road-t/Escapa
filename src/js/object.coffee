###
class Obj
  @player: 0
  @mob: 1
  @projectile: 2

  constructor: (type, config) ->
    @type = type
    @name = config.name
    @color = config.color
    @sprites = config.sprites
    @top = config.top
    @left = config.left
    @width = config.width
    @height = config.height

    if config.em?
      @em = config.em
    else
      @em = { x: random(0.1, 1), y: random(.1, 1)}

    if config.dir?
      @dir = config.dir
    else
      @dir = { x: (if random() then 1 else -1), y: (if random() then 1 else -1) }

    @safe = if config.safe or @type is @player then true else false

  @move: ->
###