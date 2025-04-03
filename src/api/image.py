# /api/image.py
import json

def handler(request):
    topic = request.query.get("topic", "biology")
    # 示例图片地址
    image_url = f"https://source.unsplash.com/600x400/?{topic},biology"
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"url": image_url})
    }
