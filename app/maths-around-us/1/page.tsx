import type { Metadata } from 'next';
import LearningHeader from '../../learning-header';
import { SiteFooter } from '../../brand';
import HoneycombLab from '../honeycomb-lab';
import '../nature.css';

export const metadata: Metadata = {
  title: 'No. 1 · The maths inside a honeycomb | Ramavana',
  description: 'Triangles and squares fit too. Explore why regular pentagons leave gaps and why hexagons save wax, with pictures and interactive diagrams.',
  alternates: {canonical:'/maths-around-us/1'},
  openGraph: {title:'Maths Around Us · No. 1: A spoonful of honey hides a maths story',description:'A picture story for curious children and parents. Discover why bees build hexagons.',url:'https://ramavanamath.com/maths-around-us/1',images:[{url:'/maths-around-us/1-honeycomb-poster.png',width:1080,height:1500,alt:'Maths Around Us No. 1: honeycomb, triangles, squares, regular pentagons and hexagons'}]},
};

export default function HoneycombStory() { return <div className="identity-learning"><LearningHeader/><main className="nature-page rmc-container">
  <a className="nature-back" href="/maths-around-us">← All picture stories</a>
  <header className="nature-opening"><p className="rmc-eyebrow">Maths Around Us · No. 1 · <time dateTime="2026-11-10">10 November 2026</time></p><h1>A spoonful of honey hides a maths story.</h1><p>A tiny builder. A clever shape. Let’s look inside a honeycomb.</p></header>
  <div className="nature-intro-grid"><figure className="nature-poster"><a href="/maths-around-us/1-honeycomb-poster.png" download><img src="/maths-around-us/1-honeycomb-poster.png" width="1080" height="1500" alt="Ramavana Maths Around Us No. 1 poster: triangles and squares fit, regular pentagons leave gaps, and hexagons fit and save wax."/></a><figcaption><a href="/maths-around-us/1-honeycomb-poster.png" download>Download the WhatsApp poster ↓</a></figcaption></figure><div className="nature-intro-copy"><h2>Imagine building a storehouse from wax.</h2><p>Honeybees make neighbouring wax cells to hold honey, pollen and their young. The familiar honeycomb pattern has six-sided cells.</p><p>Each wall takes material. A useful design should fit neatly with its neighbours and leave plenty of space inside.</p><p><strong>Hexagons do both.</strong> The reason combines two ideas: fitting without gaps, and using less wall for the same space.</p><a className="rmc-button" href="#corners-title">Explore the pictures ↓</a></div></div>
  <HoneycombLab/>
  <aside className="nature-ending"><h2>The little surprise</h2><p>It isn’t that triangles and squares are impossible. They tile too! Regular hexagons combine gap-free packing with the smallest total wall boundary for equal-area cells across a flat surface.</p><p>This is the geometry behind the familiar pattern. Real honeycomb is three-dimensional, and bees build through behaviour and physical processes; they do not need to calculate these formulas.</p><strong>Nature has patterns. Maths helps us notice them.</strong></aside>
  <details className="nature-sources"><summary>For curious parents: sources and the maths</summary><p>For a regular n-sided polygon with area A, perimeter = √(4nA tan(π/n)). Values are rounded to one decimal place. The drawings compare floor areas, not complete three-dimensional cell volumes.</p><ul><li><a href="https://web.mit.edu/blossoms/videos/lessons/why_beehive_honeycombs_have_hexagonal_shape/">MIT BLOSSOMS: why honeycomb cells are hexagonal</a></li><li><a href="https://arxiv.org/abs/math/9906042">Thomas C. Hales: The Honeycomb Conjecture</a></li><li><a href="https://cemc.uwaterloo.ca/sites/default/files/documents/2026/POTWB-26-G-02-S-47088.html">University of Waterloo: regular pentagon corner angles</a></li></ul></details>
  <a className="nature-back" href="/maths-around-us">← Back to Maths Around Us</a>
</main><SiteFooter/></div>; }
