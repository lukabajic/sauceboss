const kebabCase = require('lodash.kebabcase');

const slugify = (text) => kebabCase(text);

const createUniqueSlug = async (Model, slug, count = 1) => {
  const user = await Model.findOne({ slug: `${slug}-${count}` }).lean();
  if (!user) return `${slug}-${count}`;
  return createUniqueSlug(Model, slug, count + 1);
};

async function generateSlug(Model, name, filter = {}) {
  const origSlug = slugify(name);
  const user = await Model.findOne({ slug: origSlug, ...filter }).lean();
  if (!user) return origSlug;
  return createUniqueSlug(Model, origSlug);
}

module.exports = generateSlug;
