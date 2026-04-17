import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    MapPin, Clock, Briefcase, GraduationCap, IndianRupee,
    CheckCircle2, ChevronRight, Phone, Mail, Building2, ArrowLeft, Send, User, Loader2
} from 'lucide-react';

import civil from '../assets/jobdeatil.jpg';

// ─── All job data ───────────────────────────────────────────────────────────
const jobsData = {
    'civil-engineer': {
        title: 'Civil Engineer',
        subtitle: 'Solar EPC Projects – Pan India',
        icon: '🏗️',
        qualification: "Diploma in Civil Engineering",
        experience: "6+ Years (Solar Project Experience Preferred)",
        location: "Pan India",
        employmentType: "Full Time",
        officeHours: "09:00 AM – 06:00 PM",
        salary: "No bar for the right candidate",
        responsibilities: [
            "Design, plan, and execute civil works for solar power plant projects (ground-mounted & rooftop).",
            "Prepare drawings, BOQ, bar bending schedules, and other civil documentation.",
            "Coordinate with structural, electrical, and EPC teams for smooth project execution.",
            "Monitor construction activities and ensure adherence to project timelines and quality standards.",
            "Liaise with clients, contractors, and government bodies as required.",
            "Conduct site inspections and ensure safety protocols are strictly followed.",
            "Prepare daily, weekly, and monthly progress reports for management review.",
            "Manage soil testing, foundation design, and structural loads for PV module mounting structures.",
            "Ensure compliance with all applicable codes, regulations, and permits.",
            "Support procurement of civil materials and coordinate with vendors.",
        ],
        skills: [
            "Strong knowledge of solar power plant civil works experience in project execution, quality control, and vendor management.",
            "Understanding of civil engineering codes, standards, and safety norms.",
        ],
        whyJoin: [
            "Be at the forefront of India's renewable energy revolution.",
            "Work on large-scale, impactful solar EPC projects.",
            "Collaborative, skilled, and growth-oriented team environment.",
            "Competitive compensation; no bar for the right candidate.",
        ],
        howToApply: [
            "Send your resume and cover letter to careers@enfrosindia.com or +91 7418096372",
            "With the subject line: “Civil Engineer – Solar EPC"
        ],
        applyEmail: "hr@enfros.in",
        applySubject: "Civil Engineer – Solar EPC",
        applyPhone: "+91 98765 43210",
    },
    'civil-site-supervisor': {
        title: 'Civil Site Supervisor',
        subtitle: 'Solar EPC Projects – Pan India',
        icon: '🦺',
        qualification: "Diploma in Civil Engineering",
        experience: "0 to 2 Years",
        location: "Pan India",
        employmentType: "Full Time",
        officeHours: "09:00 AM – 06:00 PM",
        salary: "No bar for the right candidate",
        responsibilities: [
            "Supervise and manage day-to-day civil construction activities at solar project sites.",
            "Ensure work is executed as per approved drawings and project specifications.",
            "Monitor labour attendance, productivity, and site safety compliance.",
            "Coordinate with civil engineers, electrical teams, and subcontractors.",
            "Inspect and approve civil works including earthwork, fencing, foundations, and cable trenches.",
            "Maintain site records, material receipts, and daily progress reports.",
            "Identify and resolve on-site issues promptly to avoid project delays.",
            "Ensure proper storage, handling, and utilization of civil construction materials.",
            "Conduct regular toolbox talks and enforce HSE procedures on-site.",
        ],
        skills: [
            "Pile Knowledge must.",
            "Proven experience as a Civil Site Supervisor in the construction industry.",
            "Strong problem-solving and decision-making abilities.",
            "Excellent project management and leadership skills.",
            " Knowledge of construction safety regulations and best practices.",
        ],
        whyJoin: [
            "Opportunity to work on high-impact renewable energy projects.",
            "Exposure to large-scale solar EPC project environments.",
            "Supportive leadership and structured project teams.",
            "Competitive remuneration with on-site allowances.",
        ],
        howToApply: [
            "Send your resume and cover letter to careers@enfrosindia.com or +91 7418096372",
            "With the subject line: “Civil Site Supervisor  - Solar Project."
        ],
        applyEmail: "hr@enfros.in",
        applySubject: "Civil Site Supervisor – Solar EPC",
        applyPhone: "+91 98765 43210",
    },
    'safety-supervisor': {
        title: 'Safety Supervisor',
        subtitle: 'HSE & Site Safety – Chennai',
        icon: '⛑️',
        qualification: " B. Tech / BE – Civil Engineering",
        experience: "8 years",
        location: "Chennai, Tamil Nadu",
        employmentType: "Full Time",
        officeHours: "09:00 AM – 06:00 PM",
        salary: "No bar for the right candidate",
        responsibilities: [
            "Manage solar ground-mounted civil projects from initiation to completion.",
            "Coordinate with site teams, contractors, vendors, and office management.",
            "Handle client coordination, site meetings, and progress reviews.",
            "Monitor project schedules, BOQs, budgets, and material consumption.",
            "Ensure quality standards and safety compliance at all project sites.",
            "Provide regular progress and cost reports to management.",
        ],
        skills: [
            "8 years of experience in solar ground-mounted projects.",
            "Must have worked with execution contractors; client-side exposure preferred.",
            "Strong understanding of site execution, manpower management, and billing.",
            "Willingness to travel extensively across project locations.",
            "Long-term role – minimum 5 years commitment preferred.",
        ],
        whyJoin: [
            "Be part of exciting projects in the renewable energy sector.",
            "Friendly and supportive workplace.",
            "Opportunities for growth and learning.",
        ],
        howToApply: [
            "Send your resume and cover letter to careers@enfrosindia.com or +91 7418096372",
            "With the subject line: “Safety Supervisor – Enfros"
        ],
        applyEmail: "hr@enfros.in",
        applySubject: "Safety Supervisor – Enfros",
        applyPhone: "+91 98765 43210",
    },
    'quality-engineer': {
        title: 'Quality Engineer',
        subtitle: 'Solar QA/QC – Pan India',
        icon: '🔍',
        qualification: "Diploma / BE Civil",
        experience: "3 to 5 Years",
        location: "Pan India",
        employmentType: "Full Time",
        officeHours: "09:00 AM – 06:00 PM",
        salary: "No bar for the right candidate",
        responsibilities: [
            "Inspect civil and electrical works at the site",
            "Ensure execution as per approved drawings",
            "Prepare inspection checklists and reports",
            "Review and approve contractor ITP (Inspection and Test Plans) and method statements.",
            "Monitor material quality and workmanship",
            "Support audits and client inspections",
            "Maintain quality records and NCR closure",
        ],
        skills: [
            "Knowledge of solar EPC quality standards",
            "Experience in civil & BOS quality inspection",
            "Understanding of drawings, BOQ, and specifications",
            "Material inspection and verification",
            "Quality documentation and reporting",
            "Coordination with site and QA/QC team",
        ],
        whyJoin: [
            "Be part of exciting projects in the renewable energy sector.",
            "Friendly and supportive workplace.",
            "Opportunities for growth and learning.",
        ],
        howToApply: [
            "Send your resume and cover letter to careers@enfrosindia.com or +91 7418096372",
            "With the subject line: “Quality Engineer – Solar EPC"
        ],
        applyEmail: "hr@enfros.in",
        applySubject: "Quality Engineer – Solar EPC",
        applyPhone: "+91 98765 43210",
    },
    'project-manager': {
        title: 'Project Manager',
        subtitle: 'Solar EPC – Chennai',
        icon: '🎯',
        qualification: "B. Tech / BE – Civil Engineering",
        experience: "8 years",
        location: "Chennai, Tamil Nadu",
        employmentType: "Full Time",
        officeHours: "09:00 AM – 06:00 PM",
        salary: "No bar for the right candidate",
        responsibilities: [
            "Manage solar ground-mounted civil projects from initiation to completion.",
            " Coordinate with site teams, contractors, vendors, and office management.",
            "Handle client coordination, site meetings, and progress reviews.",
            "Monitor project schedules, BOQs, budgets, and material consumption.",
            "Ensure quality standards and safety compliance at all project sites.",
            "Provide regular progress and cost reports to management",
        ],
        skills: [
            "Site, contractor & manpower management",
            "BOQ, billing & cost control",
            "Client coordination & progress reporting",
            "Solar ground-mounted project execution & EPC coordination",
            "Quality, safety & project scheduling expertise",
        ],
        whyJoin: [
            "Be part of exciting projects in the renewable energy sector.",
            "Friendly and supportive workplace.",
            "Opportunities for growth and learning.",
        ],
        howToApply: [
            "Send your resume and cover letter to careers@enfrosindia.com or +91 7418096372",
            "With the subject line: “Project Manager – Solar EPC"
        ],
        applyEmail: "hr@enfros.in",
        applySubject: "Project Manager – Solar EPC",
        applyPhone: "+91 98765 43210",
    },
    'electrical-engineer': {
        title: 'Electrical Engineer',
        subtitle: 'Solar EPC – Maharashtra',
        icon: '⚡',
        qualification: "B.Tech – Electrical & Electronics Engineering (EEE)",
        experience: "4 years",
        location: "Maharashtra",
        employmentType: "Full Time",
        officeHours: "09:00 AM – 06:00 PM",
        salary: "No bar for the right candidate",
        responsibilities: [
            "Execution of Ground Mounted Solar EPC Projects.",
            " Handling Installation, Testing & Commissioning (I&C) of solar plant electrical systems.",
            "Managing HT/LT Panels, Inverters, Transformers, and SCADA systems.",
            "Ensure electrical safety compliance and quality standards at project sites.",
            "Coordinate with site teams, vendors, and project managers.",
            "Support project planning, execution, and reporting activities.",
            "Supervise and guide technical teams during project execution.",
        ],
        skills: [
            "Hands-on experience in Ground Mounted Solar Projects.",
            "Knowledge of HT/LT Panels, Inverters, Transformers & SCADA.",
            "Strong understanding of electrical design concepts.",
            "Experience in Installation, Testing & Commissioning (I&C).",
            "Team management and project coordination skills.",
            "Willingness to travel and work at project sites."
        ],
        whyJoin: [
            "Be part of exciting projects in the renewable energy sector.",
            "Friendly and supportive workplace.",
            "Opportunities for growth and learning.",
        ],
        howToApply: [
            "Send your resume and cover letter to careers@enfrosindia.com or +91 7418096372",
            "With the subject line: “Project Manager – Solar EPC"
        ],
        applyEmail: "hr@enfros.in",
        applySubject: "Project Manager – Solar EPC",
        applyPhone: "+91 98765 43210",
    },
    "business-development-manager": {
        title: 'Business Development Manager',
        subtitle: 'Solar EPC – Perubakkam , Chennai',
        icon: '📈',
        qualification: "MBA – Marketing",
        experience: "5+ Years in Solar / Renewable Energy Business Development",
        location: "Perubakkam , Chennai",
        employmentType: "Full Time",
        officeHours: "09:00 AM – 06:00 PM",
        salary: "No bar for the right candidate",
        responsibilities: [
            "Manage and grow relationships with IPPs, EPC companies, and strategic partners.",
            "Identify new solar business opportunities, including Tenders, RFQs, and developer projects.",
            "Lead the complete sales cycle from prospecting to deal closure.",
            "Explore new markets and develop strategies for business expansion.",
            "Provide market intelligence on upcoming projects, pricing trends, and competitors.",
            "Build and maintain a strong sales pipeline to achieve revenue targets.",
            "Drive partnerships and collaborations to expand solar EPC business opportunities.",
        ],
        skills: [
            "Proven track record in solar / renewable energy business development.",
            "Strong negotiation and deal-making skills.",
            "Excellent communication and presentation abilities.",
            "Ability to work independently and as part of a team.",
            "Strong analytical and problem-solving skills.",
            "Willingness to travel across Tamil Nadu and neighbouring states."
        ],
        whyJoin: [
            "Be part of exciting projects in the renewable energy sector.",
            "Friendly and supportive workplace.",
            "Opportunities for growth and learning.",
        ],
        howToApply: [
            "Send your resume and cover letter to careers@enfrosindia.com or +91 7418096372",
            "With the subject line: “Project Manager – Solar EPC"
        ],
        applyEmail: "hr@enfros.in",
        applySubject: "Project Manager – Solar EPC",
        applyPhone: "+91 98765 43210",
    }
};

