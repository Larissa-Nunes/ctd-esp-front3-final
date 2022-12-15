import { generateAuthenticationString } from "dh-marvel/services/marvel/marvel-auth.service";

describe("MarvelAuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  describe("when generating an authentication string", () => {
    it("should return a valid query string", async () => {
      const authenticationString = generateAuthenticationString();
      expect(authenticationString).toBe(
        "ts=1585710000000&apikey=81f561bbedd3a976613a08a3741690a1&hash=4812d0efc87c8c9320aa08832459e16b"
      );
    });
  });
});
