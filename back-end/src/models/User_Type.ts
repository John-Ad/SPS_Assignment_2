import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface User_TypeAttributes {
  Id: number;
  Name: string;
}

export type User_TypePk = "Id";
export type User_TypeId = User_Type[User_TypePk];
export type User_TypeOptionalAttributes = "Id";
export type User_TypeCreationAttributes = Optional<User_TypeAttributes, User_TypeOptionalAttributes>;

export class User_Type extends Model<User_TypeAttributes, User_TypeCreationAttributes> implements User_TypeAttributes {
  Id!: number;
  Name!: string;

  // User_Type hasMany User via Type_Id
  Users!: User[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<User>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<User, UserId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<User, UserId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<User, UserId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<User>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<User, UserId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<User, UserId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<User, UserId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<User, UserId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof User_Type {
    return User_Type.init({
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
    tableName: 'User_Type',
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
