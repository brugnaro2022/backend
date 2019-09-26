const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });

// Models
const Contract = require('.././models/Contract');
const User = require('.././models/User');

// Bring Graphql-express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('../schema');
const { resolvers } = require('../resolvers');

// Create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Connect to database
mongoose
  .connect(process.env.MONGO_URI);
// .then(() => console.log('DB connected'))
// .catch(err => console.error(err));

// Initialize application
const app = express();

const corsOptions = {
  origin: 'http://localhost:5000',
  credentials: true,
};

app.use(cors(corsOptions));

// Create graphiql application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Connect schemas with graphql
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: { Contract, User },
  }),
);

const PORT = process.env.PORT || 4444;
app.listen(PORT);
