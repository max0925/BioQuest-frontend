# /api/video.py
import json

def handler(request):
    topic = request.query.get("topic", "biology")
    video_url = f"https://www.youtube.com/watch?v=dQw4w9WgXcQ"  # 示例视频
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"url": video_url})
    }
