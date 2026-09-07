"""Generate lightweight project-gallery derivatives from source images.

Usage:
    python3 -m pip install pillow
    python3 scripts/generate_project_thumbnails.py

The script scans project Markdown for data-full="/images/..." references and
writes 480px and 900px WebP derivatives into public/images/thumbs/. Originals
are preserved for the click-to-zoom lightbox.
"""

from pathlib import Path
from urllib.parse import unquote
from PIL import Image
import html
import re

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = ROOT / 'src' / 'content' / 'projects'
IMAGES = ROOT / 'public' / 'images'
THUMBS = IMAGES / 'thumbs'
THUMBS.mkdir(parents=True, exist_ok=True)

references = set()
for project in PROJECTS.glob('*.md'):
    text = project.read_text(encoding='utf-8', errors='ignore')
    for match in re.finditer(r'data-full="/images/([^"]+)"', text):
        references.add(unquote(html.unescape(match.group(1))))


def render(source: Path, destination: Path, bounds: tuple[int, int]) -> None:
    with Image.open(source) as image:
        image.load()
        if image.mode not in ('RGB', 'RGBA'):
            image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
        image.thumbnail(bounds, Image.Resampling.LANCZOS)
        image.save(destination, 'WEBP', quality=82, method=6)


missing = []
for relative in sorted(references):
    source = IMAGES / relative
    if not source.exists():
        missing.append(relative)
        continue
    render(source, THUMBS / f'{source.stem}-480.webp', (480, 420))
    render(source, THUMBS / f'{source.stem}-900.webp', (900, 650))

print(f'Project originals: {len(references)}')
print(f'Derivatives written: {len(list(THUMBS.glob("*.webp")))}')
if missing:
    print('Missing originals:')
    for item in missing:
        print(f'  - {item}')
    raise SystemExit(1)
