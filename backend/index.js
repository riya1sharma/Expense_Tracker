const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const privatekey = 'gasfgsdvagsdftfdywkfhdsa'
app.use(cors());
app.use(bodyParser.json());
// const { Schema } = mongoose;

//------------------------------------------MongoDB Connection------------------------------------------
// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/expense_tracker');
mongoose.connection.on('connected', ()=>{
	console.log('connected to database MongoDB');
});
mongoose.connection.on('error', (err)=>{
	if(err){
		console.log('Error in database connection: '+ err);
	}
});



//-----------------------------------------------Schema------------------------------------
//--------User Schema--------------
const userSchema = new mongoose.Schema({
    firstName: String, 
    contact: String,
    email:String,
    password:String,
    confirmPassword:String,
  });
  const User = mongoose.model('User', userSchema);

  mongoose.connection.on('connected', () => {
    // console.log('Connected to MongoDB');
    User.createCollection().then(() => {
      console.log('User collection created');
    }).catch((error) => {
      console.error('Error creating User collection:', error);
    });
  });

  //------Income Schema-----------------
  const incomeSchema = new mongoose.Schema({
    incomeDate: {
      type: Date,
      required: true,
    },
    incomeType: {
      type: String,
      required: true,
    },
    incomeAmount: {
      type: Number,
      required: true,
    },
  });
  const Income = mongoose.model('Income', incomeSchema);

//--------Expense Schema---------
const expenseSchema = new mongoose.Schema({
  expenseDate: {
    type: Date,
    required: true,
  },
  expenseType: {
    type: String,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
  },
});
const Expense = mongoose.model('Expense', expenseSchema);

//--------Todo Schema-------
const todoSchema = new mongoose.Schema({
  todoDate: {
    type: Date,
    required: true,
  },
  todoType: {
    type: String,
    required: true,
  },
  todoAmount: {
    type: Number,
    required: true,
  },
});
const Todo = mongoose.model('Todo', todoSchema);




  //----------------------------------------------------Routes-----------------------------------------------------

//-------------Register route-----------
app.post('/register', (req, res)=> {
    
    console.log("body data: ",req.body);
    const{firstName,contact,email,password,confirmPassword} = req.body;
    const createNewUser = new User({
        firstName: firstName, 
        contact: contact,
        email:email,
        password:password,
        confirmPassword:confirmPassword,
    });
    createNewUser.save().then((result)=>{
        res.status(201).json({msg:'New user created successfully!',result});
    });

});

function generateToken(payload){
  const token = jwt.sign(payload, privatekey);
  return token;
}


//---------------Login routes---------
app.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user && user.password === password) {
      console.log(user);
      res.status(200).send({ msg: 'Login Successfully!', result: user, token:generateToken({email:email,password:password}) });
    } else {
      console.log('Invalid email or password');
      res.status(500).send({ msg: 'Enter valid email or password' });
    }
  });
});


//-----------Income Routes-----------
app.post('/income', (req, res)=> {
    
  console.log("body data: ",req.body);
  const{incomeDate, incomeType, incomeAmount} = req.body;
  const createIncome = new Income({
      incomeDate: incomeDate,
      incomeType: incomeType,
      incomeAmount: incomeAmount,
  });
  createIncome.save().then((result)=>{
      res.status(201).json({msg:'New income detail added successfully!',result});
  });

});


//----------Expense Routes-------------
app.post('/expense', (req, res)=> {
    
  console.log("body data: ",req.body);
  const{expenseDate, expenseType, expenseAmount} = req.body;
  const createExpense = new Expense({
      expenseDate: expenseDate,
      expenseType: expenseType,
      expenseAmount: expenseAmount,
  });
  createExpense.save().then((result)=>{
      res.status(201).json({msg:'New expense detail added successfully!',result});
  });

});


//----------Todo Routes------------
app.post('/todo', (req, res)=> {
    
  console.log("body data: ",req.body);
  const{todoDate, todoType, todoAmount} = req.body;
  const createTodo = new Todo({
      todoDate: todoDate,
      todoType: todoType,
      todoAmount: todoAmount,
  });
      createTodo.save().then((result)=>{
        res.status(201).json({msg:'New todo list detail added successfully!',result});
    });

});





app.listen(port, () => {
    console.log("server running on port:", port);
});

