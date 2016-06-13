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


    /**
     *
     */
    init: function(settings) {
      this.playerIndex = settings.playerIndex;
    },


    /**
     *
     */
    render: function() {
        var playerEl = _.template($(this._getPlayerTemplate()).html());

        return this._bindEvents(playerEl({
          playerIndex: this.playerIndex,
          elID: this.getPlayerID().substr(1)
        }));
    },


    _bindEvents: function(el) {
      var html = $(el),
          self = this;

      // play songs list
      html.find('ul li a').on('click', function() {
        var songID = $(this).data('song');

        if ('undefined' === typeof(window.songsList[songID])) {
          console.log(['SongID was not found.', songID]);
          return;
        }

        self.getPlayer().play(window.songsList[songID]);
      });

      return html;
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
                        <ul>
                          <li><a href="javascript:;" data-song="alan_walker_faded">[PLAY YOUTUBE] Alan Walker - Faded</a></li>
                          <li><a href="javascript:;" data-song="calvin_harris_sweet_nothing">[PLAY VIMEO] Calvin Harris feat Florence Welch "Sweet Nothing"</a></li>
                          <li><a href="javascript:;" data-song="scott_isbell_tonight">[PLAY SOUNDCLOUD] Scott Isbell - Tonight Feat Adessi</a></li>
                        </ul>
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