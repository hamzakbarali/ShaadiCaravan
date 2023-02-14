export async function verifyPassword(req, res, next){
	const {email, password} = req.body;
	if(email && password){
		const queriedUser = await User.find({email: email});
		if(queriedUser){
			const doesUserExist = await bcrypt.compare(password, queriedUser.password);
			if(doesUserExist){
				delete queriedUser.password;
				res.status(200).json(queriedUser);
			}
			else{
				res.status(400).json({error: "Invalid password"});
			}
		} else{
			res.status(400).json({error: "Invalid email"});
		}
	}
	else{
		res.status(400).json({error: "Invalid Credentials"});
	}
}
