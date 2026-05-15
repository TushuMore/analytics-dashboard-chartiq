const stats = [
  {
    title: "Datasets",
    value: "24",
  },
  {
    title: "Charts",
    value: "132",
  },
  {
    title: "Storage",
    value: "1.8 GB",
  },
];

export default function StatsCards() {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl bg-[#0f172a] p-6 border border-white/10"
        >
          <p className="text-gray-400">
            {item.title}
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {item.value}
          </h3>
        </div>
      ))}
    </section>
  );
}