import os
import sys
from pathlib import Path
from urllib.parse import urlparse

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from jupyterm8.notebook.parser import process_notebook_url


def extract_filename(url):
    path = urlparse(url).path
    filename = Path(path).name
    return filename.replace(".ipynb", ".md")


def main():
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Usage: python parse_notebook.py <notebook_url> [output_filename]")
        sys.exit(1)

    notebook_url = sys.argv[1]

    # Create the output directory if it doesn't exist
    output_dir = Path(__file__).parent / "output"
    output_dir.mkdir(exist_ok=True)

    if len(sys.argv) == 3:
        output_filename = sys.argv[2]
    else:
        output_filename = extract_filename(notebook_url)

    output_file = output_dir / output_filename

    try:
        parsed_content = process_notebook_url(notebook_url)

        with open(output_file, "w", encoding="utf-8") as f:
            f.write(parsed_content)

        print(f"Parsed notebook saved to {output_file}")
    except Exception as e:
        print(f"Error processing notebook: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
