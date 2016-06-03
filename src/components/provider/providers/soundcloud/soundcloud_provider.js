import BaseProvider from '../base_provider';
import SoundCloudModel from './soundcloud_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';

/**
 * @see: https://w.soundcloud.com/player/api_playground.html
 */
class SoundCloudProvider extends BaseProvider {
    static CLASS = 'SoundCloudProvider';
    PROVIDER = PROVIDERS_LIST.SOUNDCLOUD;


    el = null;
    widget = null;
    SCPath = '//w.soundcloud.com/player/?url=';
    SCTracks = 'http://api.soundcloud.com/tracks/';


    init() {
        this.scriptLoad();
    }


    getPlayerContainer() {
        if (null !== this.el) return this.el;

        this.el = document.createElement('iframe');
        this.el.id = SoundCloudProvider.CLASS;
        this.el.src = this.SCPath;
        this.el.width = this.config.width;
        this.el.height = this.config.height;

        return this.el;
    }


    /**
     *
     */
    scriptLoad() {
        let tag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = 'https://w.soundcloud.com/player/api.js';
        tag.onload = this._initPlayer.bind(this);


        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        return this;
    }

    render() {
        return this.getPlayerContainer();
    }


    _initPlayer() {
        this.widget = window.SC.Widget(this.getPlayerContainer());

        return this;
    }


    setModel(song) {
        this.model = SoundCloudModel.create(song);

        return this;
    }


    /**
     *
     */
    play() {
        this.widget.load(this.SCTracks + this.model.id, {
            auto_play: true,
            buying: false,
            liking: false,
            download: false,
            sharing: false,
            show_artwork: true,
            show_comments: true,
            show_playcount: true,
            show_user: true,
            hide_related: true,
            visual: true,
            start_track: 0
        });
    }
}

export default SoundCloudProvider;