import LearningHeader from '@/app/learning-header';
import { SiteFooter } from '@/app/brand';
export default function G11PracticeLayout({children}:{children:React.ReactNode}) { return <div className="identity-learning"><LearningHeader />{children}<SiteFooter /></div>; }
