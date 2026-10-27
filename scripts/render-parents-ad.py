"""Parent-facing ad: plain text, actual website demonstrations, original music.

No speech or recordings are loaded. Inputs/exports remain local in outputs/.
"""
from pathlib import Path
import importlib.util, subprocess, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

PROJECT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('website_ad',PROJECT/'scripts/render-website-ad.py')
source=importlib.util.module_from_spec(spec);spec.loader.exec_module(source)
ROOT=PROJECT/'outputs/video-maths-basics/story-v10'
ROOT.mkdir(exist_ok=True)
SCENES=[
 (5,'Dear parents,\nare you worried about your\nchild’s maths?',[]),
 (3,'We are here to help.\nOne concept at a time.',[]),
 (4,'Welcome to Ramavana.', ['home']),
 (4,'Make the basics clear.\nChoose your child’s grade.', ['grades']),
 (5,'See fractions.\nUnderstand what they mean.', ['fractions-negative','fractions-near-zero']),
 (4,'Explore powers with pictures.', ['powers-row','powers-square']),
 (5,'Make algebra easier to understand.', ['algebra-three','algebra-five']),
 (5,'Solve equations, step by step.', ['equation-before','equation-after']),
 (5,'Discover how geometry works.', ['geometry-before','geometry-after']),
 (4,'Practise each concept.\nThen take the level test.', ['practice','test']),
 (6,'Visit\nRamavanamath.com', ['logo']),
]
TOTAL=sum(s[0] for s in SCENES)

def music():
    """Deterministic original instrumental: soft keys, bass, pads and light pulse."""
    sr=48000; out=np.zeros((int(TOTAL*sr),2),np.float64); beat=60/96
    rng=np.random.default_rng(23)
    def add(midi,on,length,gain,pan=0,kind='keys'):
        t=np.arange(int(length*sr))/sr;f=440*2**((midi-69)/12)
        if kind=='pad':
            sig=(np.sin(2*np.pi*f*t)+.2*np.sin(2*np.pi*f*2*t))
            env=np.minimum(t/.6,1)*np.minimum((length-t)/.8,1)*.32
        else:
            sig=np.sin(2*np.pi*f*t)+.25*np.sin(2*np.pi*2*f*t)+.08*np.sin(2*np.pi*3*f*t)
            env=(1-np.exp(-t*110))*np.exp(-t/(.65 if kind=='keys' else 1.1))*np.minimum((length-t)/.08,1)
        sig*=env*gain;start=int(on*sr);n=min(len(sig),len(out)-start)
        if n>0:out[start:start+n]+=sig[:n,None]*np.array([np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)])
    chords=[[48,55,60,64,67],[45,52,57,60,64],[41,48,53,57,60],[43,50,55,59,62]]
    bars=int(np.ceil(TOTAL/(beat*4)))
    for bar in range(bars):
        chord=chords[bar%4];on=bar*beat*4
        add(chord[0]-12,on,beat*3.8,.15,kind='bass')
        for n in chord[2:]:add(n,on,beat*4.6,.045,kind='pad')
        for k,idx in enumerate([2,3,4,3,2,4,3,4]):
            add(chord[idx]+(12 if bar%4==3 and k>5 else 0),on+k*beat/2,1.8,.12,(-.22 if k%2 else .22))
        for k in range(4):
            start=int((on+k*beat)*sr);n=min(int(.13*sr),len(out)-start)
            if n>0:
                t=np.arange(n)/sr
                pulse=np.sin(2*np.pi*(55*t+2*(1-np.exp(-t*35))))*np.exp(-t*38)*.055
                out[start:start+n]+=pulse[:,None]
    # Gentle opening and ending; no voice is mixed into the soundtrack.
    t=np.arange(len(out))/sr;fade=np.minimum(t/1.2,1)*np.minimum((TOTAL-t)/2.5,1)
    out*=fade[:,None];out*=.78/max(.01,np.max(np.abs(out)))
    with wave.open(str(ROOT/'original-instrumental.wav'),'wb') as f:
        f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes((out*32767).astype('<i2').tobytes())

def font(size,bold=False):
    return ImageFont.truetype('C:/Windows/Fonts/arial'+('bd' if bold else '')+'.ttf',size)

def text(draw,caption,w,y,size,bold=False):
    lines=[]
    for paragraph in caption.split('\n'):
        line=''
        for word in paragraph.split():
            candidate=(line+' '+word).strip()
            if draw.textlength(candidate,font=font(size,bold))>w-100 and line:lines.append(line);line=word
            else:line=candidate
        lines.append(line)
    for k,line in enumerate(lines):draw.text((w//2,y+k*size*1.35),line,font=font(size,bold),fill='#011e47',anchor='mt')
    return len(lines)*size*1.35

def render(portrait):
    label='Portrait' if portrait else 'YouTube';w,h=(1080,1920) if portrait else (1920,1080)
    folder=ROOT/label;folder.mkdir(exist_ok=True);sequence=[]
    for i,(duration,caption,names) in enumerate(SCENES):
        for j,name in enumerate(names or ['text']):
            im=Image.new('RGB',(w,h),'white');d=ImageDraw.Draw(im)
            if name=='text':
                size=67 if portrait else 76
                text(d,caption,w,h//2-int(len(caption.split('\n'))*size*1.35/2),size,True)
            elif name=='logo':
                crest=Image.open(PROJECT/'public/ramavana-crest-transparent.png').convert('RGBA')
                crest=ImageOps.contain(crest,(330,330),Image.Resampling.LANCZOS)
                y=470 if portrait else 145
                im.paste(crest,((w-crest.width)//2,y),crest)
                word=Image.open(PROJECT/'outputs/video-maths-basics/assets/wordmark.png').convert('RGBA')
                word=ImageOps.contain(word,(700,145),Image.Resampling.LANCZOS)
                im.paste(word,((w-word.width)//2,y+350),word)
                text(d,caption,w,y+540,61 if portrait else 64,True)
            else:
                shot=source.capture(name)
                shot=ImageOps.contain(shot,(w-48,h-280),Image.Resampling.LANCZOS)
                # Keep captions next to the demo rather than across a large empty gap.
                y=max(45,(h-shot.height-180)//2)
                text(d,caption,w,y,48 if portrait else 46)
                im.paste(shot,((w-shot.width)//2,y+165))
            path=folder/f'{i:02}-{j}.png';im.save(path)
            sequence.extend([f"file '{path.name}'",f'duration {duration/max(1,len(names))}'])
    sequence.append(f"file '{path.name}'");manifest=folder/'frames.txt';manifest.write_text('\n'.join(sequence))
    target=ROOT/f'Ramavana-Parents-Music-Only-{label}.mp4'
    subprocess.run([source.FF,'-v','error','-y','-f','concat','-safe','0','-i',str(manifest),'-i',str(ROOT/'original-instrumental.wav'),
        '-t',str(TOTAL),'-vf','fps=30','-c:v','libx264','-preset','veryfast','-crf','18','-threads','4','-pix_fmt','yuv420p',
        '-c:a','aac','-b:a','256k','-movflags','+faststart',str(target)],check=True)
    print(target,flush=True)

if __name__=='__main__':
    music();render(False);render(True)
