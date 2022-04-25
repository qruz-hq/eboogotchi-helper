import { EboogotchiContext } from "@/providers/eboogotchi";
import { useContext } from "react";

export default function Stats() {
  const stats = useContext(EboogotchiContext);

  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Stats
      </h3>
      <dl className={`mt-5 grid grid-cols-2 gap-5 sm:grid-cols-${Object.entries(stats).length}`}>
        {Object.values(stats).map((item) => (
          <>
            <div
              key={item.name}
              className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {item.value}
              </dd>
            </div>
          </>
        ))}
      </dl>
    </div>
  );
}
