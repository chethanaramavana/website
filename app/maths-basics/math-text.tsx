import Tex from '@/app/notes/tex';
import {basicsMathText} from '@/lib/basics-math-notation';
export default function MathText({children}:{children:string}){return <Tex>{basicsMathText(children)}</Tex>;}
