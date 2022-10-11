import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Course, CourseId } from './Course';
import type { Staff_Course, Staff_CourseId } from './Staff_Course';
import type { User_Type, User_TypeId } from './User_Type';

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
