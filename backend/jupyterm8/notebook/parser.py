import requests
import nbformat
from urllib.parse import urlparse


def transform_github_url(url: str) -> str:
    parsed = urlparse(url)
    if parsed.netloc == "github.com" and "/blob/" in parsed.path:
        path = parsed.path.replace("/blob/", "/", 1)
        return f"https://raw.githubusercontent.com{path}"
    return url


def fetch_notebook_content(url: str) -> str:
    raw_url = transform_github_url(url)
    response = requests.get(raw_url)
    response.raise_for_status()
    return response.text


def parse_notebook(notebook_content: str) -> str:
    notebook = nbformat.reads(notebook_content, as_version=4)
    output = []

    for cell in notebook.cells:
        if cell.cell_type == "markdown":
            output.append(f"{cell.source}\n")
        elif cell.cell_type == "code":
            output.append(f"```python\n{cell.source}\n```\n")

    return "\n".join(output)


def process_notebook_url(url: str) -> str:
    content = fetch_notebook_content(url)
    return parse_notebook(content)
