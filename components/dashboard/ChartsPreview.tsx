export default function ChartsPreview() {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      
      <div className="rounded-3xl bg-[#0f172a] border border-white/10 p-6 h-80">
        <h3 className="text-xl font-semibold">
          Revenue Overview
        </h3>

        <div className="mt-6 h-56 rounded-2xl bg-white/5" />
      </div>

      <div className="rounded-3xl bg-[#0f172a] border border-white/10 p-6 h-80">
        <h3 className="text-xl font-semibold">
          User Growth
        </h3>

        <div className="mt-6 h-56 rounded-2xl bg-white/5" />
      </div>
    </section>
  );
}