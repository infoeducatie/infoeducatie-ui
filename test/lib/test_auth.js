import Auth from "../../src/lib/auth";


describe("Auth", function() {
  afterEach(function() {
    delete window.user;
  });

  it("should return false when user is logged out", function() {
    window.user = false;
    expect(Auth.isLoggedIn()).to.equal(false);
  });

  it("should return true when user is logged in", function() {
    window.user = true;
    expect(Auth.isLoggedIn()).to.equal(true);
  });

  it("should login a user", function() {
    window.user = false;
    Auth.login();
    expect(Auth.isLoggedIn()).to.equal(true);
  });

  it("should logout a user", function() {
    window.user = true;
    Auth.logout();
    expect(Auth.isLoggedIn()).to.equal(false);
  });
});
