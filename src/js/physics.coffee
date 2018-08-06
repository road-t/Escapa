detectCollision = (o1, o2, push = false) ->
  if o1.top + o1.height < o2.top or o2.top + o2.height < o1.top or o1.left + o1.width < o2.left or o2.left + o2.width < o1.left
    return false

  if o1.em? and o2.em? and o1.em.m == 0 and o2.em.m == 0 # don't waste time on lasers etc.
    return false

  # object centers
  c1 = x: o1.left + o1.width/2, y: o1.top + o1.height/2
  c2 = x: o2.left + o2.width/2, y: o2.top + o2.height/2

  gap = x: Math.abs(c1.x - c2.x), y: Math.abs(c1.y - c2.y)

  gap.d = Math.sqrt(Math.pow(gap.x, 2) + Math.pow(gap.y, 2))

  if o1.radius? and o2.radius?
    ratio = (o1.radius + o2.radius) / gap.d
  else
    if gap.x > gap.y
      ratio = ((o1.width + o2.width)/2) / gap.x
    else
      ratio = ((o1.height + o2.height)/2) / gap.y

  if ratio > 1 # intersection!
    if push # push objects away
      dd_x = (gap.x) * ratio - gap.x
      dd_y = (gap.y) * ratio - gap.y

      dir1_x = if c1.x > c2.x then 1 else -1
      dir1_y = if c1.y > c2.y then 1 else -1
      dir2_x = if c2.x > c1.x then 1 else -1
      dir2_y = if c2.y > c1.y then 1 else -1

      o1.left += (dd_x) * dir1_x/2
      o1.top += (dd_y) * dir1_y/2

      o2.left += (dd_x) * dir2_x/2
      o2.top += (dd_y) * dir2_y/2

      # renew centers data
      c1 = x: o1.left + o1.width/2, y: o1.top + o1.height/2
      c2 = x: o2.left + o2.width/2, y: o2.top + o2.height/2

      collide o1, o2, c1, c2
    return true
  else
    return false

collide = (o1, o2, c1 = null, c2 = null) ->
  v1 = o1.em
  v2 = o2.em

  unless v1.m? or v2.m? # objects with no mass should be just pushed away
    v1.x *= -1
    v1.y *= -1
    v2.x *= -1
    v2.y *= -1
  else
    c1 = x: o1.left + o1.width/2, y: o1.top + o1.height/2 unless c1
    c2 = x: o2.left + o2.width/2, y: o2.top + o2.height/2 unless c2

    fi = Math.atan2(c1.y - c2.y, c1.x - c2.x)
    cos = Math.cos(fi)
    sin = Math.sin(fi)

    pL1 = v1.x * cos + v1.y * sin
    pL2 = v2.x * cos + v2.y * sin

    pA1 = v1.y * cos - v1.x * sin
    pA2 = v2.y * cos - v2.x * sin

    P = v1.m * pL1 + v2.m * pL2
    V = pL1 - pL2
    v2f = (P + v1.m * V) / (v1.m + v2.m)
    v1f = v2f - pL1 + pL2
    pL1 = v1f
    pL2 = v2f

    v1.x = pL1 * cos - pA1 * sin
    v1.y = pA1 * cos + pL1 * sin
    v2.x = pL2 * cos - pA2 * sin
    v2.y = pA2 * cos + pL2 * sin


    v1.i = v1.m * pythagoras v1.x, v1.y
    v2.i = v2.m * pythagoras v2.x, v2.y

  return [v1, v2]