import { getRequestUser, jsonError } from '@/lib/server';
import { getIntegralsProduct } from '@/lib/integrals-products';
import { hasIntegralsAccess } from '@/lib/integrals-access';
import pdfs from '@/lib/integrals-pdfs.server.json';

export async function GET(request: Request, { params }: { params: Promise<{ id: string; kind: string }> }) {
  const { id, kind } = await params;
  const product = getIntegralsProduct(id);
  if (!product || !['questions', 'solutions'].includes(kind)) return jsonError('Download not found.', 404);
  const user = await getRequestUser(request);
  if (!user) return jsonError('Please sign in to download your paper.', 401);
  try {
    if (!await hasIntegralsAccess(user, id)) return jsonError('Purchase this paper to download it.', 403);
    const filename = `${product.stem}_${kind === 'questions' ? 'Questions' : 'Solutions'}.pdf`;
    const encoded = (pdfs as Record<string, string>)[filename];
    if (!encoded) return jsonError('Download unavailable.', 404);
    return new Response(Uint8Array.from(atob(encoded), c => c.charCodeAt(0)), { headers: {
      'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff',
    }});
  } catch { return jsonError('Download access could not be checked. Please retry.', 503); }
}
