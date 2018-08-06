var Game, Mover, Render, Resource, clearListeners, collide, config, detectCollision, formatTime, getString, isFunction, listen, main, pythagoras, random, randomFloat, simplePluralize,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  slice = [].slice;

config = {
  folders: {
    base: 'assets/images',
    bgr: 'bgr',
    mob: 'mob',
    projectiles: 'projectiles',
    player: 'player',
    animation: 'animations',
    misc: 'misc'
  },
  animations: [
    {
      name: 'crash.png',
      frames: 11,
      fpf: 6,
      height: 256,
      width: 256
    }, {
      name: 'blowup.png',
      frames: 11,
      fpf: 4,
      width: 64,
      height: 64
    }
  ],
  logo: {
    name: 'escape.png',
    buoyancy: .04,
    x: 156,
    y: 108
  },
  bgr: {
    name: 'start.png'
  },
  levels: [
    {
      background: {
        name: 'space.jpg',
        color: '#000'
      },
      enemies: [
        {
          color: '#fc9',
          sprite: {
            name: 'asteroid0.png'
          },
          rotation: {
            speed: 1,
            angle: 0
          },
          radius: 30,
          top: 320,
          left: 100,
          em: {
            x: 3,
            y: 3,
            m: .8
          }
        }, {
          color: '#c9f',
          sprite: {
            name: 'asteroid1.png'
          },
          rotation: {
            speed: 5,
            angle: 0
          },
          radius: 30,
          top: 380,
          left: 300,
          em: {
            x: 3,
            y: 3,
            m: 0.5
          }
        }, {
          color: '#0f0',
          sprite: {
            name: 'asteroid2.png'
          },
          rotation: {
            speed: 3,
            angle: 0
          },
          radius: 40,
          top: 250,
          left: 500,
          em: {
            x: 2,
            y: 2,
            m: 3
          }
        }, {
          color: '#cfc',
          sprite: {
            name: 'asteroid3.png',
            x: -5,
            y: 0,
            width: 73,
            height: 62,
            frames: 20,
            fpf: 2
          },
          rotation: {
            speed: 1.6
          },
          radius: 30,
          top: 450,
          left: 600,
          em: {
            x: 2,
            y: 2,
            m: 1.5
          }
        }, {
          color: '#fc9',
          sprite: {
            name: 'asteroid0.png'
          },
          rotation: {
            speed: 1,
            angle: 0
          },
          radius: 30,
          top: 70,
          left: 250,
          em: {
            x: 3,
            y: 3,
            m: .7
          }
        }, {
          color: '#c9f',
          sprite: {
            name: 'asteroid1.png'
          },
          rotation: {
            speed: 5,
            angle: 0
          },
          radius: 30,
          top: 520,
          left: 150,
          em: {
            x: 2,
            y: 2,
            m: 2
          }
        }, {
          color: '#cf9',
          sprite: {
            name: 'asteroid2.png'
          },
          rotation: {
            speed: 3,
            angle: 0
          },
          radius: 40,
          top: 250,
          left: 400,
          em: {
            x: 1,
            y: 1,
            m: 3.5
          }
        }, {
          color: '#cfc',
          sprite: {
            name: 'asteroid3.png',
            x: -5,
            y: 0,
            width: 73,
            height: 62,
            frames: 20,
            fpf: 3
          },
          rotation: {
            speed: 1
          },
          radius: 30,
          top: 100,
          left: 600,
          em: {
            x: 2,
            y: 3,
            m: 2
          }
        }
      ]
    }, {
      name: {
        ru: 'Открытый космос',
        en: 'Open space'
      },
      hello: {
        ru: 'Скопление астероидов',
        en: 'Asteroid cluster'
      },
      over: '',
      background: {
        name: 'space.jpg',
        color: '#000',
        scroll: {
          x: 0,
          y: 13
        },
        zoom: 0
      },
      speed: 1,
      stop: 16000,
      minimal: 10000,
      player: {
        color: '#56b65d',
        sprite: {
          name: 'spaceship.png',
          frames: 2,
          fpf: 2,
          width: 80,
          height: 128
        },
        em: {
          x: 0,
          y: 0,
          m: .6
        },
        top: 580,
        left: 310,
        width: 80,
        height: 116
      },
      enemies: [
        {
          color: '#00f',
          width: 100,
          height: 0,
          top: 0,
          left: 100,
          em: {
            x: 1,
            y: 0,
            m: 0
          },
          projectiles: [
            {
              color: '#f00',
              sprite: {
                name: 'asteroid0.png'
              },
              radius: 30,
              em: {
                auto: true
              },
              rotation: {
                speed: 7
              },
              frequency: 350,
              x: 10,
              y: -50,
              contact: ['crash']
            }, {
              color: '#f00',
              sprite: {
                name: 'asteroid1.png'
              },
              radius: 30,
              em: {
                auto: true
              },
              rotation: {
                speed: 2
              },
              frequency: 500,
              x: 10,
              y: -50,
              contact: ['crash']
            }, {
              color: '#f00',
              sprite: {
                name: 'asteroid2.png'
              },
              radius: 40,
              em: {
                auto: true
              },
              rotation: {
                speed: 4
              },
              frequency: 1200,
              x: 10,
              y: -70,
              contact: ['crash']
            }, {
              color: '#cfc',
              sprite: {
                name: 'asteroid3.png',
                x: -5,
                y: 0,
                width: 73,
                height: 62,
                frames: 20,
                fpf: 2
              },
              rotation: {
                speed: 2
              },
              radius: 30,
              em: {
                auto: true
              },
              frequency: 1600,
              x: 40,
              y: -50,
              contact: ['crash']
            }
          ]
        }, {
          color: '#ff0',
          width: 100,
          height: 0,
          top: 0,
          left: 600,
          em: {
            x: -1,
            y: 0,
            m: 0
          },
          projectiles: [
            {
              color: '#0f0',
              sprite: {
                name: 'asteroid0.png'
              },
              radius: 30,
              em: {
                auto: true
              },
              rotation: {
                speed: 5
              },
              frequency: 200,
              x: 10,
              y: -50,
              contact: ['crash']
            }, {
              color: '#0f0',
              sprite: {
                name: 'asteroid1.png'
              },
              radius: 30,
              em: {
                auto: true
              },
              rotation: {
                speed: 3
              },
              frequency: 700,
              x: 20,
              y: -50,
              contact: ['crash']
            }, {
              color: '#0f0',
              sprite: {
                name: 'asteroid2.png'
              },
              radius: 40,
              em: {
                auto: true
              },
              rotation: {
                speed: 2
              },
              frequency: 1000,
              x: 10,
              y: -70,
              contact: ['crash']
            }, {
              color: '#cfc',
              sprite: {
                name: 'asteroid3.png',
                x: -5,
                y: 0,
                width: 73,
                height: 62,
                frames: 20,
                fpf: 3
              },
              rotation: {
                speed: 1
              },
              radius: 30,
              em: {
                auto: true
              },
              frequency: 1200,
              x: 20,
              y: -50,
              contact: ['crash']
            }
          ]
        }
      ]
    }, {
      name: {
        ru: 'Корабль',
        en: 'Spaceship'
      },
      hello: {
        ru: 'Авария на корабле',
        en: 'Shipwreck'
      },
      over: '',
      background: {
        name: 'spaceship_int.jpg',
        color: '#ccc',
        zoom: .025,
        rotate: .42
      },
      filter: {
        threshold: 1,
        duration: .5,
        color: 'rgba(255, 0, 0, 0.3)'
      },
      speed: 1.1,
      minimal: 10000,
      stop: 16000,
      player: {
        color: '#56b65d',
        sprite: {
          name: 'astronaut.png',
          x: 0,
          y: 0,
          frames: 8,
          fpf: 8,
          width: 156,
          height: 156
        },
        top: 325,
        left: 310,
        width: 150,
        height: 150
      },
      enemies: [
        {
          color: '#afd',
          sprite: {
            name: 'mug.png',
            x: 0,
            y: -3,
            width: 40,
            height: 38
          },
          rotation: {
            speed: 3
          },
          radius: 16,
          top: 600,
          left: 600,
          em: {
            x: 1,
            y: 1,
            m: 1,
            auto: true
          }
        }, {
          color: '#3d3',
          sprite: {
            name: 'watermelon.png',
            x: 5,
            y: -3,
            width: 51,
            height: 60
          },
          rotation: {
            speed: 2
          },
          radius: 30,
          top: 80,
          left: 300,
          em: {
            x: 2,
            y: 2,
            m: 4,
            auto: true
          }
        }, {
          color: '#d33',
          sprite: {
            name: 'weight.png',
            x: 6,
            y: -6,
            width: 63,
            height: 90
          },
          rotation: {
            speed: 2
          },
          radius: 38,
          top: 600,
          left: 60,
          em: {
            x: 1.5,
            y: 1.5,
            m: 8,
            auto: true
          }
        }
      ]
    }, {
      name: 'Орбита',
      hello: 'Прорвись через охрану',
      over: '',
      background: {
        name: 'planet.jpg',
        color: '#101018',
        zoom: .04
      },
      speed: 1,
      minimal: 10000,
      stop: 16000,
      player: {
        color: '#56b65d',
        sprite: {
          name: 'boat.png',
          x: -3,
          y: 0,
          frames: 2,
          fpf: 2,
          width: 55,
          height: 60
        },
        top: 630,
        left: 310,
        width: 48,
        height: 48
      },
      enemies: [
        {
          color: '#f00',
          sprite: {
            name: 'fighter0.png',
            x: 0,
            y: -15,
            frames: 2,
            fpf: 3,
            width: 80,
            height: 112
          },
          width: 80,
          height: 100,
          top: 70,
          left: 600,
          em: {
            x: -4,
            y: 0
          },
          contact: ['blowup'],
          projectiles: [
            {
              color: '#f00',
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam_r.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: 0,
                y: 6,
                m: 0
              },
              frequency: 1800,
              x: 38,
              y: 100,
              contact: ['blowup']
            }, {
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: -.5,
                y: 3,
                m: 0
              },
              frequency: 500,
              x: 50,
              y: 42,
              contact: ['blowup']
            }, {
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: -.5,
                y: 2,
                m: 0
              },
              frequency: 600,
              x: 25,
              y: 42,
              contact: ['blowup']
            }, {
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: .5,
                y: 3,
                m: 0
              },
              frequency: 400,
              x: 50,
              y: 42,
              contact: ['blowup']
            }, {
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: .5,
                y: 2,
                m: 0
              },
              frequency: 300,
              x: 25,
              y: 42,
              contact: ['blowup']
            }
          ]
        }, {
          color: '#fc9',
          sprite: {
            name: 'fighter1.png',
            x: 0,
            y: -15,
            frames: 2,
            fpf: 3,
            width: 80,
            height: 112
          },
          width: 80,
          height: 100,
          top: 180,
          left: 70,
          em: {
            x: 4,
            y: 0
          },
          contact: ['blowup'],
          projectiles: [
            {
              color: '#f00',
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam_r.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: 0,
                y: 6,
                m: 0
              },
              frequency: 1500,
              x: 38,
              y: 100,
              contact: ['blowup']
            }, {
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: .5,
                y: 3,
                m: 0
              },
              frequency: 600,
              x: 50,
              y: 42,
              contact: ['blowup']
            }, {
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: -.5,
                y: 2,
                m: 0
              },
              frequency: 500,
              x: 25,
              y: 42,
              contact: ['blowup']
            }, {
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: .5,
                y: 3,
                m: 0
              },
              frequency: 300,
              x: 50,
              y: 42,
              contact: ['blowup']
            }, {
              rotation: {
                auto: true
              },
              sprite: {
                name: 'beam.png',
                x: -1,
                y: 0,
                width: 8,
                height: 31
              },
              width: 4,
              height: 28,
              em: {
                x: -.5,
                y: 2,
                m: 0
              },
              frequency: 400,
              x: 25,
              y: 42,
              contact: ['blowup']
            }
          ]
        }
      ]
    }, {
      name: 'Атмосфера',
      hello: 'Спасайся!',
      background: {
        name: 'atmosphere.jpg',
        color: '#383a2b',
        scroll: {
          x: -4,
          y: -6
        }
      },
      filter: {
        threshold: 0,
        duration: 15,
        color: 'rgba(255, 0, 0, 0.1)'
      },
      minimal: 10000,
      stop: 16000,
      speed: .9,
      player: {
        color: '#56b65d',
        sprite: {
          name: 'falling_boat.png',
          x: -175,
          y: -4,
          frames: 16,
          fpf: 2,
          width: 222,
          height: 54
        },
        top: 550,
        left: 550,
        width: 46,
        height: 48,
        rotation: {
          angle: 16,
          speed: 0
        }
      },
      enemies: [
        {
          color: '#ddd',
          sprite: {
            name: 'interceptor.png',
            x: 0,
            y: -3,
            width: 120,
            height: 88
          },
          width: 120,
          height: 90,
          left: 20,
          top: 300,
          em: {
            x: 0,
            y: 7
          },
          contact: ['blowup'],
          projectiles: [
            {
              sprite: {
                name: 'plasma.png',
                x: -10,
                y: -8,
                frames: 4,
                fpf: 1
              },
              rotation: {
                speed: 100
              },
              radius: 16,
              em: {
                x: 4,
                y: 2,
                m: 0,
                sauto: true
              },
              frequency: 500,
              x: 120,
              y: 52,
              contact: ['blowup']
            }, {
              sprite: {
                name: 'plasma.png',
                x: -10,
                y: -8,
                frames: 4,
                fpf: 1
              },
              rotation: {
                speed: 100
              },
              radius: 16,
              em: {
                x: 6,
                y: 1,
                m: 0,
                sauto: true
              },
              frequency: 800,
              x: 120,
              y: 52,
              contact: ['blowup']
            }, {
              sprite: {
                name: 'plasma.png',
                x: -10,
                y: -8,
                frames: 4,
                fpf: 1
              },
              rotation: {
                speed: 100
              },
              radius: 16,
              em: {
                x: 4,
                y: -1,
                m: 0,
                sauto: true
              },
              frequency: 1200,
              x: 120,
              y: 52,
              contact: ['blowup']
            }, {
              sprite: {
                name: 'plasma.png',
                x: -10,
                y: -8,
                frames: 4,
                fpf: 1
              },
              rotation: {
                speed: 100
              },
              radius: 16,
              em: {
                x: 3,
                y: -0,
                m: 0,
                sauto: true
              },
              frequency: 1600,
              x: 120,
              y: 52,
              contact: ['blowup']
            }, {
              sprite: {
                name: 'plasma.png',
                x: -10,
                y: -8,
                frames: 4,
                fpf: 1
              },
              rotation: {
                speed: 100
              },
              radius: 16,
              em: {
                x: 4,
                y: -1,
                m: 0,
                sauto: true
              },
              frequency: 1000,
              x: 120,
              y: 52,
              contact: ['blowup']
            }, {
              sprite: {
                name: 'plasma.png',
                x: -10,
                y: -8,
                frames: 4,
                fpf: 1
              },
              rotation: {
                speed: 100
              },
              radius: 16,
              em: {
                x: 5,
                y: 0,
                m: 0,
                sauto: true
              },
              frequency: 700,
              x: 120,
              y: 52,
              contact: ['blowup']
            }, {
              sprite: {
                name: 'plasma.png',
                x: -10,
                y: -8,
                frames: 4,
                fpf: 1
              },
              rotation: {
                speed: 100
              },
              radius: 16,
              em: {
                x: 3,
                y: -2,
                m: 0,
                sauto: true
              },
              frequency: 900,
              x: 120,
              y: 52,
              contact: ['blowup']
            }
          ]
        }
      ]
    }, {
      name: 'Поверхность',
      hello: 'Доберись до портала',
      background: {
        name: 'surface.jpg',
        color: '#fca052',
        scroll: {
          x: -40,
          y: 0
        }
      },
      minimal: 13000,
      stop: 16000,
      player: {
        color: '#56b65d',
        sprite: {
          name: 'falling_boat.png',
          x: -175,
          y: -4,
          frames: 16,
          fpf: 2,
          width: 222,
          height: 54
        },
        top: 200,
        left: 50,
        width: 48,
        height: 48
      },
      enemies: [
        {
          sprite: {
            name: 'mountain0.png'
          },
          width: 1200,
          height: 674,
          left: 1200,
          top: 100,
          em: {
            x: -3,
            y: 0,
            m: 0
          },
          free: true,
          contact: ['blowup']
        }, {
          sprite: {
            name: 'mountain3.png'
          },
          width: 1300,
          height: 447,
          left: 0,
          top: 254,
          em: {
            x: -3,
            y: 0,
            m: 0
          },
          free: true,
          contact: ['blowup']
        }, {
          sprite: {
            name: 'mountain1.png'
          },
          width: 455,
          height: 186,
          left: 3700,
          top: 516,
          em: {
            x: -3,
            y: 0,
            m: 0
          },
          free: true,
          contact: ['blowup']
        }, {
          sprite: {
            name: 'mountain2.png'
          },
          width: 1450,
          height: 475,
          left: 2400,
          top: 226,
          em: {
            x: -3,
            y: 0,
            m: 0
          },
          free: true,
          contact: ['blowup']
        }, {
          color: '#ff0',
          width: 0,
          height: 0,
          top: 20,
          left: 600,
          em: {
            x: 9,
            y: 0,
            m: 0
          },
          projectiles: [
            {
              sprite: {
                name: 'meteorite.png',
                x: -32,
                y: -222,
                frames: 4,
                fpf: 5,
                width: 70,
                height: 256
              },
              rotation: {
                auto: true
              },
              radius: 6,
              em: {
                x: -6,
                y: 4,
                m: 0
              },
              frequency: 1600,
              x: 10,
              y: 0,
              contact: ['blowup']
            }, {
              sprite: {
                name: 'meteorite.png',
                x: -32,
                y: -222,
                frames: 4,
                fpf: 5,
                width: 70,
                height: 256
              },
              rotation: {
                auto: true
              },
              radius: 6,
              em: {
                x: -3,
                y: 2,
                m: 0
              },
              frequency: 900,
              x: 60,
              y: 0,
              contact: ['blowup']
            }
          ]
        }, {
          color: '#ff0',
          width: 0,
          height: 0,
          top: 30,
          left: 700,
          em: {
            x: 5,
            y: 0,
            m: 0
          },
          projectiles: [
            {
              sprite: {
                name: 'meteorite.png',
                x: -32,
                y: -222,
                frames: 4,
                fpf: 5,
                width: 70,
                height: 256
              },
              rotation: {
                auto: true
              },
              radius: 6,
              em: {
                x: -4,
                y: 4,
                m: 0
              },
              frequency: 2200,
              x: 30,
              y: 0,
              contact: ['blowup']
            }, {
              sprite: {
                name: 'meteorite.png',
                x: -32,
                y: -222,
                frames: 4,
                fpf: 5,
                width: 70,
                height: 256
              },
              rotation: {
                auto: true
              },
              radius: 6,
              em: {
                x: -5,
                y: 3,
                m: 0
              },
              frequency: 3000,
              x: 30,
              y: 0,
              contact: ['blowup']
            }
          ]
        }, {
          name: 'portal',
          width: 40,
          height: 700,
          top: 0,
          left: 4200,
          em: {
            x: -3,
            y: 0,
            m: 0
          },
          free: true,
          sprite: {
            name: 'ripple.png',
            frames: 3,
            fpf: 6,
            x: -60,
            width: 93,
            height: 700
          },
          contact: ['disappear']
        }, {
          name: 'portal',
          width: 40,
          height: 700,
          top: 0,
          left: 4230,
          em: {
            x: -3,
            y: 0,
            m: 0
          },
          free: true,
          sprite: {
            name: 'ripple.png',
            frames: 3,
            fpf: 6,
            x: -60,
            width: 93,
            height: 700
          },
          contact: ['disappear']
        }, {
          name: 'portal',
          width: 40,
          height: 700,
          top: 0,
          left: 4260,
          em: {
            x: -3,
            y: 0,
            m: 0
          },
          free: true,
          sprite: {
            name: 'ripple.png',
            frames: 3,
            fpf: 6,
            x: -60,
            width: 93,
            height: 700
          },
          contact: ['disappear']
        }, {
          name: 'portal',
          width: 40,
          height: 700,
          top: 0,
          left: 4300,
          em: {
            x: -3,
            y: 0,
            m: 0
          },
          free: true,
          sprite: {
            name: 'ripple.png',
            frames: 3,
            fpf: 6,
            x: -60,
            width: 93,
            height: 700
          },
          contact: ['disappear']
        }
      ]
    }, {
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
        radius: 40
      },
      enemies: [
        {
          color: '#00f',
          width: 120,
          height: 50,
          em: {
            x: 3,
            y: -1,
            m: 0,
            auto: true
          },
          top: 50,
          left: 50
        }, {
          color: '#f0f',
          width: 90,
          height: 60,
          em: {
            x: -4,
            y: -4,
            m: 0,
            auto: true
          },
          top: 600,
          left: 550
        }, {
          color: '#ff0',
          width: 50,
          height: 120,
          em: {
            x: 5,
            y: 2,
            m: 0,
            auto: true
          },
          top: 20,
          left: 600
        }, {
          color: '#0ff',
          width: 40,
          height: 90,
          em: {
            x: 2,
            y: 5,
            m: 0,
            auto: true
          },
          top: 550,
          left: 40
        }
      ]
    }
  ],
  debug: false,
  version: '1.3.0.0'
};

