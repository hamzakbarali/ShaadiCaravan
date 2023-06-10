import styled from "styled-components";
import {SignUpInput, SelectInput} from "./../../common/imports.js";
import {updateServiceName, updateTime, updatePrice, updateDay} from "./../../../reducers/vendor/service/create_service_reducer/imports.js";


export default function CreateNewServiceForm(props){
	return (
		<>
			<SignUpInput 
				label="Service Name"
				onChange={(event) => updateServiceName(props.dispatch, event.target.value)}
				type="text"
				error=""
			/>
			<SignUpInput 
				label="Time"
				onChange={(event) => updateTime(props.dispatch, event.target.value)}
				type="text"
				error=""
			/>							
			<SignUpInput 
				label="Price"
				onChange={(event) => updatePrice(props.dispatch, event.target.value)}
				type="text"
				error=""
			/>
			<SignUpInput 
				label="Day"
				onChange={(event) => updateDay(props.dispatch, event.target.value)}
				type="text"
				error=""
			/>
			
		</>
	);
}