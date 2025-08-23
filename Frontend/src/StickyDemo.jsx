export default function StickyDemo() {
  return (
    <div className="overflow-y-scroll">
      {/* Section 1 */}
      <section className="h-[800px] bg-blue-100 relative">
        <h2 className="sticky top-0 bg-blue-500 text-white text-xl p-3 shadow">
          Section 1 - Sticky Header
        </h2>
        <p className="p-4">
          Scroll down and notice that this header stays stuck at the top of its section
          until Section 1 ends.
        </p>
        <div className="p-4 space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>Item {i + 1} in Section 1</p>
          ))}
        </div>
      </section>

      {/* Section 2 */}
      <section className="h-[800px] bg-green-100 relative">
        <h2 className="sticky top-0 bg-green-500 text-white text-xl p-3 shadow">
          Section 2 - Sticky Header
        </h2>
        <p className="p-4">
          Now the Section 2 header sticks at the top only inside this section.
        </p>
        <div className="p-4 space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>Item {i + 1} in Section 2</p>
          ))}
        </div>
      </section>

      {/* Section 3 */}
      <section className="h-[800px] bg-yellow-100 relative">
        <h2 className="sticky top-0 bg-yellow-500 text-white text-xl p-3 shadow">
          Section 3 - Sticky Header
        </h2>
        <p className="p-4">
          Same behavior: header sticks until this section ends, then disappears.
        </p>
        <div className="p-4 space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>Item {i + 1} in Section 3</p>
          ))}
        </div>
      </section>
    </div>
  );
}
