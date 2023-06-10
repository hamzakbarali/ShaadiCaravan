import mongoose from "mongoose";

const FormSchema = mongoose.Schema({
	serviceId: {
		type: mongoose.Schema.Types.ObjectId, ref: "Service",
		required: true,
		unique: true
	},
	formFields: {
		type: Array,
		required: true
	},
	softDelete: {
		type: Boolean,
		default: false
	},
	responses: {
		type: Array,
		default: []
	}
},
{
	timestamps: true
});

const Form = mongoose.model("Form", FormSchema);

export default Form;