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
