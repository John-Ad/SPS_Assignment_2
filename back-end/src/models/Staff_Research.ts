import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface Staff_ResearchAttributes {
  Id: number;
  StaffId: number;
  Name: string;
  File_Path: string;
  IsApproved: boolean;
}

export type Staff_ResearchPk = "Id";
export type Staff_ResearchId = Staff_Research[Staff_ResearchPk];
export type Staff_ResearchOptionalAttributes = "Id" | "IsApproved";
export type Staff_ResearchCreationAttributes = Optional<Staff_ResearchAttributes, Staff_ResearchOptionalAttributes>;

export class Staff_Research extends Model<Staff_ResearchAttributes, Staff_ResearchCreationAttributes> implements Staff_ResearchAttributes {
  Id!: number;
  StaffId!: number;
  Name!: string;
  File_Path!: string;
  IsApproved!: boolean;

  // Staff_Research belongsTo User via StaffId
  Staff!: User;
  getStaff!: Sequelize.BelongsToGetAssociationMixin<User>;
  setStaff!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createStaff!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Staff_Research {
    return Staff_Research.init({
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    StaffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'Id'
      }
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    File_Path: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    IsApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'Staff_Research',
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
        name: "StaffId",
        using: "BTREE",
        fields: [
          { name: "StaffId" },
        ]
      },
    ]
  });
  }
}
