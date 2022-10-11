import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Course, CourseId } from './Course';
import type { User, UserId } from './User';

export interface Staff_CourseAttributes {
  StaffId: number;
  CourseId: number;
  IsApproved: boolean;
}

export type Staff_CoursePk = "StaffId" | "CourseId";
export type Staff_CourseId = Staff_Course[Staff_CoursePk];
export type Staff_CourseOptionalAttributes = "IsApproved";
export type Staff_CourseCreationAttributes = Optional<Staff_CourseAttributes, Staff_CourseOptionalAttributes>;

export class Staff_Course extends Model<Staff_CourseAttributes, Staff_CourseCreationAttributes> implements Staff_CourseAttributes {
  StaffId!: number;
  CourseId!: number;
  IsApproved!: boolean;

  // Staff_Course belongsTo Course via CourseId
  Course!: Course;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<Course>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<Course, CourseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<Course>;
  // Staff_Course belongsTo User via StaffId
  Staff!: User;
  getStaff!: Sequelize.BelongsToGetAssociationMixin<User>;
  setStaff!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createStaff!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Staff_Course {
    return Staff_Course.init({
    StaffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'Id'
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Course',
        key: 'Id'
      }
    },
    IsApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'Staff_Course',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StaffId" },
          { name: "CourseId" },
        ]
      },
      {
        name: "CourseId",
        using: "BTREE",
        fields: [
          { name: "CourseId" },
        ]
      },
    ]
  });
  }
}
