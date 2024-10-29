import Permission from "../models/permission";

const createPermissions = async () => {
  try {
    const findPermissions = await Permission.findAll();

    if (!findPermissions.length) {
      const permissions = ["GET", "POST", "PUT", "DELETE"];

      for (const permissionName of permissions) {
        await Permission.create({ name: permissionName });
        console.log(`Permission "${permissionName}" created`);
      }
    }
  } catch (error) {
    console.error("Error seeding permissions:", error);
  }
};

export default createPermissions;