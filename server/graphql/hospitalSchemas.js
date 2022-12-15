var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var UserModel = require("../models/User");
var VitalSignsModel = require("../models/VitalSigns");
var MotivationalTipsModel = require("../models/MotivationalTips");
//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "some_secret_key"; // generate this elsewhere
const jwtExpirySeconds = 300;

// Create a user Type
const userType = new GraphQLObjectType({
  name: "user",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      userName: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
      userType: {
        type: GraphQLString,
      },
    };
  },
});
// Create a VitalSigns graphql schema
const vitalSignsType = new GraphQLObjectType({
  name: "vitalSigns",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      patientId: {
        type: GraphQLString,
      },
      bodyTemperature: {
        type: GraphQLInt,
      },
      heartRate: {
        type: GraphQLInt,
      },
      bloodPressure: {
        type: GraphQLInt,
      },
      respiratoryRate: {
        type: GraphQLInt,
      },
      lastVisit: {
        type: GraphQLString,
      },
    };
  },
});

// Create a Motivational Tips type
const motivationalTipsType = new GraphQLObjectType({
  name: "motivationalTips",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      tip: {
        type: GraphQLString,
      },
    };
  },
});

// create a GraphQL query type that returns all students or a student by id
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      motivationalTips: {
        type: new GraphQLList(motivationalTipsType),
        resolve: function () {
          const tips = MotivationalTipsModel.find().exec();
          if (!tips) {
            throw new Error("Error");
          }
          return tips;
        },
      },
      vitalSigns: {
        type: new GraphQLList(vitalSignsType),
        resolve: function () {
          const signs = VitalSignsModel.find().exec();
          if (!signs) {
            throw new Error("Error");
          }
          return signs;
        },
      },
      users: {
        type: new GraphQLList(userType),
        resolve: function (root, params) {
          const users = UserModel.find({}).exec();
          if (!users) {
            throw new Error("Error");
          }
          return users;
        },
      },
      user: {
        type: userType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const userInfo = UserModel.findById(params.id).exec();
          if (!userInfo) {
            throw new Error("Error");
          }
          return userInfo;
        },
      },
    };
  },
});
//
// add mutations for CRUD operations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addVitalSigns: {
        type: vitalSignsType,
        args: {
          patientId: {
            type: GraphQLString,
          },
          bodyTemperature: {
            type: GraphQLInt,
          },
          heartRate: {
            type: GraphQLInt,
          },
          bloodPressure: {
            type: GraphQLInt,
          },
          respiratoryRate: {
            type: GraphQLInt,
          },
          lastVisit: {
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const vitalSignsModel = new VitalSignsModel(params);
          const newSign = vitalSignsModel.save();
          if (!newSign) {
            throw new Error("Error");
          }
          return newSign;
        },
      },
      updateVitalSigns: {
        type: vitalSignsType,
        args: {
          patientId: {
            type: GraphQLString,
          },
          bodyTemperature: {
            type: GraphQLInt,
          },
          heartRate: {
            type: GraphQLInt,
          },
          bloodPressure: {
            type: GraphQLInt,
          },
          respiratoryRate: {
            type: GraphQLInt,
          },
          lastVisit: {
            type: GraphQLString,
          },
        },
        resolve(root, params) {
          return VitalSignsModel.findOneAndUpdate(
            { patientId: params.patientId },
            {
              bodyTemperature: params.bodyTemperature,
              heartRate: params.heartRate,
              bloodPressure: params.bloodPressure,
              respiratoryRate: params.respiratoryRate,
              lastVisit: params.lastVisit,
            },
            function (err) {
              if (err) return next(err);
            }
          );
        },
      },
      deleteVitalSign: {
        type: vitalSignsType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          const deletedSign = VitalSignsModel.findByIdAndRemove(
            params.id
          ).exec();
          if (!deletedSign) {
            throw new Error("Error");
          }
          return deletedSign;
        },
      },
      addMotivationalTips: {
        type: motivationalTipsType,
        args: {
          tip: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: function (root, params) {
          const motivationalTipsModel = new MotivationalTipsModel(params);
          const newTip = motivationalTipsModel.save();
          if (!newTip) {
            throw new Error("Error");
          }
          return newTip;
        },
      },
      createUser: {
        type: userType,
        args: {
          userName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          password: {
            type: new GraphQLNonNull(GraphQLString),
          },
          userType: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: async function (root, params, context) {
          const userModel = new UserModel(params);
          const newUser = await userModel.save();
          console.log(newUser);
          if (!newUser) {
            throw new Error("Error");
          }
          return newUser;
        },
      },

      //
      loginUser: {
        type: GraphQLString,
        args: {
          email: {
            name: "email",
            type: GraphQLString,
          },
          password: {
            name: "password",
            type: GraphQLString,
          },
        },

        resolve: async function (root, params, context) {
          console.log("email:", params.email);
          // find the user with email if exists
          const userInfo = await UserModel.findOne({
            email: params.email,
          }).exec();
          console.log(userInfo);
          if (!userInfo) {
            throw new Error("Error - user not found");
          }
          console.log("email:", userInfo.email);
          console.log("entered pass: ", params.password);
          console.log("hash", userInfo.password);
          // check if the password is correct
          bcrypt.compare(params.password, userInfo.password, (err, result) => {
            if (err) {
              throw err;
            } else if (!result) {
              console.log("Password doesn't match!");
            } else {
              console.log("Password matches!");
            }
          });
          // sign the given payload (arguments of sign method) into a JSON Web Token
          // and which expires 300 seconds after issue
          const token = jwt.sign(
            { _id: userInfo._id, email: userInfo.email },
            JWT_SECRET,
            { algorithm: "HS256", expiresIn: jwtExpirySeconds }
          );
          console.log("registered token:", token);

          // set the cookie as the token string, with a similar max age as the token
          // here, the max age is in milliseconds
          context.res.cookie("token", token, {
            maxAge: jwtExpirySeconds * 1000,
            httpOnly: true,
          });
          //context.res.status(200).send({ screen: userInfo.username });
          return userInfo.email;
          //return { screen: userInfo.username }
          //return {token, userId: userInfo._id}
        }, //end of resolver function
      },
      //
      isLoggedIn: {
        type: GraphQLString,
        args: {
          email: {
            name: "email",
            type: GraphQLString,
          },
        },
        resolve: function (root, params, context) {
          //
          console.log(params);
          console.log("in isLoggedIn.....");
          console.log(context.req.cookies["token"]);
          //const req = context.req;
          //const res = context.res;
          console.log("token: ");
          //
          // Obtain the session token from the requests cookies,
          // which come with every request
          const token = context.req.cookies.token;
          console.log("token from request: ", token);
          // if the cookie is not set, return 'auth'
          if (!token) {
            return "auth";
          }
          var payload;
          try {
            // Parse the JWT string and store the result in `payload`.
            // Note that we are passing the key in this method as well. This method will throw an error
            // if the token is invalid (if it has expired according to the expiry time we set on sign in),
            // or if the signature does not match
            payload = jwt.verify(token, JWT_SECRET);
          } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
              // the JWT is unauthorized, return a 401 error
              console.log("jwt error");
              return context.res.status(401).end();
            }
            // otherwise, return a bad request error
            console.log("bad request error");
            return context.res.status(400).end();
          }
          console.log("email from payload: ", payload.email);
          // Finally, token is ok, return the username given in the token
          // res.status(200).send({ screen: payload.email });
          return payload.email;
        },
      }, //
    };
  },
});

//
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
