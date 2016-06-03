import BaseProvider from '../base_provider';
import VimeoModel from './vimeo_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';

/**
 *
 */
class VimeoProvider extends BaseProvider {
    static CLASS = 'VimeoProvider';

    el = null;
    PROVIDER = PROVIDERS_LIST.VIMEO;
    vimeoPath = '//player.vimeo.com/video/';


    getPlayerContainer() {
        if (null !== this.el) return this.el;

        this._initPlayer();

        this.el = document.createElement('iframe');
        this.el.id = VimeoProvider.CLASS;
        this.el.src = this.vimeoPath;
        this.el.width = this.config.width;
        this.el.height = this.config.height;

        return this.el;
    }


    _initPlayer() {
        // events?
    }


    render() {
        return this.getPlayerContainer();
    }


    setModel(song) {
        this.model = VimeoModel.create(song);

        return this;
    }

    /**
     *
     */
    play() {
        console.log(this);
    }
}

export default VimeoProvider;