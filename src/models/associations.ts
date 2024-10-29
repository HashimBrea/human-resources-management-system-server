import Role from "./role";
import User from "./user";
import Employee from "./employee";
import Permission from "./permission";
import RolePermission from "./rolepermission";
import WorkedHour from "./workedhour";
import Position from "./position";
import Attendance from "./attendance";
import Salary from "./salary";

Role.hasOne(User, {
  sourceKey: "id",
  foreignKey: "roleId",
});

User.hasOne(Employee, {
  sourceKey: "id",
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Salary.hasMany(Position, {
  sourceKey: "id",
  foreignKey: "salaryId",
  onDelete: "SET NULL"
})

Position.hasMany(Employee, {
  sourceKey: "id",
  foreignKey: "positionId",
  onDelete: "RESTRICT",
});

Employee.hasMany(WorkedHour, {
  sourceKey: "id",
  foreignKey: "employeeId",
});

Employee.hasMany(Attendance, {
  sourceKey: "id",
  foreignKey: "employeeId",
});

User.belongsTo(Role, { foreignKey: "roleId", onDelete: "RESTRICT"});
Employee.belongsTo(User, { foreignKey: "userId"});
Employee.belongsTo(Position, { foreignKey: "positionId"})
Attendance.belongsTo(Employee, { foreignKey: "employeeId"});
WorkedHour.belongsTo(Employee, { foreignKey: "employeeId"});
Position.belongsTo(Salary,  { foreignKey: "salaryId"})

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permissionId",
  otherKey: "roleId",
});

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "roleId",
  otherKey: "permissionId",
});
