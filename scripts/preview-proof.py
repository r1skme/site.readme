from pathlib import Path
import base64, io
from PIL import Image
for name in ['home-desktop', 'projects', 'glass-dock', 'home-mobile', 'failure']:
    path=Path('qa-output')/(name+'.png')
    if not path.exists(): continue
    image=Image.open(path).convert('RGB')
    if name=='projects': image=image.crop((0,0,image.width,min(image.height,1350)))
    image.thumbnail((960,1100),Image.Resampling.LANCZOS)
    buffer=io.BytesIO();image.save(buffer,format='WEBP',quality=55,method=6)
    encoded=base64.b64encode(buffer.getvalue()).decode()
    print('PREVIEW_BEGIN:'+name)
    for i in range(0,len(encoded),2400):print('PREVIEW_DATA:'+encoded[i:i+2400])
    print('PREVIEW_END:'+name)
