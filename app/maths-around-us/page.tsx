import type { Metadata } from 'next';
import LearningHeader from '../learning-header';
import { SiteFooter } from '../brand';
import { natureStories } from '@/lib/nature-stories';
import './nature.css';
export const metadata: Metadata = {title:'Maths Around Us · Picture stories | Ramavana',description:'Numbered picture stories that help children and parents notice mathematics in nature and everyday life.'};
export default function NatureStories(){return <div className="identity-learning"><LearningHeader/><main className="nature-page rmc-container"><header className="nature-opening"><p className="rmc-eyebrow">For curious children and parents</p><h1>Maths Around Us</h1><p>Small stories. Beautiful patterns. A new way to notice the world.</p></header><div className="nature-story-list">{[...natureStories].reverse().map(s=><a className="nature-story-card" href={s.href} key={s.number}><img src={s.poster} width="1080" height="1500" alt={s.title}/><div><p className="rmc-eyebrow">No. {s.number} · <time dateTime={s.date}>{new Date(s.date+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}</time></p><h2>{s.title}</h2><p>{s.description}</p><strong>Explore the story →</strong></div></a>)}</div></main><SiteFooter/></div>}
