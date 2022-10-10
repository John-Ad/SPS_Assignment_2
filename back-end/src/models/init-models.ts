import type { Sequelize } from "sequelize";
import { Course as _Course } from "./Course";
import type { CourseAttributes, CourseCreationAttributes } from "./Course";
import { Staff_Course as _Staff_Course } from "./Staff_Course";
import type { Staff_CourseAttributes, Staff_CourseCreationAttributes } from "./Staff_Course";
import { User as _User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";
import { User_Type as _User_Type } from "./User_Type";
import type { User_TypeAttributes, User_TypeCreationAttributes } from "./User_Type";

export {
  _Course as Course,
  _Staff_Course as Staff_Course,
  _User as User,
  _User_Type as User_Type,
};

export type {
  CourseAttributes,
  CourseCreationAttributes,
  Staff_CourseAttributes,
  Staff_CourseCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  User_TypeAttributes,
  User_TypeCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Course = _Course.initModel(sequelize);
  const Staff_Course = _Staff_Course.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const User_Type = _User_Type.initModel(sequelize);

  User.belongsTo(User_Type, { as: "Type", foreignKey: "Type_Id"});
  User_Type.hasMany(User, { as: "Users", foreignKey: "Type_Id"});

  return {
    Course: Course,
    Staff_Course: Staff_Course,
    User: User,
    User_Type: User_Type,
  };
}
