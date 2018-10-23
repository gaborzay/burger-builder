import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.initIngredients();
    this.props.onInitPurchase();
  }

  updatePurchaseState = (updatedIngredients) => {
    const ingredients = {...updatedIngredients};
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    this.props.updatePurchasable(sum > 0);
  };

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {...this.props.ings};
    let burger = this.props.error ? <p>Ingredients cannot be loaded</p> :
      <Spinner/>;
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
            isAuth={this.props.isAuth}
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchasable: state.burgerBuilder.purchasable,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    updatePurchasable: (purchasable) => dispatch(actions.updatePurchasable(purchasable)),
    initIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));