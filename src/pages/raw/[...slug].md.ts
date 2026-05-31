import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = ({ params, url }) => {
  const { slug } = params;
  if (!slug) return new Response('Not Found', { status: 404 });

  const filePath = path.join(process.cwd(), 'src', 'docs', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return new Response('Not Found', { status: 404 });
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const origin = url.origin;
  
  // Transform /doc/ links to absolute /raw/ links with .md for the AI
  const aiContent = content.replace(/\/doc\/([^\s\)]+)/g, `${origin}/raw/$1.md`);

  return new Response(aiContent, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
};

export async function getStaticPaths() {
  const docs = import.meta.glob('../../docs/**/*.md');
  return Object.keys(docs).map((p) => {
    const slug = p.replace('../../docs/', '').replace('.md', '');
    return { params: { slug } };
  });
}
