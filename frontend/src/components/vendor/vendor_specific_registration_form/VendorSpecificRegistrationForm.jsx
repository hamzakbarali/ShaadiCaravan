import styled from "styled-components";
import {SignUpInput, SelectInput} from "./../../common/imports.js";
import {RadioButton} from "./../imports.js";
import {updateBusinessName, updateBusinessAddress, updateBusinessType, updateCountry, 						updateCity, updateGotShopAlreadyWithUs} from "./../../../reducers/common/auth/registration_reducer/imports.js";

export default function VendorSpecificRegistrationForm(props){
	return (
		<>
			<SignUpInput 
				label="Business Name"
				onChange={(event) => updateBusinessName(props.dispatch, event.target.value)}
				type="text"
				error={props.state.businessName.error}
			/>

			<SignUpInput 
				label="Business Address"
				onChange={(event) => updateBusinessAddress(props.dispatch, event.target.value)}
				type="text"
				error={props.state.businessAddress.error}
			/>

			<SelectInput 
				label="Business Type"
				dispatch={props.dispatch}
				updateFunc={updateBusinessType}
				placeholder="Type"
				options={["Wedding Hall", "Catering", "Wedding Hall Decoration", "Jewelry", "Wedding Clothes"]}
				error={props.state.businessType.error}
			/>

			<SignUpInput 
				label="Country"
				onChange={(event) => updateCountry(props.dispatch, event.target.value.toLowerCase())}
				type="text"
				error={props.state.country.error}
			/>

			<SignUpInput 
				label="City"
				onChange={(event) => updateCity(props.dispatch, event.target.value.toLowerCase())}
				type="text"
				error={props.state.city.error}
			/>

			<RadioButton
				label="Already have a business on ShaadiCaravan?"
				dispatch={props.dispatch}
				updateFunc={updateGotShopAlreadyWithUs}
				error={props.state.gotShopAlreadyWithUs.error}
			/>

		</>
	);
}