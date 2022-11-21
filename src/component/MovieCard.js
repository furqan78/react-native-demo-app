import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, ToastAndroid, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addItemToCart, removeMovieFromRedux } from '../redux/action/Action';

class MovieCard extends Component {
  constructor(props) {
    super(props);
  }

  removeMovie = (data) => {
    this.props.movieDispatch(data);
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flexContainer}>
          <View>
            <Image
              source={require('../assets/Avengers_profile.jpg')}
              style={styles.circularImage}
            />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.boldText}>{this.props.data.title}</Text>
            <View style={styles.releaseDateSection}>
              <Text style={styles.boldText}>Release Year: </Text>
              <Text style={styles.normalText}>{this.props.data.releaseYear}</Text>
            </View>
          </View>
        </View>
        {this.props.showRemove === true ?
         <Pressable
          style={[styles.button, styles.buttonRemove]}
          onPress={() => this.removeMovie(this.props.data)}
        >
          <Text style={styles.textStyle}>Remove</Text>
        </Pressable>
        : <View>
          </View>
  }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    height: '100%',
  },
  circularImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'

  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between'
  },
  movieButton: {
    marginHorizontal: '10%',
    backgroundColor: '#003300',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  rightContainer: {
    paddingLeft: '5%'
  },
  releaseDateSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: '600',
    color: 'black'
  },
  normalText: {
    color: 'black'
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonRemove: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 20,
    paddingVertical: 7,
    margin: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
},
});

const mapStateToProps = state => ({
    cartState: state
})

const mapDispatchToProps = (dispatch) => ({
    movieRemove: data => dispatch(removeMovieFromRedux(data)),
})

export default connect(mapStateToProps, mapDispatchToProps) (MovieCard);