import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, ExternalLink, FileText, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export function ResumeViewModal() {
  const { employee } = useAppSelector((state) => state.employeeDashboard);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-blue-600 hover:shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1c3059] transition-all group-hover:scale-105">
              <Eye className="text-white" size={30} />
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-800">
              View Resume
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Preview your uploaded resume anytime.
            </p>
            <div className="mt-6 flex items-center gap-2 font-semibold text-[#1c3059]">
              Open
              <ChevronRight size={18} />
            </div>
          </button>
        }
      />

      <DialogContent className="min-w-4/5 h-11/12 rounded-3xl border-0 bg-white p-0 shadow-2xl">
        <div className="bg-linear-to-r rounded-t-3xl from-slate-900 via-slate-800 to-blue-900 px-6 py-4 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">My Resume</DialogTitle>
            <DialogDescription className="mt-2 text-slate-300">
              View or download your uploaded resume.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="px-2 py-1">
          {employee?.resume ? (
            <div className="space-y-2">
              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                  <FileText className="text-blue-700" size={26} />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-slate-800">
                    Resume Preview
                  </h4>

                  <p className="text-sm text-slate-500">
                    Open your resume in a new tab.
                  </p>
                </div>
                <Link
                  href={employee.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-2 rounded-xl bg-[#1c3059] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16284b]"
                >
                  <ExternalLink size={18} />
                  Open
                </Link>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                  src={employee.resume}
                  title="Resume Preview"
                  className="h-80 w-full"
                />
              </div>
            </div>
          ) : (
            <div className="flex h-110 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200">
                <FileText className="text-slate-500" size={36} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-700">
                No Resume Found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Upload your resume to preview it here.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
