import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface Workload_SheetAttributes {
  Id: number;
  StaffId: number;
  Name: string;
  File_Path: string;
  IsApproved: boolean;
}

export type Workload_SheetPk = "Id";
export type Workload_SheetId = Workload_Sheet[Workload_SheetPk];
export type Workload_SheetOptionalAttributes = "Id" | "IsApproved";
export type Workload_SheetCreationAttributes = Optional<Workload_SheetAttributes, Workload_SheetOptionalAttributes>;

export class Workload_Sheet extends Model<Workload_SheetAttributes, Workload_SheetCreationAttributes> implements Workload_SheetAttributes {
  Id!: number;
  StaffId!: number;
  Name!: string;
  File_Path!: string;
  IsApproved!: boolean;

  // Workload_Sheet belongsTo User via StaffId
  Staff!: User;
  getStaff!: Sequelize.BelongsToGetAssociationMixin<User>;
  setStaff!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createStaff!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Workload_Sheet {
    return Workload_Sheet.init({
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
    tableName: 'Workload_Sheet',
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
