import Sequelize, { ENUM, Model } from 'sequelize';
import { sequelize } from '../database/connection';
import { UserInterface, UserListInterface, UserProfileInterface } from '../entities/User';
import { OngModel } from './Ong';

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
  role!: string;

  // timestamps!
  readonly created_at!: Date;
  readonly updated_at!: Date;
  readonly ong!: OngModel;

  toListInterface(): UserListInterface {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      user: this.user,
      birth: this.birth,
      address: this.address,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }

  toProfileInterface(): UserProfileInterface {
    return {
      name: this.name,
      email: this.email,
      address: this.address,
      birth: this.birth,
      phone: this.phone,
      ong_name: this.ong.name,
      user: this.user
    }
  }
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
    role: {
      type: Sequelize.ENUM('user', 'manager', 'admin'),
    }
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