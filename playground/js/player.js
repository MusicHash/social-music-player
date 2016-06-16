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
      this.playerIndex = settings.playerIndex || 0;
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
        el = this._simpleButtonsBind(el);
        el = this._modifierButtonsBind(el);

        return el;
    },


    _simpleButtonsBind: function(el) {
        var player = this.getPlayer();

        el.find('.simple-buttons .play').on('click', function() {
          player.play();
        });

        el.find('.simple-buttons .pause').on('click', function() {
          player.pause();
        });

        return el;
    },


    _modifierButtonsBind: function(el) {
        var player = this.getPlayer();

        el.find('.modifier-buttons .seek').on('click', function() {
          var seconds = this.querySelector('input').value;
          player.seek(seconds);
        });

        return el;
    },


    _appendSongsList: function(el) {
      var songBitTpl = _.template('<li><a href="javascript:;"><%- title %></a></li>'),
          player = this.getPlayer();

      for (var songIdx in this.songsList) {
        var songHTML = $(songBitTpl({
          title: this.songsList[songIdx].title
        }));

        songHTML.find('a').on('click', function(songModel) {
          return function() {
            player.play(songModel);
          }
        }(this.songsList[songIdx]));

        el.find('ul.songs-list').append(songHTML);
      }

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

                    <dl class="simple-buttons">
                      <dt>
                        Simple Controls
                        <span>(Buttons will call API functions on SMP)</span>
                      </dt>

                      <dd>
                        <button class="play">Play</button>
                        <button class="pause">Pause</button>
                      </dd>
                    </dl>

                    <dl class="modifier-buttons">
                      <dt>
                        Modifier Controls
                        <span>(buttons to interact with the player during runtime)</span>
                      </dt>

                      <dd>
                        <button class="seek">Seek <input type="text" size="3" maxlength="3" value="60" /></button>
                        <button class="volume">Volume <input type="text" size="3" maxlength="3" value="0.8" /></button>
                        <button class="url">Load URL <input type="text" size="50" maxlength="150" value="https://www.youtube.com/watch?v=w319Ew1quF0" /></button>
                      </dd>
                    </dl>

                    <dl class="getter-buttons">
                      <dt>
                        Getters
                        <span>(getters for the values of diffrent player states)</span>
                      </dt>

                      <dd><button class="current-second">Current Second</button></dd>
                      <dd><button class="duration">Duration</button></dd>
                      <dd><button class="volume">Volume</button></dd>
                      <dd><button class="is-playing">isPlaying</button></dd>
                      <dd><button class="is-paused">isPaused</button></dd>
                      <dd><button class="url">URL</button></dd>
                      <dd><button class="video-width">Video Width</button></dd>
                      <dd><button class="video-height">Video Height</button></dd>
                    </dl>

                    <dl class="event-buttons">
                      <dt>
                        Event Listeners
                      </dt>

                      <dd><label><input class="load-progress" type="checkbox" checked="checked" /> loadProgress</label></dd>
                      <dd><label><input class="play-progress" type="checkbox" checked="checked" /> playProgress</label></dd>
                      <dd><label><input class="play" type="checkbox" checked="checked" /> play</label></dd>
                      <dd><label><input class="pause" type="checkbox" checked="checked" /> pause</label></dd>
                      <dd><label><input class="finish" type="checkbox" checked="checked" /> finish</label></dd>
                      <dd><label><input class="seek" type="checkbox" checked="checked" /> seek</label></dd>


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