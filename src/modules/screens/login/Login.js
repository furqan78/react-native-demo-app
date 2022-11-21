import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Button, Alert, ImageBackground } from 'react-native'
import Constants from '../../../constants/Constants'

const background = require('../../../assets/background.png');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isEmailValid: true,
            isPassValid: true,
            passErrMsg: '',
            emailErrMsg: '',
        };
    }

    onLogin = () => {
        console.log(this.state.password, ' password');
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        // if(this.state.password == '' && this.state.email == '') {
        //     this.setState({isEmailValid : false});
        //     this.setState({emailErrMsg: Constants.EMAIL_NOT_VALID});
        //     this.setState({isPassValid : false});
        //     this.setState({passErrMsg: Constants.PASSWORD_NOT_VALID});
        // }else if(this.state.email == '') {
        //     this.setState({isEmailValid : false});
        //     this.setState({emailErrMsg: Constants.EMAIL_NOT_VALID});
        // }else if (reg.test(this.state.email) === false) {
        //     this.setState({isEmailValid : false});
        //     this.setState({emailErrMsg: Constants.EMAIL_NOT_VALID});
        // }else if(this.state.password == '') {
        //     this.setState({isPassValid : false});
        //     this.setState({passErrMsg: Constants.PASSWORD_NOT_VALID});
        // }else if(this.state.password.length < 6) {
        //     this.setState({isPassValid : false});
        //     this.setState({passErrMsg: Constants.PASSWORD_TOO_SHORT});
        // }else{
        //     if(this.state.email == Constants.CREDENTIAL.USERNAME && this.state.password == Constants.CREDENTIAL.PASSWORD){
            let credentials = {
                name: Constants.CREDENTIAL.NAME,
                email: this.state.email,
                password: this.state.password
            }
           this.props.navigation.navigate('MovieListing',credentials);
        // }else{
        //     Alert.alert(Constants.INVALID_CREDENTIALS);
        // }
        // }
    } 

    emailOnChange = (value) => {
        console.log(value, ' value of email');
        this.setState({isEmailValid: true, email: value});
        // this.setState({email: value});
    }

    passwordOnChange = (value) => {
        this.setState({isPassValid: true, password: value});
        // this.setState({password: value});
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flexContainer}>
                    <Image
                        source={require('../../../assets/lock.png')}
                        style={styles.circularImage}
                    />
                </View>
                {/* <Text style={styles.headingText}>Log In</Text>\[] */}
                <View style={styles.spacingTop}>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => this.emailOnChange(value)}
                            placeholder='Enter email'
                            value={this.state.email}
                        />
                        <Text style={styles.errorMsg}>{this.state.isEmailValid == false ? this.state.emailErrMsg : ''}</Text>

                        {/* <Text>Please enter valid email id</Text> */}
                        <TextInput
                            style={styles.input}
                            placeholder='Enter password'
                            onChangeText={(value) => this.passwordOnChange(value)}
                            value={this.state.password}
                        />
                        <Text style={styles.errorMsg}>{this.state.isPassValid == false ? this.state.passErrMsg : ''}</Text>
                        {/* {this.state.isPassValid == false ? <Text>Password is too short</Text> : <Text>Valid</Text>} */}
                    </SafeAreaView>
                </View>
                <TouchableOpacity onPress={() => this.onLogin()}
                    style={styles.movieButton}>
                   <Text style={styles.buttonText}>Log In</Text>
                     {/* <Button
                        onPress={() => {this.setState({email: 'hii'},() => {
                            this.onLogin()
                        }) }}
                        title='Log in'
                    /> */}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onLogin()}
                    style={styles.registerButton}>
                   <Text style={styles.registerText}>Create an account</Text>
                     {/* <Button
                        onPress={() => {this.setState({email: 'hii'},() => {
                            this.onLogin()
                        }) }}
                        title='Log in'
                    /> */}
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f3f3',
        height: '100%',
    },
    circularImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'

    },
    flexContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30%'
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 15,
        paddingLeft: 10,
        color: 'black'
    },
    spacingTop: {
        marginTop: 50,
        marginBottom: 50
    },
    movieButton: {
        marginHorizontal: '5%',
        backgroundColor: '#003300',
        alignItems: 'center',
        paddingVertical:10,
        borderRadius: 10
    },
    registerButton: {
        marginHorizontal: '5%',
        alignItems: 'center',
        paddingVertical:10,
        borderColor: '#003300',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    errorMsg: {
        color: 'red',
        marginLeft: 25
    },
    headingText: {
        color: '#003300',
        fontSize: 35,
        alignSelf: 'center',
        marginTop: 30
    },
    registerText: {
        color: '#003300',
        fontSize: 20,
    }

});

export default Login;