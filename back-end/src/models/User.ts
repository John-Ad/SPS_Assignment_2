import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
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

  // User belongsTo User_Type via Type_Id
  Type!: User_Type;
  getType!: Sequelize.BelongsToGetAssociationMixin<User_Type>;
  setType!: Sequelize.BelongsToSetAssociationMixin<User_Type, User_TypeId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<User_Type>;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return sequelize.define('User', {
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
  }) as typeof User;
  }
}
