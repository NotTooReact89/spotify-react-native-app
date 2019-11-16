// Dimensions.js inside __mocks__ folder
const Dimensions = {
  get: jest.fn().mockReturnValue({ width: 100, height: 100 })
}
module.exports = Dimensions
