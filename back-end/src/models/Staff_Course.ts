import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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


  static initModel(sequelize: Sequelize.Sequelize): typeof Staff_Course {
    return sequelize.define('Staff_Course', {
    StaffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IsApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
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
    ]
  }) as typeof Staff_Course;
  }
}
