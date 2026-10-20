import './basics.css';
import LearningHeader from '../learning-header';
import { SiteFooter } from '../brand';
export default function BasicsLayout({children}:{children:React.ReactNode}) { return <div className="identity-learning"><LearningHeader /><main className="basics">{children}</main><SiteFooter /></div>; }
