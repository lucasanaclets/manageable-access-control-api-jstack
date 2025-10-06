import { AuthorizationMiddleware } from "../application/middlewares/AuthorizationMiddleware";
import { makeGetRolePermissionsUseCase } from "./makeGetRolePermissions";

export function makeAuthorizationMiddleware(allowedRoles: string[]) {
  return new AuthorizationMiddleware(
    allowedRoles,
    makeGetRolePermissionsUseCase()
  );
}
