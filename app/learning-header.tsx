'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Brand from './brand';

export default function LearningHeader({ signedIn = false }: { signedIn?: boolean }) {
  const [open, setOpen] = useState(false);
  return <header className="rmc-header rmc-container"><Brand /><button className="rmc-menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="learning-nav" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="learning-nav" className={`rmc-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation" onClick={() => setOpen(false)}><a href="/#syllabus">Syllabus</a><a href="/maths-basics">Maths Basics</a><a href="/previous-papers">Past papers</a><a href="/#contact">Contact</a><a className="rmc-button rmc-button-outline rmc-login" href="/student">{signedIn ? 'My learning' : 'Log in'}</a></nav></header>;
}
