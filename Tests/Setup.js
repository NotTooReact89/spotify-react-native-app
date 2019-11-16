// @flow

jest.mock('react-native-device-info', () => {
  const methods = {
    getBrand: jest.fn(),
    getBundleId: jest.fn(),
    getModel: jest.fn(),
    getSystemName: jest.fn(),
    getSystemVersion: jest.fn(),
    getVersion: jest.fn(),
    getUniqueID: jest.fn(),
  };
  return methods;
});
jest.mock('NativeAnimatedHelper');
