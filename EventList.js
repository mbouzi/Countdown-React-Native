import React, {Component} from 'react';
import {FlatList, Text, StyleSheet } from 'react-native'
import ActionButton from 'react-native-action-button'

import EventCard from './EventCard'

import {getEvents} from './api';


const styles = StyleSheet.create({
	list: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: "f3f3f3"
	}
})

class EventList extends Component {
	state = {
		events: []
	}

	componentDidMount() {

		setInterval(() => {
			this.setState({
				events: this.state.events.map(evt => ({
					...evt,
					timer: Date.now(),
				})),
			});
		}, 1000);

		this.props.navigation.addListener('didFocus', () => {
			getEvents().then(events => this.setState({events}))
		})

		getEvents().then(events => this.setState({events}))
	}

	handleAddEvent = () => {
		this.props.navigation.navigate('form')
	}

	render() {
		return [
			<FlatList
				style={styles.list}
				data={this.state.events}
				renderItem={({item}) => <EventCard event={item} />}
				keyExtractor={item => item.id}
			 />,
			 <ActionButton
			 	key="key"
			 	onPress={this.handleAddEvent}
			 	buttonColor="rgba(231, 76, 60, 1)"
			 />
		]
	}

}





export default EventList;