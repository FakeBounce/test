const storage = {};

const localStorageMock = {
  getItem: jest.fn(param => {
    return storage[param];
  }),
  removeItem: jest.fn(param => {
    delete storage[param];
  }),
  setItem: jest.fn((param, value) => {
    storage[param] = value;
  }),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
global.URL.createObjectURL = jest.fn();
