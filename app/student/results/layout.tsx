import LearningHeader from '@/app/learning-header';
import { SiteFooter } from '@/app/brand';
export default function ResultLayout({children}:{children:React.ReactNode}) { return <div className="identity-learning"><LearningHeader signedIn />{children}<SiteFooter /></div>; }
