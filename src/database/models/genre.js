module.exports = (sequelize, DataTypes) => {
  let alias = "Genre";
  let cols = {
    genres_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull:false,
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
    },

    updated_at: {
      type: DataTypes.DATE,
    },

    deleted_at: {
      type: DataTypes.DATE,
    },
  };
  let config = {
    tableName: "genres",
    paranoid: true,
   timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  };

  const genre = sequelize.define(alias, cols, config);

  genre.associate = function (models) {
    genre.belongsToMany(models.Movie, {
      through: "Genres_Movies",
      foreingnKey: "genres_id",
    });
  };

  return genre;
};
