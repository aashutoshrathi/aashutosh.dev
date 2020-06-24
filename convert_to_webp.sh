for file in src/images/*.{png,jpeg,jpg}; do
    cwebp -q 100 "$file" -o "${file%.*}.webp"
done
