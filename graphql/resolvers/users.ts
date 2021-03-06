import { ApolloServer, gql, UserInputError } from "apollo-server";
import { User } from "../../models/index";
import { ApolloError } from "apollo-server-errors";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  Mutation: {
    async registerUser(
      _: any,
      { registerInput: { username, email, password } }: any
    ) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError(
          "A user is already registered with the email: " + email,
          "USER_ALREADY_EXISTS"
        );
      }

      var encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFESTRING", {
        expiresIn: "2h",
      });

      newUser.token = token;

      const res = await newUser.save();

      /**
       * Whenever a new user is registered, they must be included in the Starters Chat.
       * This is done in mixedResolvers.
       */

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { username, password } }) {
      const user = await User.findOne({ username });

      if (!(username && password)) {
        throw new ApolloError("All input is required", "INCORRECT_INPUT");
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, username },
          "UNSAFESTRING",
          { expiresIn: "1h" }
        );

        // save user token
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      }
      throw new ApolloError("Incorrect credentials", "INCORRECT_CREDENTIALS");
    },
    async changeUsername(_, { id, editUsernameInput: { username } }) {
      const oldUser = await User.findOne({ username });

      if (oldUser) {
        throw new ApolloError(
          "That username is already in use",
          "USERNAME_ALREADY_EXISTS"
        );
      }

      const wasUpdated = (
        await User.updateOne({ _id: id }, { username: username })
      ).modifiedCount;
      return wasUpdated;
    },
    async changeEmail(_, { id, editEmailInput: { email } }) {
      email = email.toLowerCase();
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError(
          "That email is already in use.",
          "USERNAME_ALREADY_EXISTS"
        );
      }

      const wasUpdated = (await User.updateOne({ _id: id }, { email: email }))
        .modifiedCount;
      return wasUpdated > 0;
    },
    async changePassword(_, { id, editPasswordInput: { password } }) {
      const wasUpdated = (
        await User.updateOne(
          { _id: id },
          { password: await bcrypt.hash(password, 10) }
        )
      ).modifiedCount;
      return wasUpdated > 0;
    },
  },
  Query: {
    async user(_, { id }) {
      return await User.findById(id);
    },
  },
};
