
export interface UserApi {
  getTuips(userId: number): Promise<string>;
}
