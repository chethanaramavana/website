"""Render a plain website demonstration from owner-approved local captures.

Inputs and narration stay in ignored outputs/. Captures are real live UI states,
not fabricated interface animations. No decorative backgrounds or music added.
"""
from pathlib import Path
import json, shutil, subprocess, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

PROJECT = Path(__file__).resolve().parents[1]
BASE = PROJECT / 'outputs/video-maths-basics'
ROOT = BASE / 'story-v9'
ASSETS = ROOT / 'assets'
FF = shutil.which('ffmpeg')
OLD = [0,2.5,4.5,6,8,10,13,15,16.5,18.5,20.5,22.5,24.5,26.5,29.5]
DUR = [3,2.5,2.5,3,3,4,3,2.5,3.5,3.5,3.5,3.5,3.5,4.5]
SCENES = [
 ('Maths feels difficult?', ['home']),
 ('Understand one idea at a time.', ['grades']),
 ('Ramavana Mathematical Centre', ['home']),
 ('Choose your grade.', ['grades']),
 ('Try the first level free.', ['grades']),
 ('Learn with pictures. Then practise.', ['fractions-negative','practice']),
 ('Complete the level test.', ['test']),
 ('Build your confidence, step by step.', ['equation-after']),
 ('Understand signed fractions.', ['fractions-negative','fractions-near-zero']),
 ('Explore powers and roots.', ['powers-row','powers-square']),
 ('Make sense of algebra.', ['algebra-three','algebra-five']),
 ('Solve equations step by step.', ['equation-before','equation-after']),
 ('See how geometry works.', ['geometry-before','geometry-after']),
 ('Visit ramavanamath.com', ['home']),
]

def capture(name):
    im = Image.open(ASSETS / (name+'.png')).convert('RGB')
    meta = ASSETS / (name+'.json')
    if meta.exists():
        r = json.loads(meta.read_text()); s = im.width/r['pageWidth']
        im = im.crop(tuple(round(v*s) for v in (r['x'],r['y'],r['x']+r['w'],r['y']+r['h'])))
    return im

def audio():
    sr=48000
    raw=subprocess.check_output([FF,'-v','error','-i',str(BASE/'story-v7/hybrid-narration.wav'),
        '-af','highpass=f=75,equalizer=f=2800:t=q:w=1:g=1.5,acompressor=threshold=0.22:ratio=1.7:attack=12:release=180',
        '-f','f32le','-ar',str(sr),'-ac','1','-'])
    src=np.frombuffer(raw,dtype='<f4'); speech=np.zeros(round(sum(DUR)*sr)); start=0
    for i,duration in enumerate(DUR):
        clip=src[round(OLD[i]*sr):round(OLD[i+1]*sr)]
        pos=round((start+.12)*sr);speech[pos:pos+len(clip)]=clip;start+=duration
    with wave.open(str(ROOT/'speech-only.wav'),'wb') as out:
        out.setnchannels(1);out.setsampwidth(2);out.setframerate(sr)
        out.writeframes((np.clip(speech,-1,1)*32767).astype('<i2').tobytes())
    subprocess.run([FF,'-v','error','-y','-i',str(ROOT/'speech-only.wav'),'-af',
        'loudnorm=I=-16:TP=-1.5:LRA=8','-ar','48000','-ac','2',str(ROOT/'narration.wav')],check=True)

def render(portrait):
    label='Portrait' if portrait else 'YouTube'; w,h=(1080,1920) if portrait else (1920,1080)
    frames=ROOT/label;frames.mkdir(exist_ok=True)
    font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',48 if portrait else 46)
    sequence=[]
    for i,(caption,names) in enumerate(SCENES):
        for j,name in enumerate(names):
            canvas=Image.new('RGB',(w,h),'white');draw=ImageDraw.Draw(canvas)
            words=caption.split(); lines=[];line=''
            for word in words:
                candidate=(line+' '+word).strip()
                if draw.textlength(candidate,font=font)>w-100 and line:lines.append(line);line=word
                else:line=candidate
            lines.append(line)
            for k,line in enumerate(lines):draw.text((w//2,55+k*58),line,font=font,fill='#011e47',anchor='mt')
            shot=capture(name)
            top=185 if portrait else 145
            shot=ImageOps.contain(shot,(w-48,h-top-40),Image.Resampling.LANCZOS)
            canvas.paste(shot,((w-shot.width)//2,top+(h-top-40-shot.height)//2))
            path=frames/f'{i:02}-{j}.png';canvas.save(path)
            sequence.extend([f"file '{path.name}'",f'duration {DUR[i]/len(names)}'])
    sequence.append(f"file '{path.name}'")
    manifest=frames/'frames.txt';manifest.write_text('\n'.join(sequence))
    target=ROOT/f'Ramavana-Website-Demo-{label}.mp4'
    subprocess.run([FF,'-v','error','-y','-f','concat','-safe','0','-i',str(manifest),'-i',str(ROOT/'narration.wav'),
        '-t',str(sum(DUR)),'-vf','fps=30','-c:v','libx264','-preset','veryfast','-crf','18','-threads','4',
        '-pix_fmt','yuv420p','-c:a','aac','-b:a','256k','-movflags','+faststart',str(target)],check=True)
    print(target,flush=True)

if __name__=='__main__':
    audio()
    render(False)
    render(True)
