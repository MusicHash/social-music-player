'use strict';


/**
 *
 */
window.Player = function(settings) {
    this.init(settings);
};


window.Player.prototype = {
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
      this.playerProperties = settings.playerProperties || {};
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

        this._subscribePlayerEvents()
          ._appendSongsList()
          ._simpleButtonsBind()
          ._modifierButtonsBind()
          ._getterButtonsBind()
          ._consoleButtonsBind();

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
    isChecked: function(selector) {
      return this.el.find(selector).is(':checked');
    },


    /**
     *
     */
    _subscribePlayerEvents: function() {
        var player = this.getPlayer(),
            self = this;

        player.on(this.player.EVENT.PLAYER_INITIALIZED, function() {
          self.log('PLAYER_INITIALIZED: Player ready');

          setTimeout(function() {
            player.play(self.songsList.VINAI_Anjulie_in_fire);
          }, 1500);

        });

        player.on(this.player.EVENT.PLAY, function() {
          if (!self.isChecked('.event-buttons input.play')) return;

          self.log('PLAY');
        });

        player.on(this.player.EVENT.PAUSE, function() {
          if (!self.isChecked('.event-buttons input.pause')) return;

          self.log('PAUSE');
        });

        player.on(this.player.EVENT.MUTE, function() {
          if (!self.isChecked('.event-buttons input.mute')) return;

          self.log('MUTE');
        });

        player.on(this.player.EVENT.UNMUTE, function() {
          if (!self.isChecked('.event-buttons input.unmute')) return;

          self.log('UNMUTE');
        });

        player.on(this.player.EVENT.VOLUME, function() {
          if (!self.isChecked('.event-buttons input.volume')) return;

          self.log('VOLUME ' + JSON.stringify(arguments[0]));
        });

        player.on(this.player.EVENT.SEEK_TO_SECOND, function() {
          if (!self.isChecked('.event-buttons input.seek-second')) return;

          self.log('SEEK_TO_SECOND: ' + JSON.stringify(arguments[0]));
        });

        player.on(this.player.EVENT.SEEK_TO_PERCENT, function() {
          if (!self.isChecked('.event-buttons input.seek-percent')) return;

          self.log('SEEK_TO_PERCENT: ' + JSON.stringify(arguments[0]));
        });

        player.on(this.player.EVENT.STATE_CHANGED, function() {
          if (!self.isChecked('.event-buttons input.state-changed')) return;

          self.log('STATE_CHANGED: ' + JSON.stringify(arguments[0]));
        });

        player.on(this.player.EVENT.PLAY_PROGRESS, function() {
          if (!self.isChecked('.event-buttons input.play-progress')) return;

          self.log('PLAY_PROGRESS: ' + JSON.stringify(arguments[0]));
        });

        player.on(this.player.EVENT.NEW_SONG_PLAYING, function() {
          if (!self.isChecked('.event-buttons input.new-song-playing')) return;

          self.log('NEW_SONG_PLAYING: ' + JSON.stringify(arguments[0]));
        });

        player.on(this.player.EVENT.FULLSCREEN_OPEN, function() {
          if (!self.isChecked('.event-buttons input.fullscreen')) return;

          self.log('FULLSCREEN_OPEN');
        });

        player.on(this.player.EVENT.FULLSCREEN_CLOSE, function() {
          if (!self.isChecked('.event-buttons input.fullscreen-close')) return;

          self.log('FULLSCREEN CLOSE');
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

        this.el.find('.modifier-buttons .fullscreen').on('click', function() {
          player.fullscreenOpen();
        });

        this.el.find('.modifier-buttons .fullscreen-close').on('click', function() {
          player.fullscreenClose();
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
        var player = this.getPlayer(),
            self = this;

        this.el.find('.getter-buttons .current-second').on('click', function() {
          player.getCurrentSecond().then(function(currentSecond) {
            self.log('Current Second: '+ currentSecond);
          });
        });

        this.el.find('.getter-buttons .duration').on('click', function() {
          player.getDuration().then(function(duration) {
            self.log('Duration: '+ duration);
          });
        });

        this.el.find('.getter-buttons .volume').on('click', function() {
          player.getVolume().then(function(volume) {
            self.log('Volume: '+ volume);
          });
        });

        this.el.find('.getter-buttons .is-playing').on('click', function() {
          player.isPlaying().then(function(isPlaying) {
            self.log('isPlaying: '+ isPlaying);
          });
        });

        this.el.find('.getter-buttons .url').on('click', function() {
          player.getURL().then(function(url) {
            self.log('URL: '+ url);
          });
        });

        this.el.find('.getter-buttons .video-width').on('click', function() {
          player.getVideoWidth().then(function(videoWidth) {
            self.log('Video Width: '+ videoWidth);
          });
        });

        this.el.find('.getter-buttons .video-height').on('click', function() {
          player.getVideoHeight().then(function(videoHeight) {
            self.log('Video Height: '+ videoHeight);
          });
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

      this.player = window.SocialMusicPlayer.create(Object.assign({
        elID: this.getPlayerID(),
        width: '100%',
        height: '100%'
      }, this.playerProperties));

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
                      <dd><button class="fullscreen">Fullscreen</button></dd>
                      <dd><button class="fullscreen-close">Fullscreen Close</button></dd>
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
                      <dd><button class="url">URL</button></dd>
                      <dd><button class="video-width">Video Width</button></dd>
                      <dd><button class="video-height">Video Height</button></dd>
                    </dl>

                    <dl class="event-buttons">
                      <dt>
                        Event Listeners
                      </dt>

                      <dd><label><input class="new-song-playing" type="checkbox" checked="checked" /> newSongPlaying</label></dd>
                      <dd><label><input class="play-progress" type="checkbox" checked="checked" /> playProgress</label></dd>
                      <dd><label><input class="play" type="checkbox" checked="checked" /> play</label></dd>
                      <dd><label><input class="pause" type="checkbox" checked="checked" /> pause</label></dd>
                      <dd><label><input class="finish" type="checkbox" checked="checked" /> finish</label></dd>
                      <dd><label><input class="state-changed" type="checkbox" checked="checked" /> stateChanged</label></dd>
                      <dd><label><input class="seek-second" type="checkbox" checked="checked" /> seekSecond</label></dd>
                      <dd><label><input class="seek-percent" type="checkbox" checked="checked" /> seekPercent</label></dd>
                      <dd><label><input class="mute" type="checkbox" checked="checked" /> mute</label></dd>
                      <dd><label><input class="unmute" type="checkbox" checked="checked" /> unmute</label></dd>
                      <dd><label><input class="volume" type="checkbox" checked="checked" /> volume</label></dd>
                      <dd><label><input class="fullscreen" type="checkbox" checked="checked" /> fullscreen</label></dd>
                      <dd><label><input class="fullscreen-close" type="checkbox" checked="checked" /> fullscreen close</label></dd>
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