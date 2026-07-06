import EmployeeTable from "@/componnents/admin/dashboard/EmployeeTable";


export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Employees</h1>

        <p className="mt-2 text-slate-500">Manage all employees.</p>
      </div>

      <EmployeeTable />
    </div>
  );
}
