const generateSlug = require('./slugify');

const MockUser = {
  slugs: ['john-jonhson-jr', 'john-jonhson-jr-1', 'john'],
  findOne({ slug }) {
    return {
      lean: () => {
        return this.slugs.includes(slug) ? Promise.resolve({ id: 'id' }) : Promise.resolve(null);
      },
    };
  },
};

describe('slugify', () => {
  test('no duplication', async () => {
    expect.assertions(1);
    const slug = await generateSlug(MockUser, 'John Jonhson.');
    expect(slug).toBe('john-jonhson');
  });

  test('one duplication', async () => {
    expect.assertions(1);
    const slug = await generateSlug(MockUser, 'John.');
    expect(slug).toBe('john-1');
  });

  test('multiple duplications', async () => {
    const slug = await generateSlug(MockUser, 'John Jonhson Jr.');
    expect(slug).toBe('john-jonhson-jr-2');
  });
});
