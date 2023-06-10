import styled from "styled-components";
import {SignUpInput, SelectInput} from "./../../imports.js";
import {updateFirstName, updateLastName, updateEmail, updatePassword, updateContactNumber, 
		updateAccountType, updateLanguage} from "./../../../../reducers/common/auth/registration_reducer/imports.js";


export default function GeneralRegistrationForm(props){
	return (
		<>
			<SignUpInput 
				label="First Name"
				onChange={(event) => updateFirstName(props.dispatch, event.target.value)}
				type="text"
				error={props.state.firstName.error}
			/>
			<SignUpInput 
				label="Last Name"
				onChange={(event) => updateLastName(props.dispatch, event.target.value)}
				type="text"
				error={props.state.lastName.error}
			/>							
			<SignUpInput 
				label="Contact Number"
				onChange={(event) => updateContactNumber(props.dispatch, event.target.value)}
				type="text"
				error={props.state.contactNumber.error}
			/>
			<SignUpInput 
				label="Email"
				onChange={(event) => updateEmail(props.dispatch, event.target.value)}
				type="email"
				error={props.state.email.error}
			/>
			<SignUpInput 
				label="Password"
				onChange={(event) => updatePassword(props.dispatch, event.target.value)}
				type="password"
				error={props.state.password.error}
			/>
			<SelectInput 
				label="Account Type"
				dispatch={props.dispatch}
				updateFunc={updateAccountType}
				placeholder="Type"
				options={["User", "Vendor"]}
				error={props.state.accountType.error}
			/>
			<SelectInput 
				label="Language"
				dispatch={props.dispatch}
				updateFunc={updateLanguage}
				placeholder="Choose"
				options={["English", "Urdu"]}
				error={props.state.language.error}
			/>
		</>
	);
}