from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import unquote
import sys

root = Path(__file__).resolve().parents[1] / 'static-preview'
errors = []
htmls = list(root.rglob('*.html'))


def resolve_asset(page: Path, value: str) -> Path:
    clean = unquote(value.split('#')[0].split('?')[0])
    return (page.parent / clean).resolve()


for page in htmls:
    soup = BeautifulSoup(page.read_text(errors='ignore'), 'html.parser')

    for anchor in soup.find_all('a'):
        href = anchor.get('href', '')
        if not href or href.startswith(('http://', 'https://', 'mailto:', '#')):
            continue
        target = resolve_asset(page, href)
        if href.endswith('/'):
            target = target / 'index.html'
        elif target.is_dir():
            target = target / 'index.html'
        if not target.exists():
            errors.append(f'{page.relative_to(root)} -> {href}')

    for element in soup.find_all(['img', 'script', 'link']):
        attr = 'src' if element.name in ('img', 'script') else 'href'
        value = element.get(attr, '')
        if value and not value.startswith(('http://', 'https://', 'data:')):
            target = resolve_asset(page, value)
            if not target.exists():
                errors.append(f'{page.relative_to(root)} asset -> {value}')

        # Responsive project images must also have valid srcset candidates.
        if element.name == 'img' and element.get('srcset'):
            for candidate in element['srcset'].split(','):
                url = candidate.strip().split()[0]
                if not url.startswith(('http://', 'https://', 'data:')):
                    target = resolve_asset(page, url)
                    if not target.exists():
                        errors.append(f'{page.relative_to(root)} srcset -> {url}')

        # Full-resolution originals used by the project lightbox.
        if element.name == 'img' and element.get('data-full'):
            value = element['data-full']
            target = resolve_asset(page, value)
            if not target.exists():
                errors.append(f'{page.relative_to(root)} data-full -> {value}')

print(f'HTML pages: {len(htmls)}')
print(f'Errors: {len(errors)}')
for error in errors[:50]:
    print(error)

sys.exit(1 if errors else 0)
