import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Admin_Task, Admin_TaskId } from './Admin_Task';
import type { User, UserId } from './User';

export interface Staff_Admin_TaskAttributes {
  StaffId: number;
  AdminTaskId: number;
  IsApproved: boolean;
}

export type Staff_Admin_TaskPk = "StaffId" | "AdminTaskId";
export type Staff_Admin_TaskId = Staff_Admin_Task[Staff_Admin_TaskPk];
export type Staff_Admin_TaskOptionalAttributes = "IsApproved";
export type Staff_Admin_TaskCreationAttributes = Optional<Staff_Admin_TaskAttributes, Staff_Admin_TaskOptionalAttributes>;

export class Staff_Admin_Task extends Model<Staff_Admin_TaskAttributes, Staff_Admin_TaskCreationAttributes> implements Staff_Admin_TaskAttributes {
  StaffId!: number;
  AdminTaskId!: number;
  IsApproved!: boolean;

  // Staff_Admin_Task belongsTo Admin_Task via AdminTaskId
  AdminTask!: Admin_Task;
  getAdminTask!: Sequelize.BelongsToGetAssociationMixin<Admin_Task>;
  setAdminTask!: Sequelize.BelongsToSetAssociationMixin<Admin_Task, Admin_TaskId>;
  createAdminTask!: Sequelize.BelongsToCreateAssociationMixin<Admin_Task>;
  // Staff_Admin_Task belongsTo User via StaffId
  Staff!: User;
  getStaff!: Sequelize.BelongsToGetAssociationMixin<User>;
  setStaff!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createStaff!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Staff_Admin_Task {
    return Staff_Admin_Task.init({
    StaffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'Id'
      }
    },
    AdminTaskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Admin_Task',
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
    tableName: 'Staff_Admin_Task',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StaffId" },
          { name: "AdminTaskId" },
        ]
      },
      {
        name: "AdminTaskId",
        using: "BTREE",
        fields: [
          { name: "AdminTaskId" },
        ]
      },
    ]
  });
  }
}
