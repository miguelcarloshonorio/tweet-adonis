'use strict';

const User = use('App/Models/User');
const { validateAll }= use('Validator');

class AuthController {
  async register({ request, response }){
    const rules = {
      username: 'required|min:5|unique:users',
      email: 'required|email|unique:users,email',
      password: 'required|min:5',
    };

    try {

      const validation = await validateAll(request.all(), rules);
      
      if(validation.fails()){
        return response.status(401).send({messages: validation.messages()});
      }
      const data = request.only(['email','password', 'username']);
      const user = await User.create(data);

      return user;
    } catch (error) {

      return response.status(500).send({error: `Error: ${error.message}`});
    }

  }

  async authenticate({request, auth}){
    const { email, password} = request.all();
    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = AuthController;
