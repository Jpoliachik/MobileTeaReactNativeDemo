
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';


export default class CustomHeader extends Component {

	static propTypes = {
		onAdd: PropTypes.func
	}

	constructor(props) {
		super(props);

		this.state = {
			text: ''
		}
	}

	onAdd() {
		this.props.onAdd(this.state.text);

		this.setState({text: ''});
		this.refs.textInput.blur();
	}

	render() {

		return (
			<View style={styles.header}>
        
	            <TextInput ref='textInput' 
	            	style={styles.textInput} 
		            value={this.state.text}
		            numberOfLines={1}
		            placeholder='New Item'
		            onChangeText={(text) => {
		              this.setState({text: text})
          		}}/>
	        
	            <TouchableOpacity onPress={() => this.onAdd()}>
	              <Text style={styles.headerButton}>Add</Text>
	            </TouchableOpacity>
        
          	</View>
		)
	}
}

const styles = StyleSheet.create({
	textInput: {
      flex: 1,
      backgroundColor: 'white',
      marginVertical: 4,
      marginHorizontal: 8,
      paddingHorizontal: 4
    },
	header: {
      flexDirection: 'row',
      paddingTop: 20,
      height: 64, 
      backgroundColor: '#83D6DE',
      paddingHorizontal: 8,
      alignItems: 'center',
    },
    headerButton: {
      color: 'white',
      fontSize: 16,
      paddingHorizontal: 8
    },
})