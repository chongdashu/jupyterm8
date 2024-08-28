import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import tempfile
from pathlib import Path

from fastapi import HTTPException

from jupyterm8.notebook.parser import process_notebook_url


def process_notebook(url: str) -> str:
    try:
        with tempfile.NamedTemporaryFile(mode="w+", suffix=".md", delete=False) as temp_file:
            content = process_notebook_url(url)
            temp_file.write(content)
            temp_file.flush()

            # Read the content back from the file
            temp_file.seek(0)
            result = temp_file.read()

        # Delete the temporary file after processing
        Path(temp_file.name).unlink()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing notebook: {str(e)}")