// ─── Info Card icons as SVG illustrations ────────────────────────────────────
const IconQualification = () => (
    <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#fef3c7,#fde68a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(245,158,11,0.25)' }}>
        <GraduationCap size={36} color="#d97706" />
    </div>
);
const IconExperience = () => (
    <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#fef3c7,#fde68a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(245,158,11,0.25)' }}>
        <Briefcase size={36} color="#d97706" />
    </div>
);
const IconLocation = () => (
    <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#fef3c7,#fde68a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(245,158,11,0.25)' }}>
        <MapPin size={36} color="#d97706" />
    </div>
);
const IconEmployment = () => (
    <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#fef3c7,#fde68a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(245,158,11,0.25)' }}>
        <User size={36} color="#d97706" />
    </div>
);
const IconHours = () => (
    <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#fef3c7,#fde68a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(245,158,11,0.25)' }}>
        <Clock size={36} color="#d97706" />
    </div>
);
const IconSalary = () => (
    <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#fef3c7,#fde68a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(245,158,11,0.25)' }}>
        <IndianRupee size={36} color="#d97706" />
    </div>
);

// ─── Application Form ────────────────────────────────────────────────────────
const ApplicationForm = ({ jobTitle, applyEmail, applySubject }) => {
    const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', designation: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(false);

        try {
            // NOTE: Replace 'YOUR_ACCESS_KEY_HERE' with your real Web3Forms Access Key
            // Get one for free at https://web3forms.com/
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "06ecfe40-dcb0-4c29-af8f-8ed7f5f638a6", // Placeholder - replace with your real key
                    subject: `New Job Application: ${jobTitle} - ${applySubject}`,
                    from_name: `${form.firstName} ${form.lastName}`,
                    email: form.email,
                    phone: form.phone,
                    designation: form.designation || jobTitle,
                    message: form.message,
                    application_details: `
                        Full Name: ${form.firstName} ${form.lastName}
                        Email: ${form.email}
                        Phone: ${form.phone}
                        Designation: ${form.designation}
                        Job Title: ${jobTitle}
                    `,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setSubmitted(true);
            } else {
                setError(true);
            }
        } catch (err) {
            console.error("Mail Error:", err);
            setError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: 40, textAlign: 'center', animation: 'scale-in 0.5s ease' }}>
                <CheckCircle2 size={56} color="#22c55e" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#166534', marginBottom: 12 }}>Application Received!</h3>
                <p style={{ color: '#15803d', fontSize: 16 }}>Thank you for applying. Your details have been sent to our recruitment team at <span style={{ fontWeight: 700 }}>codelanceofficial@gmail.com</span>. We'll review your profile and get back to you shortly.</p>
            </div>
        );
    }

    const inputStyle = {
        width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: 10,
        outline: 'none', fontSize: 14, color: '#374151', background: 'white',
        boxSizing: 'border-box', fontFamily: 'inherit',
        transition: 'border-color 0.2s',
    };
    const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                    <label style={labelStyle}>First Name <span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="text" name="firstName" required value={form.firstName} onChange={handleChange}
                        placeholder="First name" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#f59e0b'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                <div>
                    <label style={labelStyle}>Last Name <span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="text" name="lastName" required value={form.lastName} onChange={handleChange}
                        placeholder="Last name" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#f59e0b'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                    <label style={labelStyle}>Mobile No. <span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#f59e0b'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                <div>
                    <label style={labelStyle}>Email <span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="your@email.com" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#f59e0b'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
            </div>
            <div>
                <label style={labelStyle}>Select Designation <span style={{ color: '#ef4444' }}>*</span></label>
                <select name="designation" required value={form.designation} onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = '#f59e0b'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}>
                    <option value="">Select Designation</option>
                    <option>Civil Engineer – Solar EPC</option>
                    <option>Civil Site Supervisor – Solar EPC</option>
                    <option>Safety Supervisor – Enfros</option>
                    <option>Quality Engineer – Solar EPC</option>
                    <option>Electrical engineer – Solar EPC</option>
                    <option>Business Development Manager – Enfros</option>
                    <option>Other</option>
                </select>
            </div>
            <div>
                <label style={labelStyle}>Message</label>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange}
                    placeholder="Tell us about your experience and why you're interested in this role..."
                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                    onFocus={e => e.target.style.borderColor = '#f59e0b'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            </div>
            <button type="submit" disabled={isSubmitting} style={{
                background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg,#f59e0b,#eab308)', color: 'white', fontWeight: 700,
                padding: '14px 32px', borderRadius: 10, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 16px rgba(245,158,11,0.4)', transition: 'all 0.2s', fontFamily: 'inherit',
            }}
                onMouseEnter={e => !isSubmitting && (e.target.style.opacity = '0.9')}
                onMouseLeave={e => !isSubmitting && (e.target.style.opacity = '1')}>
                {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : <><Send size={18} /> Submit Application</>}
            </button>

            {error && (
                <p style={{ color: '#ef4444', fontSize: 14, textAlign: 'center', marginTop: -10 }}>
                    Oops! Something went wrong. Please try again or email us directly.
                </p>
            )}

            <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
                Your application will be sent to <span style={{ fontWeight: 600, color: '#d97706' }}>codelanceofficial@gmail.com</span>
            </p>
        </form>
    );
};

