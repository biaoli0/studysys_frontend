import React from 'react';
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(ru);

function MyTimeAgo(props) {
    const {ctime} = props;
    return (
        <ReactTimeAgo date={ctime}/>
    );
}

export default MyTimeAgo;