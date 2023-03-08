import boto3

# file_name = 'downloaded_video.mp4'
# bucket = 'seonghwk-bucket'
# key = 'thankyou_by_seonghwk.mp4'

# client = boto3.client(
#         's3',
#         aws_access_key_id = 'AKIA6QEVMEANLUI7VSOI',
#         aws_secret_access_key = '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',
#         region_name = 'ap-northeast-2'
# )

file_name = 'downloaded_video.mp4'
bucket = 'a101-wedding101-pjt'
key = 'dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4'

client = boto3.client(
        's3',
        aws_access_key_id = 'AKIASAR2BR5LCYLEDGWM',
        aws_secret_access_key = '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',
        region_name = 'ap-northeast-2'
)

client.download_file(bucket, key, file_name)

# https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4

# import boto3
# import botocore

# s3 = boto3.resource(
#         's3',
#         aws_access_key_id = 'AKIA6QEVMEANLUI7VSOI',
#         aws_secret_access_key = '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',
#         region_name = 'ap-northeast-2'
# )

# # Provide the S3 URI
# s3_uri = "s3://seonghwk-bucket/thankyou_by_seonghwk.mp4"

# # Split the S3 URI into bucket name and file name
# bucket_name, file_name = s3_uri.replace("s3://", "").split("/", 1)

# # Try to download the file
# try:
#     s3.Bucket(bucket_name).download_file(file_name, "/tmp/" + file_name)
# except botocore.exceptions.ClientError as e:
#     if e.response["Error"]["Code"] == "404":
#         print("The object does not exist.")
#     else:
#         raise
