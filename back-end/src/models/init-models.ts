import type { Sequelize } from "sequelize";
import { Admin_Task as _Admin_Task } from "./Admin_Task";
import type { Admin_TaskAttributes, Admin_TaskCreationAttributes } from "./Admin_Task";
import { Course as _Course } from "./Course";
import type { CourseAttributes, CourseCreationAttributes } from "./Course";
import { Staff_Admin_Task as _Staff_Admin_Task } from "./Staff_Admin_Task";
import type { Staff_Admin_TaskAttributes, Staff_Admin_TaskCreationAttributes } from "./Staff_Admin_Task";
import { Staff_Community_Outreach as _Staff_Community_Outreach } from "./Staff_Community_Outreach";
import type { Staff_Community_OutreachAttributes, Staff_Community_OutreachCreationAttributes } from "./Staff_Community_Outreach";
import { Staff_Course as _Staff_Course } from "./Staff_Course";
import type { Staff_CourseAttributes, Staff_CourseCreationAttributes } from "./Staff_Course";
import { Staff_Research as _Staff_Research } from "./Staff_Research";
import type { Staff_ResearchAttributes, Staff_ResearchCreationAttributes } from "./Staff_Research";
import { User as _User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";
import { User_Type as _User_Type } from "./User_Type";
import type { User_TypeAttributes, User_TypeCreationAttributes } from "./User_Type";

export {
  _Admin_Task as Admin_Task,
  _Course as Course,
  _Staff_Admin_Task as Staff_Admin_Task,
  _Staff_Community_Outreach as Staff_Community_Outreach,
  _Staff_Course as Staff_Course,
  _Staff_Research as Staff_Research,
  _User as User,
  _User_Type as User_Type,
};

export type {
  Admin_TaskAttributes,
  Admin_TaskCreationAttributes,
  CourseAttributes,
  CourseCreationAttributes,
  Staff_Admin_TaskAttributes,
  Staff_Admin_TaskCreationAttributes,
  Staff_Community_OutreachAttributes,
  Staff_Community_OutreachCreationAttributes,
  Staff_CourseAttributes,
  Staff_CourseCreationAttributes,
  Staff_ResearchAttributes,
  Staff_ResearchCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  User_TypeAttributes,
  User_TypeCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Admin_Task = _Admin_Task.initModel(sequelize);
  const Course = _Course.initModel(sequelize);
  const Staff_Admin_Task = _Staff_Admin_Task.initModel(sequelize);
  const Staff_Community_Outreach = _Staff_Community_Outreach.initModel(sequelize);
  const Staff_Course = _Staff_Course.initModel(sequelize);
  const Staff_Research = _Staff_Research.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const User_Type = _User_Type.initModel(sequelize);

  Admin_Task.belongsToMany(User, { as: 'StaffId_Users', through: Staff_Admin_Task, foreignKey: "AdminTaskId", otherKey: "StaffId" });
  Course.belongsToMany(User, { as: 'StaffId_User_Staff_Courses', through: Staff_Course, foreignKey: "CourseId", otherKey: "StaffId" });
  User.belongsToMany(Admin_Task, { as: 'AdminTaskId_Admin_Tasks', through: Staff_Admin_Task, foreignKey: "StaffId", otherKey: "AdminTaskId" });
  User.belongsToMany(Course, { as: 'CourseId_Courses', through: Staff_Course, foreignKey: "StaffId", otherKey: "CourseId" });
  Staff_Admin_Task.belongsTo(Admin_Task, { as: "AdminTask", foreignKey: "AdminTaskId"});
  Admin_Task.hasMany(Staff_Admin_Task, { as: "Staff_Admin_Tasks", foreignKey: "AdminTaskId"});
  Staff_Course.belongsTo(Course, { as: "Course", foreignKey: "CourseId"});
  Course.hasMany(Staff_Course, { as: "Staff_Courses", foreignKey: "CourseId"});
  Staff_Admin_Task.belongsTo(User, { as: "Staff", foreignKey: "StaffId"});
  User.hasMany(Staff_Admin_Task, { as: "Staff_Admin_Tasks", foreignKey: "StaffId"});
  Staff_Community_Outreach.belongsTo(User, { as: "Staff", foreignKey: "StaffId"});
  User.hasMany(Staff_Community_Outreach, { as: "Staff_Community_Outreaches", foreignKey: "StaffId"});
  Staff_Course.belongsTo(User, { as: "Staff", foreignKey: "StaffId"});
  User.hasMany(Staff_Course, { as: "Staff_Courses", foreignKey: "StaffId"});
  Staff_Research.belongsTo(User, { as: "Staff", foreignKey: "StaffId"});
  User.hasMany(Staff_Research, { as: "Staff_Researches", foreignKey: "StaffId"});
  User.belongsTo(User_Type, { as: "Type", foreignKey: "Type_Id"});
  User_Type.hasMany(User, { as: "Users", foreignKey: "Type_Id"});

  return {
    Admin_Task: Admin_Task,
    Course: Course,
    Staff_Admin_Task: Staff_Admin_Task,
    Staff_Community_Outreach: Staff_Community_Outreach,
    Staff_Course: Staff_Course,
    Staff_Research: Staff_Research,
    User: User,
    User_Type: User_Type,
  };
}
