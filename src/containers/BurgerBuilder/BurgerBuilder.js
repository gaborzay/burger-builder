import React, {Component} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  UPDATE_PURCHASABLE
} from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios.get('https://react-my-burger-5409f.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data})
    //   })
    //   .catch(error => {
    //     this.setState({error: true})
    //   })
  }

  updatePurchaseState = (updatedIngredients) => {
    const ingredients = {...updatedIngredients};
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    this.props.updatePurchasable(sum > 0);
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {...this.props.ings};
    let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner/>;
    let orderSummary = null;
    this.updatePurchaseState(this.props.ings);
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }
    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.props.purchasable}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </React.Fragment>
      );
      orderSummary = <OrderSummary
        price={this.props.price}
        ingredients={this.props.ings}
        purchasedCancelled={this.purchaseCancelHandler}
        purchasedContinued={this.purchaseContinueHandler}
      />;
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    purchasable: state.purchasable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: REMOVE_INGREDIENT, ingredientName: ingName}),
    updatePurchasable: (purchasable) => dispatch({type: UPDATE_PURCHASABLE, purchasable: purchasable}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));