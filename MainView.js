
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  Platform,
  LayoutAnimation
} from 'react-native';

import firebase from 'firebase';

// Initialize Firebase
const FIREBASE_CONFIG = {
  apiKey: "xxxxxxxx",
  authDomain: "xxxxxxxx",
  databaseURL: "xxxxxxxx",
  storageBucket: "xxxxxxxx",
  messagingSenderId: "xxxxxxxx"
};
firebase.initializeApp(FIREBASE_CONFIG);

// import custom components
import CustomCell from './CustomCell';
import CustomHeader from './CustomHeader';


export default class MainView extends Component {

    constructor(props) {
      super(props);
    
      // init dataSource
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
  
      this.state = {
        dataSource: ds.cloneWithRowsAndSections(this.createData()),
      };
    }
  
    componentDidMount() {
      
      // subscribe to firebase updates under /items
      firebase.database().ref('items').orderByChild('createdDate').on('value', (snapshot) => {
  
        let data = snapshot.val();
        
        // update dataSource in state when firebase data changes
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.createData(data))
        })
  
      });
    }
    
    createData(list) {
      /*
      expected data structure: 
  
      {
        sectionId: {
          rowId: rowData,
          rowId2: rowData
        },
        sectionId2: {
          rowId3: rowData,
          rowId4: rowData
        }
      }
      */
      var dataObject = {};
  
      if (list) {
  
        var active = {};
        var inactive = {};
  
        for (var i in list) {
          if (list[i].completed) {
            inactive[i] = list[i];
          } else {
            active[i] = list[i];
          }
        }
  
        dataObject = {
          ToDo: active,
          Done: inactive
        }
      }
      return dataObject;
  }



  onAdd(text) {

    // push new firebase item 
    var newItemKey = firebase.database().ref().child('items').push().set({
      name: text,
      createdDate: firebase.database.ServerValue.TIMESTAMP,
      completed: false
    });
  }



  onSelectCell(id, rowData) {
  
    // update firebase to toggle completed state
    firebase.database().ref().child('items').child(id).update({
      completed: !rowData.completed
    })
  }




  renderRow(rowData, sectionID, rowID) {
    return (
      <CustomCell data={rowData} 
        onSelect={() => this.onSelectCell(rowID, rowData)}/>
    )
  }
  
  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionText}>{sectionID}</Text>
      </View>
    )
  }
  
  renderSeparator(sectionID, rowID) {
    return <View key={'sep' + sectionID + rowID} style={styles.separator}/>
  }


  render() {

    return (
      <View style={styles.container}>

          <CustomHeader onAdd={(text) => this.onAdd(text)}/>

          <ListView
              style={styles.listView}
              dataSource={this.state.dataSource}
              renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
              renderSectionHeader={(sectionData, sectionID) => this.renderSectionHeader(sectionData, sectionID)}
              renderSeparator={(sectionID, rowID) => this.renderSeparator(sectionID, rowID)}
            />

      </View>
    );
  }


}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#efefef',
      flex: 1,
    },
    listView: {
      flex: 1,
    },
    separator: {
      height: 2
    },
    sectionHeader: {
      height: Platform.OS === 'ios' ? 40 : 30,
      paddingHorizontal: 20,
      justifyContent: 'center',
      backgroundColor: '#efefef'
    },
    sectionText: {
      fontSize: 13,
      color: 'black'
    }
});



AppRegistry.registerComponent('MobileTea', () => MainView);


