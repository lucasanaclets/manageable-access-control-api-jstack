import { AuthorizationMiddleware } from "../application/middlewares/AuthorizationMiddleware";
import { makeGetRolePermissionsUseCase } from "./makeGetRolePermissions";

export function makeAuthorizationMiddleware(requiredPermissions: string[]) {
  return new AuthorizationMiddleware(
    requiredPermissions,
    makeGetRolePermissionsUseCase()
  );
}
