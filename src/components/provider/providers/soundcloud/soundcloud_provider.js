import BaseProvider from '../base_provider';
import SoundCloudModel from './soundcloud_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';

/**
 * @see: https://developers.soundcloud.com/docs/api/html5-widget
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
        this.hide();

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

        this.widget.bind(window.SC.Widget.Events.READY, this.onReady.bind(this));
        this.widget.bind(window.SC.Widget.Events.PAUSE, this.onPause.bind(this));
        this.widget.bind(window.SC.Widget.Events.FINISH, this.onFinish.bind(this));
        this.widget.bind(window.SC.Widget.Events.LOAD_PROGRESS, this.onLoadProgress.bind(this));
        this.widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, this.onPlayProgress.bind(this));

        return this;
    }


    onPause() {
        console.log('paused event');
    }


    onFinish() {
        console.log('finished event');
    }


    onPlayProgress(data) {
        console.log('playProgress event : ' + data.loadedProgress + ' : ' + data.currentPosition + ' : ' + data.relativePosition);
    }


    onLoadProgress(data) {
        //console.log('loadProgress event : ' + data.percent + ' : ' + data.bytesLoaded + ' : ' + data.bytesTotal + ' : ' + data.duration);
        console.log('playProgress event : ');
        console.log(data);
    }



    setModel(song) {
        this.model = SoundCloudModel.create(song);

        return this;
    }

    onReady() {
        console.log('READY?');
    }

    pause() {
        this.widget.pause();
    }


    /**
     *
     */
    load(song) {
        this.setModel(song);

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