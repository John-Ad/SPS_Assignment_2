import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Staff_Admin_Task, Staff_Admin_TaskId } from './Staff_Admin_Task';
import type { User, UserId } from './User';

export interface Admin_TaskAttributes {
  Id: number;
  Name: string;
}

export type Admin_TaskPk = "Id";
export type Admin_TaskId = Admin_Task[Admin_TaskPk];
export type Admin_TaskOptionalAttributes = "Id";
export type Admin_TaskCreationAttributes = Optional<Admin_TaskAttributes, Admin_TaskOptionalAttributes>;

export class Admin_Task extends Model<Admin_TaskAttributes, Admin_TaskCreationAttributes> implements Admin_TaskAttributes {
  Id!: number;
  Name!: string;

  // Admin_Task hasMany Staff_Admin_Task via AdminTaskId
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
  // Admin_Task belongsToMany User via AdminTaskId and StaffId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Admin_Task {
    return Admin_Task.init({
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Admin_Task',
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
