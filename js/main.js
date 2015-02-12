window.onload = function() {
    "use strict";

    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.spritesheet('cat1','assets/cat1.png', 74, 50);
        game.load.image('ground', 'assets/platform.png');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('box', 'assets/box.png');
        game.load.image('dude', 'assets/dude.png');
    }
    
    var platforms;
    var player;
    var move;
    var box;
    var bkd;
    var dude;

    function create() {
        //game.world.setBounds(-1000,-1000,2000,2000);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //bkd = game.add.tileSprite(0,0,800,600,'sky');
        //bkd.fixedToCamera=true;
        game.add.sprite(0,0,'sky');
        box = game.add.sprite(game.rnd.integerInRange(0,game.world.width),game.rnd.integerInRange(0,game.world.height-150),'box');
        game.physics.enable(box, Phaser.Physics.ARCADE);
        box.body.gravity.y=300;
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
        game.camera.follow(player);
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(100, 150, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(50, 50, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-130, 250, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(700, 50, 'ground');
        ledge.body.immovable = true;
        dude=game.add.sprite(game.rnd.integerInRange(0,game.world.width),game.rnd.integerInRange(0,game.world.height-150),'dude');
    }
    
    function update() {
        balls.forEach(game.physics.arcade.moveToPlayer, game.physics.arcade, false, 200);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(box, platforms);
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
        if(game.physics.arcade.collide(player,box)){
            game.add.text(160, 150, 'You Win!', { fontSize: '64px', fill: '#000' });
            box.body.velocity.x=0;
        }
    }
};
