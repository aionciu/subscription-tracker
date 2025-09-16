module.exports = {
  openBrowserAsync: jest.fn(() => Promise.resolve()),
  dismissBrowser: jest.fn(() => Promise.resolve()),
  openAuthSessionAsync: jest.fn(() => Promise.resolve()),
  dismissAuthSession: jest.fn(() => Promise.resolve()),
};
