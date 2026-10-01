import HomePage from '@/app/page';

export default async function ChapterPage({ params }: { params: Promise<{ gradeSlug: string; chapterSlug: string }> }) {
  const { gradeSlug, chapterSlug } = await params;
  const gradeMatch = gradeSlug.match(/^grade-(6|10)$/);
  const chapterMatch = chapterSlug.match(/^ch-(\d+)$/);
  const grade = gradeMatch ? Number(gradeMatch[1]) : null;
  const chapterNumber = chapterMatch ? Number(chapterMatch[1]) : null;
  return <HomePage initialBoard="CBSE" initialGrade={grade} initialChapterNumber={chapterNumber} />;
}
