import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function Tex({ children }: { children: string }) {
  const text = children.replace(/\\dx\b/g, '\\,dx').replace(/\\dt\b/g, '\\,dt').replace(/\\prime\\prime/g, "''").replace(/\\prime/g, "'").replace(/\\textbf\{([^{}]*)\}/g, '$1').replace(/\\par\b/g, '\n');
  return <span className="tex-prose">{text.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g).map((part, i) => part.startsWith('$') ? <span key={i} className={part.startsWith('$$') ? 'tex-display' : 'tex-inline'} dangerouslySetInnerHTML={{__html:katex.renderToString(part.replace(/^\$\$?|\$\$?$/g,''), {displayMode:part.startsWith('$$'),throwOnError:false,strict:false,trust:false,output:'htmlAndMathml'})}}/> : <span key={i}>{part}</span>)}</span>;
}
