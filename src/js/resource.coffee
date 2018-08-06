class Resource
  constructor: (@folders, @ready = null, @progress = null) ->
    @files = []

  startQueue: ->
    @queued_size = 0
    @loaded_size = 0
    @files_queued = 0
    @files_loaded = 0
    @errors = 0
    @queue_closed = false

  closeQueue: ->
    @queue_closed = true
    @_isReady()

  getResource: (name, type) ->
    src = window.location.protocol + '//' + window.location.host + '/' + @folders.base + '/' + @folders[type] + '/' + name

    @files_queued++

    # let's check if it was loaded before
    if file = @_findFile(src)
      @files_loaded++
      @queued_size += file.size
      @loaded_size += file.size
    else
      # load a new one
      file = { name: name, type: type, image: null, loaded: false, size: null, error: false }
      file.image = new Image
      file.image.src = src
      file.image.onload = @_onLoad
      file.image.onerror = @_onError

      @_requestFileSize(src)

      @files.push file

    return file

  getFilesCount: ->
    { total: @files.length, loaded: @files_loaded }

  _onLoad: (e) =>
    file = @_findFile(e.currentTarget.src)
    file.loaded = true
    @loaded_size += file.size
    @files_loaded++

    if @queue_closed and isFunction(@progress)
      progress = 100 - ((@queued_size - @loaded_size) / @queued_size * 100) >> 0
      @progress(progress)

    @_isReady()

  _loaded: ->

  _isReady: ->
    @ready() if @queue_closed and @files_queued is @files_loaded and isFunction(@ready)

  _onError: (e) =>
    file = @_findFile(e.currentTarget.src)
    file.error = true
    @errors++

  _findFile: (src) ->
    for file in @files
      return file if file.image and file.image.src == src

  # request file size from server
  _setFileSize: (src, size) =>
    if file = @_findFile(src)
      file.size = size
      @queued_size += size

  _requestFileSize: (src) ->
    xhr = new XMLHttpRequest()
    xhr.open('HEAD', src, true)

    xhr.onreadystatechange = =>
      if xhr.readyState == 4
        if xhr.status == 200
          size = parseInt(xhr.getResponseHeader('Content-Length'))
        else
          size = 1

        @_setFileSize(src, size)
    # TODO: add error check

    xhr.send()