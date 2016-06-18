import SongModel from '../../../../model/song_model';

/**
 *
 */
class VimeoModel extends SongModel {
    static CLASS = 'VimeoModel';

    PROVIDER_URL = 'https://vimeo.com/';
}

export default VimeoModel;