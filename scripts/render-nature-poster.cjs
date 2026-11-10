// Code-authored geometry and the untouched supplied logo; illustration stays separate.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const sharp = require(require.resolve('sharp', { paths: [process.env.RMC_NODE_MODULES || path.join(root, 'node_modules')] }));
const data = (name, type = 'image/png') => `data:${type};base64,${fs.readFileSync(path.join(root, name)).toString('base64')}`;
const ink = '#011e47', gold = '#d9a231';
const text = (x,y,s,size=30,extra='') => `<text x="${x}" y="${y}" font-family="Georgia,serif" font-size="${size}" fill="${ink}" ${extra}>${s}</text>`;
function polygon(n,side) { let x=0,y=0;const p=[[0,0]];for(let j=0;j<n-1;j++){x+=side*Math.cos(j*2*Math.PI/n);y+=side*Math.sin(j*2*Math.PI/n);p.push([x,y]);}return p.map(p=>p.map(v=>v.toFixed(3)).join(',')).join(' '); }
const cards = [
  [3,60,6,'Triangles','Fit without gaps',60],
  [4,90,4,'Squares','Fit without gaps',44],
  [5,108,3,'Regular pentagons','Leave a 36° gap',37],
  [6,120,3,'Hexagons','Fit and save wax',33],
].map(([n,a,k,title,caption,side],index)=>{
  const x=35+index*255, cy=935;
  let shapes=''; for(let j=0;j<k;j++)shapes+=`<polygon points="${polygon(n,side)}" transform="rotate(${j*a})" fill="${j%2?'#f4e0ae':'#eab84c'}" stroke="${ink}" stroke-width="1.8"/>`;
  if(n===5)shapes+='<path d="M0 0L40.45 -29.39A50 50 0 0 1 50 0Z" fill="#b0300e" fill-opacity=".2" stroke="#b0300e" stroke-dasharray="3 3"/>';
  return `<rect x="${x}" y="816" width="245" height="307" rx="20" fill="#fffdf5" stroke="${gold}" stroke-width="2"/>${text(x+122.5,862,title,n===5?23:28,'text-anchor="middle" font-weight="bold"')}<g transform="translate(${x+122.5} ${cy})">${shapes}<circle r="3" fill="${ink}"/></g>${text(x+122.5,1051,`${k} × ${a}° = ${k*a}°`,23,'text-anchor="middle"')}${text(x+122.5,1090,caption,21,`text-anchor="middle" ${n===5?'font-style="italic"':''}`)}`;
}).join('');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1500" viewBox="0 0 1080 1500">
<defs><clipPath id="hero"><rect x="24" y="294" width="1032" height="480" rx="24"/></clipPath></defs>
<rect width="1080" height="1500" fill="#fffaf0"/>
<image href="${data('public/ramavana-crest-transparent.png')}" x="42" y="24" width="95" height="95"/>
<image href="${data('public/ramavana-wordmark.svg','image/svg+xml')}" x="152" y="43" width="430" height="59"/>
${text(367,120,'MATHEMATICAL CENTER',19,'text-anchor="middle" letter-spacing="2"')}
<rect x="755" y="39" width="280" height="66" rx="33" fill="${ink}"/>
<text x="895" y="82" text-anchor="middle" font-size="28" fill="white" font-family="Arial,sans-serif" font-weight="bold">MATHS AROUND US</text>
${text(540,183,'DID YOU KNOW? · No. 1',42,'text-anchor="middle" font-weight="bold"')}
${text(540,238,'A spoonful of honey',43,'text-anchor="middle" font-weight="bold"')}
${text(540,281,'hides a maths story.',43,'text-anchor="middle" font-weight="bold"')}
<g clip-path="url(#hero)"><image href="${data('assets/nature-stories/honey-art-source.png')}" x="-84" y="-55" width="1248" height="1560"/></g>
${text(540,804,'Which shapes can fit without gaps?',30,'text-anchor="middle" font-weight="bold"')}
${cards}
${text(540,1173,'Triangles and squares work too!',35,'text-anchor="middle" font-weight="bold"')}
${text(540,1218,'For the same storage area, hexagons need less wall.',30,'text-anchor="middle"')}
${text(540,1260,'Less wall material means less wax.',29,'text-anchor="middle"')}
<path d="M80 1300H1000" stroke="${gold}" stroke-width="2"/>
${text(540,1346,'See the moving pictures and discover why',28,'text-anchor="middle"')}
${text(540,1393,'ramavanamath.com/maths-around-us/1',29,'text-anchor="middle" font-weight="bold"')}
${text(540,1450,'10 November 2026 · Our first picture story',24,'text-anchor="middle"')}
</svg>`;
fs.mkdirSync(path.join(root,'outputs/nature-stories'),{recursive:true});
fs.writeFileSync(path.join(root,'outputs/nature-stories/no-1-honeycomb.svg'),svg);
sharp(Buffer.from(svg)).png().toFile(path.join(root,'public/maths-around-us/1-honeycomb-poster.png')).then(()=>console.log('Rendered No. 1 poster with original crest and exact geometry.'));
