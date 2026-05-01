import React from "react";

function Project() {
  return (
    <div
      id="projects"
      className="w-full min-h-screen  bg-gray-900 text-white py-100 px-4 md:px-10 py-16"
    >
      <div className=" mx-auto  flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

        <div className="w-full max-w-[1000px] border border-blue-400 rounded-3xl p-3">
          <img
            className="w-full h-[200px] md:h-[500px] w-full object-cover rounded-2xl"
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQPXP_l3OhekVtWu7qBvRpJKAqF9dSnGk9QGSHZ8bidew8iC9zA"
            alt="project"
          />
        </div>

        <div className="w-full max-w-[500px] flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-2xl md:text-4xl font-bold">
            SocialApp - Frontend Development
          </h1>

          <p className="text-gray-400">
            This site was built using JavaScript/React, Tailwind CSS. It's similar
            to Instagram. It doesn't have as many features yet.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <span className="px-4 py-2 bg-blue-700 rounded-full">React</span>
            <span className="px-4 py-2 bg-blue-700 rounded-full">Tailwind</span>
            <span className="px-4 py-2 bg-blue-700 rounded-full">JavaScript</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;