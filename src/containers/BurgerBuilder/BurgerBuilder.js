import React, {Component} from "react";
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 4,
			purchasable: false,
			purchasing: false
		}
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey]
			})
			.reduce((current, next) => {
				return current + next
			}, 0)
		this.setState({
			purchasable: sum > 0
		})
	}

	addIngredient = (type) => {
		const oldCount = this.state.ingredients[type]
		const updatedCounted = oldCount + 1
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCounted
		const priceAddition = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + priceAddition
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		})
		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredient = (type) => {
		const oldCount = this.state.ingredients[type]
		if (oldCount <= 0) {
			return
		}
		const updatedCounted = oldCount - 1
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCounted
		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		})
		this.updatePurchaseState(updatedIngredients)
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		})
	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		})
	}

	purchaseContinueHandler = () => {
		alert('continue')
	}

	purchaseCancelledHandler = () => {
		alert('cancel')
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchasedCancelled={this.purchaseCancelledHandler}
						purchasedContinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					ingredientAdded={this.addIngredient}
					ingredientRemoved={this.removeIngredient}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		)
	}
}

export default BurgerBuilder
