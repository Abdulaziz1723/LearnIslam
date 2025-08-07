import os
import asyncio
import re
from telethon import TelegramClient
from git import Repo

# === Environment variables ===
api_id_str = os.getenv('API_ID')
api_hash = os.getenv('API_HASH')
phone = os.getenv('PHONE')
channel = os.getenv('CHANNEL_USERNAME')

if not all([api_id_str, api_hash, phone, channel]):
    raise Exception("Missing one or more required environment variables.")

api_id = int(api_id_str)

# === Config ===
DOWNLOAD_DIR = os.path.join("public", "audio")
LAST_ID_FILE = "last_id.txt"
REPO_LOCAL_PATH = os.getcwd()

MIN_DURATION_AMHARIC = 10 * 60  # 10 minutes
MIN_DURATION_ARABIC = 6 * 60    # 6 minutes

# === Language Checks ===
def contains_amharic(text):
    return any('\u1200' <= c <= '\u137F' for c in text)

def contains_arabic(text):
    return any(
        ('\u0600' <= c <= '\u06FF') or
        ('\u0750' <= c <= '\u077F') or
        ('\u08A0' <= c <= '\u08FF')
        for c in text
    )

# === Helper Functions ===
def get_last_id():
    if os.path.exists(LAST_ID_FILE):
        with open(LAST_ID_FILE, 'r') as f:
            return int(f.read().strip())
    return 0

def save_last_id(msg_id):
    with open(LAST_ID_FILE, 'w') as f:
        f.write(str(msg_id))

def clean_filename(name):
    return re.sub(r'[\\/*?:"<>|]', "", name)

from git import Repo, GitCommandError

def git_commit_and_push(downloaded_count):
    print("🚀 Committing and pushing to GitHub...")
    try:
        repo = Repo(REPO_LOCAL_PATH)
        repo.git.add(A=True)
        repo.index.commit(f"🔊 Auto update: {downloaded_count} new audio file(s)")

        origin = repo.remote(name='origin')
        active_branch = repo.active_branch.name

        try:
            # Try normal push
            origin.push()
        except GitCommandError as e:
            if "no upstream" in str(e) or "has no upstream branch" in str(e):
                print(f"🌱 Setting upstream to origin/{active_branch}...")
                repo.git.push('--set-upstream', 'origin', active_branch)
            else:
                raise e

        print("✅ Pushed to GitHub!")
    except Exception as e:
        print("❌ Git push failed:", e)

# === Telegram Client ===
client = TelegramClient('session', api_id, api_hash)

async def main():
    await client.start(phone)
    me = await client.get_me()
    print(f"✅ Logged in as @{me.username}")
    entity = await client.get_entity(channel)
    print(f"🎧 Checking channel: {channel}")

    if not os.path.exists(DOWNLOAD_DIR):
        os.makedirs(DOWNLOAD_DIR)

    last_id = get_last_id()
    max_id_seen = last_id
    downloaded = 0

    async for message in client.iter_messages(entity, limit=100):
        if message.id <= last_id:
            continue

        if message.audio:
            audio = message.audio
            attr = audio.attributes[0] if audio.attributes else None
            title = getattr(attr, 'title', '') if attr else ''

            duration = getattr(audio, 'duration', 0)
            if not duration:
                for a in audio.attributes:
                    if hasattr(a, 'duration'):
                        duration = a.duration
                        break

            if contains_amharic(title) and duration >= MIN_DURATION_AMHARIC:
                lang = "Amharic"
            elif contains_arabic(title) and duration >= MIN_DURATION_ARABIC:
                lang = "Arabic"
            else:
                lang = None

            if lang:
                base_name = title or f"audio_{message.id}"
                filename = clean_filename(base_name) + ".mp3"
                full_path = os.path.join(DOWNLOAD_DIR, filename)
                await message.download_media(file=full_path)
                print(f"✅ Downloaded [{lang}] audio: {filename} (Duration: {duration // 60} min)")
                downloaded += 1
            else:
                print(f"⏭ Skipped audio (title '{title}' no match or too short)")

        if message.id > max_id_seen:
            max_id_seen = message.id

    if downloaded:
        save_last_id(max_id_seen)
        print(f"🎉 Downloaded {downloaded} filtered audio(s). Last ID saved: {max_id_seen}")

    git_commit_and_push(downloaded)

with client:
    client.loop.run_until_complete(main())


