#!/usr/bin/env python3
"""
Generate circular favicons from a square profile image.
Creates properly circular favicons with transparent corners
so Google Search renders them as circles.
"""

from PIL import Image, ImageDraw
import os, sys

INPUT_IMAGE = "public/marko-profile.png"
OUTPUT_DIR = "public"

SIZES = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-180x180.png": 180,
    "favicon-192x192.png": 192,
    "favicon-512x512.png": 512,
}

def make_circular(input_path, output_path, size):
    img = Image.open(input_path).convert("RGBA")
    img = img.resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
    output = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    output.paste(img, (0, 0), mask=mask)
    output.save(output_path, "PNG")

def generate_svg(output_path):
    with open(output_path, "w") as f:
        f.write("""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs><clipPath id="circle"><circle cx="50" cy="50" r="50"/></clipPath></defs>
  <image href="/marko-profile.png" width="100" height="100"
    clip-path="url(#circle)" preserveAspectRatio="xMidYMid slice"/>
</svg>""")

def generate_manifest(output_path):
    with open(output_path, "w") as f:
        f.write("""{
  "name": "Marko Sarafijanovic",
  "short_name": "Marko",
  "icons": [
    {"src": "/favicon-192x192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "/favicon-512x512.png", "sizes": "512x512", "type": "image/png"}
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}""")

if __name__ == "__main__":
    for filename, size in SIZES.items():
        make_circular(INPUT_IMAGE, os.path.join(OUTPUT_DIR, filename), size)
    generate_svg(os.path.join(OUTPUT_DIR, "favicon.svg"))
    generate_manifest(os.path.join(OUTPUT_DIR, "site.webmanifest"))
