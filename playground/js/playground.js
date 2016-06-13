'use strict';


/**
 *
 */
var Playground = function() {
    this.init();
};


Playground.prototype = {
    idx: 0,
    appendTo: '.players_container',


    /**
     *
     */
    init: function() {},

    /**
     *
     */
    addPlayer: function() {
      var player = new Player({
        playerIndex: this.idx,
        songsList: window.songsList
      });

      $(this.appendTo).append(player.render());
      player.getPlayer().render();

    },


    /**
     *
     */
    render: function() {
        this.bumpIndex();


    },


    bumpIndex() {
        this.idx++;

        return this;
    }
};