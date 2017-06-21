import React, {Component} from 'react';
import {Text, View, ListView, ScrollView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { readEvents } from '../../Actions'
import {EventDisplay} from './EventDisplay'
import { Confirm, Header } from '../../Components/Common'


class EventList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal:false,
			curKey: ''
		}

	}

	componentWillMount(){
		this.props.readEvents()
	}

	renderEvents(){
		events = this.props.events

		if(events === null){
			return <Text>No Upcoming Events!</Text>
		}
		list = []
		for(key in events){
			const temp = key
			list.push(
				<EventDisplay 
				title={key}
				location={events[key].location}
				time={events[key].time}
				date={events[key].date} 
				/>
			)
		}
		return <View>{list}</View>
	}

	render () {
		return (
			<View>
				<Text> events page</Text>
				<ScrollView>
					{this.renderEvents()}
				</ScrollView>
			</View>
			)
	}
}

const mapStateToProps = state =>{
	const { events } = state.eventList
	return { events }
}

export default connect(mapStateToProps, { readEvents })(EventList)