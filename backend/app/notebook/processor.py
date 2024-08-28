import logging
import os
import sys
from typing import Tuple

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))


import tempfile
from pathlib import Path

import boto3
from botocore.exceptions import ClientError
from fastapi import HTTPException

from jupyterm8.notebook.parser import process_notebook_url

logger = logging.getLogger(__name__)


def mask_string(s):
    if s:
        return s[:4] + "*" * (len(s) - 4) if len(s) > 4 else "*" * len(s)
    return None


# Retrieve and mask AWS credentials
aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
aws_default_region = os.getenv("AWS_DEFAULT_REGION")

logger.info(f"AWS_ACCESS_KEY_ID: {mask_string(aws_access_key_id)}")
logger.info(f"AWS_SECRET_ACCESS_KEY: {mask_string(aws_secret_access_key)}")
logger.info(f"AWS_DEFAULT_REGION: {aws_default_region}")

# S3 client setup
s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_DEFAULT_REGION"),
)
S3_BUCKET_NAME = os.environ.get("AWS_S3_BUCKET_NAME", "<your-bucket-name>")


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


def process_and_store_notebook(url: str) -> Tuple[str, str]:
    try:
        content = process_notebook(url)
        file_name = f"notebook_{hash(url)}.md"
        s3_key = f"processed_notebooks/{file_name}"

        print(f"Attempting to store in bucket: {S3_BUCKET_NAME}")
        print(f"S3 key: {s3_key}")

        # Upload content to S3
        response = s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=s3_key, Body=content)

        print(f"S3 put_object response: {response}")

        # Generate a pre-signed URL for downloading
        download_url = s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": S3_BUCKET_NAME, "Key": s3_key},
            ExpiresIn=3600,  # URL expires in 1 hour
        )

        return file_name, download_url
    except ClientError as e:
        print(f"ClientError: {str(e)}")
        print(f"Error response: {e.response}")
        raise HTTPException(status_code=500, detail=f"Error storing notebook in S3: {str(e)}")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing and storing notebook: {str(e)}")
