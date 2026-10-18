import LevelPage from '../level-page';
import CourseHome from '../course-home';
import {getBasicsCourse} from '@/lib/basics-catalog';
export default async function Level({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{preview?:string}>}){const {slug}=await params;return getBasicsCourse(slug)?<CourseHome id={slug}/>:<LevelPage slug={slug} preview={(await searchParams).preview==='teacher'}/>;}
