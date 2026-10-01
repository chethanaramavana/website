import { getRequestUser, jsonError } from '@/lib/server';
import { getStudentRecordsForUser } from '@/lib/student-records';

export async function GET(request: Request) {
  const user = await getRequestUser(request);
  if (!user) return Response.json({ signedIn: false, access: [], payments: [], submissions: [] });
  try {
    return Response.json(await getStudentRecordsForUser(user));
  } catch (error) {
    console.error('student records failed', error);
    return jsonError('Your student account could not be loaded.', 500);
  }
}
