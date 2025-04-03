import gradio as gr
import openai
import os
import requests

openai.api_key = os.getenv("OPENAI_API_KEY")
API_BASE = "https://bioquest1-c1639d89ae16.herokuapp.com"

with gr.Blocks(css="""
body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom right, #f8fafc, #ffffff);
  color: #1f2937;
  margin: 0;
  padding: 0;
}
.tabs > button {
  font-size: 1rem;
  padding: 14px 28px;
  border: none;
  background-color: #e2e8f0;
  cursor: pointer;
  border-radius: 10px 10px 0 0;
  margin-right: 12px;
}
.tabs > button.active {
  background-color: #ffffff;
  font-weight: bold;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.08);
}
.gr-box {
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
}
img, iframe {
  max-height: 240px;
  object-fit: cover;
  border-radius: 8px;
}
.card-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
""") as app:

    gr.Markdown("""
    # 🧬 Welcome to BioQuest
    BioQuest is a next-generation biology learning platform that uses artificial intelligence and augmented reality to make science education more engaging, personalized, and effective.

    ## 🌟 Why BioQuest?
    - I struggled with STEM subjects in high school due to abstract terms and lack of support. This platform is built to change that experience for students everywhere.
    - We combine AI, AR, and powerful instructional design principles to help students truly understand biology.

    ## 🧠 Educational Foundations
    - **Multimedia Principle**: Leverage both visual and verbal channels for improved comprehension
    - **Scaffolding**: Break down complex concepts into simple steps
    - **7E Model**: Encourage inquiry through Engage, Explore, Explain, Elaborate, Evaluate, Extend, and Experience
    - **SANSE**: Immersive learning through Situations, Attention, Navigation, Simulation, and Engagement

    ## 🔧 What You Can Do Here
    👩‍🎓 **As a Student:**
    - Chat with an AI tutor
    - Watch videos and explore images of biology concepts
    - Interact with AR models
    - Generate quizzes to test your knowledge

    👨‍🏫 **As a Teacher:**
    - Get curriculum planning support from an AI lesson assistant
    - Fetch teaching materials like videos and diagrams
    - Access professional development resources for AI/AR integration
    - Monitor student progress
    """)

    with gr.Tab("👩‍🎓 Student"):
        s_chat = gr.Chatbot(type="messages", height=360)
        s_input = gr.Textbox(placeholder="Ask something about biology...", show_label=False, lines=1, max_lines=1)
        s_state = gr.State([])

        def student_ask(msg, hist):
            system = {"role": "system", "content": "You are a kind and simple biology tutor who explains clearly and always ends with a helpful guiding question that gradually scaffolds to enhance student's interest and curiosity."}
            messages = [system] + hist + [{"role": "user", "content": msg}]
            response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
            reply = response.choices[0].message.content
            hist += [{"role": "user", "content": msg}, {"role": "assistant", "content": reply}]
            return "", hist, hist  # clear input box

        s_input.submit(student_ask, [s_input, s_state], [s_input, s_chat, s_state])

        gr.Markdown("### Media Viewer")
        topic = gr.Textbox(label="Topic")
        fetch = gr.Button("Get Media")
        with gr.Row(elem_classes="card-section"):
            s_img = gr.Image()
            s_vid = gr.HTML()

        def fetch_media(topic):
            try:
                image_url = requests.get(f"{API_BASE}/image?topic={topic}").json().get("url", "")
                video_url = requests.get(f"{API_BASE}/video?topic={topic}").json().get("url", "")
                if "youtube" in video_url:
                    embed = video_url.replace("watch?v=", "embed/")
                    video_html = f"<iframe src='{embed}' height='240' allowfullscreen></iframe>"
                else:
                    video_html = "<p>No video found</p>"
                return image_url, video_html
            except:
                return "", "<p>Failed</p>"

        fetch.click(fetch_media, topic, [s_img, s_vid])

        gr.Markdown("### Self Quiz")
        quiz_q = gr.Textbox(label="Enter quiz topic")
        quiz_a = gr.Textbox(lines=4)

        def gen_quiz(q):
            prompt = f"Create a 3-question biology quiz on {q}"
            out = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}])
            return out.choices[0].message.content

        quiz_q.submit(gen_quiz, inputs=quiz_q, outputs=quiz_a)

        gr.Markdown("### AR Biology Model")
        gr.HTML("""
        <iframe title="AR Cell" width="100%" height="240" frameborder="0"
        src="https://sketchfab.com/models/87bdfa6ba5a446c88e1dc74a512f978e/embed"></iframe>
        """)

    with gr.Tab("👨‍🏫 Teacher"):
        t_chat = gr.Chatbot(type="messages", height=360)
        t_input = gr.Textbox(placeholder="Design a lesson on...", show_label=False)
        t_state = gr.State([])

        def teacher_ask(msg, hist):
            system = {"role": "system", "content": "You're a biology curriculum designer. Use formal tone, offer structure."}
            messages = [system] + hist + [{"role": "user", "content": msg}]
            res = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
            reply = res.choices[0].message.content
            hist += [{"role": "user", "content": msg}, {"role": "assistant", "content": reply}]
            return hist, hist

        t_input.submit(teacher_ask, [t_input, t_state], [t_chat, t_state])

        gr.Markdown("### Teaching Resources")
        t_media_topic = gr.Textbox(label="Resource topic")
        t_fetch = gr.Button("Find Teaching Media")
        with gr.Row(elem_classes="card-section"):
            t_img = gr.Image()
            t_vid = gr.HTML()

        t_fetch.click(fetch_media, t_media_topic, [t_img, t_vid])

        gr.Markdown("### Professional Development")
        gr.Markdown("""
        - How to design inquiry-based activities with AR
        - How to use ChatGPT to build lesson plans
        - Evidence-based instructional strategies
        """)

        gr.Markdown("### Student Management (Demo)")
        gr.Dataframe(headers=["Name", "Score", "Progress"], value=[["Alice", 85, "On Track"], ["Ben", 72, "Needs Support"]])

app.launch()
