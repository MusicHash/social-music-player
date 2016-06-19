'use strict';


/**
 *
 */
window.Playground = function() {
    this.init();
};


window.Playground.prototype = {
    idx: 1,
    appendTo: '.players_container',


    /**
     *
     */
    init: function() {},

    /**
     *
     */
    addPlayer: function(playerProperties) {
      playerProperties = playerProperties || {};

      var player = new window.Player({
        playerIndex: this.idx,
        songsList: window.songsList,
        playerProperties: playerProperties
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