import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Admin_Task, Admin_TaskId } from './Admin_Task';
import type { Course, CourseId } from './Course';
import type { Staff_Admin_Task, Staff_Admin_TaskId } from './Staff_Admin_Task';
import type { Staff_Community_Outreach, Staff_Community_OutreachId } from './Staff_Community_Outreach';
import type { Staff_Course, Staff_CourseId } from './Staff_Course';
import type { Staff_Research, Staff_ResearchId } from './Staff_Research';
import type { User_Type, User_TypeId } from './User_Type';
import type { Workload_Sheet, Workload_SheetId } from './Workload_Sheet';

export interface UserAttributes {
  Id: number;
  Type_Id: number;
  Email: string;
  Password: string;
  First_Name: string;
  Last_Name: string;
}

export type UserPk = "Id";
export type UserId = User[UserPk];
export type UserOptionalAttributes = "Id";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  Id!: number;
  Type_Id!: number;
  Email!: string;
  Password!: string;
  First_Name!: string;
  Last_Name!: string;

  // User belongsToMany Admin_Task via StaffId and AdminTaskId
  AdminTaskId_Admin_Tasks!: Admin_Task[];
  getAdminTaskId_Admin_Tasks!: Sequelize.BelongsToManyGetAssociationsMixin<Admin_Task>;
  setAdminTaskId_Admin_Tasks!: Sequelize.BelongsToManySetAssociationsMixin<Admin_Task, Admin_TaskId>;
  addAdminTaskId_Admin_Task!: Sequelize.BelongsToManyAddAssociationMixin<Admin_Task, Admin_TaskId>;
  addAdminTaskId_Admin_Tasks!: Sequelize.BelongsToManyAddAssociationsMixin<Admin_Task, Admin_TaskId>;
  createAdminTaskId_Admin_Task!: Sequelize.BelongsToManyCreateAssociationMixin<Admin_Task>;
  removeAdminTaskId_Admin_Task!: Sequelize.BelongsToManyRemoveAssociationMixin<Admin_Task, Admin_TaskId>;
  removeAdminTaskId_Admin_Tasks!: Sequelize.BelongsToManyRemoveAssociationsMixin<Admin_Task, Admin_TaskId>;
  hasAdminTaskId_Admin_Task!: Sequelize.BelongsToManyHasAssociationMixin<Admin_Task, Admin_TaskId>;
  hasAdminTaskId_Admin_Tasks!: Sequelize.BelongsToManyHasAssociationsMixin<Admin_Task, Admin_TaskId>;
  countAdminTaskId_Admin_Tasks!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User belongsToMany Course via StaffId and CourseId
  CourseId_Courses!: Course[];
  getCourseId_Courses!: Sequelize.BelongsToManyGetAssociationsMixin<Course>;
  setCourseId_Courses!: Sequelize.BelongsToManySetAssociationsMixin<Course, CourseId>;
  addCourseId_Course!: Sequelize.BelongsToManyAddAssociationMixin<Course, CourseId>;
  addCourseId_Courses!: Sequelize.BelongsToManyAddAssociationsMixin<Course, CourseId>;
  createCourseId_Course!: Sequelize.BelongsToManyCreateAssociationMixin<Course>;
  removeCourseId_Course!: Sequelize.BelongsToManyRemoveAssociationMixin<Course, CourseId>;
  removeCourseId_Courses!: Sequelize.BelongsToManyRemoveAssociationsMixin<Course, CourseId>;
  hasCourseId_Course!: Sequelize.BelongsToManyHasAssociationMixin<Course, CourseId>;
  hasCourseId_Courses!: Sequelize.BelongsToManyHasAssociationsMixin<Course, CourseId>;
  countCourseId_Courses!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User hasMany Staff_Admin_Task via StaffId
  Staff_Admin_Tasks!: Staff_Admin_Task[];
  getStaff_Admin_Tasks!: Sequelize.HasManyGetAssociationsMixin<Staff_Admin_Task>;
  setStaff_Admin_Tasks!: Sequelize.HasManySetAssociationsMixin<Staff_Admin_Task, Staff_Admin_TaskId>;
  addStaff_Admin_Task!: Sequelize.HasManyAddAssociationMixin<Staff_Admin_Task, Staff_Admin_TaskId>;
  addStaff_Admin_Tasks!: Sequelize.HasManyAddAssociationsMixin<Staff_Admin_Task, Staff_Admin_TaskId>;
  createStaff_Admin_Task!: Sequelize.HasManyCreateAssociationMixin<Staff_Admin_Task>;
  removeStaff_Admin_Task!: Sequelize.HasManyRemoveAssociationMixin<Staff_Admin_Task, Staff_Admin_TaskId>;
  removeStaff_Admin_Tasks!: Sequelize.HasManyRemoveAssociationsMixin<Staff_Admin_Task, Staff_Admin_TaskId>;
  hasStaff_Admin_Task!: Sequelize.HasManyHasAssociationMixin<Staff_Admin_Task, Staff_Admin_TaskId>;
  hasStaff_Admin_Tasks!: Sequelize.HasManyHasAssociationsMixin<Staff_Admin_Task, Staff_Admin_TaskId>;
  countStaff_Admin_Tasks!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Staff_Community_Outreach via StaffId
  Staff_Community_Outreaches!: Staff_Community_Outreach[];
  getStaff_Community_Outreaches!: Sequelize.HasManyGetAssociationsMixin<Staff_Community_Outreach>;
  setStaff_Community_Outreaches!: Sequelize.HasManySetAssociationsMixin<Staff_Community_Outreach, Staff_Community_OutreachId>;
  addStaff_Community_Outreach!: Sequelize.HasManyAddAssociationMixin<Staff_Community_Outreach, Staff_Community_OutreachId>;
  addStaff_Community_Outreaches!: Sequelize.HasManyAddAssociationsMixin<Staff_Community_Outreach, Staff_Community_OutreachId>;
  createStaff_Community_Outreach!: Sequelize.HasManyCreateAssociationMixin<Staff_Community_Outreach>;
  removeStaff_Community_Outreach!: Sequelize.HasManyRemoveAssociationMixin<Staff_Community_Outreach, Staff_Community_OutreachId>;
  removeStaff_Community_Outreaches!: Sequelize.HasManyRemoveAssociationsMixin<Staff_Community_Outreach, Staff_Community_OutreachId>;
  hasStaff_Community_Outreach!: Sequelize.HasManyHasAssociationMixin<Staff_Community_Outreach, Staff_Community_OutreachId>;
  hasStaff_Community_Outreaches!: Sequelize.HasManyHasAssociationsMixin<Staff_Community_Outreach, Staff_Community_OutreachId>;
  countStaff_Community_Outreaches!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Staff_Course via StaffId
  Staff_Courses!: Staff_Course[];
  getStaff_Courses!: Sequelize.HasManyGetAssociationsMixin<Staff_Course>;
  setStaff_Courses!: Sequelize.HasManySetAssociationsMixin<Staff_Course, Staff_CourseId>;
  addStaff_Course!: Sequelize.HasManyAddAssociationMixin<Staff_Course, Staff_CourseId>;
  addStaff_Courses!: Sequelize.HasManyAddAssociationsMixin<Staff_Course, Staff_CourseId>;
  createStaff_Course!: Sequelize.HasManyCreateAssociationMixin<Staff_Course>;
  removeStaff_Course!: Sequelize.HasManyRemoveAssociationMixin<Staff_Course, Staff_CourseId>;
  removeStaff_Courses!: Sequelize.HasManyRemoveAssociationsMixin<Staff_Course, Staff_CourseId>;
  hasStaff_Course!: Sequelize.HasManyHasAssociationMixin<Staff_Course, Staff_CourseId>;
  hasStaff_Courses!: Sequelize.HasManyHasAssociationsMixin<Staff_Course, Staff_CourseId>;
  countStaff_Courses!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Staff_Research via StaffId
  Staff_Researches!: Staff_Research[];
  getStaff_Researches!: Sequelize.HasManyGetAssociationsMixin<Staff_Research>;
  setStaff_Researches!: Sequelize.HasManySetAssociationsMixin<Staff_Research, Staff_ResearchId>;
  addStaff_Research!: Sequelize.HasManyAddAssociationMixin<Staff_Research, Staff_ResearchId>;
  addStaff_Researches!: Sequelize.HasManyAddAssociationsMixin<Staff_Research, Staff_ResearchId>;
  createStaff_Research!: Sequelize.HasManyCreateAssociationMixin<Staff_Research>;
  removeStaff_Research!: Sequelize.HasManyRemoveAssociationMixin<Staff_Research, Staff_ResearchId>;
  removeStaff_Researches!: Sequelize.HasManyRemoveAssociationsMixin<Staff_Research, Staff_ResearchId>;
  hasStaff_Research!: Sequelize.HasManyHasAssociationMixin<Staff_Research, Staff_ResearchId>;
  hasStaff_Researches!: Sequelize.HasManyHasAssociationsMixin<Staff_Research, Staff_ResearchId>;
  countStaff_Researches!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Workload_Sheet via StaffId
  Workload_Sheets!: Workload_Sheet[];
  getWorkload_Sheets!: Sequelize.HasManyGetAssociationsMixin<Workload_Sheet>;
  setWorkload_Sheets!: Sequelize.HasManySetAssociationsMixin<Workload_Sheet, Workload_SheetId>;
  addWorkload_Sheet!: Sequelize.HasManyAddAssociationMixin<Workload_Sheet, Workload_SheetId>;
  addWorkload_Sheets!: Sequelize.HasManyAddAssociationsMixin<Workload_Sheet, Workload_SheetId>;
  createWorkload_Sheet!: Sequelize.HasManyCreateAssociationMixin<Workload_Sheet>;
  removeWorkload_Sheet!: Sequelize.HasManyRemoveAssociationMixin<Workload_Sheet, Workload_SheetId>;
  removeWorkload_Sheets!: Sequelize.HasManyRemoveAssociationsMixin<Workload_Sheet, Workload_SheetId>;
  hasWorkload_Sheet!: Sequelize.HasManyHasAssociationMixin<Workload_Sheet, Workload_SheetId>;
  hasWorkload_Sheets!: Sequelize.HasManyHasAssociationsMixin<Workload_Sheet, Workload_SheetId>;
  countWorkload_Sheets!: Sequelize.HasManyCountAssociationsMixin;
  // User belongsTo User_Type via Type_Id
  Type!: User_Type;
  getType!: Sequelize.BelongsToGetAssociationMixin<User_Type>;
  setType!: Sequelize.BelongsToSetAssociationMixin<User_Type, User_TypeId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<User_Type>;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init({
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Type_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User_Type',
        key: 'Id'
      }
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    First_Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Last_Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "Type_Id",
        using: "BTREE",
        fields: [
          { name: "Type_Id" },
        ]
      },
    ]
  });
  }
}
