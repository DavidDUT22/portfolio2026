import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Network Design",
    description:
      "Planning and building efficient, scalable network topologies using routing and switching principles.",
  },
  {
    icon: Rocket,
    title: "Network Security",
    description:
      "Applying security best practices to protect systems and data from vulnerabilities and threats.",
  },
  {
    icon: Users,
    title: "Troubleshooting",
    description: "Diagnosing and resolving connectivity, routing, and configuration issues with a systematic approach.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Staying ahead with the latest technologies and best practices.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Designing tomorrow's networks,
              <span className="font-serif italic font-normal text-white">
                {" "}
                one component at a time.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I am passionate about technology and enjoy learning how computer networks, cybersecurity, and software development work together to solve real-world problems.
              </p>
              <p>
                I specialize in Networking,  My current focus is strengthening my knowledge of networking through CCNA concepts while improving my programming skills in Python, C,C++ and building a real world project.
              </p>
              <p>
                I believe the best way to grow as a developer is through continuous learning and hands-on experience. Every project I build helps me improve my problem-solving skills, write cleaner code, and deepen my understanding of modern technologies.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
               🚀 My Goals

Network Engineering • CCNA • Cybersecurity • Network Automation • Python • C/C++ • Real-World Projects • Continuous Learning
              </p>
            </div>
          </div>

          {/* Right Column - Hilights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
