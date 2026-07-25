import { useState, useEffect, useRef, type ReactNode, type LabelHTMLAttributes } from 'react'
import {
  Building2, Compass, BarChart3, Hammer, Wrench, FileText,
  Calculator, Users, Search, Network, FolderOpen, Settings,
  Anchor, Train, Route, Mountain, Warehouse, Package,
  Zap, Factory, Cog, Building, Landmark,
  MapPin, Phone, Mail, ChevronDown, ArrowRight,
  CheckCircle, Shield, Award, TrendingUp, Clock, Star,
  Menu, X, MessageCircle, UserCheck, Target,
} from 'lucide-react'

// ─── Reveal animation hook ───────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { Icon: Building2, title: 'EPC & Turnkey Project Support', desc: 'End-to-end engineering, procurement, and construction management for complex industrial and infrastructure projects.' },
  { Icon: Compass, title: 'Engineering Consultancy', desc: 'Expert technical advisory covering design review, value engineering, feasibility studies, and specification development.' },
  { Icon: BarChart3, title: 'Project Management Consultancy', desc: 'Strategic oversight of schedules, budgets, and stakeholders to ensure on-time, on-budget project delivery.' },
  { Icon: Hammer, title: 'Construction Engineering', desc: 'Structural, civil, and architectural engineering support from concept through site execution.' },
  { Icon: Wrench, title: 'Industrial Installation & Commissioning', desc: 'Mechanical, electrical, and process plant installation with systematic commissioning protocols.' },
  { Icon: FileText, title: 'Tendering & Contract Management', desc: 'Complete tendering lifecycle support — bid preparation, evaluation, contract drafting, and dispute resolution.' },
  { Icon: Calculator, title: 'BOQ & Cost Estimation', desc: 'Accurate bill of quantities, detailed cost estimates, and cost control throughout project phases.' },
  { Icon: Users, title: 'Technical Manpower Supply', desc: 'Deployment of qualified engineers, supervisors, and skilled technicians on a project or long-term basis.' },
  { Icon: Search, title: 'Site Supervision', desc: 'On-site quality inspection, contractor coordination, and progress monitoring to safeguard project standards.' },
  { Icon: Network, title: 'Vendor Development', desc: 'Identifying, qualifying, and managing a robust vendor ecosystem for reliable material and service supply chains.' },
  { Icon: FolderOpen, title: 'Engineering Documentation', desc: 'As-built drawings, SOPs, technical manuals, and complete document control systems for every project stage.' },
  { Icon: Settings, title: 'Maintenance & Shutdown Support', desc: 'Planned maintenance scheduling, shutdown management, and rapid-response support for operational continuity.' },
]

const INDUSTRIES = [
  { Icon: Anchor, label: 'Ports' },
  { Icon: Train, label: 'Railways' },
  { Icon: Route, label: 'Roads & Highways' },
  { Icon: Mountain, label: 'Tunnels' },
  { Icon: Warehouse, label: 'Warehousing & Logistics' },
  { Icon: Package, label: 'Food Storage Infrastructure' },
  { Icon: Zap, label: 'Power Plants' },
  { Icon: Factory, label: 'Steel Plants' },
  { Icon: Cog, label: 'Manufacturing Industries' },
  { Icon: Building, label: 'Industrial Facilities' },
  { Icon: Building2, label: 'Commercial Infrastructure' },
  { Icon: Landmark, label: 'Government Projects' },
]

