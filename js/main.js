window.onload = function() {
    "use strict";

    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.spritesheet('cat','assets/cat1.png', 35, 50);
        game.load.image('ground', 'assets/platform.png');
        game.load.image('sky', 'assets/sky.png');
    }
    
    var platforms;
    var player;

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,'sky');
        platforms = game.add.group(); 
        platforms.enableBody = true; 
        var ground = platforms.create(0, game.world.height - 64, 'ground'); 
        ground.scale.setTo(2, 2); 
        ground.body.immovable = true; 
        player = game.add.sprite(32, game.world.height - 150, 'cat');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.body.setSize(20, 32, 5, 16);
    }
    
    function update() {
        game.physics.arcade.collide(player, platforms);
    }
};
