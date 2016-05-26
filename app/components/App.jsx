import AltContainer from 'alt-container';
import React from 'react';

import Lanes from './Lanes.jsx';
 import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
	

	
@DragDropContext(HTML5Backend)



export default class App extends React.Component {
	
	 
	render() {
	 
		
		
		return (
		
      <div><container>
			<p className='Header'> Kanban is a method for managing knowledge work with an emphasis on just-in-time delivery while not overloading the team members. This approach presents all participants with a full view of the process from task definition to delivery to a customer <a href="https://en.wikipedia.org/wiki/Kanban_(development)">(Wikipedia)</a>.  </p> 
			<p className='text'> You can drag and drop notes from one lane to another </p> </container>
			
			<button className="add-lane" onClick={this.addLane}>+</button>
		
		<AltContainer
			stores={[LaneStore]}
			inject={{
			  lanes: () => LaneStore.getState().lanes || []
			}}
>
	<Lanes />
	</AltContainer>
      </div>
		);
	}
	
	addLane() {
		LaneActions.create({name: 'New lane'});
	}
	
}