import SongModel from '../../../../model/song_model';

/**
 *
 */
class YoutubeModel extends SongModel {
    static CLASS = 'YoutubeModel';

    PROVIDER_URL = 'https://www.youtube.com/watch?v=';
}

export default YoutubeModel;