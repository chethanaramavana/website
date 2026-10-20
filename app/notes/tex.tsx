import katex from 'katex';
import 'katex/dist/katex.min.css';
import './tex.css';

export default function Tex({ children }: { children: string }) {
  const text = children.replace(/\\dx\b/g, '\\,dx').replace(/\\dt\b/g, '\\,dt').replace(/\\prime\\prime/g, "''").replace(/\\prime/g, "'").replace(/\\textbf\{([^{}]*)\}/g, '$1').replace(/\\par\b/g, '\n');
  return <span className="tex-prose">{text.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g).map((part, i) => {
    if (!part.startsWith('$')) return <span key={i}>{part}</span>;
    const display = part.startsWith('$$');
    const expression = part.replace(/^\$\$?|\$\$?$/g,'');
    const roomy = !display && /\\(?:int|frac|dfrac|sqrt)(?![a-zA-Z])/.test(expression);
    return <span key={i} className={display ? 'tex-display' : `tex-inline${roomy ? ' tex-roomy' : ''}`} dangerouslySetInnerHTML={{__html:katex.renderToString((roomy ? '\\displaystyle ' : '') + expression, {displayMode:display,throwOnError:false,strict:false,trust:false,output:'htmlAndMathml'})}}/>;
  })}</span>;
}
