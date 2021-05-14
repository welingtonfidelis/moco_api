import Sequelize, { Association, HasMany, Model } from 'sequelize';
import { sequelize } from '../database/connection';
import { OngInterface } from '../entities/Ong';
import { UserModel } from './User';


// interface OngCreationInterface extends Optional<OngInterface, "id"> { }

class OngModel extends Model<OngInterface> {
  id!: string;
  name!: string;
  logo!: string;
  cnpj!: string;
  email!: string;
  social_1!: string;
  social_2!: string;
  state_law!: string;
  municipal_law!: string;

  // timestamps!
  readonly created_at!: Date;
  readonly updated_at!: Date;

  readonly users?: UserModel[]; // Note this is optional since it's only populated when explicitly requested in code

  static associations: {
    users: Association<OngModel, UserModel>;
  };
}

OngModel.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    logo: {
      allowNull: false,
      type: Sequelize.STRING
    },
    cnpj: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    social_1: {
      type: Sequelize.STRING
    },
    social_2: {
      type: Sequelize.STRING
    },
    state_law: {
      type: Sequelize.STRING
    },
    municipal_law: {
      type: Sequelize.STRING
    },
  },
  {
    sequelize,
    tableName: 'ongs',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
  }
);

OngModel.hasMany(
  UserModel,
  {
    sourceKey: "id",
    foreignKey: "ong_id",
    onDelete: "CASCADE",
    as: "users",
  }
);

UserModel.belongsTo(
  OngModel, 
  { 
    foreignKey: 'ong_id',
    targetKey: 'id',
    as: 'ong'
  }
);

export {
  OngModel
}