const REASONS = [
  { Icon: Clock, title: '10+ Years of Expertise', desc: 'Decades of combined field experience across high-complexity EPC and infrastructure projects in India.' },
  { Icon: Award, title: 'Proven Quality Standards', desc: 'Disciplined processes, rigorous quality checks, and zero-compromise delivery standards on every engagement.' },
  { Icon: Shield, title: 'Safety-First Culture', desc: 'Embedded HSE practices with a commitment to zero LTI across all project sites and team deployments.' },
  { Icon: TrendingUp, title: 'Startup Agility', desc: 'Fast decision-making, flexible engagement models, and responsive service delivery without enterprise lag.' },
  { Icon: Target, title: 'Sector-Wide Reach', desc: 'Deep cross-sector knowledge spanning ports, power, warehousing, manufacturing, and government infrastructure.' },
  { Icon: Star, title: 'Client-Centric Approach', desc: 'Transparent communication, dedicated account management, and long-term partnerships built on mutual trust.' },
]

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Industries', href: '#industries' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ]

  const bg = scrolled ? 'bg-white/96 backdrop-blur-md shadow-sm border-b border-steel-200' : 'bg-transparent'
  const textClr = scrolled ? 'text-navy-900' : 'text-white'
  const subClr = scrolled ? 'text-steel-600' : 'text-white/60'
  const linkClr = scrolled ? 'text-steel-700 hover:text-accent-500' : 'text-white/80 hover:text-white'

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent-500 rounded flex items-center justify-center shrink-0">
              <span className="text-white font-bold font-display text-base leading-none">G</span>
            </div>
            <div>
              <div className={`font-display font-bold text-sm leading-tight tracking-tight ${textClr}`}>Get The Work Done</div>
              <div className={`text-[11px] font-medium tracking-wide ${subClr}`}>Engineering Consultancy & EPC Support</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors duration-200 ${linkClr}`}>{l.label}</a>
            ))}
            <a href="#rfp" className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded text-sm font-semibold transition-colors duration-200 shadow-sm">
              Request Proposal
            </a>
          </div>

          <button
            className={`md:hidden p-2 rounded transition-colors ${scrolled ? 'text-navy-900 hover:bg-steel-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-white border-t border-steel-200 py-3">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-navy-800 hover:text-accent-500 text-sm font-medium transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#rfp" onClick={() => setOpen(false)}
              className="block mx-4 mt-2 bg-accent-500 text-white px-4 py-2.5 rounded text-sm font-semibold text-center">
              Request Proposal
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
      <img
        src="https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?w=1920&h=1080&fit=crop&auto=format"
        alt="Construction workers on an engineering project at sunset"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-900/70 to-navy-950/90" />

      {/* Engineering grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#7aaee0 1px, transparent 1px), linear-gradient(90deg, #7aaee0 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 bg-accent-500/15 border border-accent-400/30 text-accent-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
          Engineering Consultancy & EPC Support — India
        </div>

        <h1 className="font-display font-bold text-white leading-none tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
          Get The Work Done
        </h1>
        <p className="font-display font-medium text-steel-300 mb-6" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.75rem)' }}>
          Your Goals. Our Grind.
        </p>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          A new-generation engineering consultancy backed by 10+ years of EPC and project delivery expertise.
          Combining startup agility with seasoned technical leadership.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#rfp"
            className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5">
            Request a Proposal <ArrowRight size={18} />
          </a>
          <a href="#contact"
            className="w-full sm:w-auto border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded flex items-center justify-center gap-2 transition-all duration-200">
            Contact Us <Phone size={16} />
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-lg overflow-hidden max-w-3xl mx-auto">
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '12', label: 'Core Services' },
            { value: '12', label: 'Industries Served' },
            { value: '100%', label: 'Client Focus' },
          ].map(s => (
            <div key={s.label} className="bg-navy-900/50 backdrop-blur-sm px-6 py-4 text-center">
              <div className="font-display font-bold text-accent-400 text-2xl">{s.value}</div>
              <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-steel-100">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&auto=format"
                  alt="Engineering team at work on an industrial project"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-navy-900 text-white rounded-lg p-5 shadow-xl">
                <div className="font-display font-bold text-3xl text-accent-400">10+</div>
                <div className="text-xs text-white/60 mt-0.5">Years of Engineering<br />Expertise</div>
              </div>
              <div className="absolute top-4 -left-4 w-16 h-16 bg-accent-500 rounded opacity-80" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <div className="text-accent-500 text-sm font-semibold uppercase tracking-widest mb-3">About Us</div>
              <h2 className="font-display font-bold text-navy-900 text-3xl sm:text-4xl leading-tight mb-6">
                A New-Generation<br />Engineering Partner
              </h2>
              <p className="text-steel-600 leading-relaxed mb-4">
                <strong className="text-navy-800">Get The Work Done</strong> is an engineering consultancy and EPC support company built on the foundation of real project experience. We bring together senior professionals who have spent a decade-plus delivering complex infrastructure and industrial projects across India.
              </p>
              <p className="text-steel-600 leading-relaxed mb-6">
                Our model is simple: combine the responsiveness and client-centricity of a startup with the depth and rigor of an established engineering firm. Whether you need end-to-end EPC support, specialized consultancy, or reliable technical manpower — we show up, and we deliver.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Practical solutions grounded in field-level reality',
                  'Transparent, milestone-driven project reporting',
                  'Dedicated teams aligned to your project goals',
                ].map(pt => (
                  <div key={pt} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-accent-500 mt-0.5 shrink-0" />
                    <span className="text-steel-700 text-sm">{pt}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#services" className="bg-navy-900 hover:bg-navy-700 text-white font-semibold px-6 py-3 rounded text-sm flex items-center gap-2 transition-colors">
                  Our Services <ArrowRight size={16} />
                </a>
                <a href="#contact" className="border border-steel-300 hover:border-accent-400 text-navy-800 font-semibold px-6 py-3 rounded text-sm transition-colors hover:text-accent-600">
                  Get In Touch
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-steel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <div className="text-accent-500 text-sm font-semibold uppercase tracking-widest mb-3">Core Services</div>
            <h2 className="font-display font-bold text-navy-900 text-3xl sm:text-4xl mb-4">What We Deliver</h2>
            <p className="text-steel-600 max-w-2xl mx-auto">
              Twelve specialized service lines covering every stage of an engineering or infrastructure project — from concept to commissioning.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={Math.min(i % 3, 2) * 80}>
              <div className="group bg-white rounded-lg p-6 border border-steel-200 hover:border-accent-400/50 hover:shadow-lg transition-all duration-300 h-full cursor-default">
                <div className="w-11 h-11 bg-accent-100 group-hover:bg-accent-500 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon size={20} className="text-accent-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display font-semibold text-navy-900 text-base mb-2">{title}</h3>
                <p className="text-steel-600 text-sm leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Industries ──────────────────────────────────────────────────────────────

function Industries() {
  return (
    <section id="industries" className="py-20 lg:py-28 bg-navy-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(#7aaee0 1px, transparent 1px), linear-gradient(90deg, #7aaee0 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <div className="text-accent-400 text-sm font-semibold uppercase tracking-widest mb-3">Industries Served</div>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl mb-4">Sectors We Operate In</h2>
            <p className="text-steel-400 max-w-2xl mx-auto">
              Cross-sector expertise spanning critical infrastructure, energy, industrial production, and government programmes.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {INDUSTRIES.map(({ Icon, label }, i) => (
            <Reveal key={label} delay={Math.min(i % 4, 3) * 60}>
              <div className="group bg-navy-800/50 border border-white/8 hover:bg-accent-500 hover:border-accent-400 rounded-lg p-5 flex flex-col items-center gap-3 text-center transition-all duration-300 cursor-default">
                <Icon size={24} className="text-accent-400 group-hover:text-white transition-colors duration-300" />
                <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors duration-300">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Mission & Vision ────────────────────────────────────────────────────────

function MissionVision() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <div className="text-accent-500 text-sm font-semibold uppercase tracking-widest mb-3">Our Purpose</div>
            <h2 className="font-display font-bold text-navy-900 text-3xl sm:text-4xl">Mission & Vision</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal delay={0}>
            <div className="relative bg-navy-900 rounded-xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center mb-5">
                  <Target size={22} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-4">Our Mission</h3>
                <p className="text-steel-400 leading-relaxed">
                  Deliver <span className="text-white font-medium">dependable engineering, project management, and technical manpower solutions</span> with unwavering commitment to quality, innovation, safety, and customer satisfaction — ensuring every project we touch achieves its intended outcome.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative bg-steel-50 border border-steel-200 rounded-xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-100 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-accent-100 border border-accent-200 rounded-lg flex items-center justify-center mb-5">
                  <TrendingUp size={22} className="text-accent-500" />
                </div>
                <h3 className="font-display font-bold text-navy-900 text-2xl mb-4">Our Vision</h3>
                <p className="text-steel-600 leading-relaxed">
                  To become a <span className="text-navy-800 font-medium">trusted engineering and EPC partner</span> for organizations across India, recognized for delivering practical, efficient, and sustainable solutions that create lasting value for clients, communities, and the built environment.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Why Choose Us ───────────────────────────────────────────────────────────

function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 lg:py-32 bg-steel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <div className="text-accent-500 text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</div>
              <h2 className="font-display font-bold text-navy-900 text-3xl sm:text-4xl leading-tight mb-5">
                The Difference Is in the Detail
              </h2>
              <p className="text-steel-600 leading-relaxed mb-6">
                Behind every project is a commitment to getting it right — not just done. We bring the discipline of seasoned engineering professionals with the responsiveness of a modern firm.
              </p>
              <div className="aspect-video rounded-lg overflow-hidden bg-steel-200">
                <img
                  src="https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?w=800&h=450&fit=crop&auto=format"
                  alt="Industrial construction site frame structure"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {REASONS.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="bg-white border border-steel-200 rounded-lg p-5 hover:shadow-md hover:border-accent-300 transition-all duration-300">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mb-3">
                    <Icon size={18} className="text-accent-500" />
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 text-sm mb-1.5">{title}</h3>
                  <p className="text-steel-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Leadership ──────────────────────────────────────────────────────────────

function Leadership() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-accent-500 text-sm font-semibold uppercase tracking-widest mb-3">Our Team</div>
            <h2 className="font-display font-bold text-navy-900 text-3xl sm:text-4xl mb-4">Leadership</h2>
            <p className="text-steel-600 max-w-lg mx-auto">
              Profiles coming soon. Our leadership team brings decades of proven engineering and project delivery expertise.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[1, 2, 3].map(n => (
            <Reveal key={n} delay={n * 100}>
              <div className="border-2 border-dashed border-steel-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-steel-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UserCheck size={24} className="text-steel-400" />
                </div>
                <div className="h-3 bg-steel-100 rounded w-24 mx-auto mb-2" />
                <div className="h-2.5 bg-steel-50 rounded w-32 mx-auto" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Compliance ──────────────────────────────────────────────────────────────

function Compliance() {
  return (
    <section className="py-12 bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
            <div className="shrink-0">
              <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Compliance & Registration</div>
              <div className="font-display font-bold text-white text-lg">Legal Information</div>
            </div>
            <div className="flex-1 grid sm:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <div className="text-white/40 text-xs mb-1">GSTIN</div>
                <div className="text-white font-mono text-sm font-medium">06ABCFG5706A1ZZ</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <div className="text-white/40 text-xs mb-1">SAC Code — Installation Services</div>
                <div className="text-white font-mono text-sm font-medium">995442</div>
                <div className="text-white/30 text-xs mt-0.5">Installation, Assembly & Erection</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <div className="text-white/40 text-xs mb-1">SAC Code — Manpower Services</div>
                <div className="text-white font-mono text-sm font-medium">998519</div>
                <div className="text-white/30 text-xs mt-0.5">Technical Manpower & Labour Supply</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Contact Section ─────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function Label({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) {
  return <label className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide" {...props}>{children}</label>
}

function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full border border-steel-200 rounded px-3.5 py-2.5 text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400/30 transition-all ${className}`}
      {...props}
    />
  )
}

function Textarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full border border-steel-200 rounded px-3.5 py-2.5 text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400/30 transition-all resize-none ${className}`}
      {...props}
    />
  )
}

function Select({ className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      className={`w-full border border-steel-200 rounded px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400/30 transition-all bg-white ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

function ContactSection() {
  const [activeTab, setActiveTab] = useState<'contact' | 'rfp'>('contact')

  const [contactForm, setContactForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [contactStatus, setContactStatus] = useState<FormStatus>('idle')

  const [rfpForm, setRfpForm] = useState({
    company: '', contactPerson: '', email: '', phone: '',
    projectType: '', projectLocation: '', budgetRange: '', timeline: '', requirements: ''
  })
  const [rfpStatus, setRfpStatus] = useState<FormStatus>('idle')

  async function submitContact(e: React.FormEvent) {
    e.preventDefault()
    setContactStatus('submitting')
    // Simulate API call — wire to /api/contact (Resend) in production
    await new Promise(r => setTimeout(r, 1200))
    setContactStatus('success')
    setContactForm({ name: '', company: '', email: '', phone: '', message: '' })
  }

  async function submitRFP(e: React.FormEvent) {
    e.preventDefault()
    setRfpStatus('submitting')
    // Simulate API call — wire to /api/rfp (Resend) in production
    await new Promise(r => setTimeout(r, 1400))
    setRfpStatus('success')
    setRfpForm({ company: '', contactPerson: '', email: '', phone: '', projectType: '', projectLocation: '', budgetRange: '', timeline: '', requirements: '' })
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Info */}
          <Reveal className="lg:col-span-2">
            <div>
              <div className="text-accent-500 text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</div>
              <h2 className="font-display font-bold text-navy-900 text-3xl sm:text-4xl leading-tight mb-5">
                Let's Talk About<br />Your Project
              </h2>
              <p className="text-steel-600 leading-relaxed mb-8">
                Whether you have a specific project requirement or want to explore how we can support your engineering goals — reach out. We respond within 24 hours.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { Icon: Phone, label: 'Phone / WhatsApp', value: '+91 8860008545', href: 'tel:+918860008545' },
                  { Icon: Mail, label: 'Email', value: 'gettheworkdonellp@gmail.com', href: 'mailto:gettheworkdonellp@gmail.com' },
                  { Icon: MapPin, label: 'Office Address', value: '1002 U2, Kundli, Haryana, India', href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-accent-500" />
                    </div>
                    <div>
                      <div className="text-xs text-steel-500 mb-0.5">{label}</div>
                      {href
                        ? <a href={href} className="text-navy-800 text-sm font-medium hover:text-accent-500 transition-colors">{value}</a>
                        : <span className="text-navy-800 text-sm font-medium">{value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Map */}
              <div className="rounded-lg overflow-hidden border border-steel-200 h-52">
                <iframe
                  src="https://maps.google.com/maps?q=Kundli+Sonipat+Haryana+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Get The Work Done — Kundli, Haryana"
                />
              </div>
            </div>
          </Reveal>

          {/* Right: Forms */}
          <Reveal delay={150} className="lg:col-span-3">
            <div id="rfp" className="bg-steel-50 border border-steel-200 rounded-xl p-6 sm:p-8">
              {/* Tab switcher */}
              <div className="flex rounded-lg overflow-hidden border border-steel-200 mb-7 bg-white">
                {(['contact', 'rfp'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-navy-900 text-white'
                        : 'text-steel-600 hover:text-navy-800'
                    }`}
                  >
                    {tab === 'contact' ? 'Quick Contact' : 'Request for Proposal'}
                  </button>
                ))}
              </div>

              {/* Contact Form */}
              {activeTab === 'contact' && (
                contactStatus === 'success' ? (
                  <div className="text-center py-10">
                    <CheckCircle size={44} className="text-accent-500 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-navy-900 text-xl mb-2">Message Sent!</h3>
                    <p className="text-steel-600 text-sm mb-4">We'll get back to you within 24 hours.</p>
                    <button onClick={() => setContactStatus('idle')} className="text-accent-500 text-sm font-semibold hover:underline">Send another message</button>
                  </div>
                ) : (
                  <form onSubmit={submitContact} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="c-name">Full Name *</Label>
                        <Input id="c-name" required placeholder="Rajesh Kumar" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="c-company">Company</Label>
                        <Input id="c-company" placeholder="Your Company Pvt. Ltd." value={contactForm.company} onChange={e => setContactForm(f => ({ ...f, company: e.target.value }))} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="c-email">Email Address *</Label>
                        <Input id="c-email" type="email" required placeholder="you@company.com" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="c-phone">Phone / WhatsApp</Label>
                        <Input id="c-phone" type="tel" placeholder="+91 98765 43210" value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="c-msg">Message *</Label>
                      <Textarea id="c-msg" required rows={4} placeholder="Tell us about your project or requirement..." value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} />
                    </div>
                    <button type="submit" disabled={contactStatus === 'submitting'}
                      className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-steel-300 text-white font-semibold py-3 rounded transition-colors text-sm flex items-center justify-center gap-2">
                      {contactStatus === 'submitting' ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</> : <>Send Message <ArrowRight size={16} /></>}
                    </button>
                  </form>
                )
              )}

              {/* RFP Form */}
              {activeTab === 'rfp' && (
                rfpStatus === 'success' ? (
                  <div className="text-center py-10">
                    <CheckCircle size={44} className="text-accent-500 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-navy-900 text-xl mb-2">Proposal Request Received!</h3>
                    <p className="text-steel-600 text-sm mb-4">Our team will review and respond within 48 hours with a tailored proposal.</p>
                    <button onClick={() => setRfpStatus('idle')} className="text-accent-500 text-sm font-semibold hover:underline">Submit another request</button>
                  </div>
                ) : (
                  <form onSubmit={submitRFP} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="r-company">Company Name *</Label>
                        <Input id="r-company" required placeholder="Your Organization" value={rfpForm.company} onChange={e => setRfpForm(f => ({ ...f, company: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="r-contact">Contact Person *</Label>
                        <Input id="r-contact" required placeholder="Full Name" value={rfpForm.contactPerson} onChange={e => setRfpForm(f => ({ ...f, contactPerson: e.target.value }))} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="r-email">Email *</Label>
                        <Input id="r-email" type="email" required placeholder="contact@company.com" value={rfpForm.email} onChange={e => setRfpForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="r-phone">Phone *</Label>
                        <Input id="r-phone" type="tel" required placeholder="+91 XXXXX XXXXX" value={rfpForm.phone} onChange={e => setRfpForm(f => ({ ...f, phone: e.target.value }))} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="r-type">Project / Service Type *</Label>
                        <Select id="r-type" required value={rfpForm.projectType} onChange={e => setRfpForm(f => ({ ...f, projectType: e.target.value }))}>
                          <option value="">Select service...</option>
                          {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="r-loc">Project Location</Label>
                        <Input id="r-loc" placeholder="City, State" value={rfpForm.projectLocation} onChange={e => setRfpForm(f => ({ ...f, projectLocation: e.target.value }))} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="r-budget">Estimated Budget</Label>
                        <Select id="r-budget" value={rfpForm.budgetRange} onChange={e => setRfpForm(f => ({ ...f, budgetRange: e.target.value }))}>
                          <option value="">Select range...</option>
                          {['Below ₹25L', '₹25L – ₹1Cr', '₹1Cr – ₹5Cr', '₹5Cr – ₹25Cr', 'Above ₹25Cr'].map(r => <option key={r} value={r}>{r}</option>)}
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="r-timeline">Expected Timeline</Label>
                        <Select id="r-timeline" value={rfpForm.timeline} onChange={e => setRfpForm(f => ({ ...f, timeline: e.target.value }))}>
                          <option value="">Select timeline...</option>
                          {['Within 1 month', '1–3 months', '3–6 months', '6–12 months', 'More than 12 months'].map(t => <option key={t} value={t}>{t}</option>)}
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="r-req">Project Requirements *</Label>
                      <Textarea id="r-req" required rows={4} placeholder="Describe your project scope, technical requirements, and any specific challenges..." value={rfpForm.requirements} onChange={e => setRfpForm(f => ({ ...f, requirements: e.target.value }))} />
                    </div>
                    <button type="submit" disabled={rfpStatus === 'submitting'}
                      className="w-full bg-navy-900 hover:bg-navy-700 disabled:bg-steel-300 text-white font-semibold py-3 rounded transition-colors text-sm flex items-center justify-center gap-2">
                      {rfpStatus === 'submitting' ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</> : <>Submit Proposal Request <ArrowRight size={16} /></>}
                    </button>
                  </form>
                )
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const services = SERVICES.slice(0, 6).map(s => s.title)
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent-500 rounded flex items-center justify-center">
                <span className="text-white font-bold font-display text-sm">G</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm">Get The Work Done</div>
                <div className="text-xs text-white/40">Your Goals. Our Grind.</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Engineering consultancy and EPC support backed by 10+ years of project delivery expertise.
            </p>
            <a href="https://wa.me/918860008545" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/25 px-4 py-2 rounded text-xs font-semibold transition-colors">
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div>
            <div className="text-white text-sm font-semibold mb-4">Services</div>
            <ul className="space-y-2">
              {services.map(s => (
                <li key={s}><a href="#services" className="text-sm hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <div className="text-white text-sm font-semibold mb-4">Industries</div>
            <ul className="space-y-2">
              {INDUSTRIES.slice(0, 7).map(({ label }) => (
                <li key={label}><a href="#industries" className="text-sm hover:text-white transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-white text-sm font-semibold mb-4">Contact</div>
            <div className="space-y-3">
              <a href="tel:+918860008545" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Phone size={13} /> +91 8860008545
              </a>
              <a href="mailto:gettheworkdonellp@gmail.com" className="flex items-start gap-2 text-sm hover:text-white transition-colors">
                <Mail size={13} className="mt-0.5 shrink-0" /> gettheworkdonellp@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={13} className="mt-0.5 shrink-0" /> 1002 U2, Kundli, Haryana, India
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-white/10">
              <div className="text-xs text-white/30 mb-1">GSTIN</div>
              <div className="font-mono text-xs text-white/50">06ABCFG5706A1ZZ</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© {year} Get The Work Done LLP. All rights reserved.</span>
          <span>Kundli, Haryana · Engineering Consultancy & EPC Support · India</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Floating WhatsApp ───────────────────────────────────────────────────────

function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000)
    return () => clearTimeout(t)
  }, [])
  return (
    <a
      href="https://wa.me/918860008545?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20project%20requirement."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5c] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  )
}

// ─── SEO Head ────────────────────────────────────────────────────────────────

function SEOHead() {
  useEffect(() => {
    document.title = 'Get The Work Done | Engineering Consultancy & EPC Support — India'
    const setMeta = (name: string, content: string, prop?: boolean) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let el = document.querySelector<HTMLMetaElement>(sel)
      if (!el) { el = document.createElement('meta'); if (prop) el.setAttribute('property', name); else el.setAttribute('name', name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    setMeta('description', 'Get The Work Done — Engineering Consultancy and EPC Support services in India. EPC & Turnkey Projects, Project Management, Technical Manpower, Construction Engineering, Tendering & Contract Management.')
    setMeta('keywords', 'Engineering Consultancy India, EPC Support Services, Turnkey Project Management, Construction Engineering, Industrial Installation, Technical Manpower Supply, Project Management Consultancy, Infrastructure Engineering, Contract Management, Tender Consultancy')
    setMeta('author', 'Get The Work Done LLP')
    setMeta('og:title', 'Get The Work Done | Engineering Consultancy & EPC Support', true)
    setMeta('og:description', 'Your Goals. Our Grind. Engineering consultancy and EPC support backed by 10+ years of project delivery expertise.', true)
    setMeta('og:type', 'website', true)
  }, [])
  return null
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-body bg-white text-navy-900 overflow-x-hidden">
      <SEOHead />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <MissionVision />
        <WhyChooseUs />
        <Leadership />
        <Compliance />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
