'use client'

import { useEffect, useRef, useState } from "react";
import SplitText from "../ui/split-text";
import Meteors from "../magicui/meteors";
import TypedJs from "../magicui/typing-animation";
import NumberTicker from "../magicui/number-ticker";
import Globe from "../magicui/globe";
import { motion } from "framer-motion";

export function Hero({ totalProjects }) {
  const textRef = useRef(null);

  

  // Calculate years of experience
  const currentYear = new Date().getFullYear(); // Get the current year
  const startYear = 2022; // Starting year for experience calculation
  const experienceYears = currentYear - startYear;

  //github
  const token = `${process.env.NEXT_PUBLIC_REPO_API_GITHUB}`;
  const username = "irsyadagungh";
  const [totalRepo, setTotalRepo] = useState(0);
  const [totalCommit, setTotalCommit] = useState(0);
  const githubUrl = `https://api.github.com/users/${username}/repos`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repoResponse = await fetch(githubUrl, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const repos = await repoResponse.json();
        setTotalRepo(repos.length);

        const commitPromises = repos.map((repo) =>
          fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          )
            .then((response) => response.json())
            .then((commits) => commits.length)
        );

        const commitCounts = await Promise.all(commitPromises);
        const totalCommitCounts = commitCounts.reduce(
          (total, count) => total + count,
          0
        );

        setTotalCommit(totalCommitCounts);
        console.log(`Total Commit: ${totalCommitCounts}`);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/** SECTION 1 (HERO) */}
      <section className="relative px-6 pt-10 md:px-16 lg:px-44 overflow-hidden flex flex-wrap-reverse items-center justify-center w-full h-screen text-secondary-100 bg-gradient-to-b from-black via-black to-darkPrimary">
        <div
          className={`absolute top-0 left-0 max-w-screen-sm md:max-w-md lg:max-w-lg h-full`}
        >
          <Meteors number={20} />
        </div>
        <div className={`w-full md:w-1/2 lg:w-2/3`}>
          <h1>Hi, my name is </h1>
          <h1 ref={textRef} className={`text-5xl font-bold`}>
            <span className={`text-primary`}>
              <SplitText
                text={"Irsyad"}
                type={"char"}
                initialX={50}
                initialOpacity={0}
                duration={0.2}
                stagger={0.05}
                uniqueClassName="irsyad"
              />
            </span>
            <SplitText
              text={" Agung Hidayatullah"}
              type={"char"}
              initialX={50}
              initialOpacity={0}
              delay={0.8}
              duration={0.2}
              stagger={0.05}
              uniqueClassName="agung"
            />
          </h1>
          <TypedJs
            classname={`text-2xl`}
            string={["Front-end Developer", "Flutter Developer"]}
          />
          <p
            id={"desc"}
            className={`w-3/4 mt-16 text-sm md:text-base lg:text-lg`}
          >
            <SplitText
              text={`I am a Front-End and Flutter Developer with a passion for creating beautiful and functional user interfaces. I have ${experienceYears} years of experience since in college I specialize in building responsive web and mobile applications that provide an excellent user experience.`}
              initialX={-50}
              initialOpacity={0}
              stagger={0.05}
              type="word"
              uniqueClassName="desc"
            />
          </p>
          <div className={`flex justify-between md:w-4/5 mt-6`}>
            <div className={`flex flex-col items-center`}>
              <NumberTicker className={`text-white`} value={experienceYears} />
              <p className={`text-secondary-100 text-sm w-20 text-center`}>
                Years of Experience
              </p>
            </div>
            <div className={`flex flex-col items-center`}>
              <NumberTicker className={`text-white`} value={totalProjects} />
              <p className={`text-secondary-100 text-sm`}>Projects</p>
            </div>
            <div className={`flex flex-col items-center`}>
              <NumberTicker className={`text-white`} value={totalRepo} />
              <p className={`text-secondary-100 text-sm`}>Repositories</p>
            </div>
            <div className={`flex flex-col items-center`}>
              <NumberTicker className={`text-white`} value={totalCommit} />
              <p className={`text-secondary-100 text-sm`}>Commits</p>
            </div>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 20 }}
          className={`w-full md:w-1/2 lg:w-1/3 flex justify-center items-center`}
        >
          <Globe className={`w-full h-auto m-auto`} />
        </motion.div>
      </section>
    </>
  );
}