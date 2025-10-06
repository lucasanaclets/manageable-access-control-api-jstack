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

    const { permissionsCodes } = await this.getRolePermissionsUseCase.execute({
      roleId: request.account.role,
    });

    const isAllowed = this.requiredPermissions.some((code) =>
      permissionsCodes.includes(code)
    );

    if (!isAllowed) {
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
