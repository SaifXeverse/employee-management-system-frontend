"use client";

import useEmployee from "@/hooks/admin/useEmployee";
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  const { employees } = useEmployee();

  const totalEmployees = employees.length;

  const highestSalary =
    employees.length > 0
      ? Math.max(...employees.map((employee) => Number(employee.salary)))
      : 0;

  const cards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "from-violet-600 to-indigo-600",
    },
    {
      title: "Departments",
      value: "5",
      icon: Building2,
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "Highest Salary",
      value: `$${highestSalary}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="space-y-8 lg:space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Welcome back 👋 Here's an overview of your employee management system.
        </p>
      </div>
      <div className="grid grid-cols-1 py-8 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 wrap-break-words text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${card.color} sm:h-14 sm:w-14`}
                >
                  <Icon className="text-white" size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-violet-600" />

            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              System Overview
            </h2>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 sm:text-base">
                Employees
              </span>

              <span className="font-semibold">{totalEmployees}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 sm:text-base">
                Departments
              </span>

              <span className="font-semibold">5</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 sm:text-base">
                Highest Salary
              </span>

              <span className="font-semibold text-green-600">
                ${highestSalary}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 p-5 text-white shadow-xl sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">
            Employee Management System
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/80 sm:text-base">
            Manage employees, departments, salaries, and records from one
            dashboard with a clean and modern interface.
          </p>

          <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-white/70">Active Employees</p>

              <h3 className="mt-2 text-4xl font-bold sm:text-5xl">
                {totalEmployees}
              </h3>
            </div>

            <Users
              size={70}
              className="self-end text-white/30 sm:self-auto sm:text-white/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;