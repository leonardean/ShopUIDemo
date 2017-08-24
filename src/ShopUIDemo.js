/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Platform,
    Dimensions
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Badge from 'react-native-smart-badge';
import Button from 'react-native-smart-button';
import Parabola from 'react-native-smart-parabola';
import Icon from 'react-native-vector-icons/Ionicons';

import ShopItem from './ShopItem';
import Cart from './Cart';

let {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')
let contentTop = Platform.OS === 'ios' ? 64 : 56
// let cart = new Cart()

export default class ShopUIDemo extends Component {

    constructor (props) {
        super (props)
        this._startPositions = {}
        this._endPositions = {}
        this.state = {
            total_price: 0,
            item_count: 0,
            is_parabola_trigger: false,
            parabola_start: null,
            parabola_end: null,
            shopItems: [
                {
                    id: 1,
                    avatar_url: "https://s30.postimg.org/ozwmo52k1/3101644_122454013465_2.jpg",
                    name: "提拉米苏",
                    price: 10
                },
                {
                    id: 2,
                    avatar_url: "https://s30.postimg.org/k2j2310kx/20111217165752_2e_Fy_V.thumb.600_0.jpg",
                    name: "多彩马卡龙",
                    price: 18
                },
                {
                    id: 3,
                    avatar_url: "https://s30.postimg.org/h9puj008h/4685840_214907366184_2.jpg",
                    name: "水果奶油布丁",
                    price: 12
                }
            ]
        },
        this.cart = new Cart()
    }

    _onLayout = (key, e) => {
        let {x, y} = e.nativeEvent.layout
        console.log(`key: ${key}, x: ${x}, y: ${y}, dw: ${deviceWidth}, dh: ${deviceHeight}, contentTop: ${contentTop}`)
        this._startPositions[ key ] = {
            parabola_start: {
                x: deviceWidth - 30,
                y: y + contentTop + 30,
            },
            parabola_end: {
               x: 40,
               y: deviceHeight - 45
            },
        }
    }

    _onLayoutCart = (e) => {
        let {x, y} = e.nativeEvent.layout
        this._endPositions['cart'] = {
            x: x + 5,
            y: y + 5,
        }
    }

    _onPressHandler (key, e) {
        let startPositions = this._startPositions[ key ]

        startPositions.end = this._endPositions[ 'cart' ]

        let {parabola_start, parabola_end} = startPositions

        this.setState({
            is_parabola_trigger: true,
            parabola_start,
            parabola_end,
        })
    }

    _renderParabola = ({index, translateX, translateY}) => {
        return (
            <View
                key={`'parabola-ball-'${index}`}
                style={[
                    {position: 'absolute',},
                    {width: 20, height: 20, borderRadius: 10, backgroundColor: 'red',},
                    {transform: [{translateX}, {translateY}]},
                ]}
            />
        )
    }

    _onItemAdded = (item) => {
        this.cart.addItem(item.id)
        this.setState({
            item_count: this.state.item_count + 1,
            total_price: this.state.total_price + item.price
        })
        this._onPressHandler(item.id)
    }

    _onItemRemoved = (item) => {
        this.cart.removeItem(item.id)
        this.setState({
            is_parabola_trigger: false,
            item_count: this.state.item_count - 1,
            total_price: this.state.total_price - item.price
        })
    }

    _checkCart = () => {
        console.log(this.cart.getItems())
        console.log(this.cart.getCount())
        console.log(this.cart.getUniqueItemCount())
    }

    render() {
        let shopItems = this.state.shopItems.map((shopItem) => {
            return  <View onLayout={ this._onLayout.bind(this, shopItem.id.toString())}>
                        <ShopItem
                             key={shopItem.id} ref={shopItem.id} shopItem={shopItem}
                             onItemRemoved={this._onItemRemoved}
                             onItemAdded={this._onItemAdded}
                        />
                    </View>
        })
        return (
            <View style={styles.shopContainer}>
                <NavigationBar title={{title: "南京大饭店"}} />
                <View style={styles.shopItemListContainer}>
                    <ScrollView>
                        {shopItems}
                    </ScrollView>
                </View>
                <View style={styles.cartContainerContainer}>
                    <View style={styles.cartSummaryContainer}>
                        <View style={styles.cartSummaryIconContainer} onLayout={this._onLayoutCart}>
                            <Icon name={"ios-cart-outline"} size={25} color={"#666"} />
                        </View>
                        <Badge style={[styles.cartSummaryBadge, {display: this.state.item_count === 0 ? 'none' : 'flex'}]}
                               minWidth={18} minHeight={18} textStyle={{color: '#fff',}}>
                            {this.state.item_count}
                        </Badge>
                        <Text style={styles.cartSummaryText}>￥{this.state.total_price}</Text>
                    </View>
                    <Button
                        onPress={this._checkCart}
                        touchableType={Button.constants.touchableTypes.fade}
                        style={styles.checkoutButton}
                        textStyle={styles.checkoutButtonText}>
                        选好了
                    </Button>
                </View>
                <Parabola
                    isTrigger={this.state.is_parabola_trigger}
                    rate={0.9}
                    start={this.state.parabola_start}
                    end={this.state.parabola_end}
                    renderParabola={this._renderParabola}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    shopContainer: { flex: 1, backgroundColor: "#eee" },
    shopItemListContainer: { flex: 1, },
    cartContainerContainer: {
        height: 50, backgroundColor: "white", flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center'
    },
    cartSummaryContainer: {
        flex: 1, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row'
    },
    cartSummaryIconContainer: {
        height: 40, width: 40, backgroundColor: '#eee', borderRadius: 20, padding: 8
    },
    cartSummaryBadge: { marginLeft: -10 },
    cartSummaryText: {
        fontSize: 20, alignSelf: 'center', marginLeft: 10, color: '#1E1EEB'
    },
    checkoutButton: {
        height: 50, width: 150, backgroundColor: '#1E1EEB', justifyContent: 'center',
    },
    checkoutButtonText: {
        fontSize: 17, color: '#ffffff'
    },
});

AppRegistry.registerComponent('ShopUIDemo', () => ShopUIDemo);

