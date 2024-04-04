import { mainApi } from "@/services/api/mainApi.ts";
import { register, login, logout, getToken } from "@/services/api/auth.ts";


const userResponse = { _id: "w1w1w1w1w1", email: "test@mail.com" }
const tokenResponse = { accessToken: "qwerty.qwerty.qwerty" }
const user = { id: "w1w1w1w1w1", email: "test@mail.com" }
const token = { value: "qwerty.qwerty.qwerty" }
const responseError = { error: 'error' };


describe('auth api', () => {
  const mockedMainApiPost = jest.spyOn(mainApi, "post");
  const mockedMainApiGet = jest.spyOn(mainApi, "get");

  afterEach(() => {
    mockedMainApiPost.mockClear();
    mockedMainApiGet.mockClear();
  })

  it('should return auth state from the register request',  async () => {
    mockedMainApiPost.mockResolvedValue({ data: { user: userResponse, ...tokenResponse } });
    const requestData = { email: "test@mail.com", password: "12345678" }
    const result = await register(requestData);

    expect(mockedMainApiPost).toHaveBeenCalled()
    expect(mockedMainApiPost).toHaveBeenCalledWith("/auth/signup", requestData)
    expect(result).toEqual({ user, token, loading: false })
  });

  it('should return error from the register request',  async () => {
    mockedMainApiPost.mockRejectedValue(responseError);
    const requestData = { email: "test@mail.com", password: "12345678" }
    try {
      await register(requestData);
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mockedMainApiPost).toHaveBeenCalled()
    expect(mockedMainApiPost).toHaveBeenCalledWith("/auth/signup", requestData)
  });

  it('should return auth state from the login request',  async () => {
    mockedMainApiPost.mockResolvedValue({ data: { user: userResponse, ...tokenResponse } });
    const requestData = { email: "test@mail.com", password: "12345678" }
    const result = await login(requestData);

    expect(mockedMainApiPost).toHaveBeenCalled()
    expect(mockedMainApiPost).toHaveBeenCalledWith("/auth/login", requestData)
    expect(result).toEqual({ user, token, loading: false })
  });

  it('should return error from the login request',  async () => {
    mockedMainApiPost.mockRejectedValue(responseError);
    const requestData = { email: "test@mail.com", password: "12345678" }
    try {
      await login(requestData);
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mockedMainApiPost).toHaveBeenCalled()
    expect(mockedMainApiPost).toHaveBeenCalledWith("/auth/login", requestData)
  });

  it('should successfully complete the logout request',  async () => {
    mockedMainApiGet.mockResolvedValue(true);
    const result = await logout();

    expect(result).toEqual(true)
    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/auth/logout")
  });

  it('should return error from the logout request',  async () => {
    mockedMainApiGet.mockRejectedValue(responseError);
    try {
      await logout();
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/auth/logout")
  });

  it('should return token from the getToken request',  async () => {
    mockedMainApiGet.mockResolvedValue({ data: tokenResponse });

    const result = await getToken();

    expect(result).toEqual(token)
    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/auth/token")
  });

  it('should return error from the getToken request',  async () => {
    mockedMainApiGet.mockRejectedValue(responseError);
    try {
      await getToken();
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/auth/token")
  });
});