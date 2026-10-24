import { getGoogleUser } from '../google-auth';
import './basics.css';
import './concept-lesson.css';
import LearningHeader from '../learning-header';
import { SiteFooter } from '../brand';
export default async function BasicsLayout({children}:{children:React.ReactNode}) { const user=await getGoogleUser(); return <div className="identity-learning"><LearningHeader signedIn={!!user} /><main className="basics">{children}</main><SiteFooter /></div>; }
