(function() {
  'use strict';
  var canvas = document.getElementById('game');
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  var ctx = canvas.getContext('2d');
  var FPS = 1000 / 60;

  var animate = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, FPS)
      };

  // Define game objects, i.e paddle and ball
  var Paddle = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
  };

  Paddle.prototype.render = function() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  var Player = function() {
    var playerHeight = 100;
    this.paddle = new Paddle(10, HEIGHT / 2 - (playerHeight / 2), 10, playerHeight);
  };

  Player.prototype.render = function() {
    this.paddle.render();
  };

  var Computer = function() {
    var playerWidth = 10;
    var playerHeight = 100;
    this.paddle = new Paddle(WIDTH - 10 - playerWidth, HEIGHT / 2 - (playerHeight / 2), playerWidth, playerHeight);
  };

  Computer.prototype.render = function() {
    this.paddle.render();
  };

  var Ball = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = 3;
    this.ySpeed = 0;
  };

  Ball.prototype.render = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = "skyblue";
    ctx.fill();
  }

  // Game logic begins here
  var player = new Player();
  var computer = new Computer();
  var ball = new Ball(WIDTH / 2, HEIGHT / 2, 10);

  var clear = function() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  };

  var update = function() {

  };

  var render = function () {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Draw separating line
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    player.render();
    computer.render();
    ball.render();
  };

  var step = function() {
    update();
    render();
    animate(step);
  }

  animate(step);
})();
