const push = jest.fn();
const redirect = jest.fn();

module.exports = {
  useRouter: () => ({
    push,
  }),
  redirect,
  __esModule: true,
  push,
};
