"use client";

import useEmployee from "@/hooks/useEmployee";
import {
  Users,
  Building2,
  DollarSign,
  BadgeDollarSign,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const { employees } = useEmployee();

  const totalEmployees = employees.length;

  const highestSalary =
    employees.length > 0
      ? Math.max(...employees.map((employee) => Number(employee.salary)))
      : 0;

  const averageSalary =
    employees.length > 0
      ? (
          employees.reduce(
            (total, employee) => total + Number(employee.salary),
            0,
          ) / employees.length
        ).toFixed(0)
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
    {
      title: "Average Salary",
      value: `$${averageSalary}`,
      icon: BadgeDollarSign,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Welcome back 👋 Here's an overview of your employee management system.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-4 text-4xl font-bold text-slate-900">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${card.color}`}
                >
                  <Icon className="text-white" size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-violet-600" />

            <h2 className="text-xl font-bold text-slate-900">
              System Overview
            </h2>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Employees</span>

              <span className="font-semibold">{totalEmployees}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Departments</span>

              <span className="font-semibold">5</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Highest Salary</span>

              <span className="font-semibold text-green-600">
                ${highestSalary}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Average Salary</span>

              <span className="font-semibold text-blue-600">
                ${averageSalary}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold">Employee Management System</h2>

          <p className="mt-4 text-white/80">
            Manage employees, departments, salaries, and records from one
            dashboard with a clean and modern interface.
          </p>

          <div className="mt-10 flex items-center justify-between">
            <div>
              <p className="text-white/70">Active Employees</p>

              <h3 className="text-5xl font-bold">{totalEmployees}</h3>
            </div>

            <Users size={70} className="text-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
