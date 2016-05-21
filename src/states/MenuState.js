/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import MyButton from 'objects/Button';

class MenuState extends Phaser.State {
    create() {
        this.game.add.tileSprite(0, 0, 800, 600, 'background-menu');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        this.game.add.text(50, 25, 'Obecnie podłączeni gracze: 0', { font: "32px Arial", fill: "#ffffff" });
        let startButton = new MyButton(this.game, center.x, center.y, 'startBtn-menu', startOnClick, this);
        startButton.addText('Rozpocznij grę', 24);

        this.players = [];
        this.game.input.gamepad.start();
        
        let pads = this.game.input.gamepad.padsConnected;
        
        console.log("connected pads: " + pads);
        if (pads > 0) {
            for (let i = 0; i < pads; ++i) {
                this.addPlayer(i);
            }
        }
                
        this.game.input.gamepad.callbackContext = this;
        this.game.input.gamepad.onConnectCallback = this.addPlayer;
    }

	addPlayer (id) {
		let c = this.players.length;
		let pData = MapConsts.StartingPositions[c];
		let pPad = this.game.input.gamepad['pad' + id];
		let p = new Player(this.game, pData.color, pPad, pData.x, pData.y);
		this.players.push(p);
	}
}

function startOnClick() {
    console.log('DUPA1');
    this.game.state.start('GameState');
}

export default MenuState;
