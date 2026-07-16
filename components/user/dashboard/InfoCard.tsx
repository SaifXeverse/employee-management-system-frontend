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
    <div className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1b388a] text-white transition-all duration-300 group-hover:bg-[#16284b]">
        {icon}
      </div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-2 text-xl font-bold text-slate-800">{value}</h3>
    </div>
  );
};

export default InfoCard;
