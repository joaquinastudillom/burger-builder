import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			eircode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault()
		this.setState({
			loading: true
		})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Joaquin Astudillo',
				address: {
					address: 'Test Address',
					eirCode: 'D04 TEST',
					country: 'Ireland'
				},
				email: 'joaquin@test.cl'
			},
			deliveryMethod: 'fastest'
		}

		axios.post('/orders.json', order)
			.then(response => {
					this.setState({
						loading: false
					})
					this.props.history.push('/')
				}
			)
			.catch(e => {
				this.setState({
					loading: false
				})
			})
	}

	render() {
		let form = (
			<form>
				<input type="text" className={classes.Input} name={'name'} placeholder={'Your Name'}/>
				<input type="email" className={classes.Input} name={'email'} placeholder={'Your Email'}/>
				<input type="text" className={classes.Input} name={'street'} placeholder={'Street'}/>
				<input type="text" className={classes.Input} name={'eircode'} placeholder={'Your eircode'}/>
				<Button btnType={'Success'} clicked={this.orderHandler}>ORDER</Button>
			</form>
		)

		if (this.state.loading) {
			form = <Spinner/>
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		)
	}
}

export default ContactData
