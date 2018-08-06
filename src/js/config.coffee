config = {
  folders: {
    base: 'assets/images',
    bgr: 'bgr',
    mob: 'mob',
    projectiles: 'projectiles',
    player: 'player',
    animation: 'animations',
    misc: 'misc',
  },

  animations: [
    { name: 'crash.png', frames: 11, fpf: 6, height: 256, width: 256 },
    { name: 'blowup.png', frames: 11, fpf: 4, width: 64, height: 64 }
  ],

  logo: { name: 'escape.png', buoyancy: .04, x: 156, y: 108 },
  bgr: { name: 'start.png' },

  levels: [
    {
      background: { name: 'space.jpg', color: '#000'}
      enemies: [
        {color: '#fc9', sprite: { name: 'asteroid0.png'}, rotation: { speed: 1, angle: 0}, radius: 30, top: 320, left: 100, em: {x: 3, y: 3, m: .8}},
        {color: '#c9f', sprite: { name: 'asteroid1.png'}, rotation: { speed: 5, angle: 0}, radius: 30, top: 380, left: 300, em: {x: 3, y: 3, m: 0.5}},
        {color: '#0f0', sprite: { name: 'asteroid2.png'}, rotation: { speed: 3, angle: 0}, radius: 40, top: 250, left: 500, em: {x: 2, y: 2, m: 3}},
        {color: '#cfc', sprite: { name: 'asteroid3.png', x: -5, y: 0, width: 73, height: 62, frames: 20, fpf: 2}, rotation: { speed: 1.6}, radius: 30, top: 450, left: 600, em: {x: 2, y: 2, m: 1.5}},
        {color: '#fc9', sprite: { name: 'asteroid0.png'}, rotation: { speed: 1, angle: 0}, radius: 30, top: 70, left: 250, em: {x: 3, y: 3, m: .7}},
        {color: '#c9f', sprite: { name: 'asteroid1.png'}, rotation: { speed: 5, angle: 0}, radius: 30, top: 520, left: 150, em: {x: 2, y: 2, m: 2}},
        {color: '#cf9', sprite: { name: 'asteroid2.png'}, rotation: { speed: 3, angle: 0}, radius: 40, top: 250, left: 400, em: {x: 1, y: 1, m: 3.5}},
        {color: '#cfc', sprite: { name: 'asteroid3.png', x: -5, y: 0, width: 73, height: 62, frames: 20, fpf: 3}, rotation: { speed: 1}, radius: 30, top: 100, left: 600, em: {x: 2, y: 3, m: 2}},
      ]
    },

    {
      name: { ru: 'Открытый космос', en: 'Open space' },
      hello: { ru: 'Скопление астероидов', en: 'Asteroid cluster' },
      over: '',
      background: { name: 'space.jpg', color: '#000', scroll: { x: 0, y: 13 }, zoom: 0 },
      speed: 1,
      stop: 16000,
      minimal: 10000,

      player: {
        color: '#56b65d',
        sprite: { name: 'spaceship.png', frames: 2, fpf: 2, width: 80, height: 128 },
        em: { x: 0, y: 0, m: .6 },
        top: 580,
        left: 310,
        width: 80,
        height: 116
      },

      enemies: [
        { color: '#00f', width: 100, height: 0, top: 0, left: 100, em: { x: 1, y: 0, m: 0 }, projectiles:
          [
            { color: '#f00', sprite: { name: 'asteroid0.png'}, radius: 30, em: { auto: true }, rotation: { speed: 7 }, frequency: 350, x: 10, y: -50, contact: ['crash'] },
            { color: '#f00', sprite: { name: 'asteroid1.png'}, radius: 30, em: { auto: true }, rotation: { speed: 2 }, frequency: 500, x: 10, y: -50, contact: ['crash'] },
            { color: '#f00', sprite: { name: 'asteroid2.png'}, radius: 40, em: { auto: true }, rotation: { speed: 4 }, frequency: 1200, x: 10, y: -70, contact: ['crash'] },
            {color: '#cfc', sprite: { name: 'asteroid3.png', x: -5, y: 0, width: 73, height: 62, frames: 20, fpf: 2}, rotation: { speed: 2 }, radius: 30, em: { auto: true }, frequency: 1600, x: 40, y: -50,  contact: ['crash'] },
          ]
        },
        { color: '#ff0', width: 100, height: 0, top: 0, left: 600, em: { x: -1, y: 0, m: 0 }, projectiles:
          [
            { color: '#0f0', sprite: { name: 'asteroid0.png'}, radius: 30, em: { auto: true }, rotation: { speed: 5 }, frequency: 200, x: 10, y: -50, contact: ['crash'] },
            { color: '#0f0', sprite: { name: 'asteroid1.png'}, radius: 30, em: { auto: true }, rotation: { speed: 3 }, frequency: 700, x: 20, y: -50, contact: ['crash'] },
            { color: '#0f0', sprite: { name: 'asteroid2.png'}, radius: 40, em: { auto: true }, rotation: { speed: 2 }, frequency: 1000, x: 10, y: -70, contact: ['crash'] },
            {color: '#cfc', sprite: { name: 'asteroid3.png', x: -5, y: 0, width: 73, height: 62, frames: 20, fpf: 3}, rotation: { speed: 1 }, radius: 30, em: { auto: true }, frequency: 1200, x: 20, y: -50, contact: ['crash'] },
          ]
       }
      ]
    },

    {
      name: { ru: 'Корабль', en: 'Spaceship' },
      hello: { ru: 'Авария на корабле', en: 'Shipwreck' }
      over: '',
      background: { name: 'spaceship_int.jpg', color: '#ccc', zoom: .025, rotate: .42 },
      filter: { threshold: 1, duration: .5, color: 'rgba(255, 0, 0, 0.3)' },
      speed: 1.1,
      minimal: 10000,
      stop: 16000,

      player: {
        color: '#56b65d',
        sprite: { name: 'astronaut.png', x: 0, y: 0, frames: 8, fpf: 8, width: 156, height: 156 },
        top: 325,
        left: 310,
        width: 150,
        height: 150
      },

      enemies: [
        {color: '#afd', sprite: { name: 'mug.png', x: 0, y: -3, width: 40, height: 38 }, rotation: { speed: 3}, radius: 16, top: 600, left: 600,  em: {x: 1, y: 1, m: 1, auto: true }},
        {color: '#3d3', sprite: { name: 'watermelon.png', x: 5, y: -3, width: 51, height: 60 }, rotation: { speed: 2}, radius: 30, top: 80, left: 300, em: {x: 2, y: 2, m: 4, auto: true}},
        {color: '#d33', sprite: { name: 'weight.png', x: 6, y: -6, width: 63, height: 90 }, rotation: { speed: 2 }, radius: 38, top: 600, left: 60, em: {x: 1.5, y: 1.5, m: 8, auto: true} },
      ]
    },

    {
      name: 'Орбита',
      hello: 'Прорвись через охрану',
      over: '',
      background: { name: 'planet.jpg', color: '#101018',  zoom: .04 },
      speed: 1,
      minimal: 10000,
      stop: 16000,

      player: {
        color: '#56b65d',
        sprite: { name: 'boat.png', x: -3, y: 0, frames: 2, fpf: 2, width: 55, height: 60 },
        top: 630,
        left: 310,
        width: 48,
        height: 48
      },

      enemies: [
        { color: '#f00', sprite: { name: 'fighter0.png', x: 0, y: -15, frames: 2, fpf: 3, width: 80, height: 112 }, width: 80, height: 100, top: 70, left: 600, em: {x: -4, y: 0}, contact: ['blowup'],  projectiles:
          [
            { color: '#f00', rotation: { auto: true }, sprite: { name: 'beam_r.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: 0, y: 6, m: 0 }, frequency: 1800, x: 38, y: 100, contact: ['blowup'] },
            { rotation: { auto: true }, sprite: { name: 'beam.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: -.5, y: 3, m: 0 }, frequency: 500, x: 50, y: 42, contact: ['blowup'] },
            { rotation: { auto: true }, sprite: { name: 'beam.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: -.5, y: 2, m: 0 }, frequency: 600, x: 25, y: 42, contact: ['blowup'] },
            { rotation: { auto: true }, sprite: { name: 'beam.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: .5, y: 3, m: 0 }, frequency: 400, x: 50, y: 42, contact: ['blowup'] },
            { rotation: { auto: true }, sprite: { name: 'beam.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: .5, y: 2, m: 0 }, frequency: 300, x: 25, y: 42, contact: ['blowup'] }
          ]
        },
        { color: '#fc9', sprite: { name: 'fighter1.png', x: 0, y: -15, frames: 2, fpf: 3, width: 80, height: 112 }, width: 80, height: 100, top: 180, left: 70, em: {x: 4, y: 0}, contact: ['blowup'], projectiles:
          [
            { color: '#f00', rotation: { auto: true }, sprite: { name: 'beam_r.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: 0, y: 6, m: 0 }, frequency: 1500, x: 38, y: 100, contact: ['blowup'] },
            { rotation: { auto: true }, sprite: { name: 'beam.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: .5, y: 3, m: 0 }, frequency: 600, x: 50, y: 42, contact: ['blowup'] },
            { rotation: { auto: true }, sprite: { name: 'beam.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: -.5, y: 2, m: 0 }, frequency: 500, x: 25, y: 42, contact: ['blowup'] },
            { rotation: { auto: true }, sprite: { name: 'beam.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: .5, y: 3, m: 0 }, frequency: 300, x: 50, y: 42, contact: ['blowup'] },
            { rotation: { auto: true }, sprite: { name: 'beam.png', x: -1, y: 0, width: 8, height: 31 }, width: 4, height: 28, em: { x: -.5, y: 2, m: 0}, frequency: 400, x: 25, y: 42, contact: ['blowup'] }
          ]
        }
      ]
    },

    {
      name: 'Атмосфера',
      hello: 'Спасайся!',
      background: {name: 'atmosphere.jpg', color: '#383a2b', scroll: {x: -4, y: -6} }
      filter: { threshold: 0, duration: 15, color: 'rgba(255, 0, 0, 0.1)' },
      minimal: 10000,
      stop: 16000,
      speed: .9,
      player: {
        color: '#56b65d',
        sprite: { name: 'falling_boat.png', x: -175, y: -4, frames: 16, fpf: 2, width: 222, height: 54 },
        top: 550,
        left: 550,
        width: 46,
        height: 48,
        rotation: { angle: 16, speed: 0 }
      },

      enemies: [
        { color: '#ddd', sprite: { name: 'interceptor.png', x: 0, y: -3, width: 120, height: 88 }, width: 120, height: 90, left: 20, top: 300, em: { x: 0, y: 7 }, contact: ['blowup'], projectiles:
          [
            { sprite: { name: 'plasma.png', x: -10, y: -8, frames: 4, fpf: 1 }, rotation: {speed: 100}, radius: 16, em: { x: 4, y: 2, m: 0, sauto: true }, frequency: 500, x: 120, y: 52, contact: ['blowup'] },
            { sprite: { name: 'plasma.png', x: -10, y: -8, frames: 4, fpf: 1 }, rotation: {speed: 100}, radius: 16, em: { x: 6, y: 1, m: 0, sauto: true }, frequency: 800, x: 120, y: 52, contact: ['blowup'] },
            { sprite: { name: 'plasma.png', x: -10, y: -8, frames: 4, fpf: 1 }, rotation: {speed: 100}, radius: 16, em: { x: 4, y: -1, m: 0, sauto: true }, frequency: 1200, x: 120, y: 52, contact: ['blowup'] },
            { sprite: { name: 'plasma.png', x: -10, y: -8, frames: 4, fpf: 1 }, rotation: {speed: 100}, radius: 16, em: { x: 3, y: -0, m: 0, sauto: true }, frequency: 1600, x: 120, y: 52, contact: ['blowup'] },
            { sprite: { name: 'plasma.png', x: -10, y: -8, frames: 4, fpf: 1 }, rotation: {speed: 100}, radius: 16, em: { x: 4, y: -1, m: 0, sauto: true }, frequency: 1000, x: 120, y: 52, contact: ['blowup'] },
            { sprite: { name: 'plasma.png', x: -10, y: -8, frames: 4, fpf: 1 }, rotation: {speed: 100}, radius: 16, em: { x: 5, y: 0, m: 0, sauto: true }, frequency: 700, x: 120, y: 52, contact: ['blowup'] },
            { sprite: { name: 'plasma.png', x: -10, y: -8, frames: 4, fpf: 1 }, rotation: {speed: 100}, radius: 16, em: { x: 3, y: -2, m: 0, sauto: true }, frequency: 900, x: 120, y: 52, contact: ['blowup'] },
          ]
        }
      ]
    },
    {
      name: 'Поверхность',
      hello: 'Доберись до портала',
      background: {name: 'surface.jpg', color: '#fca052', scroll: {x: -40, y: 0} },
      minimal: 13000,
      stop: 16000,
      player: {
        color: '#56b65d',
        sprite: { name: 'falling_boat.png', x: -175, y: -4, frames: 16, fpf: 2, width: 222, height: 54 },
        top: 200,
        left: 50,
        width: 48,
        height: 48
      },
      enemies: [
        { sprite: { name: 'mountain0.png' }, width: 1200, height: 674, left: 1200, top: 100, em: { x: -3, y: 0, m: 0 }, free: true, contact: ['blowup'] },
        { sprite: { name: 'mountain3.png' }, width: 1300, height: 447, left: 0, top: 254, em: { x: -3, y: 0, m: 0 }, free: true, contact: ['blowup'] },
        { sprite: { name: 'mountain1.png' }, width: 455, height: 186, left: 3700, top: 516, em: { x: -3, y: 0, m: 0 }, free: true, contact: ['blowup'] },
        { sprite: { name: 'mountain2.png' }, width: 1450, height: 475, left: 2400, top: 226, em: { x: -3, y: 0, m: 0 }, free: true, contact: ['blowup'] },
        { color: '#ff0', width: 0, height: 0, top: 20, left: 600, em: { x: 9, y: 0, m: 0 }, projectiles:
          [
            { sprite: { name: 'meteorite.png', x: -32, y: -222, frames: 4, fpf: 5, width: 70, height: 256 }, rotation: { auto: true}, radius: 6, em: { x: -6, y: 4, m: 0 }, frequency: 1600, x: 10, y: 0, contact: ['blowup'] }
            { sprite: { name: 'meteorite.png', x: -32, y: -222, frames: 4, fpf: 5, width: 70, height: 256 }, rotation: { auto: true}, radius: 6, em: { x: -3, y: 2, m: 0 }, frequency: 900, x: 60, y: 0, contact: ['blowup'] }
          ]
        },
        { color: '#ff0', width: 0, height: 0, top: 30, left: 700, em: { x: 5, y: 0, m: 0 }, projectiles:
          [
            { sprite: { name: 'meteorite.png', x: -32, y: -222, frames: 4, fpf: 5, width: 70, height: 256 }, rotation: { auto: true}, radius: 6, em: { x: -4, y: 4, m: 0 }, frequency: 2200, x: 30, y: 0, contact: ['blowup'] }
            { sprite: { name: 'meteorite.png', x: -32, y: -222, frames: 4, fpf: 5, width: 70, height: 256 }, rotation: { auto: true}, radius: 6, em: { x: -5, y: 3, m: 0 }, frequency: 3000, x: 30, y: 0, contact: ['blowup'] }
          ]
        },
        { name: 'portal', width: 40, height: 700, top: 0, left: 4200, em: { x: -3, y: 0, m: 0 }, free: true, sprite: {name: 'ripple.png', frames: 3, fpf: 6, x: -60, width: 93, height: 700}, contact: ['disappear'] },
        { name: 'portal', width: 40, height: 700, top: 0, left: 4230, em: { x: -3, y: 0, m: 0 }, free: true, sprite: {name: 'ripple.png', frames: 3, fpf: 6, x: -60, width: 93, height: 700}, contact: ['disappear'] },
        { name: 'portal', width: 40, height: 700, top: 0, left: 4260, em: { x: -3, y: 0, m: 0 }, free: true, sprite: {name: 'ripple.png', frames: 3, fpf: 6, x: -60, width: 93, height: 700}, contact: ['disappear'] },
        { name: 'portal', width: 40, height: 700, top: 0, left: 4300, em: { x: -3, y: 0, m: 0 }, free: true, sprite: {name: 'ripple.png', frames: 3, fpf: 6, x: -60, width: 93, height: 700}, contact: ['disappear'] }
      ]
    },

    {
      name: 'Бонус',
      hello: 'Классическая Escapa',
      over: '',
      speed: 1.1,
      minimal: 0,
      color: '#666',

      player: {
        color: '#0a0',
        top: 320,
        left: 320,
        radius: 40,
      },

      enemies: [
        { color: '#00f', width: 120, height: 50, em: { x: 3, y: -1, m: 0, auto: true }, top: 50, left: 50 },
        { color: '#f0f', width: 90, height: 60, em: { x: -4, y: -4, m: 0, auto: true }, top: 600, left: 550 },
        { color: '#ff0', width: 50, height: 120, em: { x: 5, y: 2, m: 0, auto: true }, top: 20, left: 600 },
        { color: '#0ff', width: 40, height: 90, em: { x: 2, y: 5, m: 0, auto: true }, top: 550, left: 40 },
      ]
    }
  ],
  debug: false,
  version: '1.3.0.0'
}