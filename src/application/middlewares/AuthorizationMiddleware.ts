import { IData, IMiddleware, IResponse } from "../interfaces/IMiddleware";
import { IRequest } from "../interfaces/IRequest";
import { GetRolePermissionsUseCase } from "../useCases/GetRolePermissionsUseCase";

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getRolePermissionsUseCase: GetRolePermissionsUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse | IData> {
    if (!request.account) {
      return {
        statusCode: 403, // Forbidden
        body: { error: "Access denied" },
      };
    }

    if (!this.requiredPermissions.includes(request.account.role)) {
      return {
        statusCode: 403,
        body: { error: "Access denied" },
      };
    }

    return {
      data: {},
    };
  }
}
