export default class Cart {

    constructor () {
        this.size = 0
        this.cart = new Map()
    }

    getCount = () => {
        return this.size
    }

    getCountById = (id) => {
        return this.cart.get(id)
    }

    getUniqueItemCount = () => {
        return this.cart.size
    }

    getItems = () => {
        let items = []
        for (let [id, count] of this.cart) {
            items.push({
                id: id,
                count: count
            })
        }
        return items
    }

    addItem = (id) => {
        let count = this.cart.get(id)
        if ( count === undefined) {
            this.cart.set(id, 1)
            this.size ++
        } else {
            this.cart.set(id, count + 1)
            this.size ++
        }
    }

    removeItem = (id) => {
        let count = this.cart.get(id)
        if (count === 1) {
            this.cart.delete(id)
            this.size --
        } else {
            this.cart.set(id, count - 1)
            this.size --
        }
    }

    clear = () => {
        this.cart.clear()
    }
}