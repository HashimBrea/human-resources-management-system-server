import User from "../models/user";
import Role from "../models/role";
import Permission from "../models/permission";
import RolePermission from "../models/rolepermission";

async function createAdminUser() {
  try {

    const findITAdminUser = await User.findOne({
      where: {
        username: "admin"
      }
    });

    if (!findITAdminUser) {
      
      const createAdminUser = await User.create({
          username: "admin",
          password: "admin",
      });

      if (createAdminUser) {
        const findOneRole = await Role.findOne({
          where: {
            name: "IT Admin"
          }
        });

        if (findOneRole) {
          createAdminUser.roleId = findOneRole.id;

          await createAdminUser.save();
        }
      }
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
}

export default createAdminUser;
