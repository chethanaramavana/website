import {Heart} from 'lucide-react';
export default function SuccessPraise({children='Well done! You got it right.'}:{children?:React.ReactNode}){return <span className="basics-praise">{children}<Heart aria-hidden="true" className="basics-reward-heart"/></span>;}
