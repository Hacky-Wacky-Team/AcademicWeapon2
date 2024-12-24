import os
import json

def generate_image_list(base_path):
    image_data = {}
    for root, dirs, files in os.walk(base_path):
        # Remove the base part of the path
        relative_path = os.path.relpath(root, base_path)
        if relative_path == ".":
            continue

        # Split the relative path into parts (e.g., "Physics/Kinematics 1" -> ["Physics", "Kinematics 1"])
        parts = relative_path.split("/")

        # Collect all image files in this folder
        images = ["AcademicWeapon2/Images/" + os.path.join(relative_path, file).replace("\\", "/") 
                  for file in files 
                  if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]

        # Navigate to the correct place in the nested dictionary
        current_level = image_data
        for part in parts:
            if part not in current_level:
                current_level[part] = {}
            current_level = current_level[part]

        # Assign the images to the current level only if it's a unit folder (not a subject)
        if images:
            if 'images' not in current_level:
                current_level['images'] = []
            current_level['images'].extend(images)

    return image_data

if __name__ == "__main__":
    base_path = "public/Images"  # Replace with your actual base path
    image_list = generate_image_list(base_path)

    with open("src/list.json", "w") as f:
        json.dump(image_list, f, indent=4)

    print("Image list generated and saved to src/list.json")