// ─── JobDetail Page ──────────────────────────────────────────────────────────
const JobDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const job = jobsData[slug];

    if (!job) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 96, background: '#fffbeb' }}>
                <h1 style={{ fontSize: 36, fontWeight: 900, color: '#111827', marginBottom: 16 }}>Job Not Found</h1>
                <p style={{ color: '#6b7280', marginBottom: 32 }}>This position may no longer be available.</p>
                <Link to="/career" style={{ background: '#f59e0b', color: 'white', padding: '12px 32px', borderRadius: 12, fontWeight: 700, textDecoration: 'none' }}>
                    Back to Careers
                </Link>
            </div>
        );
    }

    const otherJobs = Object.entries(jobsData)
        .filter(([key]) => key !== slug)
        .map(([key, val]) => ({ slug: key, ...val }));

    const infoCards = [
        { Icon: IconQualification, label: 'Qualification', value: job.qualification },
        { Icon: IconExperience, label: 'Experience', value: job.experience },
        { Icon: IconLocation, label: 'Location', value: job.location },
        { Icon: IconEmployment, label: 'Employment Type', value: job.employmentType },
        { Icon: IconHours, label: 'Office Hours', value: job.officeHours },
        { Icon: IconSalary, label: 'Salary', value: job.salary },
    ];

    const sectionTitle = (text) => (
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111827', marginBottom: 24, paddingBottom: 12, borderBottom: '3px solid #fde68a', display: 'inline-block', fontFamily: 'Raleway, sans-serif' }}>
            {text}
        </h2>
    );

    const bulletItem = (text, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid #fef3c7', lineHeight: 1.7 }}>
            <span style={{ color: '#f59e0b', fontSize: 18, flexShrink: 0, marginTop: 2 }}>◈</span>
            <span style={{ color: '#4b5563', fontSize: 15 }}>{text}</span>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #fffbeb, #fefce8, #fef3c7)', fontFamily: "'Open Sans', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap');
                * { box-sizing: border-box; }
                .info-card { background: white; border-radius: 16px; padding: 28px 20px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.07); transition: transform 0.25s, box-shadow 0.25s; border: 1px solid #fde68a; }
                .info-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(245,158,11,0.18); }
                .hero-banner { position: relative; overflow: hidden; }
                .hero-bg { position: absolute; inset: 0; background-image: url('https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=1600&h=700&fit=crop'); background-size: cover; background-position: center right; z-index: 0; }
                .hero-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to right, rgba(255,251,235,1) 0%, rgba(255,251,235,0.97) 30%, rgba(255,251,235,0.80) 55%, rgba(255,251,235,0.1) 100%); }
                .other-job-card { background: white; border: 2px solid #fde68a; border-radius: 14px; padding: 16px; transition: all 0.25s; cursor: pointer; display: flex; align-items: center; gap: 12; }
                .other-job-card:hover { border-color: #f59e0b; box-shadow: 0 8px 24px rgba(245,158,11,0.2); transform: translateY(-2px); }
                @media (max-width: 768px) {
                    .info-grid { grid-template-columns: 1fr 1fr !important; }
                    .main-grid { grid-template-columns: 1fr !important; }
                    .hero-content h1 { font-size: 32px !important; }
                }
                @media (max-width: 480px) {
                    .info-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ─── Hero Banner ─── */}
            <div className="hero-banner" style={{ paddingTop: 80, display: 'flex', alignItems: 'center' }}>
                <div className="hero-bg" />
                <div className="hero-overlay" />
                <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '60px 32px' }}>
                    {/* Breadcrumb */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
                        <Link to="/" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }} onMouseEnter={e => e.target.style.color = '#d97706'} onMouseLeave={e => e.target.style.color = '#6b7280'}>Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/career" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }} onMouseEnter={e => e.target.style.color = '#d97706'} onMouseLeave={e => e.target.style.color = '#6b7280'}>Careers</Link>
                        <ChevronRight size={14} />
                        <span style={{ color: '#d97706', fontWeight: 600 }}>{job.title}</span>
                    </div>
                    <div className="hero-content" style={{ maxWidth: 680 }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>{job.icon}</div>
                        <h1 style={{ fontSize: 52, fontWeight: 900, color: '#111827', margin: '0 0 12px', lineHeight: 1.1, fontFamily: 'Raleway, sans-serif' }}>
                            {job.title}
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: 18, margin: '0 0 12px' }}>In Solar Industry</p>
                        <p style={{ color: '#374151', fontSize: 15, margin: 0 }}>{job.subtitle}</p>
                    </div>
                </div>
            </div>

            {/* ─── Main Wrapper ─── */}
            <div style={{ maxWidth: 1300, margin: '0 auto', padding: '60px 32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>

                    {/* Top Row: Image (Left) & Info Cards (Right) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="top-split">
                        {/* Left: Featured Image */}
                        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                            <img
                                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop"
                                alt="Modern Workspace"
                                style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.05)' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />
                        </div>

                        {/* Right: Info Cards Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                            {infoCards.map(({ Icon, label, value }, i) => (
                                <div className="info-card" key={i} style={{ padding: '24px 16px' }}>
                                    <Icon />
                                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 6, fontFamily: 'Raleway, sans-serif' }}>{label}</h3>
                                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section: Job Responsibilities */}
                    <div style={{ background: 'white', borderRadius: 24, padding: '48px', boxShadow: '0 4px 32px rgba(0,0,0,0.05)', border: '1px solid #fde68a' }}>
                        {sectionTitle('Job Responsibilities')}
                        <div style={{ marginTop: 12 }}>
                            {job.responsibilities.map((item, i) => bulletItem(item, i))}
                        </div>
                    </div>

                    {/* Section: Skills & Qualifications */}
                    <div style={{ background: 'white', borderRadius: 24, padding: '48px', boxShadow: '0 4px 32px rgba(0,0,0,0.05)', border: '1px solid #fde68a' }}>
                        {sectionTitle('Skills, Experience and Qualification Required')}
                        <div style={{ marginTop: 12 }}>
                            {job.skills.map((item, i) => bulletItem(item, i))}
                        </div>
                    </div>

                    <div style={{ background: 'white', borderRadius: 24, padding: '48px', boxShadow: '0 4px 32px rgba(0,0,0,0.05)', border: '1px solid #fde68a' }}>
                        {sectionTitle('Why Join Us')}
                        <div style={{ marginTop: 12 }}>
                            {job.whyJoin.map((item, i) => bulletItem(item, i))}
                        </div>
                    </div>

                    <div style={{ background: 'white', borderRadius: 24, padding: '48px', boxShadow: '0 4px 32px rgba(0,0,0,0.05)', border: '1px solid #fde68a' }}>
                        {sectionTitle('How to Apply')}
                        <div style={{ marginTop: 12 }}>
                            {job.howToApply.map((item, i) => bulletItem(item, i))}
                        </div>
                    </div>

                    {/* Section: Why Join Us */}
                    {/* <div style={{ background: 'linear-gradient(135deg,#fffbeb,#fef3c7)', borderRadius: 24, padding: '48px', boxShadow: '0 4px 32px rgba(0,0,0,0.05)', border: '1px solid #fde68a' }}>
                        {sectionTitle('Why Join Us?')}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, marginTop: 12 }}>
                            {job.whyJoin.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px', background: 'rgba(255,255,255,0.7)', borderRadius: 20, border: '1px solid #fef3c7' }}>
                                    <div style={{ width: 40, height: 40, background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={24} color="white" />
                                    </div>
                                    <span style={{ color: '#374151', fontSize: 16, lineHeight: 1.6, fontWeight: 500 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* Section: How to Apply & Interactive CTA */}
                    {/* <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }} className="cta-split">
                        <div style={{ background: 'white', borderRadius: 24, padding: '40px', boxShadow: '0 4px 32px rgba(0,0,0,0.05)', border: '1px solid #fde68a' }}>
                            {sectionTitle('Application Process')}
                            <div style={{ marginTop: 12 }}>
                                {[
                                    <>Email your CV to <a href={`mailto:${job.applyEmail}`} style={{ color: '#d97706', fontWeight: 700 }}>{job.applyEmail}</a></>,
                                    <>Connect via phone: <a href={`tel:${job.applyPhone}`} style={{ color: '#d97706', fontWeight: 700 }}>{job.applyPhone}</a></>,
                                    <>Mention subject: <strong>"{job.applySubject}"</strong></>,
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'center', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: i < 2 ? '1px solid #fef3c7' : 'none' }}>
                                        <div style={{ width: 10, height: 10, background: '#f59e0b', borderRadius: '50%' }} />
                                        <span style={{ color: '#4b5563', fontSize: 16 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ background: 'linear-gradient(135deg,#f59e0b,#eab308)', borderRadius: 24, padding: '48px', color: 'white', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 20px 40px rgba(245,158,11,0.3)' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16, fontFamily: 'Raleway, sans-serif' }}>Join the Team</h2>
                            <p style={{ fontSize: 17, opacity: 0.9, marginBottom: 32, lineHeight: 1.6 }}>Your career in renewable energy starts here. Apply today!</p>
                            <a href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(job.applySubject)}`}
                                style={{ background: 'white', color: '#d97706', fontWeight: 800, padding: '18px 36px', borderRadius: 16, textDecoration: 'none', fontSize: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'transform 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <Mail size={22} /> Send Resume
                            </a>
                        </div>
                    </div> */}

                    {/* Section: Application Form */}
                    <div style={{ background: 'white', borderRadius: 32, padding: '60px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid #fde68a' }}>
                        <div style={{ textAlign: 'center', marginBottom: 50 }}>
                            <h2 style={{ fontSize: 36, fontWeight: 900, color: '#111827', marginBottom: 12, fontFamily: 'Raleway, sans-serif' }}>Quick Application</h2>
                            <p style={{ color: '#6b7280', fontSize: 18 }}>Please fill in your details and we will get back to you.</p>
                        </div>
                        <div style={{ maxWidth: 800, margin: '0 auto' }}>
                            <ApplicationForm jobTitle={job.title} applyEmail={job.applyEmail} applySubject={job.applySubject} />
                        </div>
                    </div>

                    {/* Section: Other Roles */}
                    <div style={{ marginTop: 40 }}>
                        <h2 style={{ fontSize: 32, fontWeight: 900, color: '#111827', textAlign: 'center', marginBottom: 40, fontFamily: 'Raleway, sans-serif' }}>OTHER OPEN ROLES</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                            {otherJobs.slice(0, 3).map((j) => (
                                <div key={j.slug} className="other-job-card" onClick={() => navigate(`/career/${j.slug}`)} style={{ padding: '24px', alignItems: 'flex-start', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ fontSize: 40 }}>{j.icon}</div>
                                    <div>
                                        <h4 style={{ fontWeight: 800, color: '#111827', fontSize: 18, margin: '0 0 8px' }}>{j.title}</h4>
                                        <p style={{ fontSize: 14, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                                            <MapPin size={16} color="#f59e0b" /> {j.location}
                                        </p>
                                    </div>
                                    <div style={{ marginTop: 8, color: '#d97706', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
                                        View Details <ChevronRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobDetail;