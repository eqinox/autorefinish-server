const { ValidationError } = require('@strapi/utils').errors;

module.exports = {
  async beforeCreate(event) {
    const { index } = event.params.data;

    if (typeof index === 'undefined' || typeof index !== 'number') {
      throw new ValidationError('Index must be a valid number.');
    }

    const existingImage = await strapi.db.query('api::image.image').findOne({
      where: { index },
    });

    if (existingImage) {
      throw new ValidationError(`Index ${index} already exists in the Image collection. Please choose another index.`);
    }
  },

  async beforeUpdate(event) {
    let { index } = event.params.data;

    // If index is undefined (e.g., during a publish action), fetch the current entry from the database
    if (typeof index === 'undefined') {
      const entry = await strapi.db.query('api::video.video').findOne({
        where: { id: event.params.where.id },
      });
      index = entry.index;  // Use the existing index from the database
    }

    // Now you can check if the index is valid
    if (typeof index !== 'number') {
      throw new ValidationError('Index must be a valid number.');
    }

    const existingImage = await strapi.db.query('api::image.image').findOne({
      where: { index },
    });

    if (existingImage && existingImage.id !== event.params.where.id) {
      throw new ValidationError(`Index ${index} already exists in the Image collection. Please choose another index.`);
    }
  },

  async afterCreate(event) {
    const { index } = event.result;

    if (typeof index === 'undefined' || typeof index !== 'number') {
      throw new ValidationError('Index must be a valid number.');
    }

    const existingImage = await strapi.db.query('api::image.image').findOne({
      where: { index },
    });

    if (existingImage) {
      throw new ValidationError(`Index ${index} already exists in the Image collection. Please choose another index.`);
    }
  },

  async afterUpdate(event) {
    const { index } = event.result;

    if (typeof index === 'undefined' || typeof index !== 'number') {
      throw new ValidationError('Index must be a valid number.');
    }

    const existingImage = await strapi.db.query('api::image.image').findOne({
      where: { index },
    });

    if (existingImage && existingImage.id !== event.params.where.id) {
      throw new ValidationError(`Index ${index} already exists in the Image collection. Please choose another index.`);
    }
  },
};
