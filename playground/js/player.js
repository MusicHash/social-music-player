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
    el: null,



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
        let playerEl = _.template(this._getPlayerTemplate());

        this.el = $(playerEl({
            playerIndex: this.playerIndex,
            elID: this.getPlayerID().substr(1)
          }));

        this._subscribePlayerEvents();
        this._appendSongsList();
        this._simpleButtonsBind();
        this._modifierButtonsBind();
        this._getterButtonsBind();
        this._consoleButtonsBind();

        this.log('Rendering PlayerID: '+ this.playerIndex);

        return this.el;
    },


    /**
     *
     */
    log: function(message) {
      let output = this.el.find('.console .output');

      output.html(message + '\n' + output.html());

      return this;
    },


    /**
     *
     */
    clearLog: function() {
      let output = this.el.find('.console .output');

      output.html('');

      return this;
    },


    /**
     *
     */
    _subscribePlayerEvents: function() {
        var player = this.getPlayer(),
            self = this;

        player.on(this.player.EVENT.PLAYER_INITIALIZED, function() {
          self.log('PLAYER_INITIALIZED');
        });

        player.on(this.player.EVENT.PLAY, function() {
          self.log('PLAY');
        });

        player.on(this.player.EVENT.PAUSE, function() {
          self.log('PAUSE');
        });

        player.on(this.player.EVENT.VOLUME, function() {
          self.log('VOLUME');
        });

        player.on(this.player.EVENT.MUTE, function() {
          self.log('MUTE');
        });

        player.on(this.player.EVENT.UNMUTE, function() {
          self.log('UNMUTE');
        });

        player.on(this.player.EVENT.SEEK_TO_SECOND, function() {
          self.log('SEEK_TO_SECOND');
        });

        player.on(this.player.EVENT.STATE_CHANGED, function() {
          self.log('STATE_CHANGED');
        });

        player.on(this.player.EVENT.ON_PROGRESS, function() {
          self.log('ON_PROGRESS');
        });

        player.on(this.player.EVENT.NEW_SONG_PLAYING, function() {
          self.log('NEW_SONG_PLAYING');
        });

        return this;
    },


    /**
     *
     */
    _simpleButtonsBind: function() {
        var player = this.getPlayer();

        this.el.find('.simple-buttons .play').on('click', function() {
          player.play();
        });

        this.el.find('.simple-buttons .pause').on('click', function() {
          player.pause();
        });

        return this;
    },


    /**
     *
     */
    _modifierButtonsBind: function() {
        var player = this.getPlayer();

        this.el.find('.modifier-buttons .seek').on('click', function() {
          var seconds = this.querySelector('input').value;
          player.seek(seconds);
        });

        this.el.find('.modifier-buttons .volume').on('click', function() {
          var volume = this.querySelector('input').value;
          player.setVolume(volume);
        });

        this.el.find('.modifier-buttons .mute').on('click', function() {
          player.mute();
        });

        this.el.find('.modifier-buttons .unmute').on('click', function() {
          player.unmute();
        });

        this.el.find('.modifier-buttons .url').on('click', function() {
          var url = this.querySelector('input').value;
          player.play(url);
        });

        return this;
    },


    /**
     *
     */
    _getterButtonsBind: function() {
        var player = this.getPlayer();

        this.el.find('.getter-buttons .current-second').on('click', function() {
          console.log('Current Second');
        });

        this.el.find('.getter-buttons .duration').on('click', function() {
          console.log('Duration');
        });

        this.el.find('.getter-buttons .volume').on('click', function() {
          console.log('Volume');
        });

        this.el.find('.getter-buttons .is-playing').on('click', function() {
          console.log('isPlaying');
        });

        this.el.find('.getter-buttons .is-paused').on('click', function() {
          console.log('isPaused');
        });

        this.el.find('.getter-buttons .url').on('click', function() {
          console.log('URL');
        });

        this.el.find('.getter-buttons .video-width').on('click', function() {
          console.log('Video Width');
        });

        this.el.find('.getter-buttons .video-height').on('click', function() {
          console.log('Video Height');
        });

        return this;
    },


    /**
     *
     */
    _consoleButtonsBind: function() {
        var self = this;

        this.el.find('.console .clear').on('click', function() {
          self.clearLog();
        });

        return this;
    },


    /**
     *
     */
    _appendSongsList: function() {
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

        this.el.find('ul.songs-list').append(songHTML);
      }

      return this;
    },


    /**
     *
     */
    getPlayer: function() {
      if (null !== this.player) {
        return this.player;
      }

      this.player = window.SocialMusicPlayer.create({
        elID: this.getPlayerID(),
        width: '100%',
        height: '100%'
      });

      return this.player;
    },


    getPlayerID: function() {
      return this.playerSelector + this.playerIndex;
    },


    /**
     *
     */
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

                      <dd><button class="seek">Seek <input type="text" size="3" maxlength="3" value="60" /></button></dd>
                      <dd><button class="volume">Volume <input type="text" size="3" maxlength="3" value="0.8" /></button></dd>
                      <dd><button class="mute">Mute</button></dd>
                      <dd><button class="unmute">Unmute</button></dd>
                      <dd><button class="url">Vimeo <input type="text" size="30" maxlength="80" value="https://vimeo.com/126864213" /></button></dd>
                      <dd><button class="url">Youtube <input type="text" size="50" maxlength="80" value="https://www.youtube.com/watch?v=w319Ew1quF0" /></button></dd>
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