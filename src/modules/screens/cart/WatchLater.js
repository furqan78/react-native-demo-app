import React, { Component } from 'react'
import { FlatList, SafeAreaView, Text, View, TouchableOpacity, Modal, StyleSheet, Pressable, Image, ToastAndroid, Alert } from 'react-native'
import { connect } from 'react-redux';
import MovieCard from '../../../component/MovieCard';
import { clearAllMovies } from '../../../redux/action/Action';

const watchLaterMovies = [];

class WatchLater extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date().toLocaleString(),
      modalVisible: false,
      modalItemData: {},
    }
  }

  showMovieDetails(item) {
    this.setState({ modalItemData: item }, () => {
      this.setModalVisible(true);
    });
  }

  setModalVisible = (isModal) => {
    this.setState({ modalVisible: isModal });
  }

  closePopup() {
    this.setModalVisible(false);
  }

  clearAllMovie() {
    Alert.alert(
      "Alert",
      `Do you want to clear all movies ?`,
      [
          {
              text: "No",
              onPress: () => { },
              style: "cancel"
          },
          {
              text: "Yes", onPress: () => {
    this.props.clearAll();
                  ToastAndroid.showWithGravity(
                      "All Cleared",
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER
                  );
              }
          }
      ]
  );
  }

  render() {
    return (
      <View>
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
                <View style={styles.flexContainer}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.closePopup()}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <SafeAreaView>
            <View style={[styles.flexContainer, styles.clearAllContainer]}>
              <Text style={styles.boldText}>For removing all movies - </Text>
              <Pressable
                style={[styles.button, styles.buttonRemove]}
                onPress={() => this.clearAllMovie()}
              >
                <Text style={styles.textStyle}>Clear All</Text>
              </Pressable>
            </View>
            <FlatList
              data={this.props.cartState}
              renderItem={({ item }) => (
                <Pressable onPress={() => this.showMovieDetails(item)}>
                  <MovieCard data={item} showRemove={true}
                  />
                </Pressable>
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
    alignItems: 'center'
  },
  buttonRemove: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 20,
    paddingVertical: 7,
    margin: 10,
    width: '30%'
  },
  clearAllContainer: {
    paddingHorizontal: 20
  }
});


const mapStateToProps = state => ({
  cartState: state.watchLaterList
})

const mapDispatchToProps = (dispatch) => ({
  movieDispatch: data => dispatch(addItemToCart(data)),
  clearAll: data => dispatch(clearAllMovies(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchLater);
