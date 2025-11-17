import zipfile
import re

def extract_text_from_docx(docx_path):
    try:
        z = zipfile.ZipFile(docx_path)
        content = z.read('word/document.xml').decode('utf-8')
        z.close()
        texts = re.findall(r'<w:t[^>]*>([^<]+)</w:t>', content)
        return ' '.join(texts)
    except Exception as e:
        return f"Error: {str(e)}"

# Extract from both files
spa_content = extract_text_from_docx('Capstone Project The Full-Stack Portfolio SPA.docx')
api_content = extract_text_from_docx('Capstone Project The Portfolio & Blog API.docx')

# Save to files
with open('spa_content.txt', 'w', encoding='utf-8') as f:
    f.write(spa_content)

with open('api_content.txt', 'w', encoding='utf-8') as f:
    f.write(api_content)

print("Content extracted successfully!")
print(f"\nSPA document length: {len(spa_content)} characters")
print(f"API document length: {len(api_content)} characters")

