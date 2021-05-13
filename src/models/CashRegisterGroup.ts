import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../database/connection';
import { CashRegisterGroupInterface } from '../entities/CashRegisterGroup';

class CashRegisterGroupModel extends Model<CashRegisterGroupInterface> {
  id!: string;
  description!: string;
  observation!: string;
  ong_id!: string;

  // timestamps!
  readonly created_at!: Date;
  readonly updated_at!: Date;
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

export {
  CashRegisterGroupModel
}