import Plyr from 'plyr';

const instances = {};

class Player {
  constructor(element, id) {
    this.element = element;
    this.id = id;

    this.init();
  }

  init() {
    instances[this.id] = new Plyr(this.element, {
      controls: ['play-large', 'play', 'mute', 'volume', 'fullscreen'],
    });
  }

  static initAll() {
    const elements = document.querySelectorAll('[data-player]');

    if (elements.length) {
      elements.forEach((element) => {
        const id = element.dataset.player;
        return new Player(element, id);
      });
    }
  }

  static getInstance(id) {
    return id ? instances[id] : instances;
  }
}

Player.initAll();

window.Player = Player;
