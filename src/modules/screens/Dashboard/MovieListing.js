import React, { Component } from 'react'
import { FlatList, SafeAreaView, Text, View, TouchableOpacity, Modal, StyleSheet, Pressable, Image, ToastAndroid, Alert } from 'react-native'
import MovieCard from '../../../component/MovieCard';
import { baseApiCall } from '../../../api/Api';
import EndPoints from '../../../constants/EndPoints';
import { addItemToCart, removeMovieFromRedux } from '../../../redux/action/Action';
import { connect } from 'react-redux';


class MovieListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date().toLocaleString(),
            DATA: [],
            modalVisible: false,
            modalItemData: {},
            alreadyAdded: false,
        }
    }

    componentDidMount = () => {
        baseApiCall({
            url: EndPoints.GET_ALL_MOVIES_API,
            method: 'GET',
            requestBody: '',
            timeout: 15000,
            onSuccess: res => {
                this.setState({ DATA: res.data.movies })
            },
            onFailure: res => {
            },
            invalidCall: res => console.log(res, ' response from base api call ----- on invalidCall'),
            errorCall: (msg, subMsg) => console.log(msg, ' error call msg'),
        })
    }

    showMovieDetails(item) {
        this.setState({ alreadyAdded: false },
            () => {
                for (let i = 0; i < this.props.cartState.length; i++) {
                    if (this.props.cartState[i].id === item.id) {
                        this.setState({ alreadyAdded: true });
                        break;
                    }
                }
            });
        this.setState({ modalItemData: item }, () => {
            this.setModalVisible(true);
        });

    }

    closePopup() {
        this.setModalVisible(false);
    }

    watchLater(data) {
        this.props.movieDispatch(data);
        this.setModalVisible(false);
        ToastAndroid.showWithGravity(
            "Added to Watch Later!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    removeMovie = (data) => {
        Alert.alert(
            "Alert",
            `Do you want to remove "${data.title}" from Watch Later ?`,
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        console.log('getting data before remove ---', data);
                        this.props.movieRemove(data);
                        this.setModalVisible(false);
                        ToastAndroid.showWithGravity(
                            `Remove "${data.title}" from Watch Later!`,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }
                }
            ]
        );
    }

    setModalVisible = (isModal) => {
        this.setState({ modalVisible: isModal });
    }

    goToCart() {
        this.props.navigation.navigate('WatchLater');
    }
    render() {
        return (
            <View>
                <Text style={[styles.welcomeText, styles.boldText]}>Welcome, {this.props.route.params.name}</Text>
                <TouchableOpacity onPress={() => this.goToCart()}
                    style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Watch Later</Text>
                </TouchableOpacity>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(false);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={[styles.modalText, styles.boldText]}>Movie Details</Text>
                                <Image
                                    source={require('../../../assets/Avengers_profile.jpg')}
                                    style={styles.detailImage}
                                />
                                <View style={styles.releaseDateSection}>
                                    <Text style={[styles.modalText, styles.boldText]}>Movie Name: </Text>
                                    <Text style={styles.modalText}>{this.state.modalItemData.title}</Text>
                                </View>
                                <View style={styles.releaseDateSection}>
                                    <Text style={[styles.modalText, styles.boldText]}>Release Year: </Text>
                                    <Text style={styles.modalText}>{this.state.modalItemData.releaseYear}</Text>
                                </View>
                                {
                                    this.state.alreadyAdded === true ? 
                                    <Text style={[styles.infoText, styles.redColor]}>Click on remove, To remove the movie from Watch Later</Text> :
                                    <Text style={styles.infoText}>Click on Watch Later, To add the movie to Watch Later</Text> 
                                }
                                <View style={styles.flexContainer}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => this.closePopup()}
                                    >
                                        <Text style={styles.textStyle}>Close</Text>
                                    </Pressable>
                                    {this.state.alreadyAdded === false ? <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => this.watchLater(this.state.modalItemData)}
                                    >
                                        <Text style={styles.textStyle}>Watch Later</Text>
                                    </Pressable> :
                                        <Pressable
                                            style={[styles.button, styles.buttonRemove]}
                                            onPress={() => this.removeMovie(this.state.modalItemData)}
                                        >
                                            <Text style={styles.textStyle}>Remove</Text>
                                        </Pressable>}
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <SafeAreaView>
                        <FlatList
                            data={this.state.DATA}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.showMovieDetails(item)}>
                                    <MovieCard data={item} showRemove={false}
                                    />
                                </TouchableOpacity>
                            )
                            }
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width: '90%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 30,
        paddingVertical: 10,
        margin: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'black'
    },
    releaseDateSection: {
        display: 'flex',
        flexDirection: 'row',
    },
    boldText: {
        fontWeight: '600',
        color: 'black'
    },
    detailImage: {
        marginVertical: 10
    },
    welcomeText: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 30,
        paddingVertical: 10,
        margin: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    },
    buttonRemove: {
        backgroundColor: "#FF0000",
        paddingHorizontal: 20,
        paddingVertical: 7,
        margin: 10
    },
    infoText: {
        color: 'blue',
        padding: 20
    },
    redColor: {
        color: '#ff0000'
    }
});


const mapStateToProps = state => ({
    cartState: state.watchLaterList
});

const mapDispatchToProps = (dispatch) => ({
    movieDispatch: data => dispatch(addItemToCart(data)),
    movieRemove: data => dispatch(removeMovieFromRedux(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListing);