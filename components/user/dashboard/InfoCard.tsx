const InfoCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => {
  return (
    <div className="rounded-2xl flex flex-col items-center border border-slate-200 bg-slate-50 p-6 transition hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-[#FF4B2B] to-[#FF416C] text-white">
        {icon}
      </div>

      <p className="text-sm text-slate-500">{title}</p>

      <h3 className="mt-2 text-lg font-semibold text-slate-800">{value}</h3>
    </div>
  );
};

export default InfoCard;