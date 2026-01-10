import json
import os
import datetime

# Configuration
INPUT_FILE = 'conversations.json'
OUTPUT_BASE_NAME = 'Mahmoud_Master_Brain_2025'
OUTPUT_EXT = '.txt'
MAX_FILE_SIZE_MB = 50

def get_content_from_node(node):
    """Extracts text content from a conversation node."""
    if not node:
        return ""
    
    parts = []
    if 'message' in node and node['message']:
        message = node['message']
        if 'content' in message and 'parts' in message['content']:
            for part in message['content']['parts']:
                if isinstance(part, str):
                    parts.append(part)
                elif isinstance(part, dict) and 'text' in part: # Handle some json formats
                    parts.append(part['text'])
    return "\n".join(parts)

def process_conversations(file_path):
    print(f"Loading {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: {file_path} not found. Please ensure the file is in the same directory.")
        return

    all_messages = []
    
    print(f"Processing {len(data)} conversations...")
    
    for conv in data:
        title = conv.get('title', 'Untitled')
        create_time = conv.get('create_time')
        
        if create_time:
            dt = datetime.datetime.fromtimestamp(create_time)
            date_str = dt.strftime('%Y-%m-%d')
            year = dt.year
        else:
            date_str = "UNKNOWN_DATE"
            year = 0
            
        # Filter for 2025 if strictly required, but user asked for "real date" so we keep all but label them.
        # User prompt: "Extract only message.content.parts. ### DATE: 2025-08-23 | TOPIC: [Title]"
        
        mapping = conv.get('mapping', {})
        for node_id, node in mapping.items():
            if 'message' in node and node['message']:
                role = node['message']['author']['role']
                if role == 'user': # Usually extracting user context is most valuable, but let's get assistant too if "all data"
                    # User asked "Extract only message.content.parts"
                    content = get_content_from_node(node)
                    if content.strip():
                        header = f"\n### DATE: {date_str} | TOPIC: {title} | ROLE: {role.upper()}\n"
                        all_messages.append({
                            'text': header + content + "\n" + "-"*80 + "\n",
                            'date': date_str,
                            'year': year
                        })
                elif role == 'assistant':
                     content = get_content_from_node(node)
                     if content.strip():
                        header = f"\n### DATE: {date_str} | TOPIC: {title} | ROLE: {role.upper()}\n"
                        all_messages.append({
                            'text': header + content + "\n" + "-"*80 + "\n",
                            'date': date_str,
                            'year': year
                        })

    # Sort by date
    all_messages.sort(key=lambda x: x['date'])
    
    # Write to file(s)
    current_part = 1
    current_file_size = 0
    current_filename = f"{OUTPUT_BASE_NAME}_Part{current_part}{OUTPUT_EXT}"
    
    f = open(current_filename, 'w', encoding='utf-8')
    print(f"Writing to {current_filename}...")
    
    for msg in all_messages:
        text = msg['text']
        text_bytes = text.encode('utf-8')
        msg_size = len(text_bytes)
        
        if current_file_size + msg_size > MAX_FILE_SIZE_MB * 1024 * 1024:
            f.close()
            current_part += 1
            current_filename = f"{OUTPUT_BASE_NAME}_Part{current_part}{OUTPUT_EXT}"
            current_file_size = 0
            f = open(current_filename, 'w', encoding='utf-8')
            print(f"Switched to {current_filename} (Size limit reached)")
            
        f.write(text)
        current_file_size += msg_size
        
    f.close()
    print("Processing complete.")

if __name__ == "__main__":
    process_conversations(INPUT_FILE)
