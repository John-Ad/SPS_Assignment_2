import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Staff_Course, Staff_CourseId } from './Staff_Course';
import type { User, UserId } from './User';

export interface CourseAttributes {
  Id: number;
  Name: string;
}

export type CoursePk = "Id";
export type CourseId = Course[CoursePk];
export type CourseOptionalAttributes = "Id";
export type CourseCreationAttributes = Optional<CourseAttributes, CourseOptionalAttributes>;

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  Id!: number;
  Name!: string;

  // Course hasMany Staff_Course via CourseId
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
  // Course belongsToMany User via CourseId and StaffId
  StaffId_Users!: User[];
  getStaffId_Users!: Sequelize.BelongsToManyGetAssociationsMixin<User>;
  setStaffId_Users!: Sequelize.BelongsToManySetAssociationsMixin<User, UserId>;
  addStaffId_User!: Sequelize.BelongsToManyAddAssociationMixin<User, UserId>;
  addStaffId_Users!: Sequelize.BelongsToManyAddAssociationsMixin<User, UserId>;
  createStaffId_User!: Sequelize.BelongsToManyCreateAssociationMixin<User>;
  removeStaffId_User!: Sequelize.BelongsToManyRemoveAssociationMixin<User, UserId>;
  removeStaffId_Users!: Sequelize.BelongsToManyRemoveAssociationsMixin<User, UserId>;
  hasStaffId_User!: Sequelize.BelongsToManyHasAssociationMixin<User, UserId>;
  hasStaffId_Users!: Sequelize.BelongsToManyHasAssociationsMixin<User, UserId>;
  countStaffId_Users!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Course {
    return Course.init({
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Course',
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
    ]
  });
  }
}
