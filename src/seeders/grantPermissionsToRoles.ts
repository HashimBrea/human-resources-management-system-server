import Role from "../models/role";
import Permission from "../models/permission";
import RolePermission from "../models/rolepermission";

const grantPermissionsToRoles = async () => {
  try {
    const findAllRoles = await Role.findAll();

    if (findAllRoles.length) {
      const findPermissions = await Permission.findAll();

      for (const role of findAllRoles) {
        for (const permission of findPermissions) {
          if (role.name === "IT Admin" || role.name === "User") {
            const findOneRolePermission = await RolePermission.findOne({
              where: {
                roleId: role.id,
                permissionId: permission.id,
              },
            });
            if (!findOneRolePermission) {
              await RolePermission.create({
                roleId: role.id,
                permissionId: permission.id,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error granting the permissions to the roles:", error);
  }
};

export default grantPermissionsToRoles;
