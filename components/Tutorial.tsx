export default function Tutorial() {
  return (
    <div className="relative py-16 bg-white overflow-hidden w-50">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Eboogotchi
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Une vie sans fin
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Eboogotchi is an on-chain game where a single creature is controlled
            by everyone and whose goal is to survive the longest. That said, one
            the eboogotchi dies, a lucky winner will be randomly drawn to win
            Eboo #700.
          </p>
          <span className="mt-6 block text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            How it works
          </span>
          <p className="mt-4 text-xl text-gray-500 leading-8">
            The values shown above represent the current status of Eboogotchi.
            He dies once all of them reach 111. To lower the values, players
            need to either feed, play, clean or put him to sleep. All the
            interactions require a connected wallet to the Ethereum blockchain.
          </p>
          <span className="mt-6 block text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-xl">
            When can I <span className="text-indigo-600 ">play</span> with him ?
          </span>
          <p className="mt-4 text-xl text-gray-500 leading-8">
            You can play with Eboogotchi when he&apos;s
          </p>
          <ul className="list-disc pl-6">
            <li>
              Bored (<strong>Boredom</strong> value is over 20)
            </li>
            <li>
              <strong>Not</strong> Hungry (<strong>Hunger</strong> value is
              under 80)
            </li>
            <li>
              <strong>Not</strong> Tired (<strong>Tiredness</strong> value is
              under 80)
            </li>
            <li>
              <strong>Not</strong> Dirty (<strong>Dirtiness</strong> value is
              under 80)
            </li>
          </ul>

          <span className="mt-6 block text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-xl">
            When can I <span className="text-indigo-600 ">clean</span> him ?
          </span>
          <p className="mt-4 text-xl text-gray-500 leading-8">
            You can clean Eboogotchi when he&apos;s
          </p>
          <ul className="list-disc pl-6">
            <li>
              Dirty (<strong>Dirtiness</strong> value is over 20)
            </li>
          </ul>

          <span className="mt-6 block text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-xl">
            When can I <span className="text-indigo-600 ">feed</span> him ?
          </span>
          <p className="mt-4 text-xl text-gray-500 leading-8">
            You can feed Eboogotchi when he&apos;s
          </p>
          <ul className="list-disc pl-6">
            <li>
              Hungry (<strong>Hunger</strong> value is over 20)
            </li>
            <li>
              <strong>Not</strong> Tired (<strong>Tiredness</strong> value is
              under 80)
            </li>
            <li>
              <strong>Not</strong> Dirty (<strong>Dirtiness</strong> value is
              under 80)
            </li>
          </ul>

          <span className="mt-6 block text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-xl">
            When can I put him to{" "}
            <span className="text-indigo-600 ">sleep</span> ?
          </span>
          <p className="mt-4 text-xl text-gray-500 leading-8">
            You can put Eboogotchi to sleep when he&apos;s
          </p>
          <ul className="list-disc pl-6">
            <li>
              Tired (<strong>Tiredness</strong> value is over 20)
            </li>
            <li>
              <strong>Not</strong> Dirty (<strong>Dirtiness</strong> value is
              under 80)
            </li>
          </ul>

          <p className="mt-12 text-xl text-gray-500 leading-8">
            Every action gives the caretaker a point and resets the linked value
            to 0. Altough it resets the linked value, some properties raise
            their value (eg. Playing with Eboogotchi will raise his Hunger,
            Tiredness and Dirtiness). It is still unknown why this score exists,
            but I&apos;m sure it has a specific purpose.
          </p>
        </div>
      </div>
    </div>
  );
}
