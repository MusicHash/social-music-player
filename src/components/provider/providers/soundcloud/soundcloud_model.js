import SongModel from '../../../../model/song_model';

/**
 *
 */
class SoundCloudModel extends SongModel {
    static CLASS = 'SoundCloudModel';

    PROVIDER_URL = 'https://soundcloud.com/';
}

export default SoundCloudModel;