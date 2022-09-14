#!/bin/bash

ffmpeg -framerate 30 -pattern_type glob -i './test/*.png' \
  -i audio.mp3 -c:a copy -shortest -c:v libx264 -pix_fmt yuv420p out.mp4
