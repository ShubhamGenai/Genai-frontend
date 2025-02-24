export default function CompanyLogos() {
  return (
    <section className="mt-6">
      <div className="flex md:px-6 pb-5 items-center justify-center">
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 flex-wrap">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/1200px-Meta-Logo.png?20211104123859"
            alt="Meta logo"
            width={80}
            className="opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            alt="Google logo"
            width={80}
            className="opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix logo"
            width={80}
            className="opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1920px-Microsoft_logo_%282012%29.svg.png"
            alt="Microsoft logo"
            width={80}
            className="opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png?20220213013322"
            alt="Amazon logo"
            width={80}
            className="opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/42/Old_IBM_Logo.png?20091110182554"
            alt="IBM"
            width={80}
            className="opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/1200px-Meta-Logo.png?20211104123859"
            alt="Meta logo"
            width={80}
            className="opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        </div>
      </div>
      <p className="text-sm sm:text-1xl justify-center items-center flex text-gray-600 mt-4 tracking-wide uppercase lg:mt-10 mb-4 font-medium">
        Scroll to explore
      </p>
      <div className="flex lg:mt-2 w-full flex-row items-center justify-evenly overflow-x-auto bg-darkslategray">
        {/* White Scroll Indicator */}
        <div
          className="scrolldown mb-24 ml-[15px] h-[40px] sm:h-[50px] w-[25px] sm:w-[30px] rounded-[50px] border-[2px] relative"
          style={{ "--color": "#2B7FFF", borderColor: "var(--color)" }}
        >
          <div className="chevrons -ml-[2px] mt-8 sm:mt-12 w-full flex flex-col gap-1 items-center pt-2">
            <div
              className="chevrondown -mt-1.5 inline-block h-2.5 sm:h-3 w-2.5 sm:w-3 rotate-45"
              style={{ borderRight: "2px solid var(--color)", borderBottom: "2px solid var(--color)" }}
            />
            <div
              className="chevrondown -mt-1.5 inline-block h-2.5 sm:h-3 w-2.5 sm:w-3 rotate-45"
              style={{ borderRight: "2px solid var(--color)", borderBottom: "2px solid var(--color)" }}
            />
            <div
              className="chevrondown -mt-1.5 inline-block h-2.5 sm:h-3 w-2.5 sm:w-3 rotate-45"
              style={{ borderRight: "2px solid var(--color)", borderBottom: "2px solid var(--color)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
