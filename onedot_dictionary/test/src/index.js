import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {dictionaries} from './data'
import {dictionaryDefinition} from './data'

var items = dictionaries.map((dictionary, idx)=>
            <App  context = {dictionary} definition={dictionaryDefinition}/>
    );

ReactDOM.render(
<div>
        {           items    }
</div>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
