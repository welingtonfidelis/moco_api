import Sequelize, { Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import { OngModel } from './Ong';

export interface UserInterface {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  user: string;
  birth: Date;
  password: string;
  address?: string;
  ong_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserCreatedInterface {
  id: string;
}

export interface UserLoginInterface {
  name: string;
  email: string;
  token: string
}

class UserModel extends Model<UserInterface> {
  id!: string;
  name!: string;
  email!: string;
  phone!: string;
  user!: string;
  birth!: Date;
  password!: string;
  address!: string;
  ong_id!: string;

  // timestamps!
  readonly created_at!: Date;
  readonly updated_at!: Date;
}

UserModel.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    },
    phone: {
      type: Sequelize.STRING
    },
    user: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    birth: {
      allowNull: false,
      type: Sequelize.DATE
    },
    address: {
      type: Sequelize.STRING,
    },
    ong_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
  }
);

export {
  UserModel
}