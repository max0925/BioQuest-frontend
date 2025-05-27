from fastapi import FastAPI, Query, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import requests
import os
import json

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# ✅ 跨域设置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 可替换为你的前端域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 获取环境变量中的 API Key
UNSPLASH_API_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

# ✅ 首页测试
@app.get("/")
def root():
    return {"message": "BioQuest backend is running on Render"}

# ✅ 获取图片接口
@app.get("/image")
def get_image(topic: str = Query(...)):
    headers = {"Authorization": f"Client-ID {UNSPLASH_API_KEY}"}
    res = requests.get(f"https://api.unsplash.com/search/photos?query={topic}&per_page=1", headers=headers)
    data = res.json()
    url = data["results"][0]["urls"]["regular"] if data["results"] else ""
    return JSONResponse({"url": url})

# ✅ 获取视频接口
@app.get("/video")
def get_video(topic: str = Query(...)):
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={topic}&key={YOUTUBE_API_KEY}&type=video&maxResults=1"
    res = requests.get(url)
    data = res.json()
    if "items" in data and data["items"]:
        video_id = data["items"][0]["id"]["videoId"]
        return JSONResponse({"url": f"https://www.youtube.com/watch?v={video_id}"})
    return JSONResponse({"url": ""})

# ✅ 学生端 AI 聊天接口
class ChatRequest(BaseModel):
    message: str
    history: list

@app.post("/chat")
def chat(request: ChatRequest):
    system_prompt = {
        "role": "system",
        "content": (
            "You are a friendly STEM tutor. You explain science, technology, engineering, and math (STEM) concepts using clear, simple, and everyday language. "
            "Avoid jargon and never assume advanced knowledge. "
            "Break complex ideas into easy-to-understand parts, use relatable examples, and make learning fun.\n"
            "After each answer, ALWAYS end with a unique, thought-provoking guiding question that encourages the student to connect, compare, predict, or apply the concept. "
            "Never end with generic questions like 'Do you have any questions?' or 'Let’s discuss further.' "
            "Instead, use specific and creative prompts, such as:\n"
            "- What might change if...?\n"
            "- Can you think of something in your daily life related to this idea?\n"
            "- How would you explain this concept to a friend?\n"
            "- Why do you think this process happens in nature or technology?\n"
            "- Can you imagine a real-world problem this concept could help solve?\n"
            "Be sure your guiding question is different each time, fits the current topic, and pushes the student to think more deeply."
        ),
    }

    messages = [system_prompt] + request.history + [{"role": "user", "content": request.message}]
    try:
        res = client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )
        reply = res.choices[0].message.content
        return JSONResponse({"reply": reply})
    except Exception as e:
        return JSONResponse({"reply": f"Error: {str(e)}"})


# ✅ 教师端 AI 聊天接口
class TeacherChatRequest(BaseModel):
    message: str
    history: list

@app.post("/teacher-chat")
def teacher_chat(request: TeacherChatRequest):
    system_prompt = {
        "role": "system",
        "content": (
            "You are an experienced STEM curriculum designer (Science, Technology, Engineering, Math). "
        "Provide formal, structured, and professional responses for any STEM subject (including but not limited to biology, chemistry, physics, mathematics, computer science, engineering, earth science, etc). "
        "Use section headings, bullet points, or numbered steps when possible. "
        "Avoid casual tone and emojis. "
        "The goal is to support teachers in designing clear, effective, and engaging lessons for students at different levels."
        ),
    }

    messages = [system_prompt] + request.history + [{"role": "user", "content": request.message}]
    try:
        res = client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )
        reply = res.choices[0].message.content
        return JSONResponse({"reply": reply})
    except Exception as e:
        return JSONResponse({"reply": f"Error: {str(e)}"})

# ✅ 生成 Quiz 接口
@app.post("/quiz")
async def generate_quiz(request: Request):
    data = await request.json()
    topic = data.get("topic", "biology")
    age_group = data.get("age_group", "10-12")  # 默认 fallback

