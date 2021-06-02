import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../database/connection';
import { CashRegisterGroupInterface, CashRegisterGroupListInterface } from '../entities/CashRegisterGroup';
import { CashRegisterModel } from './CashRegister';

class CashRegisterGroupModel extends Model<CashRegisterGroupInterface> {
  id!: string;
  description!: string;
  observation!: string;
  ong_id!: string;

  readonly created_at!: Date;
  readonly updated_at!: Date;

  toListInterface(): CashRegisterGroupListInterface {
    return {
      id: this.id,
      description: this.description,
      observation: this.observation,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}

CashRegisterGroupModel.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING
    },
    observation: {
      type: Sequelize.STRING,
    },
    ong_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'cash_register_groups',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
  }
);

CashRegisterGroupModel.hasMany(
  CashRegisterModel,
  {
    sourceKey: "id",
    foreignKey: "cash_register_group_id",
    onDelete: "CASCADE",
    as: "cash_registers",
  }
);

CashRegisterModel.belongsTo(
  CashRegisterGroupModel, 
  { 
    foreignKey: 'cash_register_group_id',
    targetKey: 'id',
    as: 'cash_register_group'
  }
);

export {
  CashRegisterGroupModel
}