import LearningHeader from '../learning-header';
import { SiteFooter } from '../brand';
import WeeklyProblemBoard from '../weekly-problem';
export default function ProblemsPage() { return <div className="identity-learning"><LearningHeader /><main className="rmc-container problem-archive"><WeeklyProblemBoard archive /></main><SiteFooter /></div>; }
