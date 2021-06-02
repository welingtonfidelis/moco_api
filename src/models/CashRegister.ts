import Sequelize, { Association, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, Model } from 'sequelize';
import { sequelize } from '../database/connection';
import { CashRegisterInterface, CashRegisterListInterface } from '../entities/CashRegister';
import { CashRegisterGroupModel } from './CashRegisterGroup';

class CashRegisterModel extends Model<CashRegisterInterface> {
  id!: string;
  description!: string;
  observation!: string;
  value!: number;
  paid_in!: Date;
  type!: string;
  cash_register_group_id!: string;
  ong_id!: string;
  user_id!: string;

  readonly created_at!: Date;
  readonly updated_at!: Date;
  readonly cash_register_group!: CashRegisterGroupModel;

  toListInterface(): CashRegisterListInterface {
    return {
      id: this.id,
      description: this.description,
      observation: this.observation,
      value: this.value,
      paid_in: this.paid_in,
      type: this.type,
      user_id: this.user_id,
      cash_register_group: this.cash_register_group,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}

CashRegisterModel.init(
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
      allowNull: true,
      type: Sequelize.STRING
    },
    value: {
      allowNull: false,
      type: Sequelize.REAL
    },
    paid_in: {
      allowNull: false,
      type: Sequelize.DATE
    },
    type: {
      allowNull: false,
      type: Sequelize.ENUM('in', 'out')
    },
    cash_register_group_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    ong_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'cash_registers',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
  }
);

export {
  CashRegisterModel
}