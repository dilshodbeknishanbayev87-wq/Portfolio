import React from "react";

function Skills() {
  const skills = [
    {
      name: "JavaScript",
      percent: "80%",
    },
    {
      name: "React",
      percent: "75%",
    },
    {
      name: "HTML/CSS",
      percent: "90%",
    },
    {
      name: "Git",
      percent: "65%",
    },
    {
      name: "Tailwind CSS",
      percent: "10%",
    },
  ];

  return (
    <div className="w-full min-h-screen  bg-gray-900 text-white  sm:px-6 md:px-12 py-10" id="skills">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
        Skills
      </h1>

      <p className="text-gray-400 text-center mb-10 text-sm md:text-lg">
        Percentage of knowledge level
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="w-full max-w-[250px] md:max-w-[350px] h-[250px] md:h-[350px]
            bg-gray-800 border border-blue-500 rounded-2xl
            flex flex-col items-center justify-center
            hover:scale-105 transition duration-300 shadow-lg"
          >
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full
              border-4 border-blue-500 flex items-center justify-center
              text-xl md:text-2xl font-bold"
            >
              {skill.percent}
            </div>

            <h3 className="mt-6 text-lg md:text-2xl font-semibold">
              {skill.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;