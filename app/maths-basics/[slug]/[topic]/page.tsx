import LevelPage from '../../level-page';
export default async function Level({params,searchParams}:{params:Promise<{slug:string;topic:string}>;searchParams:Promise<{preview?:string}>}){const p=await params;return <LevelPage courseId={p.slug} slug={p.topic} preview={(await searchParams).preview==='teacher'}/>;}
