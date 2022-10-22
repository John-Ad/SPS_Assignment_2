import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface Staff_Community_OutreachAttributes {
  Id: number;
  StaffId: number;
  Name: string;
  File_Path: string;
  IsApproved: boolean;
}

export type Staff_Community_OutreachPk = "Id";
export type Staff_Community_OutreachId = Staff_Community_Outreach[Staff_Community_OutreachPk];
export type Staff_Community_OutreachOptionalAttributes = "Id" | "IsApproved";
export type Staff_Community_OutreachCreationAttributes = Optional<Staff_Community_OutreachAttributes, Staff_Community_OutreachOptionalAttributes>;

export class Staff_Community_Outreach extends Model<Staff_Community_OutreachAttributes, Staff_Community_OutreachCreationAttributes> implements Staff_Community_OutreachAttributes {
  Id!: number;
  StaffId!: number;
  Name!: string;
  File_Path!: string;
  IsApproved!: boolean;

  // Staff_Community_Outreach belongsTo User via StaffId
  Staff!: User;
  getStaff!: Sequelize.BelongsToGetAssociationMixin<User>;
  setStaff!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createStaff!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Staff_Community_Outreach {
    return Staff_Community_Outreach.init({
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
    tableName: 'Staff_Community_Outreach',
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
