import React from 'react'
import {connect} from 'react-redux'
import {deleteProduct, changeQty} from '../store/cart-reducer'

const SingleCartProduct = props => {
  const {product, removeProduct, updateQty} = props
  const orderQty = product.orderQty
  return (
    <div>
      <h4>{product.name}</h4>
      <div className="cartProduct">
        <img className="cartImage" src={product.imageUrl} />
        <div>
          <p>Total price: ${product.price / 100 * orderQty}</p>
          <div>
            Qty:
            <input
              onChange={event =>
                updateQty(product.id, Number(event.target.value), props.userId)
              }
              type="number"
              name="qty"
              min="1"
              max={product.qty}
              value={orderQty}
            />
          </div>
          <button
            type="button"
            className="button button-outline"
            onClick={() => removeProduct(product.id, props.userId)}
          >
            remove product
          </button>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    removeProduct: (id, userId) => dispatch(deleteProduct(id, userId)),
    updateQty: (id, newQty, userId) => dispatch(changeQty(id, newQty, userId))
  }
}

export default connect(mapState, mapDispatch)(SingleCartProduct)
