#!/usr/bin/env node

const fs = require("fs");
const { exec, execSync } = require("child_process");

const execution = async (job, settings, { input, params }) => {
  try {
    const parentPath = settings.workpath + `/${job.uid}`;
    let outputFolder = "C://Users/Administrator/Documents/Nexrender/Output";
    const destination = outputFolder + `/${params.output}`;
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    let framesComplete = await processOffset(parentPath, params.maxFrames);
    let audiofile = await copyFiles(parentPath, destination, input);
    //let cmd = `render.sh ${destination} ${audiofile} ${params.frame} ${destination}/${params.output}.mp4`;
    if (framesComplete) {
      let mainformat = `C://ffmpeg/ffmpeg.exe -framerate ${params.frame} -i "${destination}/result_%05d.png" -i ${audiofile} -c:a copy -shortest -c:v libx264 -pix_fmt yuv420p ${destination}/${params.output}.mp4`;
      execSync(mainformat, { stdio: "inherit" });
      let finalOuput = `${destination}/${params.output}.mp4`;
      if (fs.existsSync(finalOuput)) {
        fs.copyFileSync(finalOuput, `${outputFolder}/${params.output}.mp4`);
        clean(destination);
      } else {
        console.log("cannot find result file");
      }
    }
    else
    {
      throw new Error("Frames not complete");
      // send signal to parent to restart
    }
  } catch (error) {
    console.log(error);
  }
};

const getImages = (path) => {
  let files = fs.readdirSync(path);
  return files.filter((file) => file.includes("result"));
};

const processOffset = (parent, dest, maxFrames) => {
  return new Promise((resolve, reject) => {
    try {
      let files_render = getImages(parent);
      let files_dest = getImages(dest);
      //if the destination does not contain any render frames then exit
      if (files_dest.length === 0) resolve(files_render.length === maxFrames);
      let startValue = files_dest.length;
      for (let i = startValue; i < files_render.length; i++) {
        let file = files_render[i];
        fs.renameSync(`${parent}/${file}`, `${parent}/${file}`);
      }
      resolve(files_render.length + files_dest.length === maxFrames);
    } catch (error) {
      reject(error);
    }
  });
};

const clean = (path) => {
  fs.rm(path, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
};

const copyFiles = (parent, target, format) => {
  return new Promise((resolve, reject) => {
    const path = parent;
    let files = fs.readdirSync(parent);
    let audiofileName = files.filter((file) => file.includes(".mp3"));
    let audiofilePath = parent + `/${audiofileName}`;
    //copy images
    exec(
      `mv ${parent}/*.${format} ${audiofilePath} ${target}`,
      (err, stdout, stderr) => {
        if (err || stderr) {
          console.log(stderr, err);
          reject(err);
        }
        console.log(stdout);
        resolve(`${target}/${audiofileName}`);
      }
    );
  });
};

module.exports = execution;
