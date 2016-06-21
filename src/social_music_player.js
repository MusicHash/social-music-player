import API from './core/api';
import {PROVIDERS_LIST} from './constants/providers';

require('./smp.scss');


/**
 * Setups SocialPlayer and binds Core to the actual DOM window.
 *
 * NOTE: This code is self-executing. This is necessary in order to correctly
 * determine the ready status.
 *
 * Once smp.min.js file is loaded, it will try to call the window.SMPAsyncInit function.
 * That is why inside that function you should call the create() method in order to initialize the library.
 *
 * It is extermly important that the code is inserted exactly as is (the SDK async load part).
 * It is important to have the callback window.SMPAsyncInit function set prior to the actualy SDK
 * as in the example before to avoid racing coniditions.
 *
 * @example
 *
 *  <div id="social-music-player"></div>
 *
 *  <script type="text/javascript">
 *      window.SMPAsyncInit = function() {
 *          var player = window.SocialMusicPlayer.create({
 *              elID: '#social-music-player'
 *          });
 *
 *          player.render();
 *
 *          setTimeout(function() {
 *              player.play('https://www.youtube.com/watch?v=w319Ew1quF0');
 *          }, 1500);
 *      };
 *
 *      // SMP SDK async load
 *      (function(d, s, id){
 *          var js, sjs = d.getElementsByTagName(s)[0];
 *          if (d.getElementById(id)) return;
 *          js = d.createElement(s); js.id = id;
 *          js.src = 'dist/js/smp.min.js';
 *          sjs.parentNode.insertBefore(js, sjs);
 *      }(document, 'script', 'social-music-player-sdk'));
 *   </script>
 */
window.SocialMusicPlayer = window.SocialMusicPlayer || {
    PROVIDERS: PROVIDERS_LIST,


    /**
     * Creates a new instance of the API.
     * Initializes the options by overriding the defaults.
     *
     * @note: does not execute flow, only creates an instance and initializes the objects.
     */
    create: options => {
        console.log('PLAYER CREATE SET');

        return new API().initialize(options);
    }
};

/**
 * Load SMP ready method after async loading is completed.
 *
 * Usually will call up initialize which can begin working with the DOM.
 */
window.SMPAsyncInit();