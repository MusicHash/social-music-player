import BaseObject from '../../../base/base_object';
import _ from '../../../utils/__';
import Config from '../../../core/config';

/**
 *
 */
class BaseProvider extends BaseObject {
    static CLASS = 'BaseProvider';
    PROVIDER_MODEL = null;

    el = null;
    model = null;
    config = Config.create();


    /**
     *
     */
    getModel() {
        return this.model;
    }


    /**
     *
     */
    setModel(song) {
        if (!_.isNull(this.model) && this.model.id === song.id)
            return false;

        this.model = this.PROVIDER_MODEL.create(song);

        return true;
    }


    /**
     *
     */
    hide() {
        this.el.style.display = 'none';

        return this;
    }



    /**
     *
     */
    show() {
        this.el.style.display = 'block';

        return this;
    }


    /**
     *
     */
    render() {
        let el = document.createElement('div');
        el.id = BaseProvider.CLASS;
        el.innerHTML = '<div>Provider is has no rendering '+ BaseProvider.CLASS +'</div>';

        return el;
    }
}

export default BaseProvider;