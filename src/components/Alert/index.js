import { connect } from 'react-redux';
import Alert from './Alert';

function mapStoreToProps(store) {
    return {
        text:  store.Alert.text,
        style: store.Alert.style
    };
}

export default connect(mapStoreToProps)(Alert);