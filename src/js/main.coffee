$(document).ready ->
  LIC = new Image
  LIC.src = "//counter.yadro.ru/hit?r" + escape(document.referrer) + (unless screen then "" else ";s" + screen.width + "*" + screen.height + "*" + (if screen.colorDepth then screen.colorDepth else screen.pixelDepth)) + ";u" + escape(document.URL)+ ";" + Math.random()
  game = new Game config

random = (min = 0, max = 1) ->
  Math.round(Math.random() * (max - min) + min)

randomFloat = (min = -1, max = 1) ->
  Math.random() * (max - min) + min

formatTime = (time) ->
  (time/1000).toFixed 2

pythagoras = (a, b) ->
  Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

isFunction = (functionToCheck) ->
 getType = {}
 functionToCheck && getType.toString.call(functionToCheck) is '[object Function]';

simplePluralize = (number, cases) ->
    _case = 0
    short = number%100
    last = short%10

    if !last or last > 4 or 4 < short < 21
      _case = 2
    else if last > 1
      _case = 1

    number + ' ' + cases[_case]

getString = (string) ->
  string[navigator.language] or string