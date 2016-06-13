'use strict';


/**
 *
 */
var Player = function(settings) {
    this.init(settings);
};


Player.prototype = {
    player: null,
    playerIndex: null,
    playerSelector: '#social-music-player',
    songsList: [],


    /**
     *
     */
    init: function(settings) {
      this.playerIndex = settings.playerIndex || null;
      this.songsList = settings.songsList || [];
    },


    /**
     *
     */
    render: function() {
        var playerEl = _.template($(this._getPlayerTemplate()).html());

        var el = $(playerEl({
            playerIndex: this.playerIndex,
            elID: this.getPlayerID().substr(1)
          }));

        el = this._appendSongsList(el);
        //el = this._bindEvents(el);

        return el;
    },


    _appendSongsList: function(el) {
      var songBitTpl = _.template('<li><a href="javascript:;" data-song="<%- songID %>"><%- title %></a></li>'),
          player = this.getPlayer();

      for (var songIdx in this.songsList) {
        var songHTML = $(songBitTpl({
          songID: this.songsList[songIdx].id,
          title: this.songsList[songIdx].title
        }));

        songHTML.find('a').on('click', function(songModel) {
          return function() {
            var songID = $(this).data('song');
            player.play(songModel);
          }
        }(this.songsList[songIdx]));

        el.find('ul.songs-list').append(songHTML);
      }

      return el;
    },



    _bindEvents: function(el) {
      var self = this;

      return el;
    },


    getPlayer: function() {
      this.player = this.player || window.SocialMusicPlayer.create({
        elID: this.getPlayerID(),
        width: '100%',
        height: '100%'
      });

      return this.player;
    },


    getPlayerID: function() {
      return this.playerSelector + this.playerIndex;
    },


    _getPlayerTemplate: function () {
        return `
            <div>
              <div class="container">
                  <div>
                    <h2>SMP Player #<%- playerIndex %></h2>

                    <div id="<%- elID %>"></div>

                    <dl class="songs">
                      <dt>
                        Demo songs list
                        <span>(Those can be played one by one from each supported provider)</span>
                      </dt>
                      <dd>
                        <ul class="songs-list"></ul>
                      </dd>
                    </dl>

                    <dl class="console">
                      <dt>Console</dt>
                      <dd>
                        <textarea class="output" readonly="readonly"></textarea>
                        <button class="clear">Clear</button>
                      </dd>
                    </dl>
                  </div>
              </div>
            </div>
        `;
    }


};