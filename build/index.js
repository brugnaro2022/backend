module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(3);
const mongoose = __webpack_require__(0);
const bodyParser = __webpack_require__(4);
const cors = __webpack_require__(5);
__webpack_require__(6).config({ path: 'variables.env' });

// Models
const Contract = __webpack_require__(7);
const User = __webpack_require__(8);

// Bring Graphql-express middleware
const { graphiqlExpress, graphqlExpress } = __webpack_require__(9);
const { makeExecutableSchema } = __webpack_require__(10);

const { typeDefs } = __webpack_require__(11);
const { resolvers } = __webpack_require__(12);

// Create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Connect to database
mongoose.connect(process.env.MONGO_URI);
// .then(() => console.log('DB connected'))
// .catch(err => console.error(err));

// Initialize application
const app = express();

const corsOptions = {
  origin: 'http://localhost:5000',
  credentials: true
};

app.use(cors(corsOptions));

// Create graphiql application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Connect schemas with graphql
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: { Contract, User }
}));

const PORT = process.env.PORT || 4444;
app.listen(PORT);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(0);

const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  initialDate: {
    type: String,
    require: true,
  },
  dueDate: {
    type: String,
    require: true,
  },
  file: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model('Contract', ContractSchema);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(0);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

exports.typeDefs = `
  type Contract {
    _id: ID
    title: String! 
    initialDate: String!
    dueDate: String!
    file: String!
    createdDate: String!
    user: String
  }

  type User {
    _id: ID
    name: String!
    lastname: String!
    email: String!
    cpf: String!
    phone: String!
    createdDate: String!
  }

  type Query {
    getAllContracts: [Contract]
    getAllUsers: [User]
  }
  
  type Mutation {
    addContract(
      title: String!, 
      initialDate: String!,
      dueDate: String!,
      file: String!,
      user: String
    ): Contract
    deleteContract(_id: ID): Contract

    registerUser(
      name: String!, 
      lastname: String!, 
      email: String!, 
      cpf: String!, 
      phone: String!
      createdDate: String
    ) : User
  }
`;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

exports.resolvers = {
  Query: {
    getAllContracts: async (root, args, { Contract }) => {
      const allContracts = await Contract.find();
      return allContracts;
    },
    getAllUsers: async (root, args, { User }) => {
      const allUsers = await User.find();
      return allUsers;
    },
  },
  Mutation: {
    addContract: async (
      root,
      {
        title,
        initialDate,
        dueDate,
        file,
        user,
      },
      { Contract },
    ) => {
      const newContract = await new Contract({
        title,
        initialDate,
        dueDate,
        file,
        user,
      }).save();
      return newContract;
    },
    deleteContract: async (root, { _id }, { Contract }) => {
      const contract = await Contract.findOneAndRemove({ _id });
      return contract;
    },
    registerUser: async (
      root,
      {
        name,
        lastname,
        email,
        cpf,
        phone,
        createdDate,
      },
      { User },
    ) => {
      const user = await User.findOne({ name });
      if (user) throw new Error('User already exists!');
      const newUser = await new User({
        name,
        lastname,
        email,
        cpf,
        phone,
        createdDate,
      }).save();
      return newUser;
    },
  },
};


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map