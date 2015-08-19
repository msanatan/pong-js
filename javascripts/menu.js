var Menu;

Menu = function(title, items, x, y, width, height, callback) {
  'use strict';
  this.title = title;
  this.items = items;
  this.selectedItem = 0;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.textSize = 50;
  this.callback = callback;
};

Menu.prototype.render = function(context) {
  'use strict';
  var i, textMeasure, itemY;
  itemY = 50;
  // Background
  context.fillStyle = '#000000';
  context.fillRect(0, 0, this.width, this.height);

  // Draw title
  context.font = 'bold 65px Monaco, Courier New, monospace';
  context.fillStyle = '#FFFFFF';
  textMeasure = context.measureText(this.title);
  context.fillText(this.title, (this.width / 2) - (textMeasure.width / 2), 100);

  // Draw items
  for (i = 0; i < this.items.length; i++) {
    if (i === this.selectedItem) {
      context.font = 'bold 55px Monaco, Courier New, monospace';
    context.fillStyle = '#FFCC33';
    } else {
      context.font = 'bold 45px Monaco, Courier New, monospace';
    context.fillStyle = '#FFFFFF';
    }
    textMeasure = context.measureText(this.items[i]);
    context.fillText(this.items[i], (this.width / 2) -
                     (textMeasure.width / 2), 200 + itemY);
    itemY += 100;
  }
};

Menu.prototype.update = function(inputHandler) {
  var game;
  if (inputHandler.pressed) {
    if (inputHandler.keysDown[inputHandler.KEY.UP] || inputHandler.keysDown[inputHandler.KEY.W]) {
      if (this.selectedItem > 0) {
        this.selectedItem -= 1;
      }
  } else if (inputHandler.keysDown[inputHandler.KEY.DOWN] || inputHandler.keysDown[inputHandler.KEY.S]) {
      if (this.selectedItem < this.items.length - 1) {
        this.selectedItem += 1;
      }
    } else if (this.selectedItem === 0 && inputHandler.keysDown[inputHandler.KEY.RTN]) {
      game = {
        width: this.width,
        height: this.height,
        baseSpeed: 5,
        twoPlayer: false,
        players : {}
      };
      this.callback(new Game(game));
    }
  }
};
