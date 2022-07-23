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
  test('no duplication', () => {
    expect.assertions(1);
    generateSlug(MockUser, 'John Jonhson.').then((slug) => {
      expect(slug).toBe('john-jonhson');
    });
  });

  test('one duplication', () => {
    expect.assertions(1);
    generateSlug(MockUser, 'John.').then((slug) => {
      expect(slug).toBe('john-1');
    });
  });

  test('multiple duplications', () => {
    expect.assertions(1);
    generateSlug(MockUser, 'John Jonhson Jr.').then((slug) => {
      expect(slug).toBe('john-jonhson-jr-2');
    });
  });
});
