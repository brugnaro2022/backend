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
