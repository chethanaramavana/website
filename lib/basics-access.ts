import {getDatabase,isAdmin,type RequestUser} from './server';
import {basicsCourses,getBasicsCourse,basicsProducts} from './basics-catalog';
export const BASICS_PRODUCT='maths-basics-5-8';
export const BASICS_PRICE=15000;
async function owns(user:RequestUser,id:string){const product=basicsProducts.find(p=>p.id===id);if(!product)return false;return !!await getDatabase().prepare("SELECT id FROM payment_requests WHERE user_id=? AND paper_id=? AND amount_paise=? AND status='approved' LIMIT 1").bind(user.userId,id,product.amount).first();}
export async function hasBasicsPackage(user:RequestUser,tier='base'){if(await owns(user,'maths-basics-all'))return true;return tier==='base'?await owns(user,BASICS_PRODUCT):await owns(user,BASICS_PRODUCT)&&await owns(user,'maths-basics-9-10');}
export async function basicsCompleted(user:RequestUser,slug:string){return !!await getDatabase().prepare('SELECT topic_slug FROM basics_progress WHERE user_id=? AND topic_slug=? AND completed=1').bind(user.userId,slug).first();}
export async function canOpenBasics(user:RequestUser,slug:string,courseId='foundations'){const course=getBasicsCourse(courseId);if(!course)return false;const i=(course.topics as readonly string[]).indexOf(slug);if(i<0)return false;if(i===0||isAdmin(user))return true;return await hasBasicsPackage(user,course.tier)&&await basicsCompleted(user,course.topics[i-1]);}
export async function canOpenBasicsAny(user:RequestUser,slug:string){for(const course of basicsCourses)if(await canOpenBasics(user,slug,course.id))return true;return false;}
export async function canBuyBasics(user:RequestUser,id:string){const tier=id===BASICS_PRODUCT?'base':'extension';if(id==='maths-basics-9-10'&&!await hasBasicsPackage(user))return false;if(id==='maths-basics-all'&&await hasBasicsPackage(user))return false;for(const course of basicsCourses)if(course.tier===tier&&await basicsCompleted(user,course.topics[0]))return true;return false;}
