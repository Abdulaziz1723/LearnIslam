import os
import asyncio
import re
from telethon import TelegramClient
from git import Repo, GitCommandError

# Environment variables
api_id_str = os.getenv('API_ID')
api_hash = os.getenv('API_HASH')
phone = os.getenv('PHONE')
channel = os.getenv('CHANNEL_USERNAME')

if not all([api_id_str, api_hash, phone, channel]):
    raise Exception("Missing one or more required environment variables.")

api_id = int(api_id_str)
DOWNLOAD_DIR = "public"
LAST_ID_FILE = "last_id.txt"

# Git config
REPO_LOCAL_PATH = "/home/runner/workspace"  # Default Replit path
GIT_REMOTE_URL = "https://github.com/Abdulaziz1723/LearnIslam"  # <-- UPDATE if needed
BRANCH_NAME = "master"

MIN_DURATION_AMHARIC = 10 * 60  # 10 minutes in seconds
MIN_DURATION_ARABIC = 6 * 60    # 6 minutes in seconds

def contains_amharic(text):
    return any('\u1200' <= c <= '\u137F' for c in text)

def contains_arabic(text):
    return any(
        ('\u0600' <= c <= '\u06FF') or
        ('\u0750' <= c <= '\u077F') or
        ('\u08A0' <= c <= '\u08FF')
        for c in text
    )

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

def git_commit_and_push(downloaded_count):
    print("🚀 Committing and pushing to GitHub...")
    print("📁 Checking if this is a Git repo at:", REPO_LOCAL_PATH)
    print("📂 .git folder exists?", os.path.exists(os.path.join(REPO_LOCAL_PATH, ".git")))

    repo = Repo(REPO_LOCAL_PATH)

    try:
        repo.git.add('--all')
        repo.index.commit(f"Add {downloaded_count} new audio file(s)")
        origin = repo.remote(name='origin')

        # Set upstream only once
        if repo.head.is_detached or repo.head.reference.name != BRANCH_NAME:
            repo.git.checkout('-b', BRANCH_NAME)

        try:
            origin.push(refspec=f"{BRANCH_NAME}:{BRANCH_NAME}", set_upstream=True)
        except GitCommandError as e:
            if "has no upstream branch" in str(e):
                repo.git.push('--set-upstream', 'origin', BRANCH_NAME)
            else:
                raise e

        print(f"✅ Pushed to GitHub on branch {BRANCH_NAME}!")

    except GitCommandError as e:
        print(f"❌ Git push failed: {e}")

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
                print(f"⏭ Skipped audio (title '{title}' no match or duration too short)")

        if message.id > max_id_seen:
            max_id_seen = message.id

    if True:
        save_last_id(max_id_seen)
        print(f"🎉 Downloaded {downloaded} filtered audio(s). Last ID saved: {max_id_seen}")
        git_commit_and_push(downloaded)
    else:
        print("📭 No new audio messages matched the filter.")

with client:
    client.loop.run_until_complete(main())



