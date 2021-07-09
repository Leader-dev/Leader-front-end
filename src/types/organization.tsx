export interface OrgInfo {
  id: string;
  numberId: number;
  name: string;
  address: string;
  /** 组织认证
   * @value school 为学校认证
   */
  addressAuth: "school" | string;
  /** 组织类别 */
  typeAliases: string[];
  /** 组织海报图片地址 url */
  posterUrl: string;
  memberCount: number;
}
