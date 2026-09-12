import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Briefcase, GraduationCap, Calendar, CheckCircle2, UserCheck } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const { consultants, setIsBookingModalOpen } = useApp();

  return (
    <section id="team-section" className="py-20 bg-[#0A192F] text-[#F5F5F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#112240] border border-[#C9A227]/30 text-[#DFC377] text-xs font-semibold mb-3">
            <UserCheck className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>نخبة المستشارين والخبراء</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-3">
            فريق عمل مؤسسة{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] to-[#C9A227]">
              أركان
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            كوكبة متميزة من المحامين المقيدين بالنقض، والمحاسبين القانونيين وخبراء الضرائب المعتمدين.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(consultants || []).map((member) => (
            <div
              key={member.id}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#112240] to-[#0B1A2F] border border-[#C9A227]/25 hover:border-[#C9A227]/50 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C9A227]/40 shadow-lg bg-slate-800 shrink-0">
                    <img
                      src={member.avatar || member.avatarUrl || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80'}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg text-white group-hover:text-[#DFC377] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#DFC377] font-semibold">
                      {member.roleTitle || member.role}
                    </p>
                    <span className="inline-block text-[11px] text-slate-400 font-mono mt-0.5">
                      خبرة: {member.experienceYears} عاماً
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs pt-4 border-t border-slate-800">
                  {member.qualification && (
                    <div className="flex items-start gap-2 text-slate-300">
                      <GraduationCap className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                      <span>{member.qualification}</span>
                    </div>
                  )}

                  <div className="flex items-start gap-2 text-slate-300">
                    <Briefcase className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                    <span>التخصص: {member.specialization || member.specialty}</span>
                  </div>
                </div>

                {member.bioPoints && member.bioPoints.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] text-[#DFC377] font-bold block mb-1.5">
                      مجالات التميز والخبرة:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.bioPoints.map((point, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#0A192F] text-slate-300 border border-slate-800"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#C9A227] hover:text-[#0A192F] text-white border border-[#C9A227]/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>طلب استشارة مع المستشار</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