Game = (function() {
  var _cycleTO, _getSpeed, _loading, _pa, _prepare, _score, _selectDifficulty, _tkn, animations, bgr, blowup, cfg, collision, crash, current_level, difficulty, disappear, exactCollision, gameover, getTop, hideMessage, hideTop, hiscores, html_escape_logo, kill, lang, level, load, loader, logo, moveEnemies, movePlayer, options, play, player, rating, renderer, reset, showMessage, showTop, start, start_screen, total_bonus, total_time, updateHUD, wait;

  cfg = {};

  _cycleTO = null;

  _pa = 0;

  animations = [];

  html_escape_logo = null;

  lang = navigator.language;

  logo = null;

  bgr = null;

  _tkn = null;

  rating = {
    data: null,
    ts: 0
  };

  renderer = null;

  loader = null;

  collision = null;

  level = {};

  current_level = 0;

  difficulty = -1;

  player = {
    id: null,
    name: 'чувак',
    rank: 0,
    record: 0
  };

  _score = [];

  total_time = 0;

  total_bonus = 0;

  function Game(config) {
    cfg = config;
    renderer = new Render(cfg.debug);
    loader = new Resource(cfg.folders, start_screen, _loading);
    if (cfg.animations != null) {
      animations = cfg.animations;
    }
    if (cfg.logo != null) {
      logo = cfg.logo;
    }
    if (cfg.bgr != null) {
      bgr = cfg.bgr;
    }
    html_escape_logo = $('#escapelogo');
    $('#gotvglogo,#razerlogo').click(function(e) {
      return e.stopPropagation();
    });
    $('#version').text('v' + cfg.version);
    $('#cpr_notice').text(getString(main.copyright) + '.');
    $('#click_notice').text(getString(main["continue"]));
    $('#click').text(getString(main.click));
    $('#options > #title').text(getString(main.difficulty));
    $('#easy').text(getString(main.easy));
    $('#normal').text(getString(main.normal));
    $('#hard').text(getString(main.hardcore));
    $('#insane').text(getString(main.insane));
    $(document).keyup((function(_this) {
      return function(e) {
        switch (e.keyCode) {
          case 70:
            return $('#fps').toggle();
          case 86:
            return $('#version').toggle();
          case 82:
            return showTop();
          case 68:
            return $('#dbg').toggle();
        }
      };
    })(this));
    getTop();
    load();
  }

  reset = function() {
    _score = [];
    total_time = 0;
    total_bonus = 0;
    return current_level = 0;
  };

  load = function() {
    var animation, enemy, j, k, l, len, len1, len2, projectile, ref, ref1;
    showMessage(getString(main.loading) + " 0%");
    collision = null;
    level = $.extend(true, {}, cfg.levels[current_level]);
    level.speed -= difficulty * 0.15;
    level.stop -= difficulty * 2000;
    level.minimal -= difficulty * 2000;
    level.time = 0;
    level.started = 0;
    level.score = 0;
    level.last_ts = 0;
    loader.startQueue();
    if (!current_level) {
      if (cfg.logo != null) {
        logo = loader.getResource(cfg.logo.name, 'misc').image;
      }
      if (cfg.bgr != null) {
        bgr = loader.getResource(cfg.bgr.name, 'misc').image;
      }
    } else {
      updateHUD();
    }
    if ((level.background != null) && level.background.name) {
      level.background.image = loader.getResource(level.background.name, 'bgr').image;
    }
    if ((level.player != null) && (level.player.sprite != null)) {
      level.player.sprite.image = loader.getResource(level.player.sprite.name, 'player').image;
      if (!level.player.sprite.x) {
        level.player.sprite.x = 0;
      }
      if (!level.player.sprite.y) {
        level.player.sprite.y = 0;
      }
      if (!level.player.sprite.frames) {
        level.player.sprite.frames = 1;
      }
      if (!level.player.sprite.fpf) {
        level.player.sprite.fpf = 1000;
      }
      level.player.sprite.fsps = 0;
    }
    if (level.player && level.player.radius) {
      level.player.width = level.player.height = level.player.radius * 2;
    }
    if (level.enemies != null) {
      ref = level.enemies;
      for (j = 0, len = ref.length; j < len; j++) {
        enemy = ref[j];
        if (enemy.sprite != null) {
          enemy.sprite.image = loader.getResource(enemy.sprite.name, 'mob').image;
          if (!enemy.sprite.x) {
            enemy.sprite.x = 0;
          }
          if (!enemy.sprite.y) {
            enemy.sprite.y = 0;
          }
          if (!enemy.sprite.frames) {
            enemy.sprite.frames = 1;
          }
          if (!enemy.sprite.fpf) {
            enemy.sprite.fpf = 1000;
          }
          enemy.sprite.fsps = 0;
        }
        if (enemy.em.auto) {
          enemy.em.x *= random() ? 1 : -1;
          enemy.em.y *= random() ? 1 : -1;
        }
        if (enemy.em.m == null) {
          enemy.em.m = 0;
        }
        if (enemy.radius != null) {
          enemy.width = enemy.height = enemy.radius * 2;
        }
        if (enemy.projectiles != null) {
          ref1 = enemy.projectiles;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            projectile = ref1[k];
            if (projectile.sprite != null) {
              projectile.sprite.image = loader.getResource(projectile.sprite.name, 'projectiles').image;
              if (!projectile.sprite.x) {
                projectile.sprite.x = 0;
              }
              if (!projectile.sprite.y) {
                projectile.sprite.y = 0;
              }
              if (!projectile.sprite.frames) {
                projectile.sprite.frames = 1;
              }
              if (!projectile.sprite.fpf) {
                projectile.sprite.fpf = 1000;
              }
              projectile.sprite.fsps = 0;
            }
            projectile.top = -100;
            projectile.left = -100;
            projectile.hide = true;
            projectile.last_time = 0;
            if (projectile.radius != null) {
              projectile.width = projectile.height = projectile.radius * 2;
            }
            if (projectile.em.m == null) {
              projectile.em.m = 0;
            }
          }
        }
      }
    }
    for (l = 0, len2 = animations.length; l < len2; l++) {
      animation = animations[l];
      animation.image = loader.getResource(animation.name, 'animation').image;
    }
    return loader.closeQueue();
  };

  _loading = function(progress) {
    return showMessage(getString(main.loading) + ' ' + progress + '%');
  };

  kill = function() {
    reset();
    return load();
  };

  start_screen = function() {
    var demo;
    if (current_level) {
      return wait();
    }
    renderer.clear();
    $('#cover').hide();
    $('#hud').hide();
    $('#start').show().one('click', function() {
      $('#start').hide();
      return options();
    });
    demo = function() {
      var distance;
      distance = 8;
      renderer.draw(level);
      level.time++;
      moveEnemies();
      if (level.time < 500) {
        if (_pa < Math.PI * 2) {
          _pa += cfg.logo.buoyancy;
        } else {
          _pa = 0;
        }
        $(html_escape_logo).css({
          top: Math.sin(_pa) * distance + cfg.logo.y
        });
      } else {
        if (level.time === 500) {
          showTop();
        } else if (level.time === 1000) {
          hideTop();
          level.time = 0;
        }
      }
      return _cycleTO = requestAnimationFrame(demo);
    };
    return demo();
  };

  wait = function() {
    $('#cover').one('click', start);
    renderer.clear();
    updateHUD();
    renderer.draw(level);
    return showMessage(("#fff|Уровень " + current_level + ": " + (getString(level.name)) + "\n#0e0|" + (getString(level.hello))) + (level.minimal ? "\n#0cf|Продержись " + (level.minimal / 1000) + " секунд" : ''));
  };

  options = function() {
    cancelAnimationFrame(_cycleTO);
    $('#cover').css('display', 'flex');
    $('#message').hide();
    $('#options').show();
    $('#easy').one('click', function() {
      return _selectDifficulty(1);
    });
    $('#normal').one('click', function() {
      return _selectDifficulty(0);
    });
    $('#hard').one('click', function() {
      return _selectDifficulty(-1);
    });
    return $('#insane').one('click', function() {
      return _selectDifficulty(-2);
    });
  };

  _selectDifficulty = function(difficultyLevel) {
    if (!current_level) {
      difficulty = difficultyLevel;
    }
    $('#options').fadeOut(100);
    cancelAnimationFrame(_cycleTO);
    current_level = 1;
    return load();
  };

  start = function() {
    $('#cover').hide();
    $('#overlay').on('mousemove touchmove', movePlayer);
    level.started = new Date().getTime();
    renderer.resetFPS();
    Game.stop = false;
    return play();
  };

  play = function() {
    var done, now, ref;
    if (Game.stop) {
      return;
    }
    now = new Date().getTime();
    if (current_level && level.last_ts && now - level.last_ts > 300) {
      showMessage('#f00|' + getString(main.error) + '!\nПохоже, что твой\nдевайс работает\nслишком медленно.\nНам очень жаль.', true, kill);
      return cancelAnimationFrame(_cycleTO);
    }
    if (level.started) {
      level.time = now - level.started;
    }
    done = false;
    if (level.stop && level.time + 30 >= level.stop) {
      done = true;
    }
    renderer.draw(level);
    moveEnemies();
    if (done) {
      level.time = level.stop;
    }
    if (level.time > level.minimal) {
      level.score = level.time - level.minimal;
    }
    updateHUD();
    if (collision || done) {
      cancelAnimationFrame(_cycleTO);
      $('#overlay').off('mousemove touchmove');
      if (collision && (((ref = collision.killer) != null ? ref.contact : void 0) != null)) {
        _pa = 0;
        switch (collision.killer.contact[0]) {
          case 'disappear':
            return disappear();
          case 'blowup':
            return blowup();
          case 'crash':
            return crash();
          default:
            return knockout();
        }
      } else {
        return gameover();
      }
    } else {
      return _cycleTO = requestAnimationFrame(play);
    }
  };

  gameover = function() {
    var message, multiplier, vk_desc;
    Game.stop = true;
    multiplier = 1;
    if (level.minimal <= level.time) {
      if (level.stop && level.time >= (level.stop - 30)) {
        level.time = level.stop;
        multiplier = 2;
      }
      total_bonus += level.score * multiplier;
      total_time += level.time;
    }
    if (!level.score) {
      if (total_bonus) {
        if (total_bonus > player.record) {
          player.record = total_bonus;
          message = "#f00|Game over, " + player.name + "!\n#9f0|Новый личный рекорд: " + (simplePluralize(total_bonus, ['очко', 'очка', 'очков']));
        } else {
          message = "#f00|Game over, " + player.name + "!\n#9f0|Бонус: " + total_bonus;
        }
        vk_desc = 'Я набрал ' + simplePluralize(player.record, ['очко', 'очка', 'очков']) + ' в Escape!\nУчаствуй в конкурсе на gotVG и выиграй игровую мышь Razer Mamba Tournament Edition!';
        message += "\n\n<a href=\"http://vk.com/share.php?url=" + (encodeURI('http://got.vg/article/razer-escape/')) + "&title=" + (encodeURI('Мой рекорд в gotVG Escape')) + "&noparse=true&description=" + (encodeURI(vk_desc)) + "&image=http://escape.got.vg/assets/images/misc/escape.png\" target=\"_blank\">Поделиться ВКонтакте</a>";
        hiscores(message, true);
      } else {
        message = '#f00|Game over без бонуса!';
        hiscores(message);
      }
      return reset();
    } else {
      _score[current_level] = level.score;
      if (++current_level < cfg.levels.length) {
        message = '#0f0|Уровень пройден!';
        if (level.over) {
          message += '\n#0df|' + level.over + '\n';
        }
        message += multiplier < 2 ? '\n#f99|Бонус: ' + level.score : "\n#9f0|Бонус #f00|x 2 #ff0|: " + (level.score * multiplier);
        return showMessage(message, true, load);
      } else {
        total_bonus *= 2;
        message = "#0f0|Игра пройдена, " + player.name + "!\n#9f0|Бонус #f00|x 2 #ff0|: " + total_bonus;
        vk_desc = 'Я прошел Escape! Мой рекорд: ' + simplePluralize(player.record, ['очко', 'очка', 'очков']) + '!\nУчаствуй в конкурсе на gotVG и выиграй игровую мышь Razer Mamba Tournament Edition!';
        message += "\n\n<a href=\"http://vk.com/share.php?url=" + (encodeURI('http://got.vg/article/razer-escape/')) + "&title=" + (encodeURI('Я прошёл gotVG Escape!')) + "&noparse=true&description=" + (encodeURI(vk_desc)) + "&image=http://escape.got.vg/assets/images/misc/escape.png\" target=\"_blank\">Поделиться ВКонтакте</a>";
        if (total_bonus > player.record) {
          player.record = total_bonus;
        }
        hiscores(message, true);
        return reset();
      }
    }
  };

  _getSpeed = function() {
    if (level.time) {
      if (level.speed) {
        return Math.pow((level.time * level.speed) / 10000, 4) + level.speed;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  };

  getTop = function() {
    return $.get('http://escape.got.vg/record.php', null, (function(_this) {
      return function(result) {
        var i, j, len, name, records, ref, row, score;
        if (!result.error) {
          if (result.player != null) {
            player = result.player;
          }
          _tkn = result.csrf;
          rating.data = result.data;
          rating.ts = result.ts;
          records = '';
          i = 0;
          ref = rating.data;
          for (j = 0, len = ref.length; j < len; j++) {
            row = ref[j];
            for (name in row) {
              score = row[name];
              records += "<tr><td>" + (++i) + ".</td><td>" + name + "</td><td>" + score + "</td></tr>";
            }
          }
          return $('#records').html(records);
        }
      };
    })(this), 'json').fail((function(_this) {
      return function() {
        return showMessage('#f00|' + getString(main.error) + '!\n' + getString(main.connectionIssue), true, hideTop);
      };
    })(this));
  };

  hiscores = function(msg, send) {
    var data;
    if (msg == null) {
      msg = '';
    }
    if (send == null) {
      send = false;
    }
    showMessage('Загрузка рейтинга...', true);
    if (send && player.id) {
      data = {
        key: _prepare(btoa(_score.toString() + '=' + total_time + '|' + total_bonus)),
        score: total_bonus,
        player: player.id,
        data: _tkn,
        version: cfg.version
      };
    } else {
      data = null;
    }
    return $.get('http://escape.got.vg/record.php', data, (function(_this) {
      return function(result) {
        var i, j, len, name, records, ref, row, score;
        if (!result.error) {
          rating.data = result.data;
          rating.ts = result.ts;
          records = '';
          i = 0;
          ref = rating.data;
          for (j = 0, len = ref.length; j < len; j++) {
            row = ref[j];
            for (name in row) {
              score = row[name];
              records += "<tr><td>" + (++i) + ".</td><td>" + name + "</td><td>" + score + "</td></tr>";
            }
          }
          $('#records').html(records);
          $('#rating').show();
        } else {
          msg += '\n#f99|Ошибка загрузки рейтинга';
        }
        return showMessage(msg, true, function() {
          $('#rating').hide();
          hideMessage();
          return load();
        });
      };
    })(this), 'json').fail((function(_this) {
      return function() {
        return showMessage('#f00|Беда!\nНевозможно\nсоединиться\nс сервером!', true, kill);
      };
    })(this));
  };

  showTop = function() {
    var now;
    now = new Date().getTime();
    if ((now / 1000 - rating.ts) > 10) {
      getTop();
    }
    $(html_escape_logo).hide();
    $('#click').hide();
    if (rating.data.length) {
      $('#rating').show();
      return showMessage(null, true, hideTop);
    }
  };

  hideTop = function() {
    $('#rating').hide();
    hideMessage();
    $(html_escape_logo).show();
    return $('#click').show();
  };

  _prepare = function(data) {
    var i, j, r, ref;
    r = '';
    for (i = j = 0, ref = data.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      r += String.fromCharCode(data.charCodeAt(i) ^ 0x64);
    }
    return btoa(r) + '°€§√яZ';
  };

  movePlayer = function(e) {
    var _player, curX, curY, dx, dy, move, screen;
    if (level.player == null) {
      return;
    }
    e.preventDefault();
    screen = renderer.getScreen();
    _player = level.player;
    if (e.type === 'touchmove') {
      move = e.originalEvent.changedTouches[0];
      curX = move.pageX - screen.left;
      curY = move.pageY - screen.top;
    } else {
      curX = e.offsetX;
      curY = e.offsetY;
    }
    dx = curX - _player.left;
    dy = curY - _player.top;
    if (Math.abs(dx) > _player.width * 2) {
      if (curX > _player.left) {
        curX = _player.left + _player.width;
      } else {
        curX = _player.left - _player.width / 4;
      }
    }
    if (Math.abs(dy) > _player.height * 2) {
      if (curY > _player.top) {
        curY = _player.top + _player.height;
      } else {
        curY = _player.top - _player.height / 4;
      }
    }
    if ((_player.height / 2 + 50 < curY && curY < (screen.height - _player.height / 2))) {
      _player.top = curY - _player.height / 2;
    } else {
      if (curY <= _player.height / 2 + 50) {
        _player.top = 50;
      } else {
        _player.top = screen.height - _player.height;
      }
    }
    if ((_player.width / 2 < curX && curX < (screen.width - _player.width / 2))) {
      return _player.left = curX - _player.width / 2;
    } else {
      if (curX >= screen.width - _player.width) {
        return _player.left = screen.width - _player.width;
      } else {
        return _player.left = 0;
      }
    }
  };

  moveEnemies = function() {
    var dt, en, enemy, j, k, l, len, len1, len2, len3, len4, m, n, now, num, p, point, projectile, ref, ref1, ref2, ref3, ref4, screen, sprite_offset_x, sprite_offset_y;
    if (level.enemies == null) {
      return;
    }
    screen = renderer.getScreen();
    now = new Date().getTime();
    dt = level.last_ts > 0 ? (now - level.last_ts) / 10 : 0;
    ref = level.enemies;
    for (j = 0, len = ref.length; j < len; j++) {
      enemy = ref[j];
      if (!enemy.safe && !collision && (level.player != null) && (point = exactCollision(level.player, enemy))) {
        collision = {
          killer: enemy,
          point: point,
          ts: now
        };
        break;
      }
      if (!collision) {
        if (enemy.em != null) {
          if (enemy.em.y !== 0) {
            enemy.top += (enemy.em.y * _getSpeed() * dt) >> 0;
          }
          if (enemy.em.x !== 0) {
            enemy.left += (enemy.em.x * _getSpeed() * dt) >> 0;
          }
        }
        ref1 = level.enemies;
        for (num = k = 0, len1 = ref1.length; k < len1; num = ++k) {
          en = ref1[num];
          if (en !== enemy) {
            detectCollision(en, enemy, true);
          }
        }
        if (!enemy.free) {
          if (enemy.em.x && enemy.left > screen.width - enemy.width) {
            enemy.left = screen.width - enemy.width;
            enemy.em.x *= -1;
          }
          if (enemy.em.x && enemy.left < 0) {
            enemy.left = 0;
            enemy.em.x *= -1;
          }
          if (enemy.em.y && enemy.top > screen.height - enemy.height) {
            enemy.top = screen.height - enemy.height;
            enemy.em.y *= -1;
          }
          if (enemy.em.y && enemy.top < 0) {
            enemy.top = 0;
            enemy.em.y *= -1;
          }
        }
      }
      if (enemy.projectiles) {
        ref2 = enemy.projectiles;
        for (l = 0, len2 = ref2.length; l < len2; l++) {
          projectile = ref2[l];
          if (!collision && (level.player != null) && (point = exactCollision(level.player, projectile, 1))) {
            collision = {
              killer: projectile,
              point: point,
              ts: now
            };
            break;
          }
          if (!projectile.hide) {
            if (projectile.sprite) {
              sprite_offset_y = projectile.sprite.image.height - projectile.sprite.y;
              sprite_offset_x = projectile.sprite.image.width - projectile.sprite.x;
            } else {
              sprite_offset_x = 0;
              sprite_offset_y = 0;
            }
            if ((projectile.top + projectile.height + sprite_offset_y) < 0 || projectile.top > screen.height || (projectile.left + projectile.width + sprite_offset_x) < 0 || projectile.left > screen.width) {
              projectile.hide = true;
            } else {
              projectile.top += (projectile.em.y * _getSpeed() * dt) >> 0;
              projectile.left += (projectile.em.x * _getSpeed() * dt) >> 0;
            }
          } else {
            if (!collision && projectile.last_time + projectile.frequency < level.time) {
              if (projectile.em.auto) {
                projectile.em = {
                  x: randomFloat(-1.5, 1.5),
                  y: randomFloat(1.5, 3),
                  m: projectile.radius / 30 * randomFloat(1, 2)
                };
              }
              if (projectile.em.sauto) {
                projectile.em.x *= randomFloat(0.7, 1.3);
                projectile.em.y *= randomFloat(0.7, 1.3);
              }
              projectile.top = enemy.top + projectile.y;
              projectile.left = enemy.left + projectile.x;
              projectile.last_time = level.time;
              projectile.hide = false;
            }
          }
          ref3 = level.enemies;
          for (m = 0, len3 = ref3.length; m < len3; m++) {
            en = ref3[m];
            if (en.projectiles != null) {
              ref4 = en.projectiles;
              for (n = 0, len4 = ref4.length; n < len4; n++) {
                p = ref4[n];
                if (p !== projectile) {
                  detectCollision(p, projectile, true);
                }
              }
            }
          }
        }
      }
    }
    return level.last_ts = now;
  };

  disappear = function() {
    if (_pa <= level.player.width) {
      renderer.animate(level.player, _pa);
      _cycleTO = requestAnimationFrame(disappear);
      return _pa += 12;
    } else {
      cancelAnimationFrame(_cycleTO);
      _pa = 0;
      return gameover();
    }
  };

  blowup = function() {
    if (_pa < animations[1].fpf * animations[1].frames + animations[1].fpf) {
      level.player.top += (collision.killer.em.y / 2 + 1) >> 0;
      level.player.left += (collision.killer.em.x / 2 + 1) >> 0;
      renderer.draw(level);
      renderer.animation(level.player.left, level.player.top, animations[1], _pa);
      moveEnemies();
      _cycleTO = requestAnimationFrame(blowup);
      return _pa++;
    } else {
      cancelAnimationFrame(_cycleTO);
      _pa = 0;
      return gameover();
    }
  };

  crash = function() {
    var animate;
    level.player.rotation = {
      auto: true
    };
    collide(level.player, collision.killer);
    animate = (function(_this) {
      return function() {
        var _player, killer, now, screen, x, y;
        screen = renderer.getScreen();
        _player = level.player;
        killer = collision.killer;
        renderer.draw(level);
        if (_pa++ < animations[0].fpf * animations[0].frames) {
          x = collision.point.x - animations[0].width / 2 + killer.left;
          y = collision.point.y - animations[0].height / 2 + killer.top;
          renderer.animation(x, y, animations[0], _pa, _player);
        }
        now = new Date();
        if (now.getTime() - collision.ts < 2400 && (_player.top < screen.height && (_player.top + _player.height) > 0 && _player.left < screen.width && (_player.left + _player.width) > 0)) {
          _player.top += (_player.em.y * 1.6 * _getSpeed()) >> 0;
          _player.left += (_player.em.x * 1.6 * _getSpeed()) >> 0;
          moveEnemies();
          return _cycleTO = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(_cycleTO);
          _pa = 0;
          return gameover();
        }
      };
    })(this);
    return animate();
  };

  exactCollision = function(o1, o2, type) {
    var height, intersection, width, x, y;
    if (type == null) {
      type = 0;
    }
    if (o1.top + o1.height < o2.top || o2.top + o2.height < o1.top || o1.left + o1.width < o2.left || o2.left + o2.width < o1.left) {
      return false;
    }
    if (o1.left < o2.left) {
      x = o2.left;
      width = o1.left + o1.width - o2.left;
    } else {
      x = o1.left;
      width = o2.left + o2.width - o1.left;
    }
    if (o1.top < o2.top) {
      y = o2.top;
      height = o1.top + o1.height - o2.top;
    } else {
      y = o1.top;
      height = o2.top + o2.height - o1.top;
    }
    intersection = {
      left: x,
      top: y,
      width: width,
      height: height
    };
    return renderer.checkCollision(intersection, type);
  };

  showMessage = function(text, active, callback) {
    var left, msg, top;
    if (active == null) {
      active = false;
    }
    if (callback == null) {
      callback = null;
    }
    $('#cover').css('display', 'flex');
    if (text && text.length) {
      text = text.replace(/(#[a-f0-9]{3,6})\|([^#]+)/gmi, '<span style="color: $1">$2</span>');
      text = text.replace(/^(.+)$/gm, '<p>$1</p>');
    }
    $('#box').html(text);
    msg = $('#message');
    left = ($(msg).parent().width() - $(msg).width()) / 2;
    top = ($(msg).parent().height() - $(msg).height()) / 2;
    $(msg).css({
      left: left + 'px',
      top: top + 'px'
    });
    if (active) {
      if (callback && isFunction(callback)) {
        $('#cover').unbind('click');
        $('#cover').one('click', callback);
        $('a').click(function(e) {
          return e.stopPropagation();
        });
      }
      $('#click_notice').delay(1500).slideDown(650);
      return $(msg).fadeIn(300);
    } else {
      $('#click_notice').hide();
      return $(msg).show();
    }
  };

  hideMessage = function() {
    return $('#cover').fadeOut(100, function() {
      return $('#message').hide();
    });
  };

  updateHUD = function() {
    $('#hud').css({
      display: 'table'
    });
    $('#time').text(formatTime(level.time));
    $('#bonus').text(total_bonus + level.score);
    return $('#hiscore').text(player.record);
  };

  return Game;

})();

listen = function(callback, one, type) {
  var layer;
  if (one == null) {
    one = true;
  }
  if (type == null) {
    type = 'click';
  }
  if (!isFunction(callback)) {
    return false;
  }
  layer = $('#active');
  $(layer).unbind();
  if (one) {
    return $(layer).one(type, callback);
  } else {
    return $(layer).on(type, callback);
  }
};

clearListeners = function() {
  return $('#active').unbind();
};

$(document).ready(function() {
  var LIC, game;
  LIC = new Image;
  LIC.src = "//counter.yadro.ru/hit?r" + escape(document.referrer) + (!screen ? "" : ";s" + screen.width + "*" + screen.height + "*" + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth)) + ";u" + escape(document.URL) + ";" + Math.random();
  return game = new Game(config);
});

random = function(min, max) {
  if (min == null) {
    min = 0;
  }
  if (max == null) {
    max = 1;
  }
  return Math.round(Math.random() * (max - min) + min);
};

randomFloat = function(min, max) {
  if (min == null) {
    min = -1;
  }
  if (max == null) {
    max = 1;
  }
  return Math.random() * (max - min) + min;
};

formatTime = function(time) {
  return (time / 1000).toFixed(2);
};

pythagoras = function(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
};

isFunction = function(functionToCheck) {
  var getType;
  getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

simplePluralize = function(number, cases) {
  var _case, last, short;
  _case = 0;
  short = number % 100;
  last = short % 10;
  if (!last || last > 4 || (4 < short && short < 21)) {
    _case = 2;
  } else if (last > 1) {
    _case = 1;
  }
  return number + ' ' + cases[_case];
};

getString = function(string) {
  return string[navigator.language] || string;
};

Mover = (function() {
  function Mover(screen) {
    this.movePlayer = bind(this.movePlayer, this);
    this.screen = screen;
  }

  Mover.prototype.movePlayer = function(e) {
    var curX, curY, move, offset, player, screen;
    e.preventDefault();
    if (e.type === 'touchmove') {
      move = e.originalEvent.changedTouches[0];
      offset = $('#screen').offset();
      curX = move.pageX - offset.left;
      curY = move.pageY - offset.top;
    } else {
      curX = e.offsetX;
      curY = e.offsetY;
    }
    player = this.level.player;
    screen = this.renderer.getScreen();
    if (this.status) {
      if ((screen.top + player.height / 2 < curY && curY < (screen.height - player.height / 2))) {
        player.top = curY - player.height / 2;
      } else {
        if (curY < screen.top + player.height / 2) {
          player.top = screen.top;
        } else {
          player.top = screen.height - player.height;
        }
      }
      if ((screen.left + player.width / 2 < curX && curX < (screen.left + screen.width - player.width / 2))) {
        return player.left = curX - player.width / 2;
      } else {
        if (curX > screen.width - player.width) {
          return player.left = screen.left + screen.width - player.width;
        } else {
          return player.left = screen.left;
        }
      }
    }
  };

  Mover.prototype.moveEnemies = function(enemies) {
    var en, enemy, j, k, len, len1, num, ref, ref1, results;
    ref = this.level.enemies;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      enemy = ref[j];
      if (enemy.left > this.screen.left + screen.width - enemy.width || enemy.left < this.screen.left) {
        enemy.dir.x *= -1;
      }
      if (enemy.top > this.screen.aTop + screen.height - enemy.height || enemy.top < this.screen.top) {
        enemy.dir.y *= -1;
      }
      ref1 = this.level.enemies;
      for (num = k = 0, len1 = ref1.length; k < len1; num = ++k) {
        en = ref1[num];
        if (en !== enemy) {
          if ((en.jc != null) !== num && this._detectCollision(en, enemy)) {
            en.dir.x *= -1;
            enemy.dir.x *= -1;
            en.dir.y *= -1;
            enemy.dir.y *= -1;
            en.jc = num;
          } else {
            en.jc = -1;
          }
        }
      }
      enemy.top += enemy.em.y * enemy.dir.y * this.time / this.level.speed;
      enemy.left += enemy.em.x * enemy.dir.x * this.time / this.level.speed;
      if (this._detectCollision(this.level.player, enemy)) {
        results.push(this.collided = true);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Mover.prototype._detectCollision = function(object1, object2) {
    var difX, difY;
    difX = object1.left - object2.left;
    difY = object1.top - object2.top;
    return (-object1.width < difX && difX < object2.width) && (-object1.height < difY && difY < object2.height);
  };

  return Mover;

})();


/*
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
 */

detectCollision = function(o1, o2, push) {
  var c1, c2, dd_x, dd_y, dir1_x, dir1_y, dir2_x, dir2_y, gap, ratio;
  if (push == null) {
    push = false;
  }
  if (o1.top + o1.height < o2.top || o2.top + o2.height < o1.top || o1.left + o1.width < o2.left || o2.left + o2.width < o1.left) {
    return false;
  }
  if ((o1.em != null) && (o2.em != null) && o1.em.m === 0 && o2.em.m === 0) {
    return false;
  }
  c1 = {
    x: o1.left + o1.width / 2,
    y: o1.top + o1.height / 2
  };
  c2 = {
    x: o2.left + o2.width / 2,
    y: o2.top + o2.height / 2
  };
  gap = {
    x: Math.abs(c1.x - c2.x),
    y: Math.abs(c1.y - c2.y)
  };
  gap.d = Math.sqrt(Math.pow(gap.x, 2) + Math.pow(gap.y, 2));
  if ((o1.radius != null) && (o2.radius != null)) {
    ratio = (o1.radius + o2.radius) / gap.d;
  } else {
    if (gap.x > gap.y) {
      ratio = ((o1.width + o2.width) / 2) / gap.x;
    } else {
      ratio = ((o1.height + o2.height) / 2) / gap.y;
    }
  }
  if (ratio > 1) {
    if (push) {
      dd_x = gap.x * ratio - gap.x;
      dd_y = gap.y * ratio - gap.y;
      dir1_x = c1.x > c2.x ? 1 : -1;
      dir1_y = c1.y > c2.y ? 1 : -1;
      dir2_x = c2.x > c1.x ? 1 : -1;
      dir2_y = c2.y > c1.y ? 1 : -1;
      o1.left += dd_x * dir1_x / 2;
      o1.top += dd_y * dir1_y / 2;
      o2.left += dd_x * dir2_x / 2;
      o2.top += dd_y * dir2_y / 2;
      c1 = {
        x: o1.left + o1.width / 2,
        y: o1.top + o1.height / 2
      };
      c2 = {
        x: o2.left + o2.width / 2,
        y: o2.top + o2.height / 2
      };
      collide(o1, o2, c1, c2);
    }
    return true;
  } else {
    return false;
  }
};

collide = function(o1, o2, c1, c2) {
  var P, V, cos, fi, pA1, pA2, pL1, pL2, sin, v1, v1f, v2, v2f;
  if (c1 == null) {
    c1 = null;
  }
  if (c2 == null) {
    c2 = null;
  }
  v1 = o1.em;
  v2 = o2.em;
  if (!((v1.m != null) || (v2.m != null))) {
    v1.x *= -1;
    v1.y *= -1;
    v2.x *= -1;
    v2.y *= -1;
  } else {
    if (!c1) {
      c1 = {
        x: o1.left + o1.width / 2,
        y: o1.top + o1.height / 2
      };
    }
    if (!c2) {
      c2 = {
        x: o2.left + o2.width / 2,
        y: o2.top + o2.height / 2
      };
    }
    fi = Math.atan2(c1.y - c2.y, c1.x - c2.x);
    cos = Math.cos(fi);
    sin = Math.sin(fi);
    pL1 = v1.x * cos + v1.y * sin;
    pL2 = v2.x * cos + v2.y * sin;
    pA1 = v1.y * cos - v1.x * sin;
    pA2 = v2.y * cos - v2.x * sin;
    P = v1.m * pL1 + v2.m * pL2;
    V = pL1 - pL2;
    v2f = (P + v1.m * V) / (v1.m + v2.m);
    v1f = v2f - pL1 + pL2;
    pL1 = v1f;
    pL2 = v2f;
    v1.x = pL1 * cos - pA1 * sin;
    v1.y = pA1 * cos + pL1 * sin;
    v2.x = pL2 * cos - pA2 * sin;
    v2.y = pA2 * cos + pL2 * sin;
    v1.i = v1.m * pythagoras(v1.x, v1.y);
    v2.i = v2.m * pythagoras(v2.x, v2.y);
  }
  return [v1, v2];
};

Render = (function() {
  function Render(debug) {
    var screen_offset;
    this.debug = debug;
    this.screen_container = $('#screen');
    screen_offset = $(this.screen_container).offset();
    this.screen = {
      width: 700,
      height: 700,
      top: screen_offset.top,
      left: screen_offset.left
    };
    this.bgr = this._createLayer();
    this.mobs = this._createLayer();
    this.projectiles = this._createLayer();
    this.player = this._createLayer('player');
    this.overlay = this._createLayer('overlay');
    this.dbg = this._createLayer('dbg');
    this.fps = this._createLayer('fps', 40, 40);
    this.resetFPS();
  }

  Render.prototype._createLayer = function(container_id, height, width) {
    var canvas, div;
    if (container_id == null) {
      container_id = null;
    }
    if (height == null) {
      height = null;
    }
    if (width == null) {
      width = null;
    }
    if (!width) {
      width = this.screen.width;
    }
    if (!height) {
      height = this.screen.height;
    }
    div = document.createElement('div');
    if (container_id) {
      div.setAttribute('id', container_id);
    }
    $(this.screen_container).append(div);
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    return div.appendChild(canvas).getContext('2d');
  };

  Render.prototype.draw = function(level) {
    var j, k, len, len1, object, projectile, ref, ref1, wf_objects;
    if (level.background != null) {
      this._drawBackground(level.background, level.time);
    }
    if (level.player != null) {
      this._drawPlayer(level.player);
    }
    if (level.enemies != null) {
      this._drawOverlay(level.enemies);
    }
    if (level.filter != null) {
      this._drawFilter(level.filter);
    }
    wf_objects = [];
    if (level.enemies != null) {
      ref = level.enemies;
      for (j = 0, len = ref.length; j < len; j++) {
        object = ref[j];
        wf_objects.push(object);
        if (object.projectiles != null) {
          ref1 = object.projectiles;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            projectile = ref1[k];
            wf_objects.push(projectile);
          }
        }
      }
    }
    if (level.player != null) {
      wf_objects.push(level.player);
    }
    this._drawWireframe(wf_objects);
    return this._showFPS();
  };

  Render.prototype.clear = function() {
    var context, j, len, ref, results;
    ref = [this.bgr, this.player, this.mobs, this.overlay, this.top, this.dbg, this.fps];
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      context = ref[j];
      if (context != null) {
        results.push(this._clearCanvas(context));
      }
    }
    return results;
  };

  Render.prototype._clearCanvas = function(context) {
    return context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  Render.prototype._drawBackground = function(bgr, time) {
    var origin_x, origin_y, scroll, zoom;
    this.bgr.fillStyle = bgr.color;
    this.bgr.fillRect(0, 0, this.bgr.width, this.bgr.height);
    if (bgr.image != null) {
      origin_x = 0;
      origin_y = 0;
      if (scroll = bgr.scroll) {
        if (scroll.x !== 0) {
          origin_x = scroll.x > 0 ? bgr.image.width - this.bgr.canvas.width - time / scroll.x : -(time / scroll.x);
        }
        if (scroll.y !== 0) {
          origin_y = scroll.y > 0 ? bgr.image.height - this.bgr.canvas.height - time / scroll.y : -(time / scroll.y);
        }
        return this.bgr.drawImage(bgr.image, origin_x, origin_y, this.bgr.canvas.width, this.bgr.canvas.height, 0, 0, this.bgr.canvas.width, this.bgr.canvas.height);
      } else {
        if (bgr.zoom !== 0) {
          if (bgr.ratio == null) {
            bgr.ratio = (bgr.image.width < bgr.image.height ? this.bgr.canvas.width / bgr.image.width : this.bgr.canvas.height / bgr.image.height) * Math.SQRT2;
          }
          this.bgr.save();
          zoom = bgr.zoom * (time + 1) / 1000 + bgr.ratio;
          this.bgr.translate(this.bgr.canvas.width / 2, this.bgr.canvas.height / 2);
          if (bgr.rotate !== 0) {
            this.bgr.rotate(bgr.rotate * time / 1000);
          }
          this.bgr.scale(zoom, zoom);
          this.bgr.drawImage(bgr.image, -bgr.image.width / 2, -bgr.image.height / 2);
          return this.bgr.restore();
        } else {
          return this.bgr.drawImage(bgr.image, 0, 0);
        }
      }
    }
  };

  Render.prototype._drawFilter = function(filter) {
    var ref;
    this._clearCanvas(this.overlay);
    if ((filter.duration * this._fps > (ref = this.frames % (filter.threshold * this._fps)) && ref > 1) || !filter.threshold) {
      this.overlay.fillStyle = filter.color;
      return this.overlay.fillRect(0, 0, this.overlay.canvas.width, this.overlay.canvas.height);
    }
  };

  Render.prototype._drawPlayer = function(player) {
    this._clearCanvas(this.player);
    return this._drawObject(player, this.player);
  };

  Render.prototype._drawOverlay = function(objects) {
    var j, len, object, projectile, results;
    this._clearCanvas(this.mobs);
    this._clearCanvas(this.projectiles);
    results = [];
    for (j = 0, len = objects.length; j < len; j++) {
      object = objects[j];
      this._drawObject(object, this.mobs);
      if (object.projectiles != null) {
        results.push((function() {
          var k, len1, ref, results1;
          ref = object.projectiles;
          results1 = [];
          for (k = 0, len1 = ref.length; k < len1; k++) {
            projectile = ref[k];
            results1.push(this._drawObject(projectile, this.projectiles));
          }
          return results1;
        }).call(this));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Render.prototype._drawObject = function(object, context) {
    var base, base1;
    if (object.width && object.height && !object.hide) {
      if (object.sprite != null) {
        if (object.cur_sprite == null) {
          object.cur_sprite = 0;
        }
        if ((base = object.sprite).width == null) {
          base.width = object.sprite.image.width;
        }
        if ((base1 = object.sprite).height == null) {
          base1.height = object.sprite.width;
        }
        if (++object.sprite.fsps === object.sprite.fpf) {
          object.sprite.fsps = 0;
          if (object.cur_sprite++ === object.sprite.frames - 1) {
            object.cur_sprite = 0;
          }
        }
        if (object.rotation != null) {
          if (object.rotation.angle == null) {
            object.rotation.angle = 0;
          }
          if (object.rotation.auto && !object.rotation.angle && (object.em != null)) {
            object.rotation.angle = -(Math.atan(object.em.x / object.em.y) * 180 / Math.PI) / 2;
          }
          context.save();
          context.translate(object.left + object.width / 2, object.top + object.height / 2);
          context.rotate(object.rotation.angle * Math.PI / 180);
          object.rotation.angle += object.rotation.speed;
          context.drawImage(object.sprite.image, 0, object.cur_sprite * object.sprite.height, object.sprite.width, object.sprite.height, -object.width / 2 + object.sprite.x, -object.height / 2 + object.sprite.y, object.sprite.width, object.sprite.height);
          return context.restore();
        } else {
          context.drawImage(object.sprite.image, 0, object.cur_sprite * object.sprite.height, object.sprite.width, object.sprite.height, object.left + object.sprite.x, object.top + object.sprite.y, object.sprite.width, object.sprite.height);
          return object.last = {
            top: object.top + object.sprite.y,
            left: object.left + object.sprite.x,
            width: object.sprite.image.width,
            height: object.sprite.image.height
          };
        }
      } else {
        context.fillStyle = object.color;
        if (object.radius != null) {
          context.save();
          context.translate(object.left + object.width / 2, object.top + object.height / 2);
          context.beginPath();
          context.arc(0, 0, object.radius, 0, Math.PI * 2);
          context.closePath();
          context.fill();
          context.restore();
        } else {
          context.fillRect(object.left, object.top, object.width, object.height);
        }
        return object.last = {
          top: object.top,
          left: object.left,
          width: object.width,
          height: object.height
        };
      }
    }
  };

  Render.prototype._drawWireframe = function(objects) {
    var hint, j, len, object, results, theta;
    this._clearCanvas(this.dbg);
    this.dbg.lineWidth = 2;
    results = [];
    for (j = 0, len = objects.length; j < len; j++) {
      object = objects[j];
      this.dbg.strokeStyle = object.color != null ? object.color : '#0f0';
      this.dbg.save();
      this.dbg.translate(object.left, object.top);
      if (object.radius != null) {
        this.dbg.beginPath();
        this.dbg.arc(object.width / 2, object.height / 2, object.radius, 0, Math.PI * 2);
        this.dbg.stroke();
      } else {
        this.dbg.strokeRect(0, 0, object.width, object.height);
      }
      if ((object.em != null) && (object.em.i != null)) {
        this.dbg.strokeStyle = '#0fc';
        this._drawLine([object.width / 2, object.height / 2], [object.width / 2 + object.em.x * object.em.m * 20, object.height / 2 + object.em.y * object.em.m * 20]);
        theta = Math.atan(object.em.x / object.em.y) * 180 / Math.PI;
        this.dbg.font = '14px Arial';
        this.dbg.fillStyle = '#ff0';
        hint = "θ = " + (theta.toFixed(2)) + "°";
        if (object.em.m) {
          hint += ' m = ' + object.em.m.toFixed(2) + ' p = ' + object.em.i.toFixed(3);
        }
        this.dbg.fillText(hint, object.width / 2, object.height / 2 - 20);
        this.dbg.fillStyle = '#f00';
        this.dbg.fillText('i = ' + pythagoras(object.em.x, object.em.y).toFixed(2), object.width / 2 + object.em.x * object.em.m * 20, object.height / 2 + object.em.y * object.em.m * 20);
      }
      results.push(this.dbg.restore());
    }
    return results;
  };

  Render.prototype._showFPS = function() {
    var now;
    this._clearCanvas(this.fps);
    now = new Date();
    this.time = now.getTime() - this.start_time;
    this.frames++;
    this._fps = this.frames / (this.time / 1000) >> 0;
    this.fps.font = '30px Arial';
    this.fps.textAlign = 'start';
    this.fps.fillStyle = '#ff0';
    this.fps.fillText(this._fps, 0, 30);
    return this._fps;
  };

  Render.prototype._drawPolygon = function() {
    var j, len, start, v, vertex;
    start = arguments[0], vertex = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    this.dbg.lineWidth = 2;
    this.dbg.strokeStyle = "#f00";
    this.dbg.beginPath();
    this.dbg.moveTo(start[0], start[1]);
    for (j = 0, len = vertex.length; j < len; j++) {
      v = vertex[j];
      this.dbg.lineTo(v[0], v[1]);
    }
    this.dbg.closePath();
    return this.dbg.stroke();
  };

  Render.prototype._drawLine = function(p1, p2) {
    this.dbg.lineWidth = 1;
    this.dbg.beginPath();
    this.dbg.moveTo(p1[0], p1[1]);
    this.dbg.lineTo(p2[0], p2[1]);
    return this.dbg.stroke();
  };

  Render.prototype.getScreen = function() {
    return this.screen;
  };

  Render.prototype.resetFPS = function() {
    var now;
    now = new Date();
    this.start_time = now.getTime();
    this.time = 0;
    this.frames = 0;
    return this._fps = 0;
  };

  Render.prototype.checkCollision = function(rect, type, tolerance) {
    var contact, data1, data2, i, j, ref, second_layer, x, y;
    if (tolerance == null) {
      tolerance = 10;
    }
    if (rect.left >= 0 && rect.top >= 0 && rect.width && rect.height) {
      second_layer = type === 0 ? this.mobs : this.projectiles;
      data1 = this.player.getImageData(rect.left, rect.top, rect.width, rect.height);
      data2 = second_layer.getImageData(rect.left, rect.top, rect.width, rect.height);
      contact = 0;
      for (i = j = 3, ref = data1.data.length; j < ref; i = j += 4) {
        if (data1.data[i] !== 0 && data2.data[i] !== 0) {
          x = i % rect.width;
          y = Math.floor(i / rect.height);
          if (++contact >= tolerance) {
            return {
              x: x,
              y: y
            };
          }
        }
      }
      return false;
    }
  };

  Render.prototype.animate = function(o, step) {
    this._clearCanvas(this.player);
    return this.player.drawImage(o.sprite.image, 0, 0, o.sprite.width - step, o.sprite.height, o.left + o.sprite.x, o.top + o.sprite.y, o.sprite.width - step, o.sprite.height);
  };

  Render.prototype.animation = function(x, y, animation, step, player) {
    var top;
    if (player == null) {
      player = null;
    }
    top = animation.height * Math.floor(step / animation.fpf);
    this.player.clearRect(0, 0, this.player.canvas.width, this.player.canvas.height);
    if (player != null) {
      this._drawObject(player, this.player);
    }
    return this.player.drawImage(animation.image, 0, top, animation.width, animation.height, x, y, animation.width, animation.height);
  };

  return Render;

})();

Resource = (function() {
  function Resource(folders, ready, progress1) {
    this.folders = folders;
    this.ready = ready != null ? ready : null;
    this.progress = progress1 != null ? progress1 : null;
    this._setFileSize = bind(this._setFileSize, this);
    this._onError = bind(this._onError, this);
    this._onLoad = bind(this._onLoad, this);
    this.files = [];
  }

  Resource.prototype.startQueue = function() {
    this.queued_size = 0;
    this.loaded_size = 0;
    this.files_queued = 0;
    this.files_loaded = 0;
    this.errors = 0;
    return this.queue_closed = false;
  };

  Resource.prototype.closeQueue = function() {
    this.queue_closed = true;
    return this._isReady();
  };

  Resource.prototype.getResource = function(name, type) {
    var file, src;
    src = window.location.protocol + '//' + window.location.host + '/' + this.folders.base + '/' + this.folders[type] + '/' + name;
    this.files_queued++;
    if (file = this._findFile(src)) {
      this.files_loaded++;
      this.queued_size += file.size;
      this.loaded_size += file.size;
    } else {
      file = {
        name: name,
        type: type,
        image: null,
        loaded: false,
        size: null,
        error: false
      };
      file.image = new Image;
      file.image.src = src;
      file.image.onload = this._onLoad;
      file.image.onerror = this._onError;
      this._requestFileSize(src);
      this.files.push(file);
    }
    return file;
  };

  Resource.prototype.getFilesCount = function() {
    return {
      total: this.files.length,
      loaded: this.files_loaded
    };
  };

  Resource.prototype._onLoad = function(e) {
    var file, progress;
    file = this._findFile(e.currentTarget.src);
    file.loaded = true;
    this.loaded_size += file.size;
    this.files_loaded++;
    if (this.queue_closed && isFunction(this.progress)) {
      progress = 100 - ((this.queued_size - this.loaded_size) / this.queued_size * 100) >> 0;
      this.progress(progress);
    }
    return this._isReady();
  };

  Resource.prototype._loaded = function() {};

  Resource.prototype._isReady = function() {
    if (this.queue_closed && this.files_queued === this.files_loaded && isFunction(this.ready)) {
      return this.ready();
    }
  };

  Resource.prototype._onError = function(e) {
    var file;
    file = this._findFile(e.currentTarget.src);
    file.error = true;
    return this.errors++;
  };

  Resource.prototype._findFile = function(src) {
    var file, j, len, ref;
    ref = this.files;
    for (j = 0, len = ref.length; j < len; j++) {
      file = ref[j];
      if (file.image && file.image.src === src) {
        return file;
      }
    }
  };

  Resource.prototype._setFileSize = function(src, size) {
    var file;
    if (file = this._findFile(src)) {
      file.size = size;
      return this.queued_size += size;
    }
  };

  Resource.prototype._requestFileSize = function(src) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open('HEAD', src, true);
    xhr.onreadystatechange = (function(_this) {
      return function() {
        var size;
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            size = parseInt(xhr.getResponseHeader('Content-Length'));
          } else {
            size = 1;
          }
          return _this._setFileSize(src, size);
        }
      };
    })(this);
    return xhr.send();
  };

  return Resource;

})();

main = {
  click: {
    en: 'Click to start',
    ru: 'Кликни, чтобы начать'
  },
  "continue": {
    en: 'Click to continue',
    ru: 'Кликни, чтобы продолжить'
  },
  copyright: {
    en: "All rights reserved",
    ru: "Все права защищены"
  },
  loading: {
    en: "Loading",
    ru: "Загрузка"
  },
  error: {
    en: "Catastrophe",
    ru: "Беда"
  },
  connectionIssue: {
    en: "Server\nconnection\nfailed",
    ru: "Невозможно\nсоединиться\nс сервером"
  },
  difficulty: {
    en: "Difficulty",
    ru: "Уровень сложности"
  },
  easy: {
    en: "Noob",
    ru: "Лайтово"
  },
  normal: {
    en: "Normal",
    ru: "Норм"
  },
  hardcore: {
    en: "Hardcore",
    ru: "Хардкор"
  },
  insane: {
    en: "Insane",
    ru: "Безумие"
  }
};

//# sourceMappingURL=maps/app.js.map
