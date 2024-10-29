import Role from "../models/role";

const createRoles = async () => {
  try {
    const findAllRoles = await Role.findAll();

    if (!findAllRoles.length) {
      const roles = ["IT Admin", "User"];

      for (const roleName of roles) {
        await Role.findOrCreate({ where: {
            name: roleName
        }});
      }
    }
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};

export default createRoles;