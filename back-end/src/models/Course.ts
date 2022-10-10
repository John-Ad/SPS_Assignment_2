import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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


  static initModel(sequelize: Sequelize.Sequelize): typeof Course {
    return sequelize.define('Course', {
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
  }) as typeof Course;
  }
}
