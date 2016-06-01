import BaseProvider from '../base_provider';


/**
 *
 */
class YoutubeProvider extends BaseProvider {
    static CLASS = 'YoutubeProvider';


    play() {
        this.logger.debug('PLAYING???');
    }
}

export default YoutubeProvider;