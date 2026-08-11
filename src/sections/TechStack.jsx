import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiPython,
  SiLinux,
  SiCisco,
  SiWireshark,
  SiGithub,
} from "react-icons/si";
import { Network, GitBranch, Router, Palette } from "lucide-react";
import { LogoMark } from "./logo924";

const leftSkills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: Palette, color: "#2965F1" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
];

const rightSkills = [
  { name: "Cisco / CCNA", icon: SiCisco, color: "#1BA0D7" },
  { name: "TCP/IP", icon: Network, color: "#20B2A6" },
  { name: "Routing", icon: Router, color: "#20B2A6" },
  { name: "Switching", icon: GitBranch, color: "#20B2A6" },
  { name: "Wireshark", icon: SiWireshark, color: "#1679A7" },
  { name: "GitHub", icon: SiGithub, color: "#f0f2f5" },
];

// Fixed layout grid: viewBox 1000 x 800, hub center at (500, 400)
const VB_W = 1000;
const VB_H = 800;
const HUB_X = 500;
const HUB_Y = 400;
const LEFT_X = 75;
const RIGHT_X = 925;

const getY = (idx, total) => {
  const gap = VB_H / (total + 1);
  return gap * (idx + 1);
};

export const TechStack = () => {
  return (
    <section id="tech-stack" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-12">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Technologies
            <span className="font-serif italic font-normal text-white">
              {" "}
              and skills.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Tools and technologies I use to bring networking and software
            projects to life.
          </p>
        </div>

        {/* Radial diagram */}
        <div className="relative w-full max-w-6xl mx-auto animate-fade-in animation-delay-300">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full h-auto"
            style={{ overflow: "visible" }}
          >
            {/* Curved connector lines */}
            {leftSkills.map((_, idx) => {
              const y = getY(idx, leftSkills.length);
              const midX = (LEFT_X + HUB_X) / 2;
              return (
                <path
                  key={`l-line-${idx}`}
                  d={`M ${LEFT_X + 48},${y} C ${midX},${y} ${midX},${HUB_Y} ${
                    HUB_X - 80
                  },${HUB_Y}`}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="1.5"
                  strokeDasharray="6 10"
                  className="tech-flow-line"
                  style={{ animationDelay: `${idx * 0.3}s` }}
                />
              );
            })}
            {rightSkills.map((_, idx) => {
              const y = getY(idx, rightSkills.length);
              const midX = (RIGHT_X + HUB_X) / 2;
              return (
                <path
                  key={`r-line-${idx}`}
                  d={`M ${RIGHT_X - 48},${y} C ${midX},${y} ${midX},${HUB_Y} ${
                    HUB_X + 80
                  },${HUB_Y}`}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="1.5"
                  strokeDasharray="6 10"
                  className="tech-flow-line"
                  style={{ animationDelay: `${idx * 0.3}s` }}
                />
              );
            })}

            {/* Left icons */}
            {leftSkills.map((skill, idx) => {
              const y = getY(idx, leftSkills.length);
              const Icon = skill.icon;
              return (
                <foreignObject
                  key={skill.name}
                  x={LEFT_X - 55}
                  y={y - 55}
                  width="110"
                  height="110"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <div
                      className="w-24 h-24 rounded-2xl glass flex items-center justify-center icon-pop transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <Icon className="w-11 h-11" style={{ color: skill.color }} />
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                </foreignObject>
              );
            })}

            {/* Right icons */}
            {rightSkills.map((skill, idx) => {
              const y = getY(idx, rightSkills.length);
              const Icon = skill.icon;
              return (
                <foreignObject
                  key={skill.name}
                  x={RIGHT_X - 55}
                  y={y - 55}
                  width="110"
                  height="110"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <div
                      className="w-24 h-24 rounded-2xl glass flex items-center justify-center icon-pop transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <Icon className="w-11 h-11" style={{ color: skill.color }} />
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                </foreignObject>
              );
            })}

            {/* Center hub */}
            <foreignObject
              x={HUB_X - 75}
              y={HUB_Y - 75}
              width="150"
              height="150"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/25 blur-2xl" />
                <div className="relative w-32 h-32 rounded-full bg-background flex items-center justify-center glow-border border-2 border-primary/60">
                  <LogoMark className="w-16 h-16" filled />
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
    </section>
  );
};
