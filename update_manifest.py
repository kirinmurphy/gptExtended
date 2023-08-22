import os
import json

def get_files_in_src():
    files_list = []
    for root, _, files in os.walk('./src/'):
        for file_name in files:
            if file_name.endswith('.js'):
                relative_path = os.path.join(root, file_name).replace('./', '')
                files_list.append(relative_path)
    
    # Adding "content.js" to the end of the collection
    content_js_path = './content.js'
    if os.path.exists(content_js_path):
        files_list.append('content.js')
    else:
        print("Error: content.js file not found in the root directory.")
        return []
    
    return files_list

def update_manifest(files_list):
    if not files_list: # If files_list is empty, return without updating
        return

    manifest_path = './manifest.json'
    
    if not os.path.exists(manifest_path):
        print("Error: manifest.json file not found.")
        return
    
    with open(manifest_path, 'r') as manifest_file:
        manifest_data = json.load(manifest_file)
    
    if "content_scripts" not in manifest_data:
        print("Error: 'content_scripts' key missing in manifest.json file.")
        return

    for content_script in manifest_data["content_scripts"]:
        if "js" in content_script:
            content_script["js"] = files_list
        else:
            print("Error: 'js' key missing in 'content_scripts' in manifest.json file.")
            return

    with open(manifest_path, 'w') as manifest_file:
        json.dump(manifest_data, manifest_file, indent=4)

    print("manifest.json file successfully updated.")

files_list = get_files_in_src()
update_manifest(files_list)
