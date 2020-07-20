



import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, _ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/Header'
import { ScrollView } from 'react-native-gesture-handler';

export default class GoodRequest extends Component{
    constructor(){
        super()
        this.state = {
            userId : firebase.auth().currentUser.email,
            item_name:"",
            reason:"",
        } 
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
      }


    initiateRequest = (item_name,reason) => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('goods_request').add({
            "user_ID": userId,
            "item_name":item_name,
            "reason":reason,
            "requestID"  : randomRequestId,
        })
        this.setState({
            item_name:'',
            reason:''
        })
        return Alert.alert("Exchange Request Successfull")
    }
    render(){
        return(
            <ScrollView>
                    <View>
                    <MyHeader title="Add item" navigation ={this.props.navigation}/>
                    <TextInput
                        style={styles.booktitle}
                        placeholder="Name of the Item"
                        placeholderTextColor = "#40E9E0"
                        onChangeText={(text)=>{
                        this.setState({
                            item_name: text
                        })
                        }}
                        value = {this.state.item_name}
                    />
                    <TextInput
                        style={styles.requestReason}
                        multiline = {true}
                        placeholder="Why do you need this item?"
                        placeholderTextColor = "#40E9E0"
                        onChangeText={(text)=>{
                        this.setState({
                            reason: text
                        })
                        }}
                        value = {this.state.reason}
                    />

                    <TouchableOpacity 
                    style = {styles.reqButton}
                    onPress={()=>{
                        this.initiateRequest(this.state.item_name, this.state.reason)
                        }}>
                        <Text style = {styles.reqText}>Request</Text>
                    </TouchableOpacity>
                    </View>                    
            </ScrollView>
        )
    }
}

const styles  = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F8BE85',
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        fontSize:28,
        fontWeight:'300',
        color : '#4C516D',
        textAlign:"center",
        marginTop:20,
        marginBottom:20,
    },
    booktitle: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor : '#4C516D',
        fontSize: 16,
        margin:15,
        padding:2,
        alignSelf:"center",
        textAlignVertical:"center",
        textAlign:"center"
    },
    requestReason: {
        width: 300,
        height: 270,
        borderWidth: 2,
        borderColor : '#4C516D',
        fontSize: 16,
        margin:15,
        padding:10,
        alignSelf:"center",
        textAlignVertical:"top"
    },
    reqButton:{
        width:300,
        height:50,
        justifyContent:'center',
        alignSelf:'center',
        alignItems:"center",
        borderRadius:25,
        backgroundColor:"#40E0D0",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        margin:20
      },
      reqText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
      },

})