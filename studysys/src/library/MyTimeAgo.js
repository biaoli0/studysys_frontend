import React from 'react';
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

JavascriptTimeAgo.addLocale(en);

function MyTimeAgo(props) {
    const {ctime} = props;
    return (
        <ReactTimeAgo date={ctime}/>
    );
}

export default MyTimeAgo;