# ✅ 生成 Quiz 接口（两步法：先列知识点，再基于知识点出题）
@app.post("/quiz")
async def generate_quiz(request: Request):
    data = await request.json()
    topic = data.get("topic", "biology")
    age_group = data.get("age_group", "10-12")  # 默认 fallback

def build_prompt(topic: str, age_group: str) -> str:
    if age_group == "7-9":
        return f"""
You are a STEM tutor for young children aged 7–9.

Create a fun, super easy, and age-appropriate quiz about "{topic}".

**IMPORTANT:**
- Do NOT use any science words like “cell”, “nucleus”, “organelle”, “mitochondria”, “DNA”, “protein”, or “membrane”.
- Only use everyday words and ideas this age group understands: plants, animals, body parts, senses (seeing, hearing, smelling, touching, tasting), eating, moving, breathing, water, sun, growing.
- Questions should be like a conversation in a children's picture book or a game.
- NO technical vocabulary or abstract ideas.

**Good example questions:**
[
  {{
    "question": "What do plants need to grow?",
    "options": ["A. Ice cream", "B. Water", "C. Shoes", "D. Music"],
    "answer": "B. Water",
    "explanation": "Plants need water to grow and stay healthy."
  }},
  {{
    "question": "Which part of your body helps you see things?",
    "options": ["A. Nose", "B. Ears", "C. Eyes", "D. Hands"],
    "answer": "C. Eyes",
    "explanation": "Eyes help you see everything around you."
  }}
]
**BAD example (Do NOT use):**
[
  {{
    "question": "What is the function of mitochondria?",
    "options": ["A. Powerhouse", ...],  # <-- NOT ALLOWED!
    ...
  }}
]

**Now, create 3 new and different multiple-choice questions about: "{topic}". Do NOT copy the examples. All questions must use only basic daily life language.**

Return only the JSON list.
"""

    elif age_group == "10-12":
        return f"""
You are a science teacher for students aged 10–12.

Create an age-appropriate quiz about "{topic}".

**IMPORTANT:**
- Use science ideas from grades 4–6: basic cells, plant/animal differences, energy, simple ecosystems, food chains, basic human body systems, planets, matter.
- Do NOT use high school vocabulary or anything like “DNA”, “protein synthesis”, or “mitochondria”.
- You can use words like “cell”, “organ”, “energy”, “root”, “leaf”, “muscle”, “skeleton”.

**Good example questions:**
[
  {{
    "question": "What is the main job of a plant’s roots?",
    "options": ["A. To absorb water", "B. To make flowers", "C. To eat insects", "D. To see sunlight"],
    "answer": "A. To absorb water",
    "explanation": "Roots absorb water from the soil for the plant."
  }},
  {{
    "question": "Which is a source of energy for living things?",
    "options": ["A. The Sun", "B. Rocks", "C. Air", "D. Sand"],
    "answer": "A. The Sun",
    "explanation": "The Sun gives energy to plants and animals."
  }}
]
**BAD example (Do NOT use):**
[
  {{
    "question": "Which organelle is responsible for ATP synthesis?",
    ...
  }}
]

**Now, create 3 new and different multiple-choice questions about: "{topic}". Do NOT copy the examples. Do not use words like 'mitochondria', 'DNA', or other advanced terms.**

Return only the JSON list.
"""

    elif age_group == "13-15":
        return f"""
You are a science teacher for middle school students aged 13–15.

Create a quiz about "{topic}".

**IMPORTANT:**
- Use middle school science knowledge: cells, simple organelles (nucleus, cell membrane), photosynthesis, basic genetics, human body systems, food webs, chemical reactions.
- Require some reasoning or comparison in questions, not just recall.
- You may use: “cell”, “nucleus”, “membrane”, “photosynthesis”, “respiration”, “organism”.

**Good example questions:**
[
  {{
    "question": "Which organelle controls the activities of the cell?",
    "options": ["A. Nucleus", "B. Mitochondria", "C. Chloroplast", "D. Ribosome"],
    "answer": "A. Nucleus",
    "explanation": "The nucleus controls the cell's activities."
  }},
  {{
    "question": "Which process helps plants make their own food?",
    "options": ["A. Digestion", "B. Respiration", "C. Photosynthesis", "D. Excretion"],
    "answer": "C. Photosynthesis",
    "explanation": "Photosynthesis allows plants to make food using sunlight."
  }}
]
**BAD example (Do NOT use):**
[
  {{
    "question": "Explain the difference between DNA replication and protein synthesis.",
    ...
  }}
]

**Now, create 3 new, unique, and different multiple-choice questions about: "{topic}". Do NOT copy the examples. All questions should require at least some reasoning, not just memorization.**

Return only the JSON list.
"""

    elif age_group == "16-18":
        return f"""
You are a high school biology teacher for students aged 16–18.

Create a quiz about "{topic}".

**IMPORTANT:**
- Use high school biology knowledge: mitosis, DNA structure, heredity, genetics, evolution, respiration, protein synthesis, osmosis, scientific method, real experiment analysis.
- At least one question must require conceptual understanding or application to real scenarios (not直接背诵).
- You may use technical vocabulary appropriate for this level.

**Good example questions:**
[
  {{
    "question": "What is the role of mRNA in protein synthesis?",
    "options": ["A. Stores genetic info", "B. Carries amino acids", "C. Delivers DNA instructions to ribosome", "D. Breaks down proteins"],
    "answer": "C. Delivers DNA instructions to ribosome",
    "explanation": "mRNA carries genetic instructions from DNA to the ribosome for protein synthesis."
  }},
  {{
    "question": "Why might a mutation in DNA lead to a genetic disorder?",
    "options": ["A. It changes the shape of the cell", "B. It can change a protein", "C. It increases cell division", "D. It makes more energy"],
    "answer": "B. It can change a protein",
    "explanation": "Mutations can alter the proteins made by a cell, leading to disorders."
  }}
]
**BAD example (Do NOT use):**
[
  {{
    "question": "Which part of the eye helps you see?",
    ...
  }}
]

**Now, create 3 new and different high school-level multiple-choice questions about: "{topic}". Do NOT copy the examples. At least one question must require understanding or application, not just memorization.**

Return only the JSON list.
"""

    elif age_group == "18+":
        return f"""
You are a biology instructor for adult beginners (age 18+).

Create a quiz about "{topic}".

**IMPORTANT:**
- Use foundational biology and real-world scenarios. 
- Connect biology to practical issues (e.g., health, environment, technology, medicine, work).
- Include scientific terms like "mitochondria", "enzymes", "genetic material", "antibiotic resistance", but do NOT use graduate-level content.
- At least one question should require application or explanation (not just recall).

**Good example questions:**
[
  {{
    "question": "Why is understanding cell division important for cancer research?",
    "options": ["A. It explains why plants grow", "B. It helps find treatments", "C. It changes cell color", "D. It makes cells bigger"],
    "answer": "B. It helps find treatments",
    "explanation": "Understanding cell division helps researchers develop cancer treatments."
  }},
  {{
    "question": "What could happen if bacteria become resistant to antibiotics?",
    "options": ["A. Antibiotics will work better", "B. Infections may become harder to treat", "C. People will not get sick", "D. Food will taste better"],
    "answer": "B. Infections may become harder to treat",
    "explanation": "Antibiotic resistance makes some infections very difficult to cure."
  }}
]
**BAD example (Do NOT use):**
[
  {{
    "question": "Which part of the eye helps you see?",
    ...
  }}
]

**Now, create 3 new and different multiple-choice questions about: "{topic}". At least one question should require application or explanation, not just recall. Do NOT copy the examples.**

Return only the JSON list.
"""

    else:
        return f"""
You are a science tutor preparing a basic quiz for a student aged {age_group}.

Topic: "{topic}"

Write 3 unique multiple-choice questions with:
- A clear question
- 4 answer options (A–D)
- The correct answer
- A brief explanation

**Make sure each question is unique and not a copy of previous ones.**

Output only JSON:
[{{"question": "...", "options": [...], "answer": "...", "explanation": "..."}}]
"""
