
type Side = {
    heading: string;
    heading2: string;
    para: string;
}

const SideContent = ({heading, heading2, para}: Side) => {
  return (
    <section className="hidden lg:flex relative overflow-hidden items-center justify-center bg-linear-to-br from-blue-700 via-indigo-700 to-purple-700 p-16">

        <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-16 -left-16 blur-2xl" />

        <div className="absolute w-96 h-96 bg-cyan-300/10 rounded-full -bottom-20 -right-20 blur-3xl" />

        <div className="relative z-10 max-w-md text-white">

          <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-sm backdrop-blur">
            {/* Welcome 👋 */}
            {heading}
          </span>
          
          <h1 className="mt-6 text-5xl font-bold leading-tight">
            {/* Welcome Back. */}
            {heading2}
          </h1>

          <p className="mt-5 text-lg text-blue-100">
            {/* Login to access your dashboard and continue managing your projects with ease. */}
            {para}
          </p>
          
        </div>

      </section>
  )
}

export default SideContent
