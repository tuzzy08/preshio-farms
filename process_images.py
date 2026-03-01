"""
Process team images: crop from chest height upward.
Uses only Pillow (no rembg needed).
The images will be cropped to a portrait headshot and given a clean border/frame.
"""
from PIL import Image, ImageDraw
import os

def crop_to_headshot(input_path, output_path, crop_ratio_top=0.0, crop_ratio_bottom=0.55):
    """
    Crop the image to show from chest/breast height upward.
    crop_ratio_top: fraction from top to start (0 = very top)
    crop_ratio_bottom: fraction from top where to cut (0.55 = keep top 55%)
    """
    print(f"Processing {input_path}...")
    if not os.path.exists(input_path):
        print(f"  ERROR: File not found: {input_path}")
        return

    img = Image.open(input_path).convert("RGB")
    w, h = img.size
    print(f"  Original size: {w}x{h}")

    # Crop vertically: keep top portion (head + chest)
    top = int(h * crop_ratio_top)
    bottom = int(h * crop_ratio_bottom)
    
    # For horizontal, center crop to make it slightly narrower (more portrait-like)
    margin_x = int(w * 0.05)  # trim 5% from each side
    left = margin_x
    right = w - margin_x

    cropped = img.crop((left, top, right, bottom))
    cw, ch = cropped.size
    print(f"  Cropped size: {cw}x{ch}")

    # Resize to a standard profile photo size (e.g., 600x750 for 4:5 ratio)
    target_w = 600
    target_h = 750
    
    # Create the professional background canvas
    bg_color = (244, 241, 234)  # Warm beige matching the site palette
    canvas = Image.new("RGB", (target_w, target_h), bg_color)
    
    # Resize the cropped image to fit within the canvas
    cropped_ratio = cw / ch
    target_ratio = target_w / target_h
    
    if cropped_ratio > target_ratio:
        # Wider than target - fit by width
        new_w = target_w
        new_h = int(target_w / cropped_ratio)
    else:
        # Taller than target - fit by height
        new_h = target_h
        new_w = int(target_h * cropped_ratio)
    
    resized = cropped.resize((new_w, new_h), Image.LANCZOS)
    
    # Center it on the canvas
    paste_x = (target_w - new_w) // 2
    paste_y = (target_h - new_h) // 2
    canvas.paste(resized, (paste_x, paste_y))

    canvas.save(output_path, "JPEG", quality=95)
    print(f"  Saved to {output_path}")

# Setup paths
input_dir = "public/assets/Images/Team"
output_dir = "public/assets/Images/Team"

# CEO image - the male photo is more of a mid-body shot, crop top 55%
crop_to_headshot(
    f"{input_dir}/ceo.jpeg",
    f"{output_dir}/ceo_profile.jpg",
    crop_ratio_top=0.0,
    crop_ratio_bottom=0.55
)

# GM image - the female photo is a full-body shot, crop top 40%
crop_to_headshot(
    f"{input_dir}/gm.jpeg",
    f"{output_dir}/gm_profile.jpg",
    crop_ratio_top=0.0,
    crop_ratio_bottom=0.40
)

print("\nDone! Processed images saved.")
