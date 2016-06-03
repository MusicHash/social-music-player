import BaseProvider from '../base_provider';
import SoundCloudModel from './soundcloud_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';

/**
 *
 */
class SoundCloudProvider extends BaseProvider {
    static CLASS = 'SoundCloudProvider';

    el = null;
    widget = null;
    PROVIDER = PROVIDERS_LIST.SOUNDCLOUD;
    SCPath = '//w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/';


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
        tag.onload = setTimeout(() => {
            this._initPlayer();
        }, 500);

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
        console.log(this.widget);
    }
}

export default SoundCloudProvider;