
### Resize images


Creates `images` and `thumbs` folder of images.

  * fix orientation

```
jhead -autorot  *.JPG
```

  * remove exif

```
for i in *.JPG; do echo "Processing $i"; exiftool -all= "$i"; done
rm -f *_original
```

  * Create thumbnails cropped fixed sized thumbs

```
mkdir thumbs
mogrify -path thumbs -format JPG -resize "275x275^" -gravity center -crop 275x275+0+0 +repage *.JPG
```

  * Create images:

```
mkdir images
mogrify  -path images -resize 1500 -quality 75  *.JPG
```