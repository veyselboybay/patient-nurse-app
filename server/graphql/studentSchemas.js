var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var StudentModel = require("../models/Student");
var CourseModel = require("../models/Course");
var UserModel = require("../models/User");
//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "some_secret_key"; // generate this elsewhere
const jwtExpirySeconds = 300;
//
// Create a GraphQL Object Type for Student model
const studentType = new GraphQLObjectType({
  name: "student",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      college: {
        type: GraphQLString,
      },
      program: {
        type: GraphQLString,
      },
      startingYear: {
        type: GraphQLInt,
      },
    };
  },
});
// CourseType
const courseType = new GraphQLObjectType({
  name: "course",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      courseCode: {
        type: GraphQLString,
      },
      courseName: {
        type: GraphQLString,
      },
      section: {
        type: GraphQLString,
      },
      semester: {
        type: GraphQLString,
      },
    };
  },
});
const userType = new GraphQLObjectType({
  name: "user",
  fields: function () {
    return {
      userName: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      password: {
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
      students: {
        type: new GraphQLList(studentType),
        resolve: function () {
          const students = StudentModel.find().exec();
          if (!students) {
            throw new Error("Error");
          }
          return students;
        },
      },
      student: {
        type: studentType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const studentInfo = StudentModel.findById(params.id).exec();
          if (!studentInfo) {
            throw new Error("Error");
          }
          return studentInfo;
        },
      },
      courses: {
        type: new GraphQLList(courseType),
        resolve: function () {
          const courses = CourseModel.find().exec();
          if (!courses) {
            throw new Error("error");
          }
          return courses;
        },
      },
      course: {
        type: courseType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const courseInfo = CourseModel.findById(params.id).exec();
          if (!courseInfo) {
            throw new Error("Error");
          }
          return courseInfo;
        },
      },
      users: {
        type: new GraphQLList(userType),
        resolve: function () {
          const users = UserModel.find().exec();
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
      addStudent: {
        type: studentType,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          college: {
            type: new GraphQLNonNull(GraphQLString),
          },
          program: {
            type: new GraphQLNonNull(GraphQLString),
          },
          startingYear: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve: function (root, params) {
          const studentModel = new StudentModel(params);
          const newStudent = studentModel.save();
          if (!newStudent) {
            throw new Error("Error");
          }
          return newStudent;
        },
      },
      updateStudent: {
        type: studentType,
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString),
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          college: {
            type: new GraphQLNonNull(GraphQLString),
          },
          program: {
            type: new GraphQLNonNull(GraphQLString),
          },
          startingYear: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(root, params) {
          return StudentModel.findByIdAndUpdate(
            params.id,
            {
              firstName: params.firstName,
              lastName: params.lastName,
              email: params.email,
              college: params.college,
              program: params.program,
              startingYear: params.startingYear,
            },
            function (err) {
              if (err) return next(err);
            }
          );
        },
      },
      deleteStudent: {
        type: studentType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          const deletedStudent = StudentModel.findByIdAndRemove(
            params.id
          ).exec();
          if (!deletedStudent) {
            throw new Error("Error");
          }
          return deletedStudent;
        },
      },
      addCourse: {
        type: courseType,
        args: {
          courseCode: {
            type: new GraphQLNonNull(GraphQLString),
          },
          courseName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          section: {
            type: new GraphQLNonNull(GraphQLString),
          },
          semester: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: function (root, params) {
          const courseModel = new CourseModel(params);
          const newCourse = courseModel.save();
          if (!newCourse) {
            throw new Error("Error");
          }
          return newCourse;
        },
      },
      updateCourse: {
        type: courseType,
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString),
          },
          courseCode: {
            type: new GraphQLNonNull(GraphQLString),
          },
          courseName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          section: {
            type: new GraphQLNonNull(GraphQLString),
          },
          semester: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          return CourseModel.findByIdAndUpdate(
            params.id,
            {
              courseCode: params.courseCode,
              courseName: params.courseName,
              section: params.section,
              semester: params.semester,
            },
            function (err) {
              if (err) return next(err);
            }
          );
        },
      },
      deleteCourse: {
        type: courseType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          const deletedCourse = CourseModel.findByIdAndRemove(params.id).exec();
          if (!deletedCourse) {
            throw new Error("Error");
          }
          return deletedCourse;
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
        },
        resolve: async function (root, params, context) {
          const userModel = new UserModel(params);
          const newUser = await userModel.save();
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
