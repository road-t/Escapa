listen = (callback, one = true, type = 'click') ->
  return false unless isFunction callback

  layer = $('#active')
  $(layer).unbind()
  if one then $(layer).one type, callback else $(layer).on type, callback

clearListeners = ->
  $('#active').unbind()