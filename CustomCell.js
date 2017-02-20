
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';


export default class CustomCell extends Component {

	static propTypes = {
		data: PropTypes.object,
		onSelect: PropTypes.func,
	}

	render() {

		var textStyle = {color: 'black'};
		if (this.props.data.completed) {
			textStyle = {color: '#cecece', textDecorationLine: 'line-through'};
		}

	    return (
	      <TouchableOpacity onPress={() => this.props.onSelect(this.props.data)}>
	        <View key={this.props.data.name} style={styles.row}>
	        	<Text style={[textStyle, styles.text]}>{this.props.data.name}</Text>
	        </View>
	      </TouchableOpacity>
	    )
	}
}

const styles = StyleSheet.create({
	row: {
	    backgroundColor: 'white',
	    paddingHorizontal: 20,
	    paddingVertical: 12
  	},
  	text: {
  		fontSize: 16
  	}
})