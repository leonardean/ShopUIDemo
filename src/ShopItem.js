import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class ShopItem extends Component {

    constructor (props) {
        super (props)
        this.state = {
            count: 0
        }
    }

    _onItemRemovePress  = () => {
        this.setState({
            count: this.state.count - 1
        }, () => {
            this.props.onItemRemoved(this.props.shopItem)
        })
    }

    _onItemAddPress = () => {
        this.setState({
            count: this.state.count + 1
        }, () => {
            this.props.onItemAdded(this.props.shopItem)
        })
    }

    render () {
        return (
            <View style={styles.shopItemContainer}>
                <View style={styles.shopItemAvatarContainer}>
                    <Image style={styles.shopItemAvatar}
                           source={{uri: this.props.shopItem.avatar_url}}/>
                </View>
                <View style={styles.shopItemInfoContainer}>
                    <Text style={styles.shopItemNameText}>{this.props.shopItem.name}</Text>
                    <Text style={styles.shopItemPriceText}>￥{this.props.shopItem.price}</Text>
                </View>
                <View style={styles.shopItemCounterContainer}>
                    <Icon.Button name="ios-remove-circle-outline" size={25}
                                 margin={-5} iconStyle={{marginRight: 0}}
                                 color="black" backgroundColor="white"
                                 display={this.state.count === 0 ? 'none' : 'flex'}
                                 onPress={this._onItemRemovePress}/>
                    <View display={this.state.count === 0 ? 'none' : 'flex'} width={25} alignItems="center">
                        <Text style={styles.shopItemCountText}>{this.state.count}</Text>
                    </View>
                    <Icon.Button name="ios-add-circle-outline" size={25}
                                 margin={-5} iconStyle={{marginRight: 0}}
                                 color="black" backgroundColor="white" onPress={this._onItemAddPress}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    shopItemContainer: {
        flex: 1,
        borderTopColor: "#999",
        borderTopWidth: 0.5,
        backgroundColor: "#fff",
        flexDirection: 'row',
        padding: 10,
    },
    shopItemAvatar: {
        width: 65,
        height: 65,
        resizeMode: 'center'
    },
    shopItemAvatarContainer: {
        width: 65,
        height: 65,
        borderWidth: 0.5,
        borderColor: "#999"
    },
    shopItemInfoContainer: {
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 10
    },
    shopItemNameText: {
        fontSize: 18
    },
    shopItemPriceText: {
        fontSize: 14,
        color: '#1E1EEB'
    },
    shopItemCounterContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shopItemCountText: {

    }
})

AppRegistry.registerComponent('ShopItem', () => ShopItem);