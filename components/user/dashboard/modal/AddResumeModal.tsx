import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronRight,
  FilePlusCorner,
  FileText,
  UploadCloud,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resumeUpload,
  getEmployeeProfile,
} from "@/store/slices/employeeDashboardSlice";
import { getSocket } from "@/libs/socket";
import { useEffect, useState } from "react";
import useFileUpload from "@/hooks/useFileUpload";
import toast from "react-hot-toast";
import Link from "next/link";

export function AddResumeModal() {
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((state) => state.employeeDashboard);

  const [resume, setResume] = useState({
    resume: "",
    resumeId: "",
  });

  useEffect(() => {
    dispatch(getEmployeeProfile());
    const socket = getSocket();

    socket.on("employeeResumeUploaded", () => {
      dispatch(getEmployeeProfile());
    });

    return () => {
      socket.off("employeeResumeUploaded");
    };
  }, [dispatch]);

  const { handleUpload, handleDelete } = useFileUpload((url, publicId) => {
    setResume({ resume: url, resumeId: publicId });
  });
  
  const handleResume = async () => {
    if (!resume.resume || !resume.resumeId) {
      toast.error("Please upload resume first");
      return;
    }
    try {
      console.log(resume);
      handleDelete(employee?.resumeId);
      await dispatch(resumeUpload(resume));
      toast.success("Resume Uploaded");
      setResume({
        resume: "",
        resumeId: "",
      });
    } catch (err) {
      toast.error("Resume upload failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1c3059d7]">
              <FilePlusCorner size={30} className="text-white" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-slate-800">
              Add Resume
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Upload your latest resume
            </p>
            <div className="mt-6 flex items-center gap-2 font-semibold text-[#1c3059]">
              Open
              <ChevronRight size={18} />
            </div>
          </button>
        }
      />
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg rounded-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Upload Resume</DialogTitle>
          <DialogDescription>
            Upload your latest CV in PDF, DOC or DOCX format.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 py-4">
          <label
            htmlFor="resume"
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-10 transition hover:border-blue-500 hover:bg-blue-100"
          >
            <UploadCloud size={48} className="mb-4 text-blue-600" />
            <h4 className="font-semibold text-slate-800">Click to upload</h4>
            <p className="mt-1 text-sm text-slate-500">
              or drag & drop your resume
            </p>
            <span className="mt-3 text-xs text-slate-400">
              PDF, DOC, DOCX (Max 5MB)
            </span>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
          {resume.resume! || employee?.resume! ? (
            <Link
              target="_blank"
              href={employee?.resume! || ""}
              className="flex items-center gap-3 rounded-xl border bg-slate-50 p-4"
            >
              <div className="rounded-lg bg-blue-100 p-3">
                <FileText className="text-blue-600" size={22} />
              </div>
              <div>
                <p className="font-medium text-slate-800">Resume file</p>
              </div>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <DialogFooter className="gap-4">
          <DialogClose
            render={
              <button className="cursor-pointer rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                Cancel
              </button>
            }
          />
          <DialogClose
            render={
              <button
                onClick={handleResume}
                className="cursor-pointer flex items-center gap-2 rounded-xl bg-[#1c3059] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#16284b]"
              >
                Upload Resume
              </button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
