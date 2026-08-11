import { Award, ShieldCheck } from "lucide-react";

const achievements = [
  {
    stat: "150",
    statLabel: "of 2,000+",
    badge: "Scholarship",
    title: "Techo Digital Talent Scholarship",
    org: "Techo Startup Center",
    date: "2024 - Present",
    description:
      "Awarded a fully funded scholarship covering 100% of tuition for 4 years, selected among the top 150 applicants out of over 2,000.",
    icon: Award,
  },
  {
    stat: "Verified",
    statLabel: "Cisco Networking Academy",
    badge: "Certification",
    title: "Introduction to Cybersecurity",
    org: "Cisco",
    date: "2026",
    description:
      "Completed Cisco's Introduction to Cybersecurity course, covering global cyber threats, vulnerabilities, threat detection and defense, and data confidentiality.",
    icon: ShieldCheck,
  },
];

export const Achievements = () => {
  return (
    <section id="achievements" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Recognition
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Achievements that
            <span className="font-serif italic font-normal text-white">
              {" "}
              mark my progress.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Recognition and milestones that highlight my growth and
            contributions to networking and technology.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl p-6 space-y-4 animate-fade-in transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl font-bold text-white transition-colors duration-300 group-hover:text-primary">
                    {item.stat}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.statLabel}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border-2 border-primary/40 text-xs font-semibold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <item.icon className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-12" />
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.org} &middot; {item.date}
                </p>
              </div>

              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
