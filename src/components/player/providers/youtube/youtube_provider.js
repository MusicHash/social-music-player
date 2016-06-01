import BaseProvider from '../base_provider';


/**
 *
 */
class YoutubeProvider extends BaseProvider {
    static CLASS = 'YoutubeProvider';

    init() {
        console.log('HI?');
    }

    play() {
        this.logger.debug('PLAYING???');
    }
}

export default YoutubeProvider;