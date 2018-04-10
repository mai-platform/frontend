import React from 'react';
import ReactDOM from 'react-dom';

import ExpChangeForm from './components';

class ExpForm extends React.Component {
	render(){
		return <ExpChangeForm/>
	}
}

ReactDOM.render(
	<ExpForm/>
  ,
  document.getElementById('content')
);