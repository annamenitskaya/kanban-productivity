import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
	beginDrag(props) {
	
		return {
			id: props.id
		};
	}
};

const noteTarget = {
	hover(targetProps, monitor) {
		const targetId = targetProps.id;
		const sourceProps = monitor.getItem();
		const sourceId = sourceProps.id;
		
		if(sourceId !== targetId) {
			targetProps.onMove({sourceId, targetId});
		}
	}
};

 @DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Note extends React.Component {
  render() {

    const {connectDragSource, connectDropTarget, isDragging,
      onMove, id, editing, ...props} = this.props;
    // Pass through if we are editing
    const dragSource = editing ? a => a : connectDragSource;


    return dragSource(connectDropTarget(

      <li style={{
        opacity: isDragging ? 0 : 1
      }} {...props}>{props.children}</li>
    ));
  }
} 
	
	
/*
		
//Track editing state
	this.state = {
		editing: false
	};	
	
	
render(){
	//renders component differently based on state
	if(this.state.editing) {
		return this.renderEdit();
	}
	
	return this.renderNote();
}	
	renderEdit = () => {
return <input type="text" 
ref={
	element => element ?
	element.selectionStart = this.props.task.length : null
}
autoFocus={true}
defaultValue={this.props.task}
onBlur={this.finishEdit}
onKeyPress={this.checkEnter} />;
		
	};
	renderNote = () => {
		// on user's click trigger editing logic
		const onDelete = this.props.onDelete;
		return (
		<div onClick={this.edit}>
			<span className = "task">{this.props.task}</span>
			{onDelete ? this.renderDelete() : null }
	</div>	
	);
		
		
	};
renderDelete = () => {
	return <button className = "delete-note" onClick={this.props.onDelete}>x</button>;
};

	edit = () => {
		//edit mode 
		this.setState({
			editing: true
		});
	};
	checkEnter= (e) => {
		if(e.key === 'Enter') {
			this.finishEdit(e);
		}
	};
	finishEdit = (e) => {
		const value = e.target.value;
		
		if(this.props.onEdit) {
			this.props.onEdit(value);
		//exit edit mode
			
	this.setState({
		editing: false
	});		
		}
	};
}
*/