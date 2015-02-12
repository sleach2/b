window.onload = function() {
    "use strict";

    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.spritesheet('cat1','assets/cat1.png', 74, 50);
        game.load.image('ground', 'assets/platform.png');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('box', 'assets/box.png');
    }
    
    var platforms;
    var player;
    var move;

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,'sky');
        gamme.add.sprite(Math.floor(Math.random()*game.world.width)+1,Math.floor(Math.random()*game.world.height)+1,'box');
        platforms = game.add.group(); 
        platforms.enableBody = true; 
        var ground = platforms.create(0, game.world.height - 64, 'ground'); 
        ground.scale.setTo(2, 2); 
        ground.body.immovable = true; 
        player = game.add.sprite(32, game.world.height - 150, 'cat1');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left',[0,1],10,true);
        player.animations.add('right',[3,4],10,true);
        move = game.input.keyboard.createCursorKeys();
        //player.body.setSize(20, 32, 5, 16);
    }
    
    function update() {
        game.physics.arcade.collide(player, platforms);
        player.body.velocity.x = 0;
        if (move.left.isDown){ 
             player.body.velocity.x = -250; 
             player.animations.play('left'); 
        }else if (move.right.isDown){ 
             player.body.velocity.x = 250; 
             player.animations.play('right'); 
         }else{ 
             player.animations.stop(); 
             player.frame = 2; 
         } 
         if (move.up.isDown && player.body.touching.down){ 
            player.body.velocity.y = -350; 
        } 

    }
};
