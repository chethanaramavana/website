import { Archive, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

const previousPaperResources = [
  {
    label: 'Board examination papers',
    detail: 'Class 10 papers from recent CBSE examinations, arranged year-wise.',
    href: 'https://www.cbse.gov.in/cbsenew/question-paper.html',
    action: 'Open CBSE archive',
  },
  {
    label: 'Sample papers & marking schemes',
    detail: 'Official sample papers with the corresponding CBSE marking schemes.',
    href: 'https://cbseacademic.nic.in/sqp_archive.html',
    action: 'View sample-paper archive',
  },
  {
    label: 'Class 10 question bank',
    detail: 'Competency-focused questions published by the CBSE Academic Unit.',
    href: 'https://cbseacademic.nic.in/qbclass10.html',
    action: 'Open question bank',
  },
] as const;

export default function PreviousPapersPage() {
  return (<main className="site-shell"><header className="site-header"><a href="/" className="brand-name"><strong>Ramavana</strong><small>Mathematical Center</small></a><nav className="primary-nav"><a href="/">← Home</a><a href="/#study-library">CBSE &amp; ICSE</a><a href="/maths-basics">Maths Basics</a></nav></header>
      <section className="previous-papers-section" id="previous-papers" aria-labelledby="previous-papers-title">
        <div className="previous-papers-heading">
          <span className="previous-papers-icon"><Archive /></span>
          <div>
            <p>Learn from the real pattern</p>
            <h1 id="previous-papers-title">Previous CBSE Papers</h1>
            <span>Use authentic board resources to understand question styles, difficulty and marking.</span>
          </div>
        </div>
        <div className="previous-paper-grid">
          {previousPaperResources.map((resource, index) => (
            <a key={resource.label} className="previous-paper-card" href={resource.href} target="_blank" rel="noreferrer">
              <span className={`paper-resource-number resource-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span>
              <FileText />
              <strong>{resource.label}</strong>
              <p>{resource.detail}</p>
              <span className="paper-resource-action">{resource.action} <ExternalLink /></span>
            </a>
          ))}
        </div>
        <p className="official-resource-note"><ShieldCheck /> These links open official CBSE resources in a new tab. Ramavana does not copy or alter the original papers.</p>
      </section>
</main>);
}
