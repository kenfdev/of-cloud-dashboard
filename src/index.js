import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolderOpen, faLink } from '@fortawesome/free-solid-svg-icons';

library.add(faFolderOpen, faLink);

ReactDOM.render(<App />, document.getElementById('root